import { Image, Text, View } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'

const Index = () => {
    return (
        <View className='flex-1 bg-primary'>
            <Image
                source={images.bg}
                className="absolute w-full z-0"
                resizeMode="cover"
            />
        </View>
    )
}

export default Index
