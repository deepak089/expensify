import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BackButton from '../component/BackButton';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';

const ForgetPasswordScreen = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');

    const handleResetPassword = async () => {
        if (email != null) {
            await sendPasswordResetEmail(auth, email).then(() => {
                alert('check ur email');
                setTimeout(() => {
                    navigation.goBack();
                }, 2000);
            }).catch((error) => {
                alert('Something went wrong...!');
            })
        } else {
            alert('Something went Wrong...!');
        }
    }
    return (
        <KeyboardAvoidingView className="pt-12">
            <View className="flex justify-between h-full mx-4">
                <View className="mb-20">

                    <View className="relative mt-5">
                        <View className="absolute top-0 left-0">
                            <BackButton />
                        </View>
                        <Text className="text-gray-600 font-bold text-3xl shadow-sm text-center">
                            Add Expense
                        </Text>
                    </View>

                    <View className="flex-row justify-center my-3 mt-12">
                        <Image className="h-96 w-96"
                            source={require('../assets/forget.png')}
                        />
                    </View>
                </View>

                <View className="space-y-2 mx-2">
                    <Text className="text-gray-600 text-lg font-bold">
                        Enter Email
                    </Text>
                    <TextInput value={email} onChangeText={value => setEmail(value)} className="p-4 bg-white rounded-full mb-3" />

                </View>

                <View>
                    <TouchableOpacity onPress={() => handleResetPassword()} className="bg-[#00CCBB] my-6 rounded-full p-3 shadow-sm mx-2">
                        <Text className="text-center text-white text-lg font-bold">Click Me</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ForgetPasswordScreen

const styles = StyleSheet.create({})