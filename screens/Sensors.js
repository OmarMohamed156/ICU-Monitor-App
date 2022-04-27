import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TextInput,Button , ToastAndroid,Alert,ScrollView,Dimensions } from 'react-native';
import React ,{useState} from 'react';
import { VictoryChart,VictoryLine,VictoryTheme,VictoryLabel,VictoryAxis } from 'victory-native';
const Sensors = ({ navigation,route }) => {

    const {patientSensors} = route.params;
    const [sensorControl,setSensorControl] = useState(false);
    const [turnOff,setTurnOff] = useState(true);
    const [socketMessage,setSocketMessage]=useState('')
    const [control,setControl] = useState(false)
    const [showGraph,setShowGraph]=useState(false)

    var ws = new WebSocket('ws://172.28.132.244:80/slave');
    ws.onmessage = msg =>{
        setSocketMessage(msg.data)
    }

    const Sensors={}

    return(
        <SafeAreaView>
                <ScrollView horizontal>
                <View style={styles.slider}>
                {patientSensors.map((item,index)=>{
                    Sensors[item.sensor_id] = item.sensor_id
                return(
                    <View key={index} style={styles.capsules}>
                        <Button  title={item.sensor_serial_number} onPress={()=>{
                            ws.send(JSON.stringify({type:'sensor',value:item.sensor_id}))
                            ToastAndroid.show('Getting Sensor Data',ToastAndroid.SHORT)
                            setShowGraph(showGraph ? false : true)
                            setControl(control ? false : true)
                            if(control){
                                ws.send(JSON.stringify({type:'control',sensor_id:item.sensor_id,state:turnOff}))
                                ToastAndroid.show('Control sent',ToastAndroid.SHORT)
                                setTurnOff(turnOff ? false : true)
                                setShowGraph(showGraph ? false : true)
                            }
                        }} />
                    </View>
                )    
                })}
                </View>
            </ScrollView>
            <View  style={{height:520,borderRadius:50}} >
                {showGraph && 
                    <VictoryChart width={Dimensions.get('window').width-25} theme={VictoryTheme.material} >
                        <VictoryLine 
                            style={{
                                data: { stroke: '#06b6d4'}
                              }}
                            data={socketMessage}
                              animate={{
                                duration:5000,
                                easing: 'sinOut'
                              }}
                        ></VictoryLine>
                    </VictoryChart>
                }
                <Button  title='Turn On/Off'  onPress={()=>{
                    ws.send(JSON.stringify({type:'control',state:sensorControl}))
                    setSensorControl(sensorControl ? false : true)
                    setShowGraph(showGraph ? false : true)
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
    }
})


export default Sensors;

