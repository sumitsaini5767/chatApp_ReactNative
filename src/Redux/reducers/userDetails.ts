import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    token?: string;
    name?: string;
    email?: string;
}

const initialState: UserState = {
    token: undefined,
    name: undefined,
    email: undefined,
};

const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            return { ...state, ...action.payload };
        },
        emptyUserdetails: () => {
            return initialState;
        }
    }
});

export const { setUser, emptyUserdetails } = user.actions;
export default user.reducer;