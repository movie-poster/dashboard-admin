import { createSlice } from '@reduxjs/toolkit';

export const loadingStateSlice = createSlice({
    name: 'loadingStateSlice',
    initialState: {
        loading: false,
        show: false,
    },
    reducers: {
        showLoading: (state) => {
            state.show = true;
            state.loading = true;
        },
        hideLoading: (state) => {
            state.show = false;
            state.loading = false;
        },
    },
});

export const {
    showLoading,
    hideLoading,
} = loadingStateSlice.actions;

export default loadingStateSlice.reducer;