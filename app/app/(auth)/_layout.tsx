import { Redirect, Stack } from "expo-router";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";

export default function AuthRoutesLayout() {

// Redirect user to home routes from auth routes if signed in

  const { isSignedIn } = useAuth();
  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }

  return <Stack />;
}