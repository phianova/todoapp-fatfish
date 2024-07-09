import React, { useState } from "react";
import { TextInput, Text, Button, View, StyleSheet } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import ApiClient from "../../utils/ApiClient";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const client = new ApiClient();

  const [emailAddress, setEmailAddress] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      console.error(err);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        await client.addUser(emailAddress);
        router.replace('/');
      } else {
        console.error(completeSignUp.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.pageContent}>
      <Text style={styles.text}>Sign Up</Text>
      {!pendingVerification && (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(email) => setEmailAddress(email)}
          />
          <Button color="green"title="Sign Up" onPress={onSignUpPress} />
        </View>
      )}
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
});
