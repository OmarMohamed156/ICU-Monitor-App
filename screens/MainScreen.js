import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput,Button ,ToastAndroid, TouchableOpacity,Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import Card from '../components/Card';

const MainScreen = ({ navigation }) => {

    const [data, setData] = useState();
    
    // const[socketMessage,setSocketMessage]=useState('')
    // var ws = new WebSocket('ws://192.168.43.226:80/slave');
    // ws.onmessage = msg =>{
    //     setSocketMessage(msg.data)
    //     console.log(msg.data)
    // }
    // ws.OPEN ? console.log('the socket is connected'): console.log('the socket is not connected, please reconnect')

    const getData = () => {
        axios.get('all-data')
        .then(res => {
            setData(res.data);
        })
        .catch(err => {
            console.log(err);
            ToastAndroid.show('Error Fetching the data', ToastAndroid.SHORT);
        });
    };


    useEffect(()=>{
        getData();
    },[])



    return (
        <SafeAreaView  style={styles.container}>
            <Text style={styles.title} >Avaliable rooms</Text>
            {data && data.map((item,index)=>{
                return(
                    <TouchableOpacity key={index} onPress={()=>{
                        navigation.navigate('Room',{
                            roomPatients: item.patients,
                            roomID: item.room
                        })
                    }}>
                    <Card style={styles.card}>
                            <Text style={styles.cardText}>Room: {item.room}</Text>
                            <Text style={styles.cardText}>No of Patients: {item.patients.length}</Text>
                    </Card>
                    </TouchableOpacity>
                )
            })}


            {/* <TouchableOpacity  onPress={()=>{
                navigation.navigate('Room1')}}>
                <Card style={{ width: 300, marginVertical: 10 }}>
                    <Text style={styles.cardText}>Room: 1</Text>
                    <Text style={styles.cardText}>Patients-IDs:</Text>
                    <Text style={styles.cardText}>Sensors</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>{
                navigation.navigate('Room1')}} >
                <Card style={{ width: 300, marginVertical: 10 }}>
                    <Text style={styles.cardText}>Room: 2</Text>
                    <Text style={styles.cardText}>Patients-IDs:</Text>
                    <Text style={styles.cardText}>Sensors</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>{
                navigation.navigate('Room1')}} >
                <Card style={{ width: 300, marginVertical: 10 }}>
                    <Text style={styles.cardText}>Room: 3</Text>
                    <Text style={styles.cardText}>Patients-IDs:</Text>
                    <Text style={styles.cardText}>Sensors</Text>
                </Card>
            </TouchableOpacity> */}
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    card:{ width: 300, marginVertical: 10 },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    cardText: {
        fontSize: 15,
        marginBottom: 10,
        paddingVertical: 10,
    },
});

export default MainScreen;