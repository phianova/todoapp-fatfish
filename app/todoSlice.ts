import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoItem } from './types';
// import ApiClient from './utils/ApiClient';

// const client = new ApiClient();

// Define a type for the slice state
interface TodoState {
    todos: TodoItem[]
}

const initialState = {
    todos: [],
} as TodoState;

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<TodoItem>) => {
            state.todos.push(action.payload);
        },
    },
});

export const { addTodo } = todoSlice.actions;
// export const selectTodos = async (state: { todo: TodoState }) => {
//     console.log(state.todo.todos);
//     await client.getTodos("warrenova@outlook.com")
//     .then((todos) => {
//       state.todo.todos = todos;
//     }).catch((err) => {
//       console.log(err);
//     });
//     return state.todo.todos;
// };


export default todoSlice.reducer;