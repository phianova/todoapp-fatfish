import { Modal, View, TextInput, Button, Text } from "react-native";
import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { addTodo } from "../state/todoSlice";
import { AddFormData } from "../utils/types";
import { useAppDispatch } from "../state/hooks";

// Types 
interface Props {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    userEmail: string;
}
interface FormData {
    title: string;
    description: string;
    priority: number;
    dueDate: string;
}

export default function AddTodoModal({ modalVisible, setModalVisible, userEmail }:Props) {
    const { setValue, handleSubmit, register } = useForm<FormData>();
    const dispatch = useAppDispatch();

    // Actions
    const onSubmit = useCallback((formData: FormData) => {
        const addFormData: AddFormData = { ...formData, userEmail };
        dispatch(addTodo(addFormData));
        setModalVisible(false);
    }, []);

    const onChangeField = useCallback((name: string) => (text: string) => {
        setValue(name as ("title" | "description" | "priority" | "dueDate"), text);
      }, []);

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