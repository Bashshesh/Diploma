import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import icons from '@/constants/icons';
import { Image } from 'react-native';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
];

const Language = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = async (lng: string) => {
        try {
            await i18n.changeLanguage(lng); // Смена языка
            await AsyncStorage.setItem('language', lng); // Сохранение выбора
            router.back(); // Возврат на страницу профиля
        } catch (error) {
            console.error('Error changing language:', error);
        }
    };

    return (
        <SafeAreaView className="h-full bg-white">
            <View className="flex-row items-center justify-between px-5 pt-4 mb-4">
                <TouchableOpacity onPress={() => router.back()} className="bg-white rounded-full p-2">
                    <Image source={icons.backArrow} className="size-6" />
                </TouchableOpacity>
                <Text className="text-lg font-rubik-bold text-black-300">{t('language')}</Text>
                <View className="w-6" /> {/* Spacer */}
            </View>

            <FlatList
                data={languages}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => changeLanguage(item.code)}
                        className="flex-row items-center justify-between px-5 py-3 border-b border-gray-200"
                    >
                        <Text className="text-lg font-rubik-medium text-black-300">{item.name}</Text>
                        {i18n.language === item.code && (
                            <Image source={icons.check} className="size-5" /> // Предполагается иконка галочки
                        )}
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.code}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

export default Language;