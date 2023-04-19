import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import BackButton from '../component/BackButton';
import {auth} from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const SignupScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const handleSubmit = async () => {
        if (email && password) {
            // go to home 
            // navigation.navigate('Home');
            await createUserWithEmailAndPassword(auth,email,password)
            
        } else {
            //show Error
            alert('Something went wrong...!');
        }
    }
    return (
        <SafeAreaView className="pt-12">
            <KeyboardAvoidingView className="flex justify-between h-full mx-4">
                <View className="mb-20">

                    <View className="relative mt-5">
                        <View className="absolute top-0 left-0">
                            <BackButton />
                        </View>
                        <Text className="text-gray-600 font-bold text-3xl shadow-sm text-center">
                            Signin
                        </Text>
                    </View>

                    <View className="flex-row justify-center my-3 mt-12">
                        <Image className="h-96 w-96"
                            source={require('../assets/signup.png')}
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

                </View>

                <View>
                    <TouchableOpacity onPress={handleSubmit} className="bg-[#00CCBB] my-6 rounded-full p-3 shadow-sm mx-2">
                        <Text className="text-center text-white text-lg font-bold">SignUp</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SignupScreen

const styles = StyleSheet.create({})