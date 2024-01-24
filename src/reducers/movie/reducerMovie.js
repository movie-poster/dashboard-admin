import { createSlice } from '@reduxjs/toolkit';

export const movieSlice = createSlice({
    name: 'movieSlice',
    initialState: {
        selectedMovie: {
            id: 0,
            title: "",
            synopsis: "",
            year: 0,
            rating: 0,
            duration: 0,
            director_id: 0,
            state: false,
            actors: [],
            genres: [],
            created_at: "",
            updated_at: "",
            poster: "",
        },
        list: [],
        filtered: [],
        page: 0,
        pageSize: 10,
    },
    reducers: {
        setListMovie: (state, action) => {
            state.list = action.payload.value;
            state.filtered = action.payload.value;
        },
        setSelectedMovie: (state, action) => {
            state.selectedMovie = action.payload.value;
        },
        deleteMovieList: (state, action) => {
            const newList = state.list.filter(e => e.id !== action.payload.value)
            state.list = newList;
            state.filtered = newList;
        },
        reducerForm: (state, action) => {
            state.selectedMovie[action.payload.key] = action.payload.value;
        },
        cleanData: (state, action) => {
            state.selectedMovie = {
                id: 0,
                title: "",
                synopsis: "",
                year: 0,
                rating: 0,
                duration: 0,
                director_id: 0,
                state: false,
                director: {},
                actors: [],
                genres: [],
                created_at: "",
                updated_at: "",
                poster: "",
            };
        },
        insertMovie: (state, action) => {
            state.list.push(action.payload.value);
            state.filtered.push(action.payload.value);
        },
        updateMovie: (state, action) => {
            const movie = action.payload.value;
            const modificadaList = state.list.map((e) => {
                if (e.id === movie.id) {
                    return movie
                }
                return e;
            });
            const modificadaListFilter = state.filtered.map((e) => {
                if (e.id === movie.id) {
                    return movie
                }
                return e;
            });
            state.list = modificadaList;
            state.filtered = modificadaListFilter;
        },
        setCollectionsMovie: (state, action) => {
            switch (action.payload.collection) {
                case "change-actor":
                    state.selectedMovie.actors = action.payload.value;
                    break;
                case "change-genre":
                    state.selectedMovie.genres = action.payload.value;
                    break;

                default:
                    break;
            }
        },
        searchTextMovie: (state, action) => {
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
    setListMovie,
    setSelectedMovie,
    deleteMovieList,
    reducerForm,
    cleanData,
    insertMovie,
    updateMovie,
    searchTextMovie,
    setPage,
    setPageSize,
    setCollectionsMovie,
} = movieSlice.actions;

export default movieSlice.reducer;