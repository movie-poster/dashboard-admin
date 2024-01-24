import { createSlice } from '@reduxjs/toolkit';

export const alertConsumptionSlice = createSlice({
    name: 'alertConsumptionSlice',
    initialState: {
        data: {
            type: "",
            message: "",
            percentage: 0,
        },
        show: false,
    },
    reducers: {
        showAlert: (state, action) => {
            state.data = action.payload.value;
            state.show = true;
        },
        hideAlert: (state, action) => {
            state.show = false;
        },
    },
});

export const {
    showAlert,
    hideAlert,
} = alertConsumptionSlice.actions;

export default alertConsumptionSlice.reducer;