import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface Props {
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    onPress?: () => void;
}

const SearchBar = ({ onPress, placeholder, value, onChangeText }: Props) => {
    if (onPress) {
        return (
            <TouchableOpacity
                onPress={onPress}
                className="flex-row items-center bg-dark-200 rounded-full px-5 py-4"
            >
                <Image
                    source={icons.search}
                    className="w-5 h-5"
                    resizeMode="contain"
                    tintColor="#AB8BFF"
                />
                <Text className="flex-1 ml-2 text-white">
                    {placeholder}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
            <Image
                source={icons.search}
                className="w-5 h-5"
                resizeMode="contain"
                tintColor="#AB8BFF"
            />
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                className="flex-1 ml-2 text-white"
                placeholderTextColor="#A8B5DB"
            />
        </View>
    )
}

export default SearchBar