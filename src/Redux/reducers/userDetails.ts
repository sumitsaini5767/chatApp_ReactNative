import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: "user",
    initialState: false,
    reducers: {
        setUser: (state, action) => {
            state = action.payload;
            return state;
        },
        emptyUserdetails: (state, action) => {
            state = false;
            return state;
        }
    }
})
export const { setUser, emptyUserdetails } = user.actions;
export default user.reducer;