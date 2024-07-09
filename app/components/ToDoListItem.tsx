import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import type { TodoItem } from "../utils/types";
import Checkbox from 'expo-checkbox';
import { formatShortDate } from "../utils/dates";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { updateTodo } from "../state/todoSlice";
import { UpdateFormData } from "../utils/types";
import ToDoExpanded from "./ToDoExpanded";

//// Types
interface Props {
    todo: TodoItem,
    expanded: boolean,
}

export default function ToDoListItem({ todo, expanded }: Props) {
    //// Setup
    const id = todo._id;
    const dueDate = formatShortDate(todo.dueDate.toString());
    const priorityColour = (todo.priority === 1) ? "lightcoral" : ((todo.priority === 2) ? "gold" : (todo.priority === 3) ? "lightgreen" : "transparent");
    const isFirstRender = useRef(true);
    const dispatch = useAppDispatch();

    //// State
    // Global State
    const userEmail = useAppSelector((state) => state.users.userEmail);
    // Local State
    const [completedStyle, setCompletedStyle] = useState("none" as "line-through" | "none" | "underline" | "underline line-through" | undefined);
    const [isChecked, setChecked] = useState(todo.completed);
    const [isExpanded, setExpanded] = useState(expanded);

    //// Effects
    // Updates todos in global state when checkbox status changes
    // Also updates text style to reflect completed status
    // Check for first render ensures todo is not updated erroneously if component is rendered with todo already completed
    useEffect(() => {
        if (isChecked) {
            setCompletedStyle("line-through");
        } else {
            setCompletedStyle("none");
        }
        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            const updateData : UpdateFormData = {
                _id: id,
                title: todo.title,
                description: todo.description,
                priority: todo.priority,
                dueDate: todo.dueDate,
                completed: isChecked,
                userEmail: userEmail
            }
            dispatch(updateTodo(updateData));
        }
    }, [isChecked]);

    return (
        <View style={{ ...styles.container, backgroundColor: priorityColour }}>
            {isExpanded &&
            <ToDoExpanded todo={todo} isChecked={isChecked}/>
            } 
            {!isExpanded &&
                <View style={styles.itemContent}>
                    <Text style={{ ...styles.title, textDecorationLine: completedStyle}}>{todo.title}</Text>
                    <Text>{dueDate}</Text>
                </View>
            }
            <Checkbox value={isChecked} onValueChange={() => setChecked(!isChecked)} />
            <Button title={isExpanded ? "Collapse" : "Expand"} onPress={() => setExpanded(!isExpanded)}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
    },
    container: {
        flexDirection: "row",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 5,
        borderRadius: 5,
    },
    itemContent: {
        flexDirection: "row",
        fontSize: 20,
        fontWeight: "bold",
        justifyContent: "space-around",
        gap: 20,
        alignItems: "center",
    },
});