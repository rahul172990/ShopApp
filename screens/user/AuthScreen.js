import React, { useReducer, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {Text,View,Button,ScrollView,KeyboardAvoidingView,StyleSheet, ShadowPropTypesIOS} from 'react-native';
import Input from '../../components/UI/Input';
import {LinearGradient} from 'expo-linear-gradient';
import * as authActions from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues
      };
    }
    return state;
  };


const AuthScreen = (props) => {

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
        email: '',
        password: ''
      },
      inputValidities: {
        email: false,
        password: false
      },
      formIsValid: false
    });
  
    const signupHandler = () => {
      dispatch(
        authActions.signup(
          formState.inputValues.email,
          formState.inputValues.password
        )
      );
    };
  
    const signinHandler = () => {
        dispatch(
          authActions.signin(
            formState.inputValues.email,
            formState.inputValues.password
          )
        );
        props.navigation.navigate("Shop");
      };


    const inputChangeHandler = useCallback(
      (inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
          type: FORM_INPUT_UPDATE,
          value: inputValue,
          isValid: inputValidity,
          input: inputIdentifier
        });
      },
      [dispatchFormState]
    );
  



    return (
      
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={10} style={styles.screen}>
            <LinearGradient colors={['#12c2e9', '#c471ed', '#f64f59']} style = {styles.bg}>
            <View style={styles.auth}>
                <ScrollView>
                <Input id="email"
                label = "E-mail"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorText="Please enter valid email"
                onInputChange={inputChangeHandler}
                initialValue=""
                
                
                />
                <Input id="password"
                label = "Password"
                keyboardType="default"
                secureTextEntry
                required
                minLength={5}
                autoCapitalize="none"
                errorText="Please enter right password"
                onInputChange={inputChangeHandler}
                initialValue=""
                
                
                />

                <View style={styles.btn}>
                    <Button   title="Login" onPress={signinHandler}/>
                </View>
                <View style={styles.btn}>
                <Button  title="Sign up" onPress={signupHandler}/>
                </View>
            </ScrollView>
            </View>

            </LinearGradient>
        </KeyboardAvoidingView>

    );

        
    

};

const styles = StyleSheet.create({

    screen:{
        flex:1,

    },
    auth:{
        width:'80%',
        maxHeight:400,
        shadowColor:'black',
        elevation:10,
        backgroundColor:'white',
        padding:20,
        borderRadius:10,
        

    },
    btn:{
        marginTop:15,
       
    
        
    },
    bg:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
  
    
});


AuthScreen.navigationOptions = {
    headerTitle:'Authentication'

}

export default AuthScreen;