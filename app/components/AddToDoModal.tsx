import { Modal, View, TextInput, Button, Text } from "react-native";
import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";

import ApiClient from "../utils/ApiClient";

// Types 
interface FormData {
    title: string;
    description: string;
    priority: number;
    dueDate: Date;
}

export default function AddToDoModal({ modalVisible, setModalVisible }: { modalVisible: boolean, setModalVisible: React.Dispatch<React.SetStateAction<boolean>>}) {
    const { setValue, handleSubmit, register } = useForm<FormData>();
    const client = new ApiClient();

    // Actions
    const onSubmit = useCallback((formData: FormData) => {
        console.log(formData);
        addTodoCall(formData.title, formData.description, formData.priority, formData.dueDate);
        setModalVisible(false);
    }, []);

    const onChangeField = useCallback((name: string) => (text: string) => {
        setValue(name as ("title" | "description" | "priority" | "dueDate"), text);
      }, []);

    const addTodoCall = async (title: string, description: string, priority: number, dueDate: Date) => {
        await client.addTodo(title, description, priority, dueDate, "warrenova@outlook.com");
        console.log("todo added");
        setModalVisible(false);
    }

    // Effects
    useEffect(() => {
        register("title");
        register("description");
        register("priority");
        register("dueDate");
    }, [register]);

    // View
    return (
        <Modal
            animationType="slide"
            transparent={true}
            presentationStyle="overFullScreen"
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={{ height: "100%", width: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: "center"}}>
            <View style={{ flexDirection: "column", justifyContent: "center", alignContent: "center", padding: 20, backgroundColor: "white"}}>
                    <Text>Add To Do</Text>
                    <TextInput
                        placeholder="Title"
                        onChangeText={onChangeField("title")}
                    />
                    <TextInput
                        placeholder="Description"
                        onChangeText={onChangeField("description")}
                    />
                    <TextInput
                        placeholder="Priority"
                        onChangeText={onChangeField("priority")}
                    />
                    <TextInput
                        placeholder="Due Date"
                        onChangeText={onChangeField("dueDate")}
                    />
                    <View>
                        <Button
                            title="Cancel"
                            onPress={() => setModalVisible(false)}
                        />
                        <Button
                            title="Add"
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );

}