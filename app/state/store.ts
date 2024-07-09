
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import userReducer from './userSlice';
import todayTodoReducer from './todayTodoSlice';

export const store = configureStore({
    reducer: {
        todos: todoReducer,
        todayTodos: todayTodoReducer,
        users: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



