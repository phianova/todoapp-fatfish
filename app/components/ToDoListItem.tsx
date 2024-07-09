import React, { useState, useEffect, useRef } from "react";

import { View, Text, Button } from "react-native";
import type { TodoItem } from "../utils/types";
import Checkbox from 'expo-checkbox';
import formatShortDate from "../utils/dates";

import { useAppDispatch, useAppSelector } from "../state/hooks";
import { updateTodo } from "../state/todoSlice";
import { UpdateFormData } from "../utils/types";


import TodoExpanded from "./TodoExpanded";

interface Props {
    todo: TodoItem,
    expanded: boolean,
}

export default function TodoListItem({ todo, expanded }: Props) {

    const id = todo._id;
    const dueDate = formatShortDate(todo.dueDate.toString());
    const priorityColour = (todo.priority === 1) ? "red" : ((todo.priority === 2) ? "yellow" : (todo.priority === 3) ? "green" : "transparent");
    const isFirstRender = useRef(true);

    const dispatch = useAppDispatch();
    const userEmail = useAppSelector((state) => state.users.userEmail);

    // State
    const [completedStyle, setCompletedStyle] = useState("none" as "line-through" | "none" | "underline" | "underline line-through" | undefined);
    const [isChecked, setChecked] = useState(todo.completed);
    const [isExpanded, setExpanded] = useState(expanded);

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

    //View
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            {isExpanded &&
            <TodoExpanded todo={todo} isChecked={isChecked}/>
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