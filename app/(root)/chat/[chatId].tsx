import React, { useEffect, useRef, useState } from "react";
import {
    FlatList,
    TextInput,
    TouchableOpacity,
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    Image,
    SafeAreaView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "@/lib/global-provider";
import { getMessages, sendMessage, subscribeToMessages } from "@/lib/appwrite";
import icons from "@/constants/icons";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";

export default function ChatScreen() {
    const { t } = useTranslation();
    const { propertyId, agentId } = useLocalSearchParams();
    const { user } = useGlobalContext();
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        const loadMessages = async () => {
            try {
                const msgs = await getMessages(propertyId);
                setMessages(msgs);
            } catch (error) {
                console.error("Failed to load messages:", error);
            }
        };

        loadMessages();

        const unsubscribe = subscribeToMessages(propertyId, (payload) => {
            setMessages((prev) => [...prev, payload]);
        });

        return () => unsubscribe();
    }, [propertyId]);

    const handleSend = async () => {
        if (!newMessage.trim() || !user?.$id) return;

        try {
            await sendMessage({
                propertyId,
                senderID: user.$id,
                receiverId: agentId,
                message: newMessage,
                senderType: "user",
            });
            setNewMessage("");
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    const renderItem = ({ item }: { item: any }) => {
        const isUser = item.senderID === user?.$id;

        return (
            <View
                className={`max-w-[75%] px-4 py-3 rounded-2xl my-2 ${
                    isUser
                        ? "bg-primary-100 self-end rounded-tr-none ml-4"
                        : "bg-gray-50 self-start rounded-tl-none mr-4"
                }`}
            >
                <Text className="text-base font-rubik text-black-300 leading-5">
                    {item.message}
                </Text>
                <Text className="text-xs font-rubik text-black-100 mt-1">
                    {item.$createdAt
                        ? new Date(item.$createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })
                        : t("noDate")}
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView className="bg-white h-full" edges={["right", "left", "bottom"]}>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                className="flex-1"
            >
                {/* Header */}
                <View className="flex-row items-center pt-0 border-gray-100 bg-white">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="bg-gray-50 rounded-full p-2"
                    >
                        <Image source={icons.backArrow} className="size-6" />
                    </TouchableOpacity>
                    <Text className="ml-4 text-xl font-rubik-bold text-black-300">
                        {t("chat")}
                    </Text>
                </View>

                {/* Chat Messages */}
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.$id}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        paddingBottom: 100,
                    }}
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={() =>
                        flatListRef.current?.scrollToEnd({ animated: true })
                    }
                />

                {/* Message Input Area */}
                <View className="flex-row items-center bg-white p-5 pb-0 border-t border-gray-100">
                    <TextInput
                        value={newMessage}
                        onChangeText={setNewMessage}
                        placeholder={t("writeMessage")}
                        className="flex-1 bg-gray-50 rounded-full px-5 py-3 mr-3 text-base font-rubik text-black-300 border border-gray-100 min-h-[48px]"
                        placeholderTextColor="#6B7280"
                    />
                    <TouchableOpacity
                        onPress={handleSend}
                        className={`px-5 py-3 rounded-full ${
                            newMessage.trim() ? "bg-primary-300" : "bg-gray-300"
                        }`}
                        disabled={!newMessage.trim()}
                    >
                        <Text className="text-base font-rubik-medium text-white">
                            {t("send")}
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}