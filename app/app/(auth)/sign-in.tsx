import {  useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, Button, View, StyleSheet } from "react-native";
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
    <View style={styles.pageContent}>
      <Text style={styles.text}>Sign In</Text>
      {!pendingVerification &&
      <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <Button color="green" title="Sign In" onPress={onSignInPress} />
      <View>
        <Text style={styles.text}>No account?</Text>
        <Link style={styles.authLink} href="/sign-up">
          <Text>Sign up</Text>
        </Link>
      </View>
      </View>
      }
      {pendingVerification && (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
          />
          <Button color="green" title="Verify Email" onPress={onPressVerify} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pageContent: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    alignItems: "center",
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
    gap: 20
  },
  input: {
    borderColor: "gray",
    width: "100%",
    borderRadius: 5,
    backgroundColor: "lightgray",
    borderWidth: 1,
    padding: 5,
},
  text: {
    fontSize: 18,
    lineHeight: 40,
    marginVertical: 5,
    fontWeight: "bold",
    textAlign: "center",
  },
  authLink: {
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 16,
    textAlign: "center",
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5
  }
});
