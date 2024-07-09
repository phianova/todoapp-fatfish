import { Button, Text, View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-expo";
import ListContainer from "../../components/ListContainer";
import AddToDoModal from "../../components/AddToDoModal";
import { Link } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { fetchTodos } from "../../state/todoSlice";
import { fetchTodayTodos } from "../../state/todayTodoSlice";
import { signInUser,signOutUser } from "../../state/userSlice";

export default function Index() {

  //// Setup
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const dispatch = useAppDispatch();

  //// State
  // Global State
  const todos = useAppSelector((state) => state.todos.todos);
  const todosLoading = useAppSelector((state) => state.todos.status);
  const todayTodosLoading = useAppSelector((state) => state.todayTodos.status);
  const userLoading = useAppSelector((state) => state.users.status);
  const userEmail = useAppSelector((state) => state.users.userEmail);
  // Local State
  const [modalVisible, setModalVisible] = useState(false);

  //// Actions
  // Sign out - triggers Clerk to sign user out and removes user email from global state
  const onPressSignOut = async () => {
    await signOut();
    dispatch(signOutUser());
  }

  //// Effects
  // Adds user email to global state when signed in via Clerk
  useEffect(() => {
    if (isSignedIn && user?.primaryEmailAddress?.emailAddress) {
      dispatch(signInUser(user?.primaryEmailAddress?.emailAddress));
    }
  }, []);

  // Fetches todos and today todos once user email is loaded in global state
  useEffect(() => {
    if (userEmail !== "emailNotSet" && userEmail !== "" && userLoading === "succeeded") {
      dispatch(fetchTodos(userEmail));
      dispatch(fetchTodayTodos(userEmail));
    }
  }, [userEmail, todos.length]);

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
      {(todosLoading == "loading" || todayTodosLoading == "loading") && <Text>Loading...</Text>}
      {(todosLoading == "succeeded" && todayTodosLoading == "succeeded") &&
        <>
          <ListContainer listTitle="All to-dos"/>
          <ListContainer listTitle="Today"/>
        </>
      }
      <View style={styles.buttonContainer}>
      <Button color="green" title="Add To Do" onPress={() => setModalVisible(true)}></Button>
      {modalVisible && <AddToDoModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>}
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
