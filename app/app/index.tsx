import { Button, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import ListContainer from "../components/ListContainer";
import AddToDoModal from "../components/AddToDoModal";
import ApiClient from "../utils/ApiClient";

import type { TodoItem } from "../types";


export default function Index() {

  // State
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const client = new ApiClient;

  // Actions
  const refreshTodos = async () => {
    await client.getTodos("warrenova@outlook.com")
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 28, lineHeight: 32, marginTop: 6 }}>To Do</Text>
      {loading && <Text>Loading...</Text>}
      {!loading &&
        <>
          <ListContainer todos={todayTodos()} listTitle="Today" />
          <ListContainer todos={todos} listTitle="All to-dos" />
        </>
      }
      <Button title="Add To Do" onPress={() => setModalVisible(true)}></Button>
      {modalVisible && <AddToDoModal modalVisible={modalVisible} setModalVisible={setModalVisible} />}
    </View>
  );
}
