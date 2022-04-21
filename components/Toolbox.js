import { StyleSheet, Text, View, TextInput,Button , TouchableOpacity,Alert,ScrollView } from 'react-native';


const buttons = [
    {
        title: 'Sensor 1',
        onPress: () => Alert.alert('Sensor 1'),
    },
    {
        title: 'Sensor 2',
        onPress: () => Alert.alert('Sensor 2'),
    },
    {
        title: 'Sensor 3',
        onPress: () => Alert.alert('Sensor 3'),
    },
    {
        title: 'Stop and Exit',
        onPress: () => Alert.alert('Stop and Exit'),
    },
]

const Toolbox = ({ navigation }) => {
    return(
        <ScrollView   horizontal>
            <View style={styles.slider}>
                {buttons.map((button) => {
                    return (
                        <View key={button.title} style={styles.capsules}>
                            <Button  title={button.title} onPress={button.onPress} />
                        </View>
                    )
                })}
            </View>
        </ScrollView>
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
});

export default Toolbox;