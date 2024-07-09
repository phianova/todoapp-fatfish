import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TodoItem, AddFormData, UpdateFormData, DeleteFormData } from '../utils/types';
import ApiClient from '../utils/ApiClient';

// Type for Todos state
interface TodoState {
    todos: TodoItem[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null,
}
// Initial state for Todos
const initialState = {
    todos: [{
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
} as TodoState;

const client = new ApiClient();

// Using the "extraReducers" builder allows for use of async "thunk" calls to API
// This keeps the state mapped directly to the database
export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<TodoItem[]>) => {
                state.status = 'succeeded'
                state.todos = action.payload
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'Something went wrong'
                console.error(state.error)
            })
            .addCase(addTodo.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.todos = action.payload;
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'Something went wrong'
                console.error(state.error)
            })
            .addCase(updateTodo.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.todos = action.payload;
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'Something went wrong'
                console.error(state.error)
            })
            .addCase(deleteTodo.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.todos = action.payload;
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'Something went wrong'
                console.error(state.error)
            })
    }
});

export default todoSlice.reducer;

// Calls the API via the API client meaning no async logic needed in pages/components
export const fetchTodos = createAsyncThunk('todos/fetchTodos',
    async (userEmail: string) => {
        const todos: TodoItem[] = await client.getTodos(userEmail)
        return todos;
    });

export const addTodo = createAsyncThunk('todos/addTodo',
    async (todo: AddFormData) => {
        await client.addTodo(todo.title, todo.description, todo.priority, todo.dueDate, todo.userEmail)
        const todos = await client.getTodos(todo.userEmail)
        return todos;
    })

export const updateTodo = createAsyncThunk('todos/updateTodo',
    async (todo: UpdateFormData) => {
        await client.updateTodo(todo._id, todo.title, todo.description, todo.priority, todo.dueDate, todo.completed, todo.userEmail,)
        const todos = await client.getTodos(todo.userEmail)
        return todos;
    })

export const deleteTodo = createAsyncThunk('todos/deleteTodo',
    async (todo: DeleteFormData) => {
        await client.deleteTodo(todo._id, todo.userEmail)
        const todos = await client.getTodos(todo.userEmail)
        return todos;
    })