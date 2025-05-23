import { View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '@/constants/icons';
import { settings } from '@/constants/data';
import { useGlobalContext } from '@/lib/global-provider';
import { logout } from '@/lib/appwrite';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import UserAvatar from "@/components/UserAvatar";
import { verifyAgentRole } from "../admin/admin-logic";

interface SettingsItemProps {
    icon: ImageSourcePropType;
    title: string;
    onPress?: () => void;
    textStyle?: string;
    showArrow?: boolean;
}

const SettingItems = ({ icon, title, onPress, textStyle, showArrow = true }: SettingsItemProps) => {
    const { t } = useTranslation();
    return (
        <TouchableOpacity onPress={onPress} className="flex flex-row items-center justify-between py-3">
            <View className="flex flex-row items-center gap-3">
                <Image source={icon} className="size-6" />
                <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>{t(title)}</Text>
            </View>
            {showArrow && <Image source={icons.rightArrow} className="size-5" />}
        </TouchableOpacity>
    );
};

const Profile = () => {
    const { user, refetch } = useGlobalContext();
    const { t } = useTranslation();
    const [isAgent, setIsAgent] = useState(false);

    useEffect(() => {
        console.log("User ID:", user?.$id); // Выводит $id пользователя
        const checkAgent = async () => {
            if (user && user.$id) {
                const agentStatus = await verifyAgentRole(user.$id);
                setIsAgent(agentStatus);
            }
        };
        checkAgent();
    }, [user]);

    // Проверка роли риелтора
    useEffect(() => {
        const checkAgent = async () => {
            if (user && user.$id) {
                const agentStatus = await verifyAgentRole(user.$id);
                setIsAgent(agentStatus);
            }
        };
        checkAgent();
    }, [user]);

    const handleLogout = async () => {
        try {
            const result = await logout();
            if (result) {
                Alert.alert(t('success'), t('loggedOut'));
                refetch();
            } else {
                Alert.alert(t('error'), t('failedToLogout'));
            }
        } catch (error: any) {
            Alert.alert(t('error'), t('failedToLogout'));
        }
    };

    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView showsHorizontalScrollIndicator={false} contentContainerClassName="pb-32 px-7">
                <View className="flex flex-row items-center justify-between mt-5">
                    <Text className="text-xl font-rubik-bold">{t('profile')}</Text>
                    <TouchableOpacity onPress={() => router.push('/(root)/profile/notifications')}>
                        <Image source={icons.bell} className="size-5" />
                    </TouchableOpacity>
                </View>

                <View className="flex-row justify-center flex mt-5">
                    <UserAvatar size={44} textSize="text-2xl" />
                </View>

                <View className="flex flex-col mt-10">
                    <SettingItems
                        onPress={() => router.push('/(root)/profile/bookings')}
                        icon={icons.calendar}
                        title="myBookings"
                    />
                    <SettingItems icon={icons.wallet} title="payments" />
                    {isAgent && (
                        <SettingItems
                            icon={icons.edit}
                            title="adminPanel"
                            onPress={() => router.push('/(root)/admin')}
                        />
                        )
                    }
                        </View>

                        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
                        <SettingItems
                        icon={icons.language}
                      title="language"
                      onPress={() => router.push('/(root)/profile/language')}
                />
                <SettingItems
                    icon={icons.bell}
                    title="notifications"
                    onPress={() => router.push('/(root)/profile/notifications')}
                />
                {settings.slice(3).map((item, index) => (
                    <SettingItems key={index} {...item} />
                ))}
            </View>

            <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
                <SettingItems
                    icon={icons.logout}
                    title="logout"
                    textStyle="text-danger"
                    showArrow={false}
                    onPress={handleLogout}
                />
            </View>
        </ScrollView>
</SafeAreaView>
    )
};

export default Profile;