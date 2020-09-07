import React from 'react';
import {View,Text,Image,StyleSheet,TouchableNativeFeedback } from 'react-native';
import { Button } from 'react-native';



const ProductItem = (props) => {
    return (
   
    <View style={styles.product}>
        <View style={styles.touch}>
    
         <TouchableNativeFeedback onPress={props.onSelect} useForeground>
             <View>
        <View style={styles.imgContainer}>
        <Image style={styles.image} source={{uri: props.image}} />
        </View>
        <View style={styles.txt}>
           <Text style={styles.title}>{props.title}</Text>
           <Text style={styles.price}>$ {props.price}</Text>
        </View>
        <View style={styles.actions}>
            {props.children}
        </View>
        </View>
        </TouchableNativeFeedback>
        </View>
        </View>
  
    
    );
};


const styles = StyleSheet.create({
    product:{
        shadowColor:'black',
        elevation: 8,
        borderRadius: 10,
        backgroundColor:'white',
        height: 300,
        margin : 20,
        overflow:'hidden'
    },
    title: {
        fontSize: 18,
        marginVertical: 4

    },
    touch:{
        overflow:'hidden',
        height: '100%',
        borderRadius:10

    },
    price:{

        fontSize: 14,
        color:'#888'
    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:20,
        marginTop:25


    },
    image:{
        width:'100%',
        height:'100%'
    },
    txt:{
        alignItems:'center',
        marginTop:5,
        height:'15%'
    },
    imgContainer:{
        height:'60%',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        overflow:'hidden'

        
    }
});

export default ProductItem;