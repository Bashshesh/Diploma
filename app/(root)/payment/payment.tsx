import React, {useEffect, useState} from "react";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import { router, useLocalSearchParams } from "expo-router";
import icons from "@/constants/icons";
import { useAppwrite } from "@/lib/useAppWrite";
import {getPropertyById} from "@/lib/appwrite";
import {useGlobalContext} from "@/lib/global-provider";

export default function PaymentScreen() {
    const { t } = useTranslation();
    const [cardNumber, setCardNumber] = useState("");
    const { id } = useLocalSearchParams<{ id: string }>();
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardHolder, setCardHolder] = useState("");
    const { user } = useGlobalContext();
    const { data: property, loading, refetch, error } = useAppwrite({
        fn: getPropertyById,
        params: { id: id || '' },
    });

    useEffect(() => {
        if (id) {
            refetch({ id: id });
        }
    }, [id]);

    console.log('Property ID:', id);

    const handleCardNumberChange = (text: string) => {
        // Basic formatting for card number (e.g., 1234 5678 9012 3456)
        const cleaned = text.replace(/\D/g, "");
        const formatted = cleaned
            .replace(/(\d{4})/g, "$1 ")
            .trim()
            .slice(0, 19);
        setCardNumber(formatted);
    };

    const handleExpiryDateChange = (text: string) => {
        // Format as MM/YY
        const cleaned = text.replace(/\D/g, "");
        const formatted = cleaned
            .replace(/(\d{2})(\d{0,2})/, "$1/$2")
            .slice(0, 5);
        setExpiryDate(formatted);
    };

    const handleCvvChange = (text: string) => {
        // Limit to 3-4 digits
        const cleaned = text.replace(/\D/g, "").slice(0, 4);
        setCvv(cleaned);
    };

    const isFormValid = cardNumber.length >= 19 && expiryDate.length === 5 && cvv.length >= 3 && cardHolder.trim().length > 0;

    return (
        <SafeAreaView className="bg-white h-full" edges={["right", "left", "bottom"]}>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                className="flex-1"
            >
                {/* Header */}
                <View className="flex-row items-center p-5 border-b border-gray-100 bg-white">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="bg-gray-50 rounded-full p-2"
                    >
                        <Image source={icons.backArrow} className="size-6" />
                    </TouchableOpacity>
                    <Text className="ml-4 text-xl font-rubik-bold text-black-300">
                        {t("payment")}
                    </Text>
                </View>

                {/* Price Display */}
                <View className="px-5 mt-5">
                    <Text className="text-lg font-rubik-medium text-black-300">
                        {t("totalAmount")}
                    </Text>
                    {loading ? (
                        <Text className="text-3xl font-rubik-bold text-primary-300 mt-2">
                            {t("loading")}...
                        </Text>
                    ) : property ? (
                        <Text className="text-3xl font-rubik-bold text-primary-300 mt-2">
                            ${property.price || 0}
                        </Text>
                    ) : (
                        <Text className="text-3xl font-rubik-bold text-red-500 mt-2">
                            {t("propertyNotFound")}
                        </Text>
                    )}
                </View>


                {/* Payment Form */}
                <View className="px-5 mt-5">
                    <Text className="text-lg font-rubik-bold text-black-300 mb-3">
                        {t("cardDetails")}
                    </Text>

                    {/* Card Holder Name */}
                    <View className="mb-4">
                        <Text className="text-sm font-rubik text-black-300 mb-1">
                            {t("cardHolderName")}
                        </Text>
                        <TextInput
                            value={cardHolder}
                            onChangeText={setCardHolder}
                            placeholder={t("enterCardHolderName")}
                            className="bg-gray-50 rounded-lg px-4 py-3 text-base font-rubik text-black-300 border border-gray-100"
                            placeholderTextColor="#6B7280"
                        />
                    </View>

                    {/* Card Number */}
                    <View className="mb-4">
                        <Text className="text-sm font-rubik text-black-300 mb-1">
                            {t("cardNumber")}
                        </Text>
                        <TextInput
                            value={cardNumber}
                            onChangeText={handleCardNumberChange}
                            placeholder="1234 5678 9012 3456"
                            className="bg-gray-50 rounded-lg px-4 py-3 text-base font-rubik text-black-300 border border-gray-100"
                            placeholderTextColor="#6B7280"
                            keyboardType="numeric"
                            maxLength={19}
                        />
                    </View>

                    {/* Expiry Date and CVV */}
                    <View className="flex-row justify-between">
                        <View className="flex-1 mr-3">
                            <Text className="text-sm font-rubik text-black-300 mb-1">
                                {t("expiryDate")}
                            </Text>
                            <TextInput
                                value={expiryDate}
                                onChangeText={handleExpiryDateChange}
                                placeholder="MM/YY"
                                className="bg-gray-50 rounded-lg px-4 py-3 text-base font-rubik text-black-300 border border-gray-100"
                                placeholderTextColor="#6B7280"
                                keyboardType="numeric"
                                maxLength={5}
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="text-sm font-rubik text-black-300 mb-1">
                                {t("cvv")}
                            </Text>
                            <TextInput
                                value={cvv}
                                onChangeText={handleCvvChange}
                                placeholder="123"
                                className="bg-gray-50 rounded-lg px-4 py-3 text-base font-rubik text-black-300 border border-gray-100"
                                placeholderTextColor="#6B7280"
                                keyboardType="numeric"
                                maxLength={4}
                                secureTextEntry
                            />
                        </View>
                    </View>
                </View>

                {/* Pay Button */}
                <View className="px-5 mt-8">
                    <TouchableOpacity
                        onPress={() => console.log("Payment submitted")} // Placeholder for payment logic
                        className={`rounded-full px-5 py-4 ${
                            isFormValid ? "bg-primary-300" : "bg-gray-300"
                        }`}
                        disabled={!isFormValid}
                    >
                        <Text className="text-base font-rubik-medium text-white text-center">
                            {t("payNow")}
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}