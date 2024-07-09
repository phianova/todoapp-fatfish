import React from "react";
import { renderWithProviders } from "../../../utils/test-utils";

import SignInScreen from "../sign-in";

describe("SignInScreen", () => {
    it("renders correctly", () => {
        const tree = renderWithProviders(<SignInScreen />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
})