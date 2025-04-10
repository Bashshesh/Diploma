import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '@/constants/icons';
import { useGlobalContext } from '@/lib/global-provider';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

const Notifications = () => {
    const { t } = useTranslation();
    const { errors, clearErrors } = useGlobalContext();

    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-32 px-5">
                <View className="flex flex-row items-center justify-between mt-5">
                    <TouchableOpacity onPress={() => router.push("/profile")}>
                        <Image source={icons.backArrow} className="size-7" />
                    </TouchableOpacity>
                    <Text className="text-xl font-rubik-bold text-black-300">{t('notifications')}</Text>
                    <TouchableOpacity onPress={clearErrors} disabled={errors.length === 0}>
                        <Text
                            className={`text-sm font-rubik ${
                                errors.length > 0 ? 'text-primary-300' : 'text-gray-400'
                            }`}
                        >
                            {t('clear')}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="mt-5">
                    {errors.length > 0 ? (
                        errors.map((error, index) => (
                            <View
                                key={index}
                                className="flex flex-row items-center bg-red-100 p-3 rounded-lg mb-3"
                            >
                                <Image source={icons.warning} className="size-6 mr-3" tintColor="#FF0000" />
                                <Text className="text-sm font-rubik text-black-300 flex-1">{error}</Text>
                            </View>
                        ))
                    ) : (
                        <Text className="text-sm font-rubik text-black-100 text-center mt-5">
                            {t('noNotifications')}
                        </Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Notifications;