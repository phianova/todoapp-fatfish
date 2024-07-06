import React from "react";

import { View, Text } from "react-native";
import type { TodoItem } from "../types";

import ToDoListItem from "./ToDoListItem";

interface Props {
    todos: TodoItem[],
    listTitle: string
}

export default function ListContainer({ todos, listTitle }: Props) {

    return (
    <View >
        <Text>{listTitle}</Text>
        {todos.map((todo) => (
            <ToDoListItem key={todo.id} todo={todo} expanded={false} />
        ))}
    </View>
    );
}   