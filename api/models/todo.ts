import type { TodoItem } from '../types';
import mongoose from 'mongoose';

const todo = new mongoose.Schema<TodoItem>({
    // id: { type: mongoose.Schema.Types.ObjectId, required: false },
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: Number, required: true },
    createdDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    completed: { type: Boolean, required: true },
},
{ collection: "todos" }
);

export default mongoose.model<TodoItem>('Todo', todo)