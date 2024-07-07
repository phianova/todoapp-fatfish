// Define type for todo item
export interface TodoItem {
    _id: string;
    title: string;
    description: string;
    priority: number;
    createdDate: Date;
    dueDate: Date;
    completed: boolean;
}

// Define type for user
export interface User {
    _id: string;
    name: string;
    email: string;
    todos: TodoRef[];
}

// Define type for todo item reference
export interface TodoRef {
    refId: TodoItem;
}