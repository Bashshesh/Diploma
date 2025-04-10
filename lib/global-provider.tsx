import React, {createContext, useContext, ReactNode} from "react";
import {useAppwrite} from "./useAppWrite";
import {getCurrentUser} from "./appwrite";
import {Redirect} from "expo-router";

interface GlobalContextType {
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
    refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}

export interface User {
    $id: string;
    name: string;
    avatar: string;
    email?: string;
    $createdAt: string;
    $updatedAt: string;
    registration: string;
    accessedAt: string;
    [key: string]: any;
}


const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: {children: ReactNode}) => {
    const {
            data: user,
            loading,
            refetch
    } = useAppwrite({
        fn: getCurrentUser,
    });

    const isLoggedIn = !!user;

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            user,
            loading,
            refetch
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error('Use global context must be used within a GlobalProvider');
    }
    return context;
}

export default GlobalProvider;