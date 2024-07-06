import { Modal, View, TextInput, Button, Text } from "react-native";
import React, { useState } from "react";
// import type { TodoItem } from "../types";


export default function AddToDoModal({ modalVisible, setModalVisible }: { modalVisible: boolean, setModalVisible: React.Dispatch<React.SetStateAction<boolean>>}) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState(1);
    const [dueDate, setDueDate] = useState(new Date());

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
                        value={title}
                        onChangeText={text => setTitle(text)}
                    />
                    <TextInput
                        placeholder="Description"
                        value={description}
                        onChangeText={text => setDescription(text)}
                    />
                    <TextInput
                        placeholder="Priority"
                        value={priority.toString()}
                        onChangeText={text => setPriority(parseInt(text))}
                    />
                    <TextInput
                        placeholder="Due Date"
                        value={dueDate.toLocaleDateString("en-GB")}
                        onChangeText={text => setDueDate(new Date(text))}
                    />
                    <View>
                        <Button
                            title="Cancel"
                            onPress={() => setModalVisible(false)}
                        />
                        <Button
                            title="Add"
                            onPress={() => {console.log("Adding todo"); 
                                // onAdd({id: 0, title, description, priority, createdDate: new Date(), dueDate, completed: false}); 
                                setModalVisible(false)}}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );

}