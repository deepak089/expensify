import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View className="h-full flex justify-around">
        <View className="flex-row justify-center mt-10">
          <Image  
           source={require('../assets/welcome.png')}
           className="w-96 h-96"
          />
        </View>
        <View className="mx-5 mb-20">
          <Text className={`text-center font-bold text-4xl text-gray-600 mb-10`}>Expensify</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('signin')}
            className="shadow p-3 rounded-full mb-5 bg-[#00CCBB]">
            <Text className="text-center text-white text-lg font-bold">Sign in </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('signup')}
            className="shadow p-3 rounded-full mb-5 bg-[#00CCBB]">
            <Text className="text-center text-white text-lg font-bold">Sign Up </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({})