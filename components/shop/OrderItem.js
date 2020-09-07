import React, {useState} from 'react';
import {View,Text,Image,StyleSheet,TouchableNativeFeedback } from 'react-native';
import { Button } from 'react-native';
import CartItem from './CartItem';

const OrderItem = (props) => {

    const [showDetails,setShowDetails] = useState(false);

    return <View style={styles.orderItem}>
        <View  style={styles.summary}>
<Text  style={styles.totalAmount}>$ {props.amount.toFixed(2)}</Text>
<Text  style={styles.date}>{props.date}</Text>
        </View>
        <View style={styles.b}>
        <Button color="purple" title={showDetails ? 'Hide Details' : 'Show Details'} onPress={() => {
            setShowDetails(prevState => !prevState)
        }}/></View>
        <View  style={styles.c}>
        {showDetails && <View style={styles.detailItems}>
            {props.items.map(cartItem => <CartItem key={cartItem.productId} quatity={cartItem.quatity} amount={cartItem.sum} title={cartItem.productTitle} /> )}
            </View>
            }
            </View>
        
       
    </View>

};

const styles = StyleSheet.create({
    orderItem:{
        shadowColor:'black',
        borderRadius:10,
        elevation:10,
        margin:20,
        padding:10,
        backgroundColor:'white',
        alignItems:'center'
    },
    b:{
        marginTop:15,
       
        alignItems:'center'
        

        },
        c:{
          marginTop:20,
          width:'100%'
        },
    summary:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:"100%"
    },
    totalAmount:{
        fontSize:16
    },
    date:{
        color:'#888',
        fontSize:16
    },
    detailItems:{
        width:'100%'
    }

});

export default OrderItem;