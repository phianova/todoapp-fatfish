import type { TodoItem } from '../types';
import mongoose from 'mongoose';

const todo = new mongoose.Schema<TodoItem>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: Number, required: true },
    createdDate: { type: String, required: true },
    dueDate: { type: String, required: true },
    completed: { type: Boolean, required: true },
});

export default mongoose.model<TodoItem>('Todo', todo)