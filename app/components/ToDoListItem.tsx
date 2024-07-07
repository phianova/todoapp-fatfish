import React, { useState, useEffect, useRef } from "react";

import { View, Text, Button } from "react-native";
import type { TodoItem } from "../types";
import Checkbox from 'expo-checkbox';
import formatShortDate from "../utils/dates";

import ApiClient from "../utils/ApiClient";

import ToDoExpanded from "./ToDoExpanded";

interface Props {
    todo: TodoItem,
    expanded: boolean
}

export default function ToDoListItem({ todo, expanded }: Props) {

    const id = todo._id;
    const client = new ApiClient();
    const dueDate = formatShortDate(todo.dueDate.toString());
    const priorityColour = (todo.priority === 1) ? "red" : ((todo.priority === 2) ? "yellow" : (todo.priority === 3) ? "green" : "transparent");
    const isFirstRender = useRef(true);

    // State
    const [completedStyle, setCompletedStyle] = useState("none" as "line-through" | "none" | "underline" | "underline line-through" | undefined);
    const [isChecked, setChecked] = useState(todo.completed);
    const [isExpanded, setExpanded] = useState(expanded);
    const [isCompleted, setCompleted] = useState(todo.completed);

    //Actions
    const updateTodoCall = async (title: string, description: string, priority: number, dueDate: Date, completed: boolean) => {
        await client.updateTodo(id, title, description, priority, dueDate, completed, "warrenova@outlook.com");
    };

    //Effects
    useEffect(() => {
        if (isChecked) {
            setCompletedStyle("line-through");
        } else {
            setCompletedStyle("none");
        }
        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            setCompleted(isChecked);
            updateTodoCall(todo.title, todo.description, todo.priority, todo.dueDate, isCompleted);
        }
    }, [isChecked]);

    //View
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            {isExpanded &&
            <ToDoExpanded todo={todo} isChecked={isChecked}/>
            } 
            {!isExpanded &&
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Text style={{ textDecorationLine: completedStyle, backgroundColor: priorityColour }}>{todo.title}</Text>
                    <Text style={{ textDecorationLine: completedStyle, backgroundColor: priorityColour }}>{dueDate}</Text>
                </View>
            }
            <Checkbox value={isChecked} onValueChange={() => setChecked(!isChecked)} />
            <Button title={isExpanded ? "Collapse" : "Expand"} onPress={() => setExpanded(!isExpanded)}></Button>
        </View>
    );
}