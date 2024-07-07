import React from "react";

import { View, Text } from "react-native";
import type { TodoItem } from "../types";

import ToDoListItem from "./ToDoListItem";

interface Props {
    todos: TodoItem[],
    listTitle: string
}

export default function ListContainer({ todos, listTitle }: Props) {
    if (todos.length === 0) {
        return (
            <View >
                <Text>{listTitle}</Text>
                <Text>No todos</Text>
            </View>
        );
    }
    else if (todos.length === 1) {
        return (
            <View >
                <Text>{listTitle}</Text>
                <ToDoListItem key={todos[0]._id} todo={todos[0]} expanded={false} />
            </View>
        );
    }
    else {
        return (
            <View >
                <Text>{listTitle}</Text>
                {todos.map((todo, index) => (
                    <ToDoListItem key={index} todo={todo} expanded={false} />
                ))}
            </View>
        );
    }
}   