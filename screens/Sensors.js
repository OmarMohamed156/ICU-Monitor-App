import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TextInput,Button , ToastAndroid,Alert,ScrollView,Dimensions } from 'react-native';
import React ,{useState,useEffect} from 'react';
import { VictoryLine,VictoryAxis,VictoryZoomContainer, VictoryChart,VictoryLabel, VictoryTheme, VictoryVoronoiContainer } from "victory-native";
import Colors  from '../constants/Colors'
import axios from 'axios';

const Sensors = ({ navigation,route }) => {

    const [minX,setMinX]= useState(0);
    const [maxX,setMaxX]= useState(5);
    const {patientSensors,patientID} = route.params;
    const [socket,setSocket] = useState();
    const [showSummary,setShowSummary] = useState(true);
    const [socketMessage,setSocketMessage]=useState()
    const [sensorData,setSensorData]=useState([])
    const [summaryData,setSummaryData]=useState([])
    const [showGraph,setShowGraph]=useState(false)
    const [showSummaryData,setShowSummaryData]=useState(true)
    const [tooglePlay,setTooglePlay]=useState(true)


    const getSummary=()=>{
        axios.get(`patients/${patientID}/summary`).then((res)=>{
        setSummaryData(res.data)
    }).catch((err)=>console.log('err'))
    }

    useEffect(()=>{
        var ws = new WebSocket('ws://172.28.132.166:80/slave');
        setSocket(ws);
        ws.onmessage= msg =>{
            var message = JSON.parse(msg.data);
            if(sensorData.length > 0){
                setMinX((oldMin)=>oldMin+1)
                setMaxX((oldMax)=>oldMax+1)
            }
            console.log (message);
            setSensorData(message)
        }
        ws.onopen = (e) => {
            console.log('opened')
        }
    
        ws.onclose = (e) => {
            console.log('closed')
        }
        getSummary()
    },[])

    return(
        <SafeAreaView>
            <ScrollView>
                <ScrollView horizontal>
                    <View style={styles.slider}>
                    {patientSensors.map((item,index)=>{
                        return(
                            <View key={index} style={styles.capsules}>
                                <Button  color={item.color} title={item.sensor_serial_number} onPress={()=>{
                                    setShowSummaryData(false)
                                    setSensorData([])
                                    socket.send(JSON.stringify({type:'sensor',sensor_id:item.sensor_id}))
                                    ToastAndroid.show('Getting Sensor Data',ToastAndroid.SHORT)
                                    setShowSummary(false)
                                    setShowGraph(true)
                                }} />
                                <View style={{paddingHorizontal:5}} >
                                    <Button color={item.color}   title='Play' onPress={()=>{
                                        socket.send(JSON.stringify({type:'toggle',toggle:true}))
                                        ToastAndroid.show('Play',ToastAndroid.SHORT)
                                    }}/>
                                </View>
                                <View style={{paddingHorizontal:5}} >
                                    <Button color={item.color}   title='Pause' onPress={()=>{
                                        socket.send(JSON.stringify({type:'toggle',toggle:false}))
                                        ToastAndroid.show('Pause',ToastAndroid.SHORT)
                                    }} />
                                </View>
                            </View>
                        )    
                    })}
                    </View>
                </ScrollView>

                { summaryData && showSummary && summaryData.map((item,index)=>{
                    return(
                            <View key={index} style={{flexDirection:'row',marginVertical:20}}>
                                <Text style={{fontSize:20}}> {item.sensor_type} : {item.summary !== null ? `${item.summary}   ${item.sensor_unit} `   : <Text  style={{color:'red'}} >{'The sensor is not being used right now'.toUpperCase()}</Text>}  </Text>
                                {/* <VictoryChart>
                                    <VictoryLine containerComponent={<VictoryZoomContainer/>}  data={item.readings} />
                                </VictoryChart> */}
                            </View>
                    )
                })
                }

                <View  style={{height:520,borderRadius:50}} >
                    {showGraph?             <View>
                    <VictoryChart containerComponent={<VictoryZoomContainer/>}  width={350} theme={VictoryTheme.material}>
                        <VictoryLine data={sensorData}  y="value" />
                    <VictoryAxis domain={{x:[minX,maxX]}} style={{axisLabel:{
                            fontSize: 15, fill:'#059669'
                        }}} crossAxis label='time' axisLabelComponent={<VictoryLabel dy={25}  textAnchor='inherit' />}/>
                        <VictoryAxis style={{axisLabel:{
                            fontSize: 15, fill:'#06b6d4'
                        }}} dependentAxis crossAxis  label='value'   axisLabelComponent={<VictoryLabel  dy={-30} textAnchor='inherit' />}/>
                    </VictoryChart>
                </View> :null}
                    <Button  title='Turn On' onPress={()=>{
                        socket.send(JSON.stringify({type:'control',state:true}))
                    }}/>
                    <View style={{marginVertical:5}}>
                    <Button  title='Turn Off' color={Colors.secondary} onPress={()=>{
                        socket.send(JSON.stringify({type:'control',state:false}))
                    }}/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    slider:{
        flexDirection:'row',
        justifyContent: 'center',
        paddingBottom:10,
    },
    capsules:{
        marginHorizontal:10,
        flexDirection:'row',
    },
    graphCarousel:{
        flexDirection:'row',
        justifyContent: 'center',
        paddingBottom:10,
    }
})


export default Sensors;

