import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TodoItem } from '../utils/types';
import ApiClient from '../utils/ApiClient';

// Type for Today Todos state
interface TodayTodoState {
    todayTodos: TodoItem[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null,
}

// Initial state for Today Todos
const initialState = {
    todayTodos: [{
        _id: 'todosNotSet',
        title: '',
        description: '',
        priority: 0,
        completed: false,
        dueDate: "",
        createdDate: "",
    }],
    status: 'idle',
    error: null
} as TodayTodoState;

const client = new ApiClient();

// Using the "extraReducers" builder allows for use of async "thunk" calls to API
// This keeps the state mapped directly to the database
export const todayTodoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchTodayTodos.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchTodayTodos.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.todayTodos = action.payload;
            })
            .addCase(fetchTodayTodos.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'Something went wrong'
                console.error(state.error)
            })

    }
});

export default todayTodoSlice.reducer;

export const fetchTodayTodos = createAsyncThunk('todos/fetchTodayTodos',
    // Fetches todos and filters only those todos that are due today
    async (userEmail: string) => {
        const todos: TodoItem[] = await client.getTodos(userEmail)
        const todayArray: TodoItem[] = []
        const today = new Date();
        if (!todos || todos.length === 0) {
            return [];
        }
        else {
        for (const todo of todos) {
            const dueDate = new Date(todo.dueDate);
            if (dueDate.getDate() === today.getDate() && dueDate.getMonth() === today.getMonth() && dueDate.getFullYear() === today.getFullYear()) {
                todayArray.push(todo)
            }
        }
        }
        return todayArray;
    });
