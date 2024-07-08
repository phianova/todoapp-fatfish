import { Button, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-expo";
import ListContainer from "../../components/ListContainer";
import AddToDoModal from "../../components/AddToDoModal";
import ApiClient from "../../utils/ApiClient";
import { Link } from "expo-router"

import type { TodoItem } from "../../types";


export default function Index() {

  // State
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const client = new ApiClient;
  const { user } = useUser();
  const userEmail = user?.emailAddresses[0].emailAddress || "";
  const { signOut } = useClerk();

  // Actions
  const refreshTodos = async () => {
    await client.getTodos(userEmail)
      .then((todos) => {
        setLoading(false);
        setTodos(todos);
      }).catch((err) => {
        console.log(err);
      });
  };

  const todayTodos = () => {
    const todayArray = []
    const today = new Date();
    if (todos.length === 0) {
      return [];
    }
    else if (todos.length === 1) {
      if ((new Date(todos[0].dueDate).getDate() === today.getDate()) && (new Date(todos[0].dueDate).getMonth() === today.getMonth()) && (new Date(todos[0].dueDate).getFullYear() === today.getFullYear())) {
        todayArray.push(todos[0]);
      }
    }
    else {
      for (const todo of todos) {
        if ((new Date(todo.dueDate).getDate() === today.getDate()) && (new Date(todo.dueDate).getMonth() === today.getMonth()) && (new Date(todo.dueDate).getFullYear() === today.getFullYear())) {
          todayArray.push(todo);
        }
      }
    }
    return todayArray;
  };

  // Effects
  useEffect(() => {
    refreshTodos();
  }, [todos]);

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
      {loading && <Text>Loading...</Text>}
      {!loading &&
        <>
          <ListContainer todos={todayTodos()} listTitle="Today" userEmail={userEmail}/>
          <ListContainer todos={todos} listTitle="All to-dos" userEmail={userEmail}/>
        </>
      }
      <Button title="Add To Do" onPress={() => setModalVisible(true)}></Button>
      {modalVisible && <AddToDoModal modalVisible={modalVisible} setModalVisible={setModalVisible} userEmail={userEmail} />}
      <Button title="Sign out" onPress={() => signOut()}></Button>
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
