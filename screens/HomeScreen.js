import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native';
import { randomImage } from '../assets/images/RandomImage';
import EmptyList from '../component/EmptyList';
import { signOut } from 'firebase/auth';
import { auth, tripRef } from '../config/firebase';
import { useSelector } from 'react-redux';
import { deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { EllipsisVerticalIcon } from 'react-native-heroicons/outline';

const HomeScreen = () => {
    const navigation = useNavigation();

    const { user } = useSelector(state => state.user);
    const [trips, setTrips] = useState();
    const [visible,setVisible]=useState(null);

    const isFocused = useIsFocused();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, []);

    const fetchTrips = async () => {
        const q = query(tripRef, where('userId', '==', user.uid));
        console.log(user.uid);
        const querySnapshot = await getDocs(q);
        let dataArray = [];
        querySnapshot.forEach(doc => {
            dataArray.push({ ...doc.data(), id: doc.id });
        })
        setTrips(dataArray)
    }

    useEffect(() => {
        if (isFocused)
            fetchTrips();
    }, [isFocused]);

    const handleLogout = async () => {
        await signOut(auth);
    }

    return (
        <SafeAreaView className='pt-16'>
            <View className="flex-row pb-3 justify-between items-center mx-4 space-x-2 px-4">
                <Text className='text-gray-600 font-bold text-3xl shadow-sm'>
                    Expensify
                </Text>

                <TouchableOpacity
                    onPress={handleLogout}
                    className="p-2 px-3 bg-white border border-gray-200 rounded-full">
                    <Text className="text-gray-600">Logout</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4">
                <Image source={require('../assets/banner.png')}
                    className="w-60 h-60" />
            </View>
            <View className="px-4 space-y-3">
                <View className="flex-row justify-between items-center">
                    <Text className="text-gray-600 font-bold text-xl">Recent Trips</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddTrip')}
                        className="p-2 px-3 bg-white border border-gray-200 rounded-full">
                        <Text className="text-gary-600">Add Trip</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 600 }}>
                    <FlatList
                        data={trips}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        ListEmptyComponent={<EmptyList message={'you have to see... Add first'} />}
                        columnWrapperStyle={{
                            justifyContent: 'space-between'
                        }}
                        className="mx-1"
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item,index }) => {
                            return (
                                <View className="bg-white p-3 rounded-2xl mb-3 shadow-sm relative">
                                    <TouchableOpacity onPress={() => setVisible(visible => visible===index ? null : index)} className="mb-2 absolute p-2 w-10 h-10  right-2 top-2 z-50">
                                        <EllipsisVerticalIcon size={20} color='gray' />
                                    </TouchableOpacity>
                                    <View 
                                     className={visible === index ? 'bg-gray-100 rounded-2xl mb-3 shadow-sm w-32 h-24 absolute right-4 top-12 p-3 px-4 z-50':'hidden'}>
                                        <Text               
                                         onPress={()=> alert('Something Went Wrong')}                                         
                                         className="text-gray-600 text-lg mb-4 pb-2 border-b-2 border-gray-300">
                                            Edit
                                        </Text>
                                        <Text 
                                         onPress={()=> alert('Something Went Wrong')}
                                        className="text-gray-600 text-lg">
                                            Delete
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('TripExpense', { ...item })}
                                    >
                                        <View className="mt-8">
                                            <Image source={randomImage()} className='w-48 h-36 mb-2' />
                                            <Text className="text-gray-600 font-bold">{item.place}</Text>
                                            <Text className="text-gray-600 text-xs">{item.country}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;