import React from "react";
import { renderWithProviders } from "../../../utils/test-utils";

import SignUpScreen from "../sign-up";

describe("SignInScreen", () => {
    it("renders correctly", () => {
        const tree = renderWithProviders(<SignUpScreen />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
})