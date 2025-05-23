import {Text, View, Image, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, Button} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppWrite";
import { getPropertyById } from "@/lib/appwrite";
import icons from "@/constants/icons";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { facilities } from "@/constants/data";
import { useTranslation } from 'react-i18next';
import { useFavorite } from '@/lib/useFavorite';
import {useGlobalContext} from "@/lib/global-provider";


export default function PropertyDetails() {
    const { t } = useTranslation();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { user } = useGlobalContext();
    const { data: property, loading, refetch, error } = useAppwrite({
        fn: getPropertyById,
        params: { id },
    });
    const { isFavorite, toggleFavorite } = useFavorite(id || '');

    useEffect(() => {
        if (id) {
            refetch({ id });
        }
    }, [id]);

    if (loading) {
        return (
            <SafeAreaView className="bg-white h-full">
                <ActivityIndicator size="large" className="text-primary-300 mt-5" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView className="bg-white h-full">
                <Text className="text-center text-lg font-rubik-medium text-black-300 mt-5">
                    {t('errorLoadingProperty', { message: error.message })}
                </Text>
            </SafeAreaView>
        );
    }

    if (!property) {
        return (
            <SafeAreaView className="bg-white h-full">
                <Text className="text-center text-lg font-rubik-medium text-black-300 mt-5">
                    {t('propertyNotFound')}
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="bg-white h-full" edges={['right', 'left', 'bottom']}>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <View className="relative">
                    <Image
                        source={{ uri: property.image || "https://via.placeholder.com/400" }}
                        className="w-full h-96 size-full"
                        resizeMode="cover"
                    />
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="absolute top-5 left-5 bg-white rounded-full p-2 mt-10"
                    >
                        <Image source={icons.backArrow} className="size-6" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={toggleFavorite}
                        className="absolute top-5 right-5 bg-white rounded-full p-2 mt-10"
                    >
                        <Image
                            source={icons.heart}
                            className="size-6"
                            tintColor={isFavorite ? '#FF0000' : '#191d31'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity className="absolute top-5 right-16 bg-white rounded-full p-2 mt-10">
                        <Image source={icons.send} className="size-6" />
                    </TouchableOpacity>
                </View>

                <View className="px-5 mt-5">
                    <Text className="text-2xl font-rubik-bold text-black-300">{property.name || t('propertyName')}</Text>
                    <Text className="text-sm font-rubik text-black-100">{t('apartment')}</Text>
                    <View className="flex flex-row items-center mt-2">
                        <Image source={icons.star} className="size-5 mr-1" />
                        <Text className="text-sm font-rubik-medium text-black-300">
                            {property.rating || 0} (
                            {property.reviewsCount || (Array.isArray(property.reviews) ? property.reviews.length : property.reviews ? 1 : 0)} {t('reviews')})
                        </Text>
                    </View>
                    <View className="flex flex-row items-center mt-3">
                        <View className="flex flex-row items-center mr-5">
                            <Image source={icons.bed} className="size-5 mr-1" />
                            <Text className="text-sm font-rubik text-black-300">{property.bedrooms || 0} {t('beds')}</Text>
                        </View>
                        <View className="flex flex-row items-center mr-5">
                            <Image source={icons.bath} className="size-5 mr-1" />
                            <Text className="text-sm font-rubik text-black-300">{property.bathrooms || 0} {t('bath')}</Text>
                        </View>
                        <View className="flex flex-row items-center">
                            <Image source={icons.area} className="size-5 mr-1" />
                            <Text className="text-sm font-rubik text-black-300">{property.area || 0} {t('sqft')}</Text>
                        </View>
                    </View>
                </View>

                <View className="px-5 mt-5">
                    <Text className="text-lg font-rubik-bold text-black-300">{t('agent')}</Text>
                    <View className="flex flex-row items-center mt-3">
                        <Image
                            source={{ uri: property.agent?.avatar || "https://via.placeholder.com/50" }}
                            className="size-12 rounded-full"
                        />
                        <View className="ml-3 flex-1">
                            <Text className="text-base font-rubik-medium text-black-300">
                                {property.agent?.name || t('unknownAgent')}
                            </Text>
                            <Text className="text-sm font-rubik text-black-100">
                                {property.agent?.email || t('noEmail')}
                            </Text>
                        </View>
                        <TouchableOpacity className="bg-primary-100 rounded-full p-2">
                            <Image source={icons.chat} className="size-6" />
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-primary-100 rounded-full p-2 ml-2">
                            <Image source={icons.phone} className="size-6" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="px-5 mt-5">
                    <Text className="text-lg font-rubik-bold text-black-300">{t('overview')}</Text>
                    <Text className="text-sm font-rubik text-black-100 mt-2">{property.description || t('noDescription')}</Text>
                </View>

                <View className="px-5 mt-5">
                    <Text className="text-lg font-rubik-bold text-black-300">{t('facilities')}</Text>
                    <View className="flex flex-row flex-wrap mt-3">
                        {property.facilities && property.facilities.length > 0 ? (
                            facilities
                                .filter((facility) => property.facilities.includes(facility.title))
                                .map((facility, index) => (
                                    <View key={index} className="flex flex-row items-center w-1/2 mb-3">
                                        <Image source={facility.icon} className="size-6 mr-2" />
                                        <Text className="text-sm font-rubik text-black-300">{facility.title}</Text>
                                    </View>
                                ))
                        ) : (
                            <Text className="text-sm font-rubik text-black-100">{t('noFacilities')}</Text>
                        )}
                    </View>
                </View>

                <View className="px-5 mt-5">
                    <Text className="text-lg font-rubik-bold text-black-300">{t('gallery')}</Text>
                    {property.galleries && property.galleries.length > 0 ? (
                        <FlatList
                            data={property.galleries}
                            renderItem={({ item }) => (
                                <Image source={{ uri: item }} className="w-20 h-20 rounded-lg mr-3" resizeMode="cover" />
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerClassName="mt-3"
                        />
                    ) : (
                        <Text className="text-sm font-rubik text-black-100 mt-3">{t('noGallery')}</Text>
                    )}
                </View>

                <View className="px-5 mt-5">
                    <Text className="text-lg font-rubik-bold text-black-300">{t('location')}</Text>
                    <View className="flex flex-row items-center mt-3">
                        <Image source={icons.location} className="size-5 mr-2" />
                        <Text className="text-sm font-rubik text-black-300">{property.location || t('noLocation')}</Text>
                    </View>
                    <Image
                        source={{ uri: property.mapImage || "https://via.placeholder.com/300" }}
                        className="w-full h-40 mt-3 rounded-lg"
                        resizeMode="cover"
                    />
                </View>

                <View className="px-5 mt-5">
                    <View className="flex flex-row items-center justify-between">
                        <View className="flex flex-row items-center">
                            <Image source={icons.star} className="size-5 mr-1" />
                            <Text className="text-sm font-rubik-medium text-black-300">
                                {property.rating || 0} (
                                {property.reviewsCount || (Array.isArray(property.reviews) ? property.reviews.length : property.reviews ? 1 : 0)} {t('reviews')})
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <Text className="text-sm font-rubik-bold text-primary-300">{t('seeAll')}</Text>
                        </TouchableOpacity>
                    </View>

                    {property.reviews && property.reviews.length > 0 ? (
                        <FlatList
                            data={property.reviews}
                            renderItem={({ item }) => (
                                <View className="mt-3 bg-gray-50 p-3 rounded-lg">
                                    <View className="flex flex-row items-center">
                                        <Image
                                            source={{ uri: item.avatar || "https://via.placeholder.com/40" }}
                                            className="size-10 rounded-full"
                                        />
                                        <View className="ml-3 flex-1">
                                            <View className="flex flex-row items-center justify-between">
                                                <Text className="text-sm font-rubik-medium text-black-300">
                                                    {item.name || t('anonymous')}
                                                </Text>
                                                <View className="flex flex-row items-center">
                                                    <Image source={icons.star} className="size-4 mr-1" />
                                                    <Text className="text-xs font-rubik text-black-300">{item.rating || 0}</Text>
                                                </View>
                                            </View>
                                            <Text className="text-xs font-rubik text-black-100 mt-1">
                                                {item.review || t('noReviewText')}
                                            </Text>
                                            <Text className="text-xs font-rubik text-black-100 mt-1">
                                                {item.$createdAt
                                                    ? new Date(item.$createdAt).toLocaleDateString()
                                                    : t('noDate')}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            )}
                            keyExtractor={(item) => item.$id}
                            showsVerticalScrollIndicator={false}
                        />
                    ) : (
                        <Text className="text-sm font-rubik text-black-100 mt-3">{t('noReviews')}</Text>
                    )}
                </View>

                <View className="px-5 mt-5 mb-10">
                    <View className="flex flex-row items-center justify-between">
                        <Text className="text-xl font-rubik-bold text-black-300">${property.price || 0}</Text>
                        <TouchableOpacity
                            className="bg-primary-300 rounded-full px-5 py-3"
                            onPress={() => {
                                router.push(`payment/payment?id=${property.$id}`);
                            }}
                        >
                            <Text className="text-base font-rubik-medium text-white">{t('bookingNow')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ padding: 20 }}>
                    <TouchableOpacity
                        className="bg-primary-300 rounded-full px-5 py-3 items-center justify-center"
                        onPress={() => {
                            console.log("property.agent:", property.agent);
                            console.log("agentId being passed:", property.agent?.userId);
                            router.push({
                                pathname: `/chat/${property.$id}`,
                                params: {
                                    chatId: `${property.agent.$id}-${user.$id}`, // можно сгенерировать chatId
                                    propertyId: property.$id,
                                    agentId: property.agent?.userId,
                                },
                            });
                        }}
                        disabled={!property.agent}
                    >
                        <Text className="text-base font-rubik-medium text-white">
                            {property.agent.$id}
                            {t('textwithagent')}
                        </Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}