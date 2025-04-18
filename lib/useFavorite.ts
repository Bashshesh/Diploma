import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@favorites';

export const useFavorite = (propertyId: string) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const loadFavoriteStatus = async () => {
            try {
                const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
                const favoritesArray = favorites ? JSON.parse(favorites) : [];
                setIsFavorite(favoritesArray.includes(propertyId));
            } catch (error) {
                console.error('Error loading favorites:', error);
            }
        };
        loadFavoriteStatus();
    }, [propertyId]);

    const toggleFavorite = async () => {
        try {
            const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
            let favoritesArray = favorites ? JSON.parse(favorites) : [];
            if (isFavorite) {
                favoritesArray = favoritesArray.filter((id: string) => id !== propertyId);
            } else {
                favoritesArray.push(propertyId);
            }
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritesArray));
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    return { isFavorite, toggleFavorite };
};