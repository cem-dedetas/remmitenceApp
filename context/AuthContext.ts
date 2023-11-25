
import { AuthRequestPromptOptions, AuthSessionResult } from 'expo-auth-session';
import { createContext, useContext, useEffect, useState } from 'react';
import * as Google from 'expo-auth-session/providers/google';

export interface GoogleAuthUser {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}

export interface AuthProps{
   
    authState?: {
        user: GoogleAuthUser | null;
        isAuthenticated: boolean;
    };

    onSignOut?: () => Promise<void>;
    promptAsync?: (options?: AuthRequestPromptOptions | undefined) => Promise<AuthSessionResult>;
    didLoad?: boolean;

}
export const AuthContext = createContext<AuthProps>({} as AuthProps);


export const useAuth = () => {
    return useContext(AuthContext);
}