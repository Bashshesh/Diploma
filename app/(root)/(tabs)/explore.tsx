import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import { useLocalSearchParams, router } from "expo-router";
import icons from "@/constants/icons";
import { Card } from "@/components/Cards";
import Filters from "@/components/Filters";
import AdvancedFilters from "@/components/AdvancedFilters";
import Search from "@/components/Search";
import NoResults from "@/components/NoResults";
import { useAppwrite } from "@/lib/useAppWrite";
import { getProperties } from "@/lib/appwrite";

const Explore = () => {
    const params = useLocalSearchParams<{ query?: string; filter?: string; advancedFilter?: string }>(); // Added advancedFilter

    const { data: properties, loading, refetch } = useAppwrite({
        fn: getProperties,
        params: {
            query: params.query || "",
            filter: params.filter || "",
            advancedFilter: params.advancedFilter, // Pass advancedFilter
            limit: 20,
        },
        skip: true,
    });

    useEffect(() => {
        refetch({
            query: params.query || "",
            filter: params.filter || "",
            advancedFilter: params.advancedFilter, // Pass advancedFilter
            limit: 20,
        });
    }, [params.query, params.filter, params.advancedFilter]); // Added advancedFilter to dependencies

    const handleCardPress = (id: string) => router.push(`/properties/${id}`);

    return (
        <SafeAreaView className="bg-white h-full">
            <View className="flex-row items-center justify-between px-5 pt-4 mb-4">
                <TouchableOpacity onPress={() => router.push("/")}>
                    <Image source={icons.backArrow} className="size-7 border-2 rounded-full" />
                </TouchableOpacity>
                <Text className="text-lg font-rubik-bold text-black-300">Explore Properties</Text>
                <TouchableOpacity>
                    <Image source={icons.bell} className="size-6" />
                </TouchableOpacity>
            </View>

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
                    <View className="px-5 mt-5">
                        <Search />
                        <Filters />
                        <Text className="text-xl font-rubik-bold text-black-300 mt-6 mb-3">Results</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

export default Explore;