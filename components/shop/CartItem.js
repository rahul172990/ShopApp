import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const CartItem = (props) => {
    return (
        <View style={styles.cartItem}>
            <Text style={styles.itemData}>
                
                 <Text style={styles.qty}>{props.quantity  }</Text>
                 <Text style={styles.title}>{props.title}</Text>
                 
              
            </Text>
            <View style={styles.itemData}>
            <Text style={styles.amt}>$ {props.amount.toFixed(2)}</Text>
                {props.deletable && (<TouchableOpacity onPress={props.onRemove} style={styles.deletebtn}>
                    <Ionicons name="md-trash" size={23} color="red" />
                </TouchableOpacity>)}
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    cartItem:{
        padding:10,
        backgroundColor:"white",
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20
    },
    itemData:{
        flexDirection:'row',
        alignItems:'center',

    },
    qty:{
        color:'#888',
        fontSize:16,
        
    },
    title:{
        fontSize:16,
        
        
    },
    t:{
        marginLeft:10

    },
    amt:{
        fontSize:16
    },
    deletebtn:{
        marginLeft:20
    }

});

export default CartItem;