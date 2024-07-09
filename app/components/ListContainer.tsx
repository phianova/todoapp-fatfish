import React from "react";

import { View, Text, StyleSheet } from "react-native";
import type { TodoItem } from "../utils/types";
import ToDoListItem from "./ToDoListItem";

// Types
interface Props {
    todos: TodoItem[],
    listTitle: string,
}

export default function ListContainer({ todos, listTitle }: Props) {

    // View
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{listTitle}</Text>
            {(todos.length === 0 || todos === undefined) ? (
                <Text style={styles.noTodos}>No todos!</Text>
            ) : (
                todos.map((todo) => (
                    <ToDoListItem key={todo._id} todo={todo} expanded={false} />
                ))
            )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        width: "80%",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    noTodos: {
        marginVertical: 10,
        fontSize: 20,
    },
});