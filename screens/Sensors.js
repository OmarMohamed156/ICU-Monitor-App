import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TextInput,Button , TouchableOpacity,Alert,ScrollView } from 'react-native';
import Toolbox from '../components/Toolbox';

const Sensors = ({ navigation,route }) => {

    const {patientSensors} = route.params;

    console.log(patientSensors)

    return(
        <SafeAreaView>
        </SafeAreaView>
    )
}

export default Sensors;

