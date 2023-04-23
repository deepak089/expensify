import { SafeAreaView, StyleSheet, Text, TextInput, Touchable, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import BackButton from '../component/BackButton';
import { setUserLoading } from '../redux/Slices/UserSlice';
import { addDoc, updateDoc } from 'firebase/firestore';
import { tripRef } from '../config/firebase';
import { useSelector } from 'react-redux';

const AddTripScreen = (props) => {

    const [place, setPlace] = useState('');
    const [country, setCountry] = useState('');
    const { user } = useSelector(state => state.user);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const handleAddTrip = async () => {
        if (place && country) {
            // go to home 
            setUserLoading(true);
            let doc = await addDoc(tripRef, {
                place,
                country,
                userId: user.uid
            });
            setUserLoading(false);
            if (doc && doc.id) {
                navigation.goBack();
            }
        } else {
            //show Error
            alert('Something went Wrong...!');
        }
    }

    return (
        <SafeAreaView>
            <View className="flex justify-between h-full mx-4">
                <View className="mb-20">

                    <View className="relative mt-5">
                        <View className="absolute top-0 left-0">
                            <BackButton />
                        </View>
                        <Text className="text-gray-600 font-bold text-3xl shadow-sm text-center">
                            Add Trips
                        </Text>
                    </View>

                    <View className="flex-row justify-center my-3 mt-12">
                        <Image className="h-96 w-96"
                            source={require('../assets/add.png')}
                        />
                    </View>
                </View>

                <View className="space-y-2 mx-2">
                    <Text className="text-gray-600 text-lg font-bold">
                        Where On  Earth
                    </Text>
                    <TextInput value={place} onChangeText={value => setPlace(value)} className="p-4 bg-white rounded-full mb-3" />
                    <Text className="text-gray-600 text-lg font-bold">
                        Which Country
                    </Text>
                    <TextInput value={country} onChangeText={value => setCountry(value)} className="p-4 bg-white rounded-full mb-3" />
                </View>

                <View>
                    <TouchableOpacity onPress={handleAddTrip} className="bg-[#00CCBB] my-6 rounded-full p-3 shadow-sm mx-2">
                        <Text className="text-center  text-white text-lg     font-bold">Add Trip</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AddTripScreen

const styles = StyleSheet.create({})