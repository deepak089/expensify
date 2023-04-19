import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const ExpenseCard = ({ item ,bgColor}) => {
  return (
    <View  className={`bg-${bgColor} flex-row justify-between items-center p-3 px-5 mb-5 rounded-2xl`}>

      <View>
        <Text className="text-gray-600 font-bold">{item.title}</Text>
        <Text className="text-gray-600 text-xs">{item.category}</Text>
      </View>
      <View>
        <Text>${item.amount}</Text>
      </View>
    </View>
  )
}

export default ExpenseCard

const styles = StyleSheet.create({})