import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

const EmptyList = ({message}) => {
  return (
    <View className="flex justify-center items-center my-5 space-y-3">
        <Image source={require('../assets/empty.png')}
        className="w-96 h-96 shadow" />
        <Text className="font-bold text-gray-400">{message || 'Data not Found...'}</Text>
    </View>
  )
}

export default EmptyList

const styles = StyleSheet.create({})