import { Button, Text, View } from "react-native";
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
  }, [userEmail])

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
    }}>
    <SignedIn>
    <View>
      <Text style={{ fontSize: 28, lineHeight: 32, marginTop: 6 }}>Hello {user?.primaryEmailAddress?.emailAddress}</Text>
      {(loading == "loading") && <Text>Loading...</Text>}
      {(loading == "succeeded") &&
        <>
          <ListContainer todos={todayTodos} listTitle="Today"/>
          <ListContainer todos={todos} listTitle="All to-dos"/>
        </>
      }
      <Button title="Add To Do" onPress={() => setModalVisible(true)}></Button>
      {modalVisible && <AddToDoModal modalVisible={modalVisible} setModalVisible={setModalVisible} userEmail={userEmail} />}
      <Button title="Sign out" onPress={onPressSignOut}></Button>
    </View>
    </SignedIn>
    <SignedOut>
      <Link href="/sign-in">
        Sign in
      </Link>
      <Link href="/sign-up">
        Sign up
      </Link>
    </SignedOut>
    </View>
  );
}
