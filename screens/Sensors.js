import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TextInput,Button , TouchableOpacity,Alert,ScrollView } from 'react-native';
import React ,{useState} from 'react';

const Sensors = ({ navigation,route }) => {

    const {patientSensors} = route.params;

    const[socketMessage,setSocketMessage]=useState('')
    const [sensorID, setSensorID] = useState()

    var ws = new WebSocket('ws://192.168.43.226:80/slave');
    ws.onmessage = msg =>{
        setSocketMessage(msg.data)
    }

    // ws.OPEN ? console.log('the socket is connected'): console.log('the socket is not connected, please reconnect')


    const getReadings = () => {
        ws.send(JSON.stringify({type:'sensor'}))
    }

    const sensors_IDs =[]

    return(
        <SafeAreaView>
            <ScrollView horizontal>
                <View style={styles.slider}>
                {patientSensors.map((item,index)=>{
                    // console.log(item)
                return(
                    <View key={index} style={styles.capsules}>
                        <Button  title={item.sensor_serial_number} onPress={()=>{}} />
                        <Text>{item.sensor_id}</Text>
                    </View>
                )    
                })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    slider:{
        flexDirection:'row',
        justifyContent: 'center',
        paddingBottom:20,
    },
    capsules:{
        marginHorizontal:10,
    }
})


export default Sensors;

