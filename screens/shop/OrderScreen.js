import React,{useEffect,useState} from 'react';
import {FlatList,Text,View,TouchableNativeFeedback,ActivityIndicator,StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons , Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersAction from '../../store/actions/orders';

const OrderScreen = (props) => {
    const [isLoading,setIsLoding] = useState(false);
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();


    useEffect(() => {
        setIsLoding(true);
        dispatch(ordersAction.fetchOrders()).then(() => {
            setIsLoding(false);
        });

    },[dispatch]);

    if(isLoading) {
        return <View style={styles.centered}><ActivityIndicator size="large" color="blue" /></View>
    }

return <FlatList data={orders} keyExtractor={item => item.id} renderItem={itemData => <OrderItem amount={itemData.item.totalAmount} date={itemData.item.readableDate} items={itemData.item.items} />}  />

};

OrderScreen.navigationOptions = (navData) => {
    return {
    headerTitle: 'your Orders',
    headerLeft: () => <HeaderButtons HeaderButtonComponent = {HeaderButton}>
    <Item title='cart' iconName='md-menu' onPress={() => {
        navData.navigation.toggleDrawer();
    }}/>
     </HeaderButtons>,
    };
};


const styles = StyleSheet.create({
    centered:{
        flex:1,
        justifyContent:"center",
        alignItems:'center'
    }
})

export default OrderScreen;