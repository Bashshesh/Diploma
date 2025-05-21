import { databases, config } from "@/lib/appwrite";
import { Query } from "react-native-appwrite";

export const verifyAgentRole = async (userId: string): Promise<boolean> => {
    if (!config.databaseId || !config.agentsCollectionId) {
        console.error("Appwrite configuration is missing");
        return false;
    }

    try {
        const response = await databases.listDocuments(
            config.databaseId,
            config.agentsCollectionId,
            [Query.equal("userId", userId)]
        );
        return response.documents.length > 0;
    } catch (error) {
        console.error("Ошибка проверки роли агента:", error);
        return false;
    }
};