import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    userEmail: string
}

const initialState = {
    userEmail: "",
} as UserState;

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInUser: (state, action: PayloadAction<string>) => {
            state.userEmail = action.payload;
        },
        signOutUser: (state) => {
            state.userEmail = "";
        },
    },
});

export const { signInUser, signOutUser } = userSlice.actions;

export default userSlice.reducer;