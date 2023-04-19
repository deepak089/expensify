import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddTripScreen from '../screens/AddTripScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import TripExpenseScreen from '../screens/TripExpenseScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SigninScreen from '../screens/SigninScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import SignupScreen from '../screens/SignupScreen';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import {setUser} from '../redux/Slices/UserSlice';

const Stack = createNativeStackNavigator();

const Navigation = () => {


    const { user } = useSelector(state => state.user);

    const dispatch = useDispatch();

    onAuthStateChanged(auth, u =>{
        console.log(u)
        dispatch(setUser(u));
    })
    if (user) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='WelcomeScreen'>
                    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="AddTrip" component={AddTripScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="AddExpense" component={AddExpenseScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="TripExpense" component={TripExpenseScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='WelcomeScreen'>
                    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="signin" component={SigninScreen} options={{ headerShown: false, presentation: 'modal' }} />
                    <Stack.Screen name="signup" component={SignupScreen} options={{ headerShown: false, presentation: 'modal' }} />
                    <Stack.Screen name="forget" component={ForgetPasswordScreen} options={{ headerShown: false, presentation: 'modal' }} />
                   </Stack.Navigator>
            </NavigationContainer>
        )
    }

}

export default Navigation

const styles = StyleSheet.create({})