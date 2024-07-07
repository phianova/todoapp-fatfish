import React, { useState, useEffect, useCallback } from "react";

import { View, Text, Button, TextInput } from "react-native";
import type { TodoItem } from "../types";
import { useForm } from "react-hook-form";

import ApiClient from "../utils/ApiClient";
import formatLongDate from "../utils/dates";

interface Props {
    todo: TodoItem,
    isChecked: boolean
}
interface FormData {
    title: string;
    description: string;
    priority: number;
    dueDate: Date;
}
export default function ToDoExpanded({ todo, isChecked }: Props) {
    const { setValue, handleSubmit, register } = useForm<FormData>(
        {
            defaultValues: {
                title: todo.title,
                description: todo.description,
                priority: todo.priority,
                dueDate: todo.dueDate
            }
        }
    );
    const [isEditMode, setEditMode] = useState(false);
    const [editButtonTitle, setEditButtonTitle] = useState("Edit");

    const id = todo._id;

    const client = new ApiClient();

    const priorityColour = (todo.priority === 1) ? "red" : ((todo.priority === 2) ? "yellow" : (todo.priority === 3) ? "green" : "transparent");
    const [completedStyle, setCompletedStyle] = useState("none" as "line-through" | "none" | "underline" | "underline line-through" | undefined);

    const dueDate = formatLongDate(todo.dueDate.toString());

    const onSubmit = useCallback((formData: FormData) => {
        console.log(formData);
        if (formData.title === "" || formData.title === undefined) {
            formData.title = todo.title;
        }
        if (formData.description === "" || formData.description === undefined) {
            formData.description = todo.description;
        }
        if (formData.dueDate === undefined || formData.dueDate.toString() === "") {
            formData.dueDate = todo.dueDate;
        }
        if (formData.priority === undefined || formData.priority.toString() === "") {
            formData.priority = todo.priority;
        }

        console.log(formData);
        updateTodoCall(formData.title, formData.description, formData.priority, formData.dueDate, isChecked);
        setEditMode(false);
    }, []);

    const updateTodoCall = async (title: string, description: string, priority: number, dueDate: Date, completed: boolean) => {
        console.log("id: ", id);
        await client.updateTodo(id, title, description, priority, dueDate, completed, "warrenova@outlook.com");
    };

    const deleteToDoCall = async () => {
        await client.deleteTodo(id, "warrenova@outlook.com");
    }

    useEffect(() => {
        if (isEditMode) {
            setEditButtonTitle("Cancel");
        } else {
            setEditButtonTitle("Edit");
        }
    }, [isEditMode]);

    useEffect(() => {
        if (isChecked) {
            setCompletedStyle("line-through");
        } else {
            setCompletedStyle("none");
        }
    }, [isChecked]);

    useEffect(() => {
        register("title");
        register("description");
        register("priority");
        register("dueDate");
    }, [register]);

    const onChangeField = useCallback((name: string) => (text: string) => {
        setValue(name as ("title" | "description" | "priority" | "dueDate"), text);
    }, []);

    return (
        <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start" }}>
                    {isEditMode && (
                        <>
                            <TextInput style={{ textDecorationLine: completedStyle, backgroundColor: priorityColour, fontWeight: "bold" }}
                                placeholder={todo.title}
                                defaultValue={todo.title}
                                onChangeText={onChangeField("title")}
                            />
                            <TextInput style={{ textDecorationLine: completedStyle, backgroundColor: priorityColour }}
                                placeholder={dueDate}
                                defaultValue={dueDate}
                                onChangeText={onChangeField("dueDate")}
                            />
                            <TextInput style={{ textDecorationLine: completedStyle, backgroundColor: priorityColour }}
                                placeholder={todo.description}
                                defaultValue={todo.description}
                                onChangeText={onChangeField("description")}
                            />
                            <TextInput style={{ textDecorationLine: completedStyle, backgroundColor: priorityColour }}
                                placeholder={todo.priority.toString()}
                                defaultValue={todo.priority.toString()}
                                onChangeText={onChangeField("priority")}
                            />
                        </>
                    )}
                    {!isEditMode && (
                        <>
                            <Text style={{ textDecorationLine: completedStyle, backgroundColor: priorityColour, fontWeight: "bold" }}>{todo.title}</Text>
                            <Text style={{ textDecorationLine: completedStyle, backgroundColor: priorityColour }}>Due: {dueDate}</Text>
                            <Text style={{ textDecorationLine: completedStyle, backgroundColor: priorityColour }}>{todo.description}</Text>
                        </>
                    )}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Button title={editButtonTitle} onPress={() => setEditMode(!isEditMode)}></Button>
                        <Button title="Delete" onPress={() => deleteToDoCall()}></Button>
                        {isEditMode &&
                            <Button title="Save" onPress={handleSubmit(onSubmit)}></Button>
                        }
                    </View>
                </View>
            </View>

        </View>
    );
}