import React,{useEffect,useState,useCallback} from 'react';
import {View,FlatList,Text,TouchableNativeFeedback,Button,StyleSheet,ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/product';
import {HeaderButtons , Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

const ProductOverviewScreen = (props) => {
    const [isLoading,setIsLoading] = useState(false);
    const [isRefreshing,setIsRefreshing] = useState(false);
    const products = useSelector(state => state.products.availableProducts);

     const dispatch = useDispatch();
      
     const loadProducts = useCallback(async () => {

          setIsRefreshing(true);
        
          await dispatch(productsActions.fetchProducts());
          setIsRefreshing(false);
        
       
      }, [dispatch, setIsLoading]);
    

     useEffect(() => {
         const willFocusSub = props.navigation.addListener(
             'willFocus',
             loadProducts
         );
         return () => {
             willFocusSub.remove();
         };

     },[loadProducts]);

     useEffect(() => {
         setIsLoading(true);
      
         loadProducts().then(() => {
             setIsLoading(false);
         });
     },[dispatch]);


    const selectHandler = (id,title) => {
        props.navigation.navigate('ProductDetail',{
            productId: id,
            productTitle: title
                });

    };

  if(isLoading){
      return <View style={styles.centered}>
          <ActivityIndicator size="large" color="blue" />
      </View>
  }

  if(!isLoading && products.length === 0){
    return <View style={styles.centered}>
    <Text>No Products Found..Start Adding</Text>
</View>
  }

return (<FlatList 
    onRefresh={loadProducts}
    refreshing={isRefreshing}
    data={products} keyExtractor={item => item.id} renderItem={itemData => <ProductItem
     image={itemData.item.imageUrl}
      title={itemData.item.title} 
      price={itemData.item.price} 
      onSelect={() => { selectHandler(itemData.item.id,itemData.item.title) }} 
    
     >
         <Button title="View Details" onPress={() => {
             selectHandler(itemData.item.id,itemData.item.title);
         }}/>
            <Button title="To Cart" onPress={() => {
                dispatch(cartActions.addToCart(itemData.item));
            }}/>
     </ProductItem>}
      
      />);
};

ProductOverviewScreen.navigationOptions = (navData) => {
    return {

    headerTitle : 'All Products',
    headerLeft: () => <HeaderButtons HeaderButtonComponent = {HeaderButton}>
    <Item title='cart' iconName='md-menu' onPress={() => {
        navData.navigation.toggleDrawer();
    }}/>
     </HeaderButtons>,
    headerRight: () => <HeaderButtons HeaderButtonComponent = {HeaderButton}>
        <Item title='cart' iconName='md-cart' onPress={() => {
            navData.navigation.navigate('Cart')
        }}/>
    </HeaderButtons>
    };
    
}

const styles = StyleSheet.create({
    centered:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'

    }

});

export default ProductOverviewScreen;