import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native';
import EmptyList from '../component/EmptyList';
import BackButton from '../component/BackButton';
import ExpenseCard from '../component/ExpenseCard';
import { expenseRef } from '../config/firebase';
import { getDocs, query, where } from 'firebase/firestore';

const TripExpenseScreen = (props) => {
    const { id, place, country } = props.route.params;
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [expense, setExpense] = useState();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const fetchExpense = async () => {
        const q = query(expenseRef, where('tripId', '==', id));
        const querySnapshot = await getDocs(q);
        let dataArray = [];
        querySnapshot.forEach(doc => {
            dataArray.push({ ...doc.data(), id: doc.id });
        })
        setExpense(dataArray);
    }

    useEffect(() => {
        if (isFocused)
            fetchExpense();
    }, [isFocused]);

    return (
        <SafeAreaView className='pt-16'>
            <View className="relative mt-5 mx-4">
                <View className="absolute top-2 left-0">
                    <BackButton />
                </View>
                <View>
                    <Text className="text-gray-600 font-bold text-3xl shadow-sm text-center">
                        {place}
                    </Text>
                    <Text className="text-gray-600 font-bold text-xs shadow-sm text-center">
                        {country}
                    </Text>
                </View>

            </View>
            <View className="flex-row justify-center items-center  rounded-xl mx-4 mb-4 mt-10">
                <Image source={require('../assets/add.png')}
                    className="w-80 h-80 mt-2" />
            </View>
            <View className="px-4 space-y-3">
                <View className="flex-row justify-between items-center">
                    <Text className="text-gray-600 font-bold text-xl">Expenses</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddExpense', { id, place, country })}
                        className="p-2 px-3 bg-white border border-gray-200 rounded-full">
                        <Text className="text-gary-600">Add Expense</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 600 }}>
                    <FlatList
                        data={expense}
                        keyExtractor={item => item.id}
                        ListEmptyComponent={<EmptyList message={'you haven"t recorded any expense yet!!!'} />}
                        className="mx-1"
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            let bgColor;
                            
                            if (item.category === 'food') {
                                bgColor = '[#ccf9d5]';
                            } else if (item.category === 'shopping') {
                                bgColor = '[#e9ac73]';
                            } else if (item.category === 'entertainment') {
                                bgColor = '[#97e0f2]';
                            } else if (item.category === 'commute') {
                                bgColor = '[#e7e89b]';
                            } else if (item.category === 'other') {
                                bgColor = '[#9583e8]';
                            }
                            return (
                                <ExpenseCard item={item} bgColor={bgColor} />
                            )
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default TripExpenseScreen;