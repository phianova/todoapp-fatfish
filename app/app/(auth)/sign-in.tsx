import {  useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, Button, View } from "react-native";
import React, { useState, useCallback } from "react";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }
    try {
        await signIn.create({
        identifier: emailAddress,
        strategy: "email_code",
      });

      setPendingVerification(true);

    } catch (err) {
      console.error(err);
    }
  }, [isLoaded, emailAddress]);

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error(signInAttempt.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <Button title="Sign In" onPress={onSignInPress} />
      <View>
        <Text>No account?</Text>
        <Link href="/sign-up">
          <Text>Sign up</Text>
        </Link>
      </View>
      {pendingVerification && (
        <>
          <TextInput
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
          />
          <Button title="Verify Email" onPress={onPressVerify} />
        </>
      )}
    </View>
  );
}