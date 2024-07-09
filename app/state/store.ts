
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import userReducer from './userSlice';

const rootReducer = combineReducers({
    users: userReducer,
    todos: todoReducer
});
export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
    reducer: rootReducer,
    preloadedState,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type Store = ReturnType<typeof setupStore>;
export type AppDispatch = Store['dispatch'];




