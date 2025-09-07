import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    token?: string;
    name?: string;
    email?: string;
    _id?:string;
    image?:string;
}

const initialState: UserState = {
    token: undefined,
    name: undefined,
    email: undefined,
    _id:undefined,
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