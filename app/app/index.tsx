import { Text, View } from "react-native";
import React from "react";

import ListContainer from "@/components/ListContainer";

import type { TodoItem } from "../types";


export default function Index() {

  // fetch all todos for user
  const todos: TodoItem[] = [
      {
        id: 1,
        title: "Buy milk",
        description: "Buy milk from the store",
        priority: 1,
        createdDate: new Date(),
        dueDate: new Date(),
        completed: false,
      },
      {
        id: 2,
        title: "Buy bread",
        description: "Buy bread from the store",
        priority: 2,
        createdDate: new Date(),
        dueDate: new Date(),
        completed: false,
      },
      {
        id: 3,
        title: "Buy cheese",
        description: "Buy cheese from the store",
        priority: 3,
        createdDate: new Date(),
        dueDate: new Date(),
        completed: false,
      },
  ]

  // fetch TODAY's todos for user

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 28, lineHeight: 32, marginTop: 6 }}>To Do</Text>
      <ListContainer todos={todos} listTitle="Today"/>
      <ListContainer todos={todos} listTitle="All to-dos"/>
    </View>
  );
}
