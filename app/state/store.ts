
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import userReducer from './userSlice';

/*
index.ts
// State
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [todos, setTodos] = useState<TodoItem[]>([]);
// Actions
    const refreshTodos
    const todayTodos
// Effects
    refreshTodos
*/

/*
AddToDoModal.tsx
// Actions
    const onSubmit
    const addTodoCall
*/

/*
ToDoExpanded.tsx
// State
    const [isEditMode, setEditMode] = useState(false);
    const [editButtonTitle, setEditButtonTitle] = useState("Edit");
    const [completedStyle, setCompletedStyle] = useState("none" as "line-through" | "none" | "underline" | "underline line-through" | undefined);
// Actions
    const onSubmit
    const updateTodoCall
    const deleteToDoCall
    const onChangeField
// Effects
    isEditMode
    isChecked
    register
*/

/*
ToDoListItem.tsx
// State
    const [isExpanded, setExpanded] = useState(false);
    const [completedStyle, setCompletedStyle] = useState("none" as "line-through" | "none" | "underline" | "underline line-through" | undefined);
    const [isChecked, setChecked] = useState(false);
    const [isCompleted, setCompleted] = useState(false);
// Actions
    const updateTodoCall
// Effects
    isChecked
*/

export const store = configureStore({
    reducer: {
        todos: todoReducer,
        users: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



