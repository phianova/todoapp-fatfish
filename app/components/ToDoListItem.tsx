import React, { useState, useEffect } from "react";

import { View, Text, Button } from "react-native";
import type { TodoItem } from "../types";
import Checkbox from 'expo-checkbox';

import ToDoExpanded from "./ToDoExpanded";

interface Props {
    todo: TodoItem,
    expanded: boolean
}

export default function ToDoListItem({ todo, expanded }: Props) {

    // props to display - title, priority colour, due date, completed

    const [priorityColour, setPriorityColour] = useState("transparent");
    const [completedStyle, setCompletedStyle] = useState("none" as "line-through" | "none" | "underline" | "underline line-through" | undefined);
    const [isChecked, setChecked] = useState(false);
    const [isExpanded, setExpanded] = useState(expanded);

    const styledDate = todo.dueDate.getDate() + "/" + (todo.dueDate.getMonth() + 1);

    useEffect(() => {
        if (todo.priority === 1) {
            setPriorityColour("red");
        } else if (todo.priority === 2) {
            setPriorityColour("yellow");
        } else if (todo.priority === 3) {
            setPriorityColour("green");
        }
        if (todo.completed || isChecked) {
            setCompletedStyle("line-through");
            setChecked(true);
        } else {
            setCompletedStyle("none");
            setChecked(false);
        }
    }, [todo, isChecked]);

    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            {isExpanded &&
            <ToDoExpanded todo={todo}/>
            } 
            {!isExpanded &&
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Text style={{ textDecorationLine: completedStyle, backgroundColor: priorityColour }}>{todo.title}</Text>
                    <Text style={{ textDecorationLine: completedStyle, backgroundColor: priorityColour }}>{styledDate}</Text>
                    <Checkbox value={isChecked} onValueChange={setChecked} />
                </View>
            }
            <Button title={isExpanded ? "Collapse" : "Expand"} onPress={() => setExpanded(!isExpanded)}></Button>
        </View>
    );
}