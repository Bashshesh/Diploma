import { Account, Avatars, Client, OAuthProvider, ID, Databases, Query } from "react-native-appwrite";
import * as Linking from "expo-linking";
import {User} from "@/lib/global-provider";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
    platform: "https://com.jsm.diploma",
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
    reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
    propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
};

export const client = new Client();

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

export async function login() {
    try {
        const redirectUri = Linking.createURL("/");

        const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUri);

        if (!response) throw new Error("Create OAuth2 token failed");

        const browserResult = await openAuthSessionAsync(response.toString(), redirectUri);

        if (browserResult.type !== "success") throw new Error("Failed to login");

        const url = new URL(browserResult.url);
        const secret = url.searchParams.get("secret")?.toString();
        const userId = url.searchParams.get("userId")?.toString();

        if (!secret || !userId) throw new Error("Failed to login");

        const session = await account.createSession(userId, secret);
        if (!session) throw new Error("Failed to create a session");

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function logout() {
    try {
        await account.deleteSession("current");
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getCurrentUser() {
    try {
        const response = await account.get();

        if (response.$id) {
            const userAvatar = avatar.getInitials(response.name);
            return {
                ...response,
                avatar: userAvatar.toString(),
            } as User;
        }
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getLatestProperties() {
    try {
        const result = await databases.listDocuments(
            config.databaseId!,
            config.propertiesCollectionId!,
            [Query.orderAsc("$createdAt"), Query.limit(5)]
        );

        return result.documents;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getProperties({
                                        filter,
                                        advancedFilter,
                                        query,
                                        limit,
                                    }: {
    filter: string;
    advancedFilter?: string;
    query: string;
    limit: number;
}) {
    try {
        const buildQuery = [Query.orderDesc("$createdAt")];

        if (filter && filter !== "All" && filter.trim() !== "") {
            buildQuery.push(Query.equal("type", filter));
        }

        let advancedFilterParams: {
            priceMin?: string;
            priceMax?: string;
            propertyType?: string;
            bedrooms?: string;
            bathrooms?: string;
            areaMin?: string;
            areaMax?: string;
        } = {};

        if (advancedFilter && advancedFilter.trim() !== "") {
            try {
                advancedFilterParams = JSON.parse(advancedFilter);
                console.log("Parsed Advanced Filter:", advancedFilterParams);
            } catch (error) {
                console.error("Failed to parse advanced filter parameters:", error);
            }
        }

        if (advancedFilterParams.priceMin && advancedFilterParams.priceMax) {
            const min = Number(advancedFilterParams.priceMin);
            const max = Number(advancedFilterParams.priceMax);
            if (min <= max) {
                buildQuery.push(Query.between("price", min, max));
            } else {
                console.warn("Invalid price range:", min, max);
            }
        }

        if (advancedFilterParams.propertyType) {
            buildQuery.push(Query.equal("type", advancedFilterParams.propertyType));
        }

        if (advancedFilterParams.bedrooms) {
            buildQuery.push(Query.equal("bedrooms", Number(advancedFilterParams.bedrooms)));
        }

        if (advancedFilterParams.bathrooms) {
            buildQuery.push(Query.equal("bathrooms", Number(advancedFilterParams.bathrooms)));
        }

        if (advancedFilterParams.areaMin && advancedFilterParams.areaMax) {
            const min = Number(advancedFilterParams.areaMin);
            const max = Number(advancedFilterParams.areaMax);
            if (min <= max) {
                buildQuery.push(Query.between("area", min, max));
            } else {
                console.warn("Invalid area range:", min, max);
            }
        }

        if (query) {
            buildQuery.push(
                Query.or([
                    Query.search("name", query),
                    Query.search("address", query),
                    Query.search("type", query),
                ])
            );
        }

        if (limit) {
            buildQuery.push(Query.limit(limit));
        }

        console.log("Executing Query:", buildQuery);
        const result = await databases.listDocuments(config.databaseId!, config.propertiesCollectionId!, buildQuery);
        console.log("Total Matching Documents:", result.total);
        console.log("Returned Documents:", result.documents);
        return result.documents;
    } catch (error) {
        console.error("Error fetching properties:", error);
        return [];
    }
}
export const getPropertyById = async ({ id }: { id: string }) => {
    try {
        // Fetch the property document
        const response = await databases.getDocument(
            config.databaseId!,
            config.propertiesCollectionId!,
            id
        );

        // Initialize reviews, reviewsCount, and agent
        let reviews = [];
        let reviewsCount = 0;
        let agent = null;

        // Fetch related reviews
        try {
            const reviewsResponse = await databases.listDocuments(
                config.databaseId!,
                config.reviewsCollectionId!,
                [Query.equal("property", id)]
            );
            reviews = reviewsResponse.documents || [];
            reviewsCount = reviewsResponse.total || 0;
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }

        // Fetch agent details
        try {
            if (response.agent) {
                if (typeof response.agent === "string") {
                    agent = await databases.getDocument(
                        config.databaseId!,
                        config.agentsCollectionId!,
                        response.agent
                    );
                } else if (typeof response.agent === "object" && response.agent.$id) {
                    agent = response.agent;
                }
            }
        } catch (error) {
            console.error("Error fetching agent:", error);
        }

        // Use the embedded gallery data (rename it to "galleries" for consistency)
        const galleries = response.gallery
            ? response.gallery.map((item: any) => item.image) // Extract image URLs
            : [];

        // Structure the property object with reviews, reviewsCount, agent, and galleries
        return {
            ...response,
            reviews,
            reviewsCount,
            agent: agent
                ? {
                    name: agent.name || "Unknown Agent",
                    email: agent.email || "No email available",
                    avatar: agent.avatar || "https://via.placeholder.com/50",
                }
                : null,
            galleries, // Replace the empty "galleries" with the mapped data
        };
    } catch (error) {
        console.error("Error fetching property:", error);
        throw error;
    }
};