import React from 'react';
import {ScrollView,Text, View, Button,Image,StyleSheet} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import * as cartActions from '../../store/actions/cart';


const ProductDetailScreen = (props) => {

    const dispatch = useDispatch();
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId));
   
return (
    <ScrollView>
        <Image style={styles.img} source={{uri:selectedProduct.imageUrl}} />
        <View style={styles.btn}>
        <Button title="Add To Cart" onPress={() => {dispatch(cartActions.addToCart(selectedProduct));
        }}
        />

        </View>
       
        <Text style={styles.price}>$ {selectedProduct.price.toFixed(2)}</Text>
       <Text style={styles.desc}>{selectedProduct.description}</Text>
    </ScrollView>


);

};

ProductDetailScreen.navigationOptions = (navData) => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    };
}


const styles = StyleSheet.create({
    img:{
        width:'100%',
        height:300
    },
    btn:{
        
        alignItems:'center',
        marginVertical:20
    },
    price:{
        fontSize:20,
        textAlign:'center',
        marginVertical:20,

    },
    desc:{
        fontSize:16,
        textAlign:'center',
        marginHorizontal:20
       
    }

});

export default ProductDetailScreen;