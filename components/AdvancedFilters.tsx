import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import Slider from "@react-native-community/slider";
import { router, useLocalSearchParams } from "expo-router";
import {categories} from "@/constants/data";

interface AdvancedFiltersProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const AdvancedFilters = ({ visible, setVisible }: AdvancedFiltersProps) => {
    const params = useLocalSearchParams<{ advancedFilter?: string }>();

    // Safely parse advancedFilter, default to {} if invalid or undefined
    let initialFilter = {};
    if (params.advancedFilter && typeof params.advancedFilter === "string") {
        try {
            initialFilter = JSON.parse(params.advancedFilter);
        } catch (error) {
            console.error("Failed to parse advancedFilter:", error);
            initialFilter = {};
        }
    }

    const [priceRange, setPriceRange] = useState<number[]>(
        initialFilter.priceMin ? [Number(initialFilter.priceMin), Number(initialFilter.priceMax)] : [1000, 3000]
    );
    const [propertyType, setPropertyType] = useState<string>(initialFilter.propertyType || "Apartment");
    const [bedrooms, setBedrooms] = useState<number>(initialFilter.bedrooms ? Number(initialFilter.bedrooms) : 2);
    const [bathrooms, setBathrooms] = useState<number>(initialFilter.bathrooms ? Number(initialFilter.bathrooms) : 1);
    const [areaRange, setAreaRange] = useState<number[]>(
        initialFilter.areaMin ? [Number(initialFilter.areaMin), Number(initialFilter.areaMax)] : [500, 3000]
    );

    const propertyTypes = ["Apartment", "Condo", "Home", "TownHome", "Studio", "Duplex", "Other"];

    const handleSetFilter = () => {
        const filterParams = {
            priceMin: priceRange[0].toString(),
            priceMax: priceRange[1].toString(),
            propertyType,
            bedrooms: bedrooms.toString(),
            bathrooms: bathrooms.toString(),
            areaMin: areaRange[0].toString(),
            areaMax: areaRange[1].toString(),
        };

        router.setParams({ advancedFilter: JSON.stringify(filterParams) });
        setVisible(false);
    };

    const handleReset = () => {
        setPriceRange([1000, 3000]);
        setPropertyType("Apartment");
        setBedrooms(2);
        setBathrooms(1);
        setAreaRange([500, 3000]);

        // Clear the advancedFilter param by setting it to an empty object or removing it
        router.setParams({ advancedFilter: JSON.stringify({}) }); // Or simply omit it
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => setVisible(false)}
        >
            <View className="flex-1 justify-end bg-black/50">
                <View className="bg-white rounded-t-3xl p-5 h-[80%]">
                    <View className="flex-row justify-between items-center mb-5">
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Text className="text-lg">←</Text>
                        </TouchableOpacity>
                        <Text className="text-lg font-rubik-bold text-black-300">Filter</Text>
                        <TouchableOpacity onPress={handleReset}>
                            <Text className="text-base font-rubik text-primary-300">Reset</Text>
                        </TouchableOpacity>
                    </View>

                    <Text className="text-base font-rubik-medium text-black-300 mb-2">Price Range</Text>
                    <Slider
                        minimumValue={1000}
                        maximumValue={10000}
                        step={1}
                        value={priceRange[0]}
                        onValueChange={(value) => setPriceRange([Math.min(value, priceRange[1]), priceRange[1]])}
                        minimumTrackTintColor="#6B7280"
                        maximumTrackTintColor="#D1D5DB"
                        thumbTintColor="#4B5563"
                    />
                    <Slider
                        minimumValue={1000}
                        maximumValue={10000}
                        step={1}
                        value={priceRange[1]}
                        onValueChange={(value) => setPriceRange([priceRange[0], Math.max(value, priceRange[0])])}
                        minimumTrackTintColor="#6B7280"
                        maximumTrackTintColor="#D1D5DB"
                        thumbTintColor="#4B5563"
                    />
                    <View className="flex-row justify-between">
                        <Text>${priceRange[0]}</Text>
                        <Text>${priceRange[1]}</Text>
                    </View>

                    <Text className="text-base font-rubik-medium text-black-300 mt-5 mb-2">Property Type</Text>
                    <View className="flex-row flex-wrap gap-2">
                        {propertyTypes.map((type) => (
                            <TouchableOpacity
                                key={type}
                                onPress={() => setPropertyType(type)}
                                className={`px-4 py-2 rounded-full border ${
                                    propertyType === type ? "bg-primary-300 border-primary-300" : "bg-white border-gray-300"
                                }`}
                            >
                                <Text
                                    className={`text-sm font-rubik ${
                                        propertyType === type ? "text-white" : "text-black-300"
                                    }`}
                                >
                                    {type}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text className="text-base font-rubik-medium text-black-300 mt-5 mb-2">Home Details</Text>
                    <View className="flex-row justify-between items-center mb-3">
                        <Text className="text-sm font-rubik text-black-300">Bedrooms</Text>
                        <View className="flex-row items-center">
                            <TouchableOpacity
                                onPress={() => setBedrooms(bedrooms > 0 ? bedrooms - 1 : 0)}
                                className="px-3 py-1 border border-gray-300 rounded-full"
                            >
                                <Text>-</Text>
                            </TouchableOpacity>
                            <Text className="mx-3">{bedrooms}</Text>
                            <TouchableOpacity
                                onPress={() => setBedrooms(bedrooms + 1)}
                                className="px-3 py-1 border border-gray-300 rounded-full"
                            >
                                <Text>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="flex-row justify-between items-center">
                        <Text className="text-sm font-rubik text-black-300">Bathrooms</Text>
                        <View className="flex-row items-center">
                            <TouchableOpacity
                                onPress={() => setBathrooms(bathrooms > 0 ? bathrooms - 1 : 0)}
                                className="px-3 py-1 border border-gray-300 rounded-full"
                            >
                                <Text>-</Text>
                            </TouchableOpacity>
                            <Text className="mx-3">{bathrooms}</Text>
                            <TouchableOpacity
                                onPress={() => setBathrooms(bathrooms + 1)}
                                className="px-3 py-1 border border-gray-300 rounded-full"
                            >
                                <Text>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text className="text-base font-rubik-medium text-black-300 mt-5 mb-2">Area</Text>
                    <Slider
                        minimumValue={500}
                        maximumValue={3000}
                        step={10}
                        value={areaRange[0]}
                        onValueChange={(value) => setAreaRange([value, areaRange[1]])}
                        minimumTrackTintColor="#6B7280"
                        maximumTrackTintColor="#D1D5DB"
                        thumbTintColor="#4B5563"
                    />
                    <Slider
                        minimumValue={500}
                        maximumValue={3000}
                        step={10}
                        value={areaRange[1]}
                        onValueChange={(value) => setAreaRange([areaRange[0], value])}
                        minimumTrackTintColor="#6B7280"
                        maximumTrackTintColor="#D1D5DB"
                        thumbTintColor="#4B5563"
                    />
                    <View className="flex-row justify-between">
                        <Text>{areaRange[0]} sq ft</Text>
                        <Text>{areaRange[1]} sq ft</Text>
                    </View>

                    <TouchableOpacity onPress={handleSetFilter} className="bg-primary-300 py-4 rounded-full mt-5">
                        <Text className="text-white text-center font-rubik-medium">Set Filter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default AdvancedFilters;