import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import icons from '@/constants/icons';
import { useTranslation } from 'react-i18next';

const TabIcon = ({ focused, icon, title }: { focused: boolean; icon: any; title: string }) => {
    const { t } = useTranslation(); // Добавляем хук для перевода
    return (
        <View className="flex-1 mt-3 flex flex-col items-center">
            <Image
                source={icon}
                tintColor={focused ? '#0061ff' : '#666876'}
                resizeMode="contain"
                className="size-6"
            />
            <Text
                className={`${focused ? 'text-primary-300 font-rubik-medium' : 'text-black-200 font-rubik'} text-xs w-full text-center mt-1`}
            >
                {t(title)} {/* Переводим title */}
            </Text>
        </View>
    );
};

const TabsLayout = () => {
    const { t } = useTranslation(); // Хук для перевода в основном компоненте

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'white',
                    position: 'absolute',
                    borderTopColor: '#0061FF1A',
                    borderTopWidth: 1,
                    minHeight: 70,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: t('home'), // Переводим заголовок
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.home} title="home" />
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: t('explore'), // Переводим заголовок
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.search} title="explore" />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: t('profile'), // Переводим заголовок
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.person} title="profile" />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;