import React from "react";
import { renderWithProviders } from "../../utils/test-utils";

import TodoExpanded from "../TodoExpanded";

/* eslint @typescript-eslint/no-explicit-any : "off" */

describe("TodoExpanded", () => {
    it("renders correctly", () => {
        const tree = renderWithProviders(<TodoExpanded todo={{
                _id: "1",
                title: "Test",
                description: "Test",
                priority: 1,
                dueDate: "2021-01-01",
                createdDate: "2021-01-01",
                completed: false
            }} isChecked={false} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
})