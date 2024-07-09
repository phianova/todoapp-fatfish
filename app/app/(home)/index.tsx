import { Button, Text, View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-expo";
import ListContainer from "../../components/ListContainer";
import AddToDoModal from "../../components/AddToDoModal";
import { Link } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { fetchTodos, fetchTodayTodos } from "../../state/todoSlice";
import { signInUser,signOutUser } from "../../state/userSlice";

export default function Index() {

  // State
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const dispatch = useAppDispatch();
  if (isSignedIn && user?.primaryEmailAddress?.emailAddress) {
    dispatch(signInUser(user?.primaryEmailAddress?.emailAddress));
  }

  const todos = useAppSelector((state) => state.todos.todos);
  const todayTodos = useAppSelector((state) => state.todos.todayTodos);
  const loading = useAppSelector((state) => state.todos.status);
  const userEmail = useAppSelector((state) => state.users.userEmail);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchTodos(userEmail));
    dispatch(fetchTodayTodos(userEmail));
  }, [])

  const onPressSignOut = async () => {
    await signOut();
    dispatch(signOutUser());
  }

// View
  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%"
    }}>
    <SignedIn>
    <View style={styles.pageContent}>
      <Text style={styles.title}>Hello {user?.primaryEmailAddress?.emailAddress}</Text>
      {(loading == "loading") && <Text>Loading...</Text>}
      {(loading == "succeeded") && todos &&
        <>
          <ListContainer todos={todayTodos} listTitle="Today"/>
          <ListContainer todos={todos} listTitle="All to-dos"/>
        </>
      }
      <View style={styles.buttonContainer}>
      <Button color="green" title="Add To Do" onPress={() => setModalVisible(true)}></Button>
      {modalVisible && <AddToDoModal modalVisible={modalVisible} setModalVisible={setModalVisible} userEmail={userEmail} />}
      <Button color="gray" title="Sign out" onPress={onPressSignOut}></Button>
      </View>
    </View>
    </SignedIn>
    <SignedOut>
      <Link style={styles.authLink} href="/sign-in">
        Sign in
      </Link>
      <Link style={styles.authLink} href="/sign-up">
        Sign up
      </Link>
    </SignedOut>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContent: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
    gap: 20
  
  },
  title: {
    fontSize: 20,
    lineHeight: 40,
    marginVertical: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  authLink: {
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 40,
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5
  }
});
