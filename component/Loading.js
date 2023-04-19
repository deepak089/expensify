import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View className="flex-row justify-center py-8">
        <ActivityIndicator size="large" color='#00ccbb'/>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})