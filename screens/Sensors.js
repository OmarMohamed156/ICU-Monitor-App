import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TextInput,Button , TouchableOpacity,Alert,ScrollView } from 'react-native';

const Sensors = ({ navigation }) => {
    return(
        <SafeAreaView>
                <ScrollView   horizontal>
                    <View style={styles.slider}>
                        <View style={styles.capsules}><Button  title='Sensor 1' /></View>
                        <View style={styles.capsules}><Button  title='Sensor 1' /></View>
                        <View style={styles.capsules}><Button  title='Sensor 1' /></View>
                        <View style={styles.capsules}><Button  title='Stop and Exit' /></View>
                    </View>
                </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    slider:{
        flexDirection:'row',
        justifyContent: 'center',
    },
    capsules:{
        marginHorizontal:10,
    }
});

export default Sensors;

