import { StyleSheet, Text, View, TextInput,Button , TouchableOpacity,Alert } from 'react-native';


const Card = props => {
    
    return(
        <View style={{...styles.card,...props.style}}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        textAlign:'center',
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0,height:2},
        shadowRadius:6,
        elevation:8,
        padding:15,
        borderRadius:10,
        backgroundColor:'white'
    },
});

export default Card;