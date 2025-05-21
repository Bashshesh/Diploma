import React, { useEffect, useState, useCallback } from "react";
import { Text, View, FlatList, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppWrite";
import { databases, config, getProperties } from "@/lib/appwrite";
import { verifyAgentRole } from "./admin-logic";
import PropertyForm from "@/components/PropertyForm";
import { Card } from "@/components/Cards";
import Search from "@/components/Search";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import icons from "@/constants/icons";
import { useTranslation } from "react-i18next";
import { Models, Query } from "react-native-appwrite";
import { useFocusEffect } from "@react-navigation/native";

interface Property extends Models.Document {
    title: string;
    price: number;
    description: string;
    type: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    agent: string;
}

export default function AdminPage() {
    const { user, isLoggedIn } = useGlobalContext();
    const [isAgent, setIsAgent] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editingProperty, setEditingProperty] = useState<Property | null>(null);
    const router = useRouter();
    const { t } = useTranslation();

    // Проверка роли риелтора
    useEffect(() => {
        const verifyAgent = async () => {
            if (!isLoggedIn || !user || !user.$id) {
                console.log("User not logged in, redirecting to sign-in");
                router.replace("/sign-in");
                return;
            }

            if (!config.databaseId || !config.propertiesCollectionId || !config.agentsCollectionId) {
                console.error("Appwrite configuration is missing");
                setLoading(false);
                return;
            }

            try {
                const isAgent = await verifyAgentRole(user.$id);
                console.log("isAgent set to:", isAgent);
                setIsAgent(isAgent);
            } catch (error) {
                console.error("Ошибка проверки роли агента:", error);
            } finally {
                setLoading(false);
            }
        };

        verifyAgent();
    }, [isLoggedIn, user]);

    // Получение всех объектов недвижимости с фильтрацией
    const { data: properties, loading: propertiesLoading, refetch } = useAppwrite({
        fn: getProperties,
        params: {
            query: "",
            filter: "",
            advancedFilter: undefined,
            limit: 20,
        },
        skip: !isAgent,
    });

    // Отладка состояния properties
    useEffect(() => {
        console.log("Properties:", properties);
        console.log("PropertiesLoading:", propertiesLoading);
    }, [properties, propertiesLoading]);

    // Вызов refetch при фокусе страницы
    useFocusEffect(
        useCallback(() => {
            if (isAgent) {
                console.log("Page focused, triggering refetch");
                refetch({ query: "", filter: "", advancedFilter: undefined, limit: 20 });
            }
        }, [isAgent, refetch])
    );

    // Обработка нажатия на карточку
    const handleCardPress = (id: string) => router.push(`/properties/${id}`);

    // Обработка создания/обновления объекта
    const handlePropertySubmit = async (propertyData: {
        title: string;
        price: number;
        description: string;
        type: string;
        bedrooms: number;
        bathrooms: number;
        area: number;
    }) => {
        if (!user || !user.$id || !config.databaseId || !config.propertiesCollectionId) {
            alert(t("userNotAuthenticated"));
            return;
        }

        try {
            if (editingProperty) {
                await databases.updateDocument(
                    config.databaseId,
                    config.propertiesCollectionId,
                    editingProperty.$id,
                    { ...propertyData, agent: user.$id }
                );
                alert(t("propertyUpdated"));
                setEditingProperty(null);
            } else {
                await databases.createDocument(
                    config.databaseId,
                    config.propertiesCollectionId,
                    "unique()",
                    { ...propertyData, agent: user.$id }
                );
                alert(t("propertyCreated"));
            }
            refetch({ query: "", filter: "", advancedFilter: undefined, limit: 20 });
        } catch (error) {
            console.error("Ошибка при сохранении объекта:", error);
            alert(t("propertySaveError"));
        }
    };

    // Обработка удаления объекта
    const handleDelete = async (propertyId: string) => {
        if (!config.databaseId || !config.propertiesCollectionId) {
            alert(t("configMissing"));
            return;
        }

        try {
            await databases.deleteDocument(
                config.databaseId,
                config.propertiesCollectionId,
                propertyId
            );
            refetch({ query: "", filter: "", advancedFilter: undefined, limit: 20 });
            alert(t("propertyDeleted"));
        } catch (error) {
            console.error("Ошибка удаления объекта:", error);
            alert(t("propertyDeleteError"));
        }
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    if (!isAgent) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-white">
                <Text className="text-lg">{t("accessDenied")}</Text>
                <TouchableOpacity
                    onPress={() => router.replace("/")}
                    className="mt-4 bg-primary-300 px-4 py-2 rounded"
                >
                    <Text className="text-white font-rubik-medium">{t("goBack")}</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="bg-white h-full">
            <FlatList
                data={properties}
                renderItem={({ item }) => (
                    <View className="relative">
                        <Card item={item} onPress={() => handleCardPress(item.$id)} />
                        <View className="absolute bottom-2 right-2 flex-row space-x-2">
                            <TouchableOpacity
                                onPress={() => setEditingProperty(item)}
                                className="bg-blue-500 p-2 rounded"
                            >
                                <Image source={icons.edit} className="size-5 tint-white" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleDelete(item.$id)}
                                className="bg-red-500 p-2 rounded"
                            >
                                <Image source={icons.trash} className="size-5 tint-white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.$id}
                numColumns={2}
                contentContainerClassName="pb-32"
                columnWrapperClassName="flex gap-5 px-5"
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    propertiesLoading ? (
                        <ActivityIndicator size="large" className="text-primary-300 mt-5" />
                    ) : (
                        <NoResults />
                    )
                }
                ListHeaderComponent={
                    <View className="px-5 mt-5">
                        <Search />
                        <Filters />
                        <Text className="text-xl font-rubik-bold text-black-300 mt-6 mb-3">{t("results")}</Text>
                        <PropertyForm
                            onSubmit={handlePropertySubmit}
                            initialData={editingProperty ?? undefined}
                        />
                    </View>
                }
            />
        </SafeAreaView>
    );
}