import { createSlice } from '@reduxjs/toolkit';

export const toastSlice = createSlice({
    name: 'toastSlice',
    initialState: {
        dataToast: {
            type: "",
            message: "",
        },
        show: false,
    },
    
    reducers: {
        showToast: (state, action) => {
            state.dataToast = action.payload;
            state.show = true;
        },
        hideToast: (state, action) => {
            state.show = false;
        },
    }
});

export const {
    showToast,
    hideToast,
} = toastSlice.actions;

export default toastSlice.reducer;