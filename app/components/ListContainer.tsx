import React from "react";

import { View, Text } from "react-native";
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
        <View>
            <Text>{listTitle}</Text>
            {(todos.length === 0 || todos === undefined) ? (
                <Text>No todos</Text>
            ) : (
                todos.map((todo) => (
                    <ToDoListItem key={todo._id} todo={todo} expanded={false}/>
                ))
            )
            }
        </View>
    );
}   