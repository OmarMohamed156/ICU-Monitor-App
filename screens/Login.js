import axios from 'axios';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput,Button , TouchableOpacity,Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginHandler = () => {
        if(email.length === 0 || password.length === 0){
            Alert.alert('Invalid Inputs', 'Please enter valid inputs', [{text: 'Okay'}]);
        }
        else if(email === 'doctor@gmail.com' && password === '123'){
            navigation.navigate('MainScreen');
        }
        else{
            Alert.alert('Invalid Inputs', 'Please enter valid inputs', [{text: 'Okay'}]);
        }
    }

    const login = () => {
        axios.post('http://localhost:3000/login', {
        email: email,
        password: password
        })
        .then(res => {
            navigation.navigate('Doctor');
        })
        .catch(err => {
            console.log(err);
        });
    };
    
    return (
        <SafeAreaView  style={styles.container}>
            <Text style={styles.title} >Welcome to the ICU monitor</Text>
            <View style={styles.inputContainer}>
                <TextInput  placeholder='Email' onChangeText={(mail)=>{
                    setEmail(mail);
                }} style={{...styles.input,borderColor: Colors.primary}} />
                <TextInput secureTextEntry={true} onChangeText={(pass)=>{
                    setPassword(pass);
                }}  placeholder='Password' style={{...styles.input,borderColor: Colors.secondary}} />
            </View>
            <TouchableOpacity style={styles.buttonContainer}>
                <Button title='Login' color={Colors.tertiary} onPress={()=>{
                    loginHandler();
                }} />
            </TouchableOpacity>
<TouchableOpacity style={styles.config}  onPress={()=>{navigation.navigate('Config')}} ><Text style={styles.configText}>Add Configuration</Text></TouchableOpacity>
        </SafeAreaView>
    );
};

    const styles = StyleSheet.create({
        config: {
            marginVertical: 30,
        },
        configText: {
            color: Colors.secondary,
            fontWeight: 'bold',
        },
        title: {
            marginTop: 130,
            fontSize: 20,
            marginBottom: 20,
        },
        inputContainer: {
            marginTop: 50,
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
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
        },
        buttonContainer: {
            marginTop: 20,
            width: 300,
            height: 40,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    export default Login;