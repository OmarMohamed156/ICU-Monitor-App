import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TextInput,Button , ToastAndroid,Alert,ScrollView,Dimensions } from 'react-native';
import React ,{useState,useEffect} from 'react';
import { VictoryLine,VictoryAxis, VictoryChart,VictoryLabel, VictoryTheme } from "victory-native";
import Colors  from '../constants/Colors'
import axios from 'axios';

const Sensors = ({ navigation,route }) => {

    // const data = [
    //     { timestamp: 1, value: 13000 },
    //     { timestamp: 2, value: 16500 },
    //     { timestamp: 3, value: 14250 },
    //     { timestamp: 4, value: 19000 }
    //   ];

    const [minX,setMinX]= useState(0);
    const [maxX,setMaxX]= useState(5);

    const {patientSensors} = route.params;
    const [socket,setSocket] = useState();
    const [socketMessage,setSocketMessage]=useState()
    const [sensorData,setSensorData]=useState([])
    const [showGraph,setShowGraph]=useState(false)
    const [tooglePlay,setTooglePlay]=useState(true)


    useEffect(()=>{
        var ws = new WebSocket('ws://172.28.132.244:80/slave');
        setSocket(ws);
        ws.onmessage= msg =>{
            var message = JSON.parse(msg.data);
                setMinX(message.length-5);
                setMaxX(5+message.length);
            setSensorData(message)
        }
        ws.onopen = (e) => {
            console.log('opened')
        }
    
        ws.onclose = (e) => {
            console.log('closed')
        }
    },[])

    return(
        <SafeAreaView>
                <ScrollView horizontal>
                <View style={styles.slider}>
                {patientSensors.map((item,index)=>{
                    return(
                        <View key={index} style={styles.capsules}>
                            <Button  color={item.color} title={item.sensor_serial_number} onPress={()=>{
                                setSensorData([])
                                socket.send(JSON.stringify({type:'sensor',sensor_id:item.sensor_id}))
                                ToastAndroid.show('Getting Sensor Data',ToastAndroid.SHORT)
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
            <View  style={{height:520,borderRadius:50}} >
                {showGraph?             <View>
                <VictoryChart width={350} theme={VictoryTheme.material}>
                <VictoryLine data={sensorData}  y="value" />
                <VictoryAxis domain={{x:[minX,maxX]}} style={{axisLabel:{
                        fontSize: 15, fill:'#059669'
                      }}} crossAxis label='time' axisLabelComponent={<VictoryLabel dy={25}  textAnchor='inherit' />}/>
                      <VictoryAxis style={{axisLabel:{
                        fontSize: 15, fill:'#06b6d4'
                      }}} dependentAxis crossAxis  label='value'   axisLabelComponent={<VictoryLabel  dy={-30} textAnchor='inherit' />}/>
                </VictoryChart>
            </View> :null}
                <Button  title='Turn On/Off' onPress={()=>{
                    socket.send(JSON.stringify({type:'control',state:true}))
                }}/>
            </View>
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
    }
})


export default Sensors;

