import React ,{useState} from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput,Button , TouchableOpacity,Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';



const Patientslink = ({ navigation,destination,patientNumber }) => {
    return(
        <SafeAreaView>
            <TouchableOpacity onPress={()=>{navigation.navigate(destination)}} style={styles.linkContainer} on ><Text style={styles.link}>Patient {patientNumber} </Text></TouchableOpacity>
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
})

export default Patientslink;