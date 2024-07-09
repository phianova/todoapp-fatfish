import React from "react";
import { fireEvent } from "@testing-library/react-native";
import { renderWithProviders } from "../../utils/test-utils";
import { addTodo } from "@/state/todoSlice";
import AddTodoModal from "../AddTodoModal";

/* eslint @typescript-eslint/no-explicit-any : "off" */

describe("AddTodoModal", () => {

    const setModalVisible = jest.fn();
    const userEmail = "test@me.com";

    it("renders correctly", () => {
        const tree = renderWithProviders(
            <AddTodoModal modalVisible={true} setModalVisible={setModalVisible} userEmail={userEmail} />
        );
        expect(tree).toMatchSnapshot();
    })

    it("calls setModalVisible(false) when cancel button is pressed", () => {
        const tree = renderWithProviders(
            <AddTodoModal modalVisible={true} setModalVisible={setModalVisible} userEmail={userEmail} />
        );
        fireEvent.press(tree.getByText("Cancel"));
        expect(setModalVisible).toHaveBeenCalledWith(false);
    })

    it("calls addTodo() when submit button is pressed", () => {
        const tree = renderWithProviders(
            <AddTodoModal modalVisible={true} setModalVisible={setModalVisible} userEmail={userEmail} />
        );
        fireEvent.changeText(tree.getByPlaceholderText("Title"), "Test");
        fireEvent.changeText(tree.getByPlaceholderText("Description"), "Test");
        fireEvent.changeText(tree.getByPlaceholderText("Priority"), "1");
        fireEvent.changeText(tree.getByPlaceholderText("Due Date"), "2021-01-01");
        fireEvent.press(tree.getByText("Add"));
        expect(addTodo).toHaveBeenCalledWith({ title: "Test", description: "Test", priority: 1, dueDate: "2021-01-01", userEmail });
        expect(setModalVisible).toHaveBeenCalledWith(false);
    })

    it("calls onChangeField() when text input is changed", () => {
        const tree = renderWithProviders(
            <AddTodoModal modalVisible={true} setModalVisible={setModalVisible} userEmail={userEmail} />
        );
        fireEvent.changeText(tree.getByPlaceholderText("Title"), "Test");
        expect(tree.getByPlaceholderText("Title").props.value).toBe("Test");
    })

    it("registers fields on mount", () => {
        const tree = renderWithProviders(
            <AddTodoModal modalVisible={true} setModalVisible={setModalVisible} userEmail={userEmail} />
        );
        expect(tree.getByPlaceholderText("Title")).toBeDefined();
        expect(tree.getByPlaceholderText("Description")).toBeDefined();
        expect(tree.getByPlaceholderText("Priority")).toBeDefined();
        expect(tree.getByPlaceholderText("Due Date")).toBeDefined();
    })

})