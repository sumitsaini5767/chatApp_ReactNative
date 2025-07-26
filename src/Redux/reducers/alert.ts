import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
    text?: string,
    isSuccess?: boolean,
}
const initialState: AlertState = {
    text: undefined,
    isSuccess: undefined,
};
const alert = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlertValue: (state, action: PayloadAction<AlertState>) => {
            return { ...state, ...action.payload };
        },
        emptyAlertState: () => {
            return initialState;
        }
    }
})

export const { setAlertValue, emptyAlertState } = alert.actions;
export default alert.reducer;