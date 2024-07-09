import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import type { TodoItem, UpdateFormData, DeleteFormData } from "../utils/types";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { updateTodo, deleteTodo } from "../state/todoSlice";
import { formatLongDate } from "../utils/dates";

//// Types
interface Props {
    todo: TodoItem,
    isChecked: boolean,
}
interface FormData {
    title: string;
    description: string;
    priority: number;
    dueDate: string;
}
export default function ToDoExpanded({ todo, isChecked }: Props) {
    //// Setup
    const dueDate = formatLongDate(todo.dueDate.toString());
    const id = todo._id;
    const dispatch = useAppDispatch();
    // Form setup - make default values match current state
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

    //// State
    // Global State
    const userEmail = useAppSelector((state) => state.users.userEmail);
    // Local State
    const [isEditMode, setEditMode] = useState(false);
    const [editButtonTitle, setEditButtonTitle] = useState("Edit");
    const [completedStyle, setCompletedStyle] = useState("none" as "line-through" | "none" | "underline" | "underline line-through" | undefined);

    //// Actions
    // Submit form - updates todo in global state (which then gets todos from backend via thunk)
    // Also checks for unintended blank or undefined input values
    // Manually fetches today's todos after updating as these don't update automatically in update dispatch call
    const onSubmit = useCallback((formData: FormData) => {
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

        const updateData : UpdateFormData = {
            _id: id,
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
            dueDate: formData.dueDate,
            completed: isChecked,
            userEmail: userEmail
        }
        dispatch(updateTodo(updateData));
        setEditMode(false);
    }, []);

    // Delete - deletes todo in global state (which then gets todos from backend via thunk)
    const onDelete = () => {
        const deleteData : DeleteFormData = {
            _id: id,
            userEmail: userEmail
        }
        dispatch(deleteTodo(deleteData));
    };

    // Field change - updates state of form elements with field values ( using react-hook-form )
    const onChangeField = useCallback((name: string) => (text: string) => {
        setValue(name as ("title" | "description" | "priority" | "dueDate"), text);
    }, []);

    //// Effects
    // Changes button title and updates today's todos when edit mode is closed
    useEffect(() => {
        if (isEditMode) {
            setEditButtonTitle("Cancel");
        } else {
            setEditButtonTitle("Edit");
        }
    }, [isEditMode]);

    // Changes completed style when checkbox is toggled
    useEffect(() => {
        if (isChecked) {
            setCompletedStyle("line-through");
        } else {
            setCompletedStyle("none");
        }
    }, [isChecked]);

    // Registers form field inputs with react-hook-form
    useEffect(() => {
        register("title");
        register("description");
        register("priority");
        register("dueDate");
    }, [register]);

    // Manually fetches today's todos after updating as these don't update automatically in update dispatch call


    return (
        <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start" }}>
                    {isEditMode && (
                        <>
                            <TextInput style={{...styles.title, textDecorationLine: completedStyle}}
                                placeholder={todo.title}
                                defaultValue={todo.title}
                                onChangeText={onChangeField("title")}
                            />
                            <TextInput style={styles.text}
                                placeholder={dueDate}
                                defaultValue={dueDate}
                                onChangeText={onChangeField("dueDate")}
                            />
                            <TextInput style={styles.text}
                                placeholder={todo.description}
                                defaultValue={todo.description}
                                onChangeText={onChangeField("description")}
                            />
                            <TextInput style={styles.text}
                                placeholder={todo.priority.toString()}
                                defaultValue={todo.priority.toString()}
                                onChangeText={onChangeField("priority")}
                            />
                        </>
                    )}
                    {!isEditMode && (
                        <>
                            <Text style={{ ...styles.title, textDecorationLine: completedStyle }}>{todo.title}</Text>
                            <Text style={styles.text}>Due: {dueDate}</Text>
                            <Text style={styles.text}>{todo.description}</Text>
                        </>
                    )}
                    <View style={styles.buttonContainer}>
                        <Button color="orange" title={editButtonTitle} onPress={() => setEditMode(!isEditMode)}></Button>
                        <Button color="red"title="Delete" onPress={onDelete}></Button>
                        {isEditMode &&
                            <Button color="green" title="Save" onPress={handleSubmit(onSubmit)}></Button>
                        }
                    </View>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        padding: 3
    },
    text: {
        padding: 3
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: 20,
        gap: 20
    }
});