import React,{useState} from 'react';
import {FlatList,Text,View,Button,StyleSheet,ActivityIndicator} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as ordersAction from '../../store/actions/orders';

const CartScreen = (props) => {
    const [isLoading,setIsLoading] = useState(false);

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItem = [];
        for (const key in state.cart.items) {
            transformedCartItem.push({
                productId: key,
                productTitle:state.cart.items[key].productTitle,
                productPrice:state.cart.items[key].productPrice,
                quantity:state.cart.items[key].quantity,
                sum:state.cart.items[key].sum
            });
        }
        return transformedCartItem.sort((a,b) => a.productId > b.productId ? 1 : -1);
    });
    const dispatch = useDispatch();

    const loader = async () => {
        setIsLoading(true);
        await dispatch(ordersAction.addOrder(cartItems,cartTotalAmount));
        setIsLoading(false);
    };

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>{Math.abs(cartTotalAmount.toFixed(2)) }</Text>
                </Text>
                {isLoading ? <ActivityIndicator size="large" color='orange' /> :  <Button title="Order Now"  disabled={cartItems.length === 0} onPress={loader}/> }
               
            </View>
           <FlatList data={cartItems} keyExtractor={item => item.productId } renderItem={itemData => <CartItem
           quantity={itemData.item.quantity} title={itemData.item.productTitle} amount={itemData.item.sum} 
          deletable onRemove={() => {
               dispatch(cartActions.removeFromCart(itemData.item.productId));
           }} />} />
        </View>
    );
}

CartScreen.navigationOptions = {
    headerTitle: 'Cart Item'
};

const styles = StyleSheet.create({
    screen: {
        margin:20,
    },
    summary: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:20,
        padding:10,
        elevation:10,
        backgroundColor:'white'
    },
    summaryText: {
        fontSize:18
    },
    amount: {
        color:'red'
    },

});

export default CartScreen;