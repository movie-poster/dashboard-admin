import { createSlice } from "@reduxjs/toolkit";
import { formatDate } from "../../utils/formatDate";

const virtualNotaryProcessSlice = createSlice({
    name: 'virtualNotaryProcessSlice',
    initialState: {
        dataFilter: {
            form_id: 0,
            date_sent: "",
            status: "",
        },
        elatedDocuments: [],
        elatedDocumentsFiltered: [],
    },
    reducers: {
        reducerForm: (state, action) => {
            state.dataFilter[action.payload.key] = action.payload.value;
        },
        fillElatedDocuments: (state, action) => {
            state.elatedDocuments = action.payload.value;
            state.elatedDocumentsFiltered = action.payload.value;
        },
        applyFilters: (state, action) => {
            const typeFormFilter = document => parseInt(state.dataFilter.form_id) !== 0 ? document.form_id === parseInt(state.dataFilter.form_id) : true;

            const dateFilter = document => state.dataFilter.date_sent !== "" ? formatDate(document.date_sent) === state.dataFilter.date_sent : true;

            const statusFilter = document => state.dataFilter.status !== "" ? document.status === state.dataFilter.status : true;

            state.elatedDocumentsFiltered = state.elatedDocuments
            .filter(typeFormFilter)
            .filter(dateFilter)
            .filter(statusFilter);
        },
        clearFilter: (state, action) => {
            state.dataFilter = { form_id: 0, date_sent: "", status: "" };
        },
    }
})

export const {
    reducerForm,
    fillElatedDocuments,
    applyFilters,
    clearFilter,
} = virtualNotaryProcessSlice.actions;

export default virtualNotaryProcessSlice.reducer;