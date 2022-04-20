import { StyleSheet, Text, View, TextInput,Button , TouchableOpacity,Alert } from 'react-native';
import Patientslink from '../components/Patientslink';

const Room1 = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <Text style={styles.title} >Room 1 Patients</Text>
            <Patientslink navigation={navigation}  destination='Sensors' patientNumber='1' />
            <Patientslink  destination='Sensors' patientNumber='2' navigation={navigation} />
            <Patientslink  destination='Sensors' patientNumber='3' navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        textAlign:'center',
        fontSize:20,
        marginVertical:10,
    },
    container: {
        flex: 1,
    },
});

export default Room1;