import type { User } from '../types.ts';
import mongoose from 'mongoose';

const user = new mongoose.Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    todos: {
        refId: { type: mongoose.Schema.Types.ObjectId, ref: "Todo" },
    }
},
    { collection: "users" }
);

export default mongoose.model<User>('User', user)