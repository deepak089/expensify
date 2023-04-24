import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import BackButton from '../component/BackButton';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../component/Loading';
import { setUserLoading } from '../redux/Slices/UserSlice';

const SigninScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { userLoading } = useSelector(state => state.user);

    const navigation = useNavigation();
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const handleSubmit = async () => {
        if (email && password) {
            // go to home 
            try {
                dispatch(setUserLoading(true));

                await signInWithEmailAndPassword(auth, email, password);
                dispatch(setUserLoading(false));
            } catch (error) {
                dispatch(setUserLoading(false));
                //    toast
                alert('Wrong Credentials...!');
            }
        } else {
            // toast
            alert('Something went Wrong...!');
        }
    }

    return (
        <SafeAreaView >
            <KeyboardAvoidingView className="flex justify-between h-full mx-4">
                <View className="flex justify-between h-full mx-4">
                    <View className="mb-20">
                        <View className="relative mt-5">
                            <View className="absolute top-0 left-0">
                                <BackButton />
                            </View>
                            <Text className="text-gray-600 font-bold text-3xl shadow-sm text-center">
                                Signin
                            </Text>
                        </View>

                        <View className="flex-row justify-center my-3 mt-20">
                            <Image className="h-48 w-96"
                                source={require('../assets/login.png')}
                            />
                        </View>
                    </View>

                    <View className="space-y-2 mx-2">
                        <Text className="text-gray-600 text-lg font-bold">
                            Email
                        </Text>
                        <TextInput value={email} onChangeText={value => setEmail(value)} className="p-4 bg-white rounded-full mb-3" />
                        <Text className="text-gray-600 text-lg font-bold">
                            Password
                        </Text>
                        <TextInput value={password} secureTextEntry onChangeText={value => setPassword(value)} className="p-4 bg-white rounded-full mb-3" />
                        <TouchableOpacity onPress={() => navigation.navigate('forget')} className="flex-row justify-end">
                            <Text className="text-gray-600 text-lg font-bold">Forget Password?</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        {
                            userLoading ? (<Loading />)
                                :
                                (
                                    <TouchableOpacity onPress={handleSubmit} className="bg-[#00CCBB] my-6 rounded-full p-3 shadow-sm mx-2">
                                        <Text className="text-center text-white text-lg font-bold">SignIn</Text>
                                    </TouchableOpacity>
                                )
                        }

                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SigninScreen

const styles = StyleSheet.create({})