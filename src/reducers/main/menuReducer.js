import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
    name: 'menuSlice',
    initialState: {
        isExpanded: true,
        expandDocument: false,
    },
    reducers: {
        setIsExpanded: (state, action) => {
            state.isExpanded = !state.isExpanded;
        },
        setExpandDocument: (state, action) => {
            state.expandDocument = action.payload.value;
        },
        setExpandDocumentToggle: (state, action) => {
            state.expandDocument = !state.expandDocument;
        },
    }
});

export const {
    setIsExpanded,
    setExpandDocument,
    setExpandDocumentToggle,
} = menuSlice.actions;

export default menuSlice.reducer;