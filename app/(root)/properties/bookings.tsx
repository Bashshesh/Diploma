import {View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import {router} from "expo-router";
import icons from "@/constants/icons";

const Bookings = () => {
    return (
        <View>
            <Text>Bookings</Text>
            <TouchableOpacity
                onPress={() => router.back()}
                className="absolute top-5 left-5 bg-white rounded-full p-2 mt-10"
            >
                <Image source={icons.backArrow} className="size-6" />
            </TouchableOpacity>
        </View>
    )
}
export default Bookings
