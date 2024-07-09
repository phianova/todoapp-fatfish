import type { User } from '../types.ts';
import mongoose from 'mongoose';

const user = new mongoose.Schema<User>({
    email: { type: String, required: true },
    todos: [{
        // RefId populates with Todo records from todos collection
        refId: { type: mongoose.Schema.Types.ObjectId, ref: "Todo"},
    }]
});

export default mongoose.model<User>('User', user)