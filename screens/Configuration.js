import { StyleSheet, Text, ScrollView,View, TextInput,Button , TouchableOpacity,Alert ,ToastAndroid} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React ,{useState} from 'react'
import Checkbox from 'expo-checkbox';
import axios from 'axios';


const Config = ({ navigation}) => {


    const [showPatientForm, setShowPatientForm] = useState(false);
    const [showRoomForm, setShowRoomForm] = useState(false);
    const [showSensorForm, setShowSensorForm] = useState(false);

    const[sensorUnit,setSensorUnit]=useState('')

    const [name, setName] = useState('');
    const [code,setCode] = useState('');
    const[patchserialnumber,setPatchserialnumber] = useState();
    const[patchroomid,setPatchroomid] = useState();
    const[patchpatientid,setPatchpatientid] = useState();
    const[serial,setSerial] = useState('');
    const [sensortype,setSensorType] = useState('');
    const [sensorroomid,setSensorRoomId] = useState();
    const [sensorpatientid,setSensorPatientId] = useState();
    const [patientRoomID,setPatientRoomID] = useState();
    const [roomID, setRoomID] = useState('');
    const [roomCapacity, setRoomCapacity] = useState('');

    const addPatient = () => {
        if(name.length === 0 || code.length === 0 || patientRoomID === undefined ){
            Alert.alert('Invalid Inputs', 'Please enter valid inputs', [{text: 'Okay'}]);
        }
        else{
            axios.post('patients', {
                code: code,
                name: name,
                room_id: patientRoomID,
            })
            .then(res => {
                // navigation.navigate('MainScreen');
                ToastAndroid.show('Patient Added', ToastAndroid.SHORT, ToastAndroid.CENTER);
            })
            .catch(err => {
                Alert.alert('Some Inputs already exists', 'Please enter valid inputs', [{text: 'Okay'}]);
            });
        }
    }

    const addRoom = () => {
        if(roomID.length === 0 || roomCapacity.length === 0){
            Alert.alert('Invalid Inputs', 'Please enter valid inputs', [{text: 'Okay'}]);
        }
        else{
            axios.post('rooms', {
                number: roomID,
                capacity: roomCapacity,
            })
            .then(res => {
                // navigation.navigate('MainScreen');
                ToastAndroid.show('Room Added', ToastAndroid.SHORT, ToastAndroid.CENTER);
            })
            .catch(err => {
                console.log(err)
                Alert.alert('Some Inputs already exists', 'Please enter valid inputs', [{text: 'Okay'}]);
            });
        }
    }

    const addSensor = () => {
        if(sensortype.length === 0 || serial.length === 0 || sensorroomid === undefined || sensorpatientid === undefined){
            Alert.alert('Invalid Inputs', 'Please enter valid inputs', [{text: 'Okay'}]);
        }
        else{
            axios.post('sensors', {
                sensor_unit: sensorUnit,
                type: sensortype,
                serial_number: serial,
                room_id: sensorroomid,
                patient_id: sensorpatientid,
            })
            .then(res => {
                // navigation.navigate('MainScreen');
                ToastAndroid.show('Sensor Added', ToastAndroid.SHORT, ToastAndroid.CENTER);
            })
            .catch(err => {
                Alert.alert('Some Inputs already exists', 'Please enter valid inputs', [{text: 'Okay'}]);
            });
        }
    }

    const patchSensor = () => {
        if(patchserialnumber.length === 0 || patchroomid === undefined || patchpatientid === undefined){
            Alert.alert('Invalid Inputs', 'Please enter valid inputs', [{text: 'Okay'}]);
        }
        else{
            axios.patch('sensors/rotate-sensor', {
                serial_number: patchserialnumber,
                room_id: patchroomid,
                patient_id: patchpatientid,
            })
            .then(res => {
                // navigation.navigate('MainScreen');
                ToastAndroid.show('Sensor Rotated', ToastAndroid.SHORT, ToastAndroid.CENTER);
            })
            .catch(err => {
                Alert.alert('Some Inputs already exists', 'Please enter valid inputs', [{text: 'Okay'}]);
            });
        }
    }

    return  (
        <SafeAreaView>
            <ScrollView>
                {/* <View style={styles.section}>
                    <Checkbox style={styles.checkbox} />
                    <Text style={styles.paragraph}>Disabled checkbox</Text>
                </View> */}

                <View style={styles.inputContainer} > 
                    <TextInput placeholder='Patient name' onChangeText={(pName)=>{setName(pName)}} secureTextEntry={false}  style={styles.input} />
                    <TextInput placeholder='Patient code' onChangeText={(pcode)=>{setCode(pcode)}} secureTextEntry={false}  style={styles.input} />
                    <TextInput placeholder='Patient Room ID' keyboardType='decimal-pad'  onChangeText={(prID)=>{setPatientRoomID(prID)}} secureTextEntry={false}  style={styles.input} />
                    <View style={styles.btnContainer} >
                        <Button title='Add Patient'  onPress={addPatient} />
                    </View>
                </View>
                <View style={styles.inputContainer} > 
                    <TextInput placeholder='Room ID' onChangeText={(id)=>{setRoomID(id)}} secureTextEntry={false}  style={styles.input} />
                    <TextInput placeholder='Capacity'  keyboardType='decimal-pad' onChangeText={(cap)=>{setRoomCapacity(cap)}}  secureTextEntry={false}  style={styles.input} />
                    <View style={styles.btnContainer} >
                        <Button title='Add Room'  onPress={addRoom} />
                    </View>
                </View>
                <View style={styles.inputContainer} > 
                    <TextInput placeholder='Serial Number' onChangeText={(serial)=>{setSerial(serial)}} secureTextEntry={false}  style={styles.input} />
                    <TextInput placeholder='Sensor Type'   onChangeText={(type)=>{setSensorType(type)}}  secureTextEntry={false}  style={styles.input} />
                    <TextInput placeholder='Sensor Unit'   onChangeText={(unit)=>{setSensorUnit(unit)}}  secureTextEntry={false}  style={styles.input} />
                    <TextInput placeholder='Sensor Room ID'   onChangeText={(srID)=>{setSensorRoomId(srID)}} keyboardType='decimal-pad'  secureTextEntry={false}  style={styles.input} />
                    <TextInput placeholder='Sensor Patient ID'   onChangeText={(spID)=>{setSensorPatientId(spID)}} keyboardType='decimal-pad'  secureTextEntry={false}  style={styles.input} />
                    <View style={styles.btnContainer} >
                        <Button title='Add Sensor'  onPress={addSensor} />
                    </View>
                </View>
                <View style={styles.inputContainer} > 
                    <TextInput placeholder='Wanted Serial Number' keyboardType='decimal-pad' onChangeText={(serial)=>{setPatchserialnumber(serial)}} secureTextEntry={false}  style={styles.input} />
                    <TextInput placeholder='Desired Room ID' keyboardType='decimal-pad'  onChangeText={(prID)=>{setPatchroomid(prID)}}  secureTextEntry={false}  style={styles.input} />
                    <TextInput placeholder='Patient-ID'   onChangeText={(ppID)=>{setPatchpatientid(ppID)}} keyboardType='decimal-pad'  secureTextEntry={false}  style={styles.input} />
                    <View style={styles.btnContainer} >
                        <Button title='Patch'  onPress={patchSensor} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const  styles = StyleSheet.create({
    btnContainer:{
        marginVertical:30,
    },
    inputContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderBottomWidth: 1,
        margin: 10,
        padding: 10,
    },
      section: {
    flexDirection: 'row',
    alignItems: 'center',
    },
    paragraph: {
        fontSize: 15,
    },
    checkbox: {
        margin: 8,
    },
})


export default Config;