import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

const BackButton = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={navigation.goBack}
            className="rounded-full bg-white h-10 w-10 p-1">
            <ChevronLeftIcon size={28} color='#00CCBB' />
        </TouchableOpacity>
    )
}

export default BackButton;
