import mongoose from 'mongoose';
// Type for todo item in DB
export interface TodoItem {
    _id: mongoose.Schema.Types.ObjectId;
    title: string;
    description: string;
    priority: number;
    createdDate: Date;
    dueDate: Date;
    completed: boolean;
}

// Type for user in DB
export interface User {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
    todos: TodoRef[];
}

// Type for todo item reference - i.e. object in array in user.todos
export interface TodoRef {
    refId: TodoItem;
}
