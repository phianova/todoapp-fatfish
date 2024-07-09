import React from "react";
import { renderWithProviders } from "../../utils/test-utils";

import TodoListItem from "../TodoListItem";

/* eslint @typescript-eslint/no-explicit-any : "off" */

describe ("TodoListItem", () => {
    
it("renders correctly", () => {
    const tree = renderWithProviders(<TodoListItem todo={{
            _id: "1",
            title: "Test",
            description: "Test",
            priority: 1,
            dueDate: "2021-01-01",
            createdDate: "2021-01-01",
            completed: false
        }} expanded={true}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

});