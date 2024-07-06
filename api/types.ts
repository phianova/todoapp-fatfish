// Define type for todo item
export interface TodoItem {
    id: number;
    title: string;
    description: string;
    priority: number;
    createdDate: string;
    dueDate: string;
    completed: boolean;
}

// Define type for user
export interface User {
    id: number;
    name: string;
    email: string;
    todos: TodoItem[];
}