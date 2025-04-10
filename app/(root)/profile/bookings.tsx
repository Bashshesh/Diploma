import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import icons from '@/constants/icons';
import { Card } from '@/components/Cards';
import { getProperties } from '@/lib/appwrite';

const FAVORITES_KEY = '@favorites';

const Bookings = () => {
    const [favorites, setFavorites] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
                const favoriteIds = favoritesJson ? JSON.parse(favoritesJson) : [];

                if (favoriteIds.length > 0) {
                    // Получаем свойства по ID из Appwrite
                    const properties = await getProperties({
                        filter: '',
                        advancedFilter: '',
                        query: '',
                        limit: 100, // Увеличиваем лимит, чтобы получить все возможные свойства
                    });
                    const favoriteProperties = properties.filter(property =>
                        favoriteIds.includes(property.$id)
                    );
                    setFavorites(favoriteProperties);
                } else {
                    setFavorites([]);
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, []);

    const handleCardPress = (id: string) => router.push(`/properties/${id}`);

    return (
        <SafeAreaView className="bg-white h-full">
            <View className="flex-row items-center justify-between px-5 pt-4 mb-4">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="bg-white rounded-full p-2"
                >
                    <Image source={icons.backArrow} className="size-6" />
                </TouchableOpacity>
                <Text className="text-lg font-rubik-bold text-black-300">Favorite Properties</Text>
                <View className="w-6" /> {/* Spacer */}
            </View>

            {loading ? (
                <ActivityIndicator size="large" className="text-primary-300 mt-5" />
            ) : favorites.length === 0 ? (
                <Text className="text-center text-lg font-rubik-medium text-black-300 mt-5">
                    No favorite properties yet
                </Text>
            ) : (
                <FlatList
                    data={favorites}
                    renderItem={({ item }) => <Card item={item} onPress={() => handleCardPress(item.$id)} />}
                    keyExtractor={(item) => item.$id}
                    numColumns={2}
                    contentContainerClassName="pb-32"
                    columnWrapperClassName="flex gap-5 px-5"
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
};

export default Bookings;