import { SafeAreaView, StyleSheet, Text, TextInput, Touchable, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import BackButton from '../component/BackButton';
import { categories } from '../constants/categories';
import { useDispatch, useSelector } from 'react-redux';
import { addDoc } from 'firebase/firestore';
import { expenseRef } from '../config/firebase';

const AddExpenseScreen = (props) => {

  const { id } = props.route.params;
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setcategory] = useState('');
  const [Loading, setLoading] = useState(false);


  const navigation = useNavigation();
  const { user } = useSelector(state => state.user);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  const handleAddExpense = async () => {
    if (title && amount && category) {
      // go to home 
      setLoading(true);
      let doc = await addDoc(expenseRef, {
        title,
        amount,
        category,
        tripId: id
      });
      setLoading(false);
      if (doc && doc.id) {
        navigation.goBack();
      }
    } else {
      //show Error
      console.log('error');
    }
  }
  return (
    <SafeAreaView className="pt-16">
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
              source={require('../assets/expense.png')}
            />
          </View>
        </View>

        <View className="space-y-2 mx-2">
          <Text className="text-gray-600 text-lg font-bold">
            For What?
          </Text>
          <TextInput value={title} onChangeText={value => setTitle(value)} className="p-4 bg-white rounded-full mb-3" />
          <Text className="text-gray-600 text-lg font-bold">
            How Much
          </Text>

          <TextInput value={amount} onChangeText={value => setAmount(value)} className="p-4 bg-white rounded-full mb-3" />
          <View className="mx-2 space-x-2">
            <Text className="text-lg font-bold">Category</Text>
            <View className="flex-row flex-wrap items-center">
              {
                categories.map((cat) => {
                  let bgColor = 'bg-white';
                  if (cat.value === category) { bgColor = 'bg-green-200' };

                  return (<TouchableOpacity
                    onPress={() => setcategory(cat.value)}
                    key={cat.value}
                    className={`rounded-full ${bgColor} px-4 p-3 mb-2 mr-2`} >
                    <Text>{cat.title}</Text>
                  </TouchableOpacity>)
                })
              }
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity onPress={handleAddExpense} className="bg-[#00CCBB] my-6 rounded-full p-3 shadow-sm mx-2">
            <Text className="text-center text-white text-lg font-bold">Add Expense</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AddExpenseScreen

const styles = StyleSheet.create({})