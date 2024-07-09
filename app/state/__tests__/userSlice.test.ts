import reducer from "../userSlice";

describe("userSlice", () => {
    it("should handle initial state", () => {
        expect(reducer(undefined, { type: "unknown" })).toEqual({
            userEmail: "",
        });
    });
});
