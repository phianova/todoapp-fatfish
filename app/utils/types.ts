// Type for todo item received from backend
export interface TodoItem {
    _id: string;
    title: string;
    description: string;
    priority: number;
    createdDate: string;
    dueDate: string;
    completed: boolean;
}

// Type for user received from backend
export interface User {
    _id: string;
    email: string;
    todos: TodoRef[];
}

// Type for todo reference received from backend
export interface TodoRef {
    refId: TodoItem;
}

// Type for Clerk/Expo Secure Store token cache
export interface TokenCache {
    getToken: (key: string) => Promise<string | undefined | null>;
    saveToken: (key: string, token: string) => Promise<void>;
    clearToken?: (key: string) => void;
}

//// Types for form data
// Type for data to be passed to addTodo
export interface AddFormData {
    title: string,
    description: string,
    priority: number,
    dueDate: string,
    userEmail: string,
}
// Type for data to be passed to updateTodo
export interface UpdateFormData {
    _id: string,
    title: string,
    description: string,
    priority: number,
    dueDate: string,
    userEmail: string,
    completed: boolean,
}
// Type for data to be passed to deleteTodo
export interface DeleteFormData {
    _id: string,
    userEmail: string,
}