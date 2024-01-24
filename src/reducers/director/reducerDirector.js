import { createSlice } from '@reduxjs/toolkit';

export const directorSlice = createSlice({
    name: 'directorSlice',
    initialState: {
        selectedDirector: {
            id: 0,
            name: "",
            birthdate: "",
            avatar: "",
            created_at: "",
            updated_at: "",
        },
        list: [],
        filtered: [],
    },
    reducers: {
        setListDirector: (state, action) => {
            state.list = action.payload.value;
            state.filtered = action.payload.value;
        },
        setSelectedDirector: (state, action) => {
            state.selectedDirector = action.payload.value;
        },
        deleteDirectorList: (state, action) => {
            const newList = state.list.filter(e => e.id !== action.payload.value)
            state.list = newList;
            state.filtered = newList;
        },
        reducerForm: (state, action) => {
            state.selectedDirector[action.payload.key] = action.payload.value;
        },
        cleanData: (state, action) => {
            state.selectedDirector = {
                id: 0,
                name: "",
                birthdate: "",
                avatar: "",
                created_at: "",
                updated_at: "",
            };
        },
        insertDirector: (state, action) => {
            state.list.push(action.payload.value);
            state.filtered.push(action.payload.value);
        },
        updateDirector: (state, action) => {
            const director = action.payload.value
            const modificadaList = state.list.map((e) => {
                if (e.id === director.id) {
                    return director
                }
                return e;
            });
            const modificadaListFilter = state.filtered.map((e) => {
                if (e.id === director.id) {
                    return director
                }
                return e;
            });
            state.list = modificadaList;
            state.filtered = modificadaListFilter;
            state.selectedDirector = {
                id: 0,
                name: "",
                birthdate: "",
                avatar: "",
                created_at: "",
                updated_at: "",
            };
        },
        searchTextDirector: (state, action) => {
            if (action.payload.value === "") {
                state.filtered = state.list;
                return;
            }
            const filtered = state.list.filter(e => e.name.toLowerCase().includes(action.payload.value.toLowerCase()))
            state.filtered = filtered;
        },
    },
});

export const {
    setListDirector,
    setSelectedDirector,
    deleteDirectorList,
    reducerForm,
    cleanData,
    insertDirector,
    updateDirector,
    searchTextDirector,
} = directorSlice.actions;

export default directorSlice.reducer;