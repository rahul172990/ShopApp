import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import ProductOverviewScreen from '../screens/shop/ProductOverViewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import { Ionicons } from '@expo/vector-icons';


const defaultNavOptions = {
    headerStyle: {
        backgroundColor:'blue'
    },
    headerTintColor:'white'
}

const ProductsNavigator = createStackNavigator({
    ProductOverviewScreen: ProductOverviewScreen,
    ProductDetail  : ProductDetailScreen,
    Cart:CartScreen
    
},
{
    navigationOptions : {
        drawerIcon: drawerConfig => (
            <Ionicons name='md-cart' size={23} color={drawerConfig.tintColor} />
        )

    },


    defaultNavigationOptions: defaultNavOptions
});

const OrdersNavigator = createStackNavigator({
    Orders: OrderScreen
},
{
    navigationOptions : {
        drawerIcon: drawerConfig => (
            <Ionicons name='md-list' size={23} color={drawerConfig.tintColor} />
        )

    },

   
   defaultNavigationOptions: defaultNavOptions
   
});


const AdminNavigator = createStackNavigator({
    UserProducts: UserProductScreen,
    EditProduct: EditProductScreen
},
{
    navigationOptions : {
        drawerIcon: drawerConfig => (
            <Ionicons name='md-create' size={23} color={drawerConfig.tintColor} />
        )

    },

   
   defaultNavigationOptions: defaultNavOptions
   
});

const shopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin:AdminNavigator

},{
    contentOptions: {
        activeTintColor: 'red'
    }

});

const authNavigator = createStackNavigator({
   
    Auth:AuthScreen

},{
    defaultNavigationOptions:defaultNavOptions
});

const mainNavigator = createSwitchNavigator({
    Auth:authNavigator,
    Shop:shopNavigator
});

export default createAppContainer(mainNavigator);