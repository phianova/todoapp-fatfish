import React from "react";
import { renderWithProviders } from "../../../utils/test-utils";

import Index from "../index";

describe("Index", () => {
    it("renders correctly", () => {
        const tree = renderWithProviders(<Index />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
})