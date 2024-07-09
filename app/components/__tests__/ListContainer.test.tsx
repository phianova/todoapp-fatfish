import React from "react";
import { render } from "@testing-library/react-native";
// import { renderWithProviders } from "../../utils/test-utils";
import ListContainer from "../ListContainer";

/* eslint @typescript-eslint/no-explicit-any : "off" */

describe("ListContainer", () => {

    it("renders correctly", () => {
        const tree = render(<ListContainer todos={[{
                _id: "1",
                title: "Test",
                description: "Test",
                priority: 1,
                dueDate: "2021-01-01",
                createdDate: "2021-01-01",
                completed: false
            },
            {
                _id: "2",
                title: "Test",
                description: "Test", 
                priority: 1, 
                dueDate: "2021-01-01", 
                createdDate: "2021-01-01", 
                completed: false
            }]}
                listTitle="Test todos" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
})