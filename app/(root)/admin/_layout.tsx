import {router, Stack} from "expo-router";
import { TouchableOpacity, Image, Text } from "react-native";
import { useTranslation } from "react-i18next";
import icons from "@/constants/icons";

export default function AdminLayout() {
    const { t } = useTranslation();

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerStyle: { backgroundColor: "#fff" },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image
                                source={icons.backArrow}
                                className="size-7"
                            />
                        </TouchableOpacity>
                    ),
                    headerTitle: () => (
                        <Text className="text-lg font-rubik-bold text-black-300">
                            {t("adminPanel")}
                        </Text>
                    ),
                    headerTitleAlign: "center",
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => router.push("/(root)/profile/notifications")}
                        >
                            <Image source={icons.bell} className="size-6" />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack>
    );
}