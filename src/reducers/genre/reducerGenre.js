import { createSlice } from '@reduxjs/toolkit';

export const genreSlice = createSlice({
    name: 'genreSlice',
    initialState: {
        selectedGenre: {
            id: 0,
            name: "",
            created_at: "",
            updated_at: "",
        },
        list: [],
        filtered: [],
        page: 0,
        pageSize: 10,
    },
    reducers: {
        setListGenre: (state, action) => {
            state.list = action.payload.value;
            state.filtered = action.payload.value;
        },
        setSelectedGenre: (state, action) => {
            state.selectedGenre = action.payload.value;
        },
        deleteGenreList: (state, action) => {
            const newList = state.list.filter(e => e.id !== action.payload.value)
            state.list = newList;
            state.filtered = newList;
        },
        reducerForm: (state, action) => {
            state.selectedGenre[action.payload.key] = action.payload.value;
        },
        cleanData: (state, action) => {
            state.selectedGenre = {
                id: 0,
                name: "",
                created_at: "",
                updated_at: "",
            };
        },
        insertGenre: (state, action) => {
            state.list.push(action.payload.value);
            state.filtered.push(action.payload.value);
        },
        searchTextGenre: (state, action) => {
            if (action.payload.value === "") {
                state.filtered = state.list;
                return;
            }
            const filtered = state.list.filter(e => e.name.toLowerCase().includes(action.payload.value.toLowerCase()))
            state.filtered = filtered;
        },
        setPage: (state, action) => {
            state.page = action.payload.value;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload.value;
        },
    },
});

export const {
    setListGenre,
    setSelectedGenre,
    deleteGenreList,
    reducerForm,
    cleanData,
    insertGenre,
    searchTextGenre,
    setPage,
    setPageSize,
} = genreSlice.actions;

export default genreSlice.reducer;