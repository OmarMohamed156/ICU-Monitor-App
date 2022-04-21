import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TextInput,Button , TouchableOpacity,Alert,ScrollView } from 'react-native';
import Toolbox from '../components/Toolbox';

const Sensors = ({ navigation }) => {
    return(
        <SafeAreaView>
                <Toolbox navigation={navigation} />
        </SafeAreaView>
    )
}

export default Sensors;

