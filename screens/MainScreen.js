import React ,{useState} from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput,Button , TouchableOpacity,Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import Card from '../components/Card';

const MainScreen = ({ navigation }) => {

    const [data, setData] = useState();
    
    // const[socketMessage,setSocketMessage]=useState('')
    // var ws = new WebSocket('ws://');
    // ws.onopen(()=>console.log('soccet connection opened'))
    // ws.onclose(()=> console.log('connection closed'))
    // ws.onmessage((msg)=> setSocketMessage(msg) )
    // ws.onerror(()=>console.log('there was an error'))
    // const sendSocketMessage=(msg)=>{
    //   ws.OPEN ? ws.send(msg): console.log('the socket is not connected, please reconnect')
    // }

    const getData = () => {
        axios.get('http://localhost:3000/getData')
        .then(res => {
            console.log(res.data);
            setData(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    };




    return (
        <SafeAreaView  style={styles.container}>
            <Text style={styles.title} >Avaliable rooms</Text>
            <TouchableOpacity  onPress={()=>{
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
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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