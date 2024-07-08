import type { User } from '../types.ts';
import mongoose from 'mongoose';

const user = new mongoose.Schema<User>({
    // id: { type: mongoose.Schema.Types.ObjectId, required: false },
    email: { type: String, required: true },
    todos: [{
        refId: { type: mongoose.Schema.Types.ObjectId, ref: "Todo"},
    }]
});

export default mongoose.model<User>('User', user)