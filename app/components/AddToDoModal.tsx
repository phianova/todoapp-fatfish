import { Modal, View, TextInput, Button, Text, StyleSheet } from "react-native";
import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { addTodo } from "../state/todoSlice";
import { AddFormData } from "../utils/types";
import { useAppDispatch, useAppSelector } from "../state/hooks";

// Types 
interface Props {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
interface FormData {
    title: string;
    description: string;
    priority: number;
    dueDate: string;
}

export default function AddToDoModal({ modalVisible, setModalVisible }: Props) {
    //// Setup
    const { setValue, handleSubmit, register } = useForm<FormData>();
    const dispatch = useAppDispatch();

    //// State
    const userEmail = useAppSelector((state) => state.users.userEmail);

    //// Actions
    // Submit form - adds todo to global state (which then gets todos from backend via thunk) and closes modal
    const onSubmit = useCallback((formData: FormData) => {
        const addFormData: AddFormData = { ...formData, userEmail };
        dispatch(addTodo(addFormData));
        setModalVisible(false);
    }, []);

    // Field change - updates state of form elements with field values ( using react-hook-form )
    const onChangeField = useCallback((name: string) => (text: string) => {
        setValue(name as ("title" | "description" | "priority" | "dueDate"), text);
    }, []);

    //// Effects
    // Registers form field inputs with react-hook-form
    useEffect(() => {
        register("title");
        register("description");
        register("priority");
        register("dueDate");
    }, [register]);

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
            <View style={{ height: "100%", width: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: "center" }}>
                <View style={{ flexDirection: "column", justifyContent: "center", alignContent: "center", padding: 20, backgroundColor: "white" }}>
                    <Text style={styles.title}>Add To Do</Text>
                    <View style={styles.inputLabelContainer}>
                        <Text>Title:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            onChangeText={onChangeField("title")}
                        />
                    </View>
                    <View style={styles.inputLabelContainer}>
                        <Text>Description:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            onChangeText={onChangeField("description")}
                        />
                    </View>
                    <View style={styles.inputLabelContainer}>
                        <Text>Priority (1-3):</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Priority"
                            onChangeText={onChangeField("priority")}
                        />
                    </View>
                    <View style={styles.inputLabelContainer}>
                        <Text>Due Date:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Due Date"
                            onChangeText={onChangeField("dueDate")}
                        />
                    </View>
                    <View>
                        <Button
                            color="gray"
                            title="Cancel"
                            onPress={() => setModalVisible(false)}
                        />
                        <Button
                            color="green"
                            title="Add"
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );

}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    inputLabelContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        gap: 10
    },
    input: {
        borderColor: "gray",
        borderRadius: 5,
        backgroundColor: "lightgray",
        borderWidth: 1,
        padding: 5,
    },
})