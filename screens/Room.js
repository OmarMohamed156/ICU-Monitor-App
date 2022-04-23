import { StyleSheet, Text, View, TextInput,Button , TouchableOpacity,Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';





const Room = ({ navigation,route }) => {
    const {roomPatients,roomID} = route.params;
    console.log(roomPatients)
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title} >Room {roomID} Patients</Text>
            {roomPatients.map((item,index)=>{
                return(
                    <TouchableOpacity key={index} onPress={()=>{navigation.navigate('Sensors',{
                        patientSensors: item.sensors,
                    })}} style={styles.linkContainer}><Text style={styles.link}> {item.patient_name}  (id: {item.patient_id}) </Text></TouchableOpacity>
                )    
            })}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    link:{
        color: Colors.primary,
        textAlign:'center',
        fontSize:20,
        marginVertical:10,
    },
    title:{
        textAlign:'center',
        fontSize:20,
        marginVertical:10,
    },
    container: {
        flex: 1,
    },
});

export default Room;