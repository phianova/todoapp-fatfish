import reducer from "../todoSlice";

describe("todoSlice", () => {
    it("should handle initial state", () => {
        expect(reducer(undefined, { type: "unknown" })).toEqual({
            todos: [{
                _id: '',
                title: '',
                description: '',
                priority: 0,
                completed: false,
                dueDate: "",
                createdDate: "",
            }],
            todayTodos: [{
                _id: '',
                title: '',
                description: '',
                priority: 0,
                completed: false,
                dueDate: "",
                createdDate: "",
            }],
            status: 'idle',
            error: null
        });
    });
});
