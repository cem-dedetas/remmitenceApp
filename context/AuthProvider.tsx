import { useEffect, useState } from "react";
import { AuthContext, GoogleAuthUser } from "./AuthContext";
import * as SecureStore from 'expo-secure-store';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { router } from "expo-router";

WebBrowser.maybeCompleteAuthSession();

const AuthProvider = ({ children }: any) => {
    const [authState , setAuthState] = useState<{
        user: GoogleAuthUser | null;
        isAuthenticated: boolean;
    }>({user: null, isAuthenticated:false});
    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId:"311822636229-n48cjbdso4k1fd48so1m4onq425l2rc6.apps.googleusercontent.com",
        androidClientId:"311822636229-5l8sgbna5qgje909s0p3l3paj5c0r8qm.apps.googleusercontent.com",
        webClientId:"311822636229-lurq4tegvtv6jifb92nr84mi2mmnj53i.apps.googleusercontent.com",
    });
    const [didLoad, setDidLoad] = useState<boolean>(false);

    const handleGoogleSignIn = async () => {
        
        const user = await SecureStore.getItemAsync('user');
        if (user) {
            setAuthState({user: JSON.parse(user), isAuthenticated:true});
            return;
        }
        if (!request) return;
        if (!response) return;
        if (response.type !== 'success') return;
        if(!response.authentication) return

        await getUserInformation(response.authentication?.accessToken);
        setDidLoad(true);

    }

    const getUserInformation = async (token:string) => {
        if (!token) return setDidLoad(true);

        try {
            const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const userInfo = await userInfoResponse.json();
            
            setAuthState({user: userInfo, isAuthenticated:true});
            setDidLoad(true);
            await SecureStore.setItemAsync('user', JSON.stringify(userInfo));
        }
        catch (e) {
            console.log(e);
        }
    }

    async function onSignOut() {
        await SecureStore.deleteItemAsync('user');
        setAuthState({user: null, isAuthenticated:false});
        router.replace('/login');

    }

    useEffect(() => {
        async function loadUser() {
            const user = await SecureStore.getItemAsync('user');
            if (user) {
                setAuthState({user: JSON.parse(user), isAuthenticated:true});
                
            }
        setDidLoad(true);

        }
        loadUser();
    }, []);

    useEffect(() => {
        handleGoogleSignIn();
    }, [
        response,
    ]);

    const value = {
        authState: authState,
        onSignOut: onSignOut,
        promptAsync: promptAsync,
        didLoad: didLoad,
    };


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;