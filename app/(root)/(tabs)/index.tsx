import { Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '@/constants/icons';
import Search from '@/components/Search';
import { Card, FeaturedCard } from '@/components/Cards';
import Filters from '@/components/Filters';
import { useGlobalContext } from '@/lib/global-provider';
import { useAppwrite } from '@/lib/useAppWrite';
import { getLatestProperties, getProperties } from '@/lib/appwrite';
import { useEffect } from 'react';
import NoResults from '@/components/NoResults';
import { useTranslation } from 'react-i18next';

export default function Index() {
    const { user } = useGlobalContext();
    const { t } = useTranslation(); // Добавляем хук перевода
    const params = useLocalSearchParams<{ query?: string; filter?: string; advancedFilter?: string }>();

    const { data: latestProperties, loading: LatestPropertiesLoading } = useAppwrite({
        fn: getLatestProperties,
    });

    const { data: properties, loading, refetch } = useAppwrite({
        fn: getProperties,
        params: {
            filter: params.filter || '',
            advancedFilter: params.advancedFilter,
            query: params.query || '',
            limit: 6,
        },
        skip: true,
    });

    const handleCardPress = (id: string) => router.push(`/properties/${id}`);

    useEffect(() => {
        refetch({
            filter: params.filter || '',
            advancedFilter: params.advancedFilter,
            query: params.query || '',
            limit: 6,
        });
    }, [params.filter, params.query, params.advancedFilter]);

    return (
        <SafeAreaView className="bg-white h-full">
            <FlatList
                data={properties}
                renderItem={({ item }) => <Card item={item} onPress={() => handleCardPress(item.$id)} />}
                keyExtractor={(item) => item.$id}
                numColumns={2}
                contentContainerClassName="pb-32"
                columnWrapperClassName="flex gap-5 px-5"
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    loading ? <ActivityIndicator size="large" className="text-primary-300 mt-5" /> : <NoResults />
                }
                ListHeaderComponent={
                    <View className="px-5">
                        <View className="flex flex-row items-center justify-between mt-5">
                            <View className="flex flex-row items-center">
                                <Image source={{ uri: user?.avatar }} className="size-12 rounded-full" />
                                <View className="flex flex-col items-start ml-2 justify-center">
                                    <Text className="text-xs font-rubik text-black-100">{t('privet')}</Text>
                                    <Text className="text-base font-rubik-medium text-black-300">{user?.name}</Text>
                                </View>
                            </View>
                            <Image source={icons.bell} className="size-6" />
                        </View>
                        <Search />
                        <View className="my-5">
                            <View className="flex flex-row items-center justify-between">
                                <Text className="text-xl font-rubik-bold text-black-300">{t('featured')}</Text>
                                <TouchableOpacity onPress={() => router.push('/(root)/(tabs)/explore')}>
                                    <Text className="text-base font-rubik-bold text-primary-300">{t('seeAll')}</Text>
                                </TouchableOpacity>
                            </View>

                            {LatestPropertiesLoading ? (
                                <ActivityIndicator size="large" className="text-primary-300" />
                            ) : !latestProperties || latestProperties.length === 0 ? (
                                <NoResults />
                            ) : (
                                <FlatList
                                    data={latestProperties}
                                    renderItem={({ item }) => (
                                        <FeaturedCard item={item} onPress={() => handleCardPress(item.$id)} />
                                    )}
                                    keyExtractor={(item) => item.$id}
                                    horizontal
                                    bounces={false}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerClassName="flex gap-5 mt-5"
                                />
                            )}
                        </View>

                        <View className="flex flex-row items-center justify-between">
                            <Text className="text-xl font-rubik-bold text-black-300">{t('niceDeals')}</Text>
                            <TouchableOpacity onPress={() => router.push('/(root)/(tabs)/explore')}>
                                <Text className="text-base font-rubik-bold text-primary-300">{t('seeAll')}</Text>
                            </TouchableOpacity>
                        </View>
                        <Filters />
                    </View>
                }
            />
        </SafeAreaView>
    );
}