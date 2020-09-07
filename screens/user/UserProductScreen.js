import React, {useState} from 'react';
import {View,Text,Image,StyleSheet,TouchableNativeFeedback,FlatList,Button,Alert } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import {useSelector,useDispatch} from 'react-redux';
import {HeaderButtons , Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import * as productsAction from '../../store/actions/product';

const UserProductScreen = (props) => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();
    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct',{productId:id});
    };
    
    const deleteHandler = (id) => {
        Alert.alert('You Sure ?? ', 'do you want to delete',[
            {text:'No',style:'default'},
            {text:'Yes',style:'destructive', onPress: () => {
       dispatch(productsAction.deleteProduct(id));
                   
                

            }}
        ])
    };

    return <FlatList data={userProducts} keyExtractor={item => item.id}  
    renderItem={itemData => <ProductItem image={itemData.item.imageUrl} title={itemData.item.title} price={itemData.item
    .price} onSelect={() => {
        editProductHandler(itemData.item.id);
    }}  >

         <Button title="Edit" onPress={() => {
            editProductHandler(itemData.item.id);
       
         }}/>
            <Button title="Delete" onPress={deleteHandler.bind(this,itemData.item.id)}/>
    </ProductItem>}
    />
};

UserProductScreen.navigationOptions = (navData) => {
    return {
    headerTitle: "Your Products",
    headerLeft: () => <HeaderButtons HeaderButtonComponent = {HeaderButton}>
    <Item title='cart' iconName='md-menu' onPress={() => {
        navData.navigation.toggleDrawer();
    }}/>
     </HeaderButtons>,
     headerRight: () =>   <HeaderButtons HeaderButtonComponent = {HeaderButton}>
     <Item title='ADD' iconName='md-create' onPress={() => {
         navData.navigation.navigate('EditProduct');
     }}/>
      </HeaderButtons>
};
}

export default UserProductScreen;