import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TextInput,Button , TouchableOpacity,Alert,ScrollView } from 'react-native';

const Sensors = ({ navigation,route }) => {

    const {patientSensors} = route.params;

    console.log(patientSensors)

    return(
        <SafeAreaView>
            <ScrollView horizontal>
                <View style={styles.slider}>
                {patientSensors.map((item,index)=>{
                    console.log(item)
                return(
                    <View key={index} style={styles.capsules}>
                        <Button  title={item.sensor_serial_number} onPress={()=>{}} />
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

