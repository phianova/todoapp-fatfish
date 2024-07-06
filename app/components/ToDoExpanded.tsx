import React, { useState, useEffect } from "react";

import { View, Text, Button } from "react-native";
import type { TodoItem } from "../types";
import Checkbox from 'expo-checkbox';

interface Props {
    todo: TodoItem
}

export default function ToDoExpanded({ todo }: Props) {

    // props to display - title, priority colour, due date, completed

    const [priorityColour, setPriorityColour] = useState("transparent");
    const [completedStyle, setCompletedStyle] = useState("none" as "line-through" | "none" | "underline" | "underline line-through" | undefined);
    const [isChecked, setChecked] = useState(false);

    const styledDate = todo.dueDate.toLocaleDateString("en-GB");

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
        <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Text style={{ textDecorationLine: completedStyle, backgroundColor: priorityColour, fontWeight: "bold" }}>{todo.title}</Text>
                <Text style={{ textDecorationLine: completedStyle, backgroundColor: priorityColour }}>Due: {styledDate}</Text>
                <Text style={{ textDecorationLine: completedStyle, backgroundColor: priorityColour }}>{todo.description}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Button title="Edit" onPress={() => console.log("Edit")}></Button>
                <Button title="Delete" onPress={() => console.log("Delete")}></Button>
            </View>
            </View>
                <Checkbox value={isChecked} onValueChange={setChecked} />
            </View>
        </View>
    );
}