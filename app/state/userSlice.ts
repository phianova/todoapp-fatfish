import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    userEmail: string,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
}

const initialState = {
    userEmail: "emailNotSet",
    status: 'idle',
} as UserState;

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInUser: (state, action: PayloadAction<string>) => {
            state.userEmail = action.payload;
            state.status = 'succeeded';
        },
        signOutUser: (state) => {
            state.userEmail = "";
        },
    },
});

export const { signInUser, signOutUser } = userSlice.actions;

export default userSlice.reducer;