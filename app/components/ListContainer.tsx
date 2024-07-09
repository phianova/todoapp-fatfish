import React from "react";

import { View, Text, StyleSheet } from "react-native";
import ToDoListItem from "./ToDoListItem";
import { useAppSelector } from "../state/hooks";

// Types
interface Props {
    listTitle: string,
}

export default function ListContainer({ listTitle }: Props) {
    const loading = useAppSelector((state) => (listTitle === "Today") ? state.todayTodos.status : state.todos.status);
    const todos = useAppSelector((state) => (listTitle === "Today") ? state.todayTodos.todayTodos : state.todos.todos);
    console.log(Array.isArray(todos), loading, todos);
    // View
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{listTitle}</Text>
            {(loading === "loading" || loading === "idle") ? <Text>Loading...</Text> :
            (Array.isArray(todos) && todos.length !== 0 && todos !== undefined && todos[0]._id !== "todosNotSet") ? (
                todos.map((todo) => (
                    <ToDoListItem key={todo._id} todo={todo} expanded={false} />
                ))
            ) : (
                <Text style={styles.noTodos}>No todos!</Text>
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