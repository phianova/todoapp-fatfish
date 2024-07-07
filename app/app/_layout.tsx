import { Stack } from "expo-router";
import React from "react";
import { Provider } from "react-redux";
import store from "../store";

export default function RootLayout() {
  return (
    <Provider store={store}>
    <Stack>
      <Stack.Screen name="index" options={{ title: "Todo App"}} />
    </Stack>
    </Provider>
  );
}
