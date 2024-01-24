import { createSlice } from '@reduxjs/toolkit';

export const recoverCredentialsSlice = createSlice({
    name: 'recoverCredentials',
    initialState: {
        recoverOptions: {
            is_email: "0",
            value: "",
        },
        changePassword: {
            password: "",
            confirm_password: "",
        },
    },
    reducers: {
        reducerForm: (state, action) => {
            state.recoverOptions[action.payload.key] = action.payload.value;
        },
        cleanData: (state, action) => {
            state.recoverOptions = {
                is_email: "0",
                value: "",
            };
        },
        reducerFormChangePassword: (state, action) => {
            state.changePassword[action.payload.key] = action.payload.value;
        },
        cleanDataChangePassword: (state, action) => {
            state.changePassword = {
                password: "",
                confirm_password: "",
            };
        },
    }
});

export const {
    reducerForm,
    cleanData,
    reducerFormChangePassword,
    cleanDataChangePassword,
} = recoverCredentialsSlice.actions;
export default recoverCredentialsSlice.reducer;
