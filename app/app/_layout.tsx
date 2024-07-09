import { Slot } from "expo-router";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../state/store";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";

// Clerk token cache implementation using Expo Secure Store
const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

// Checks .env for publishable key
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
if (!publishableKey) {
  throw new Error("Missing publishable key");
}

// Root layout wrapped in Provider for state store, which is wrapped in Clerk Provider for auth
export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
    <ClerkLoaded>
    <Provider store={store}>
      <Slot/>
    </Provider>
    </ClerkLoaded>
    </ClerkProvider>
  );
}
