import { createSlice } from '@reduxjs/toolkit';

export const actorSlice = createSlice({
    name: 'actorSlice',
    initialState: {
        selectedActor: {
            id: 0,
            name: "",
            birthdate: "",
            avatar: "",
            created_at: "",
            updated_at: "",
        },
        list: [],
        filtered: [],
        page: 0,
        pageSize: 10,
    },
    reducers: {
        setListActor: (state, action) => {
            state.list = action.payload.value;
            state.filtered = action.payload.value;
        },
        setSelectedActor: (state, action) => {
            state.selectedActor = action.payload.value;
        },
        deleteActorList: (state, action) => {
            const newList = state.list.filter(e => e.id !== action.payload.value)
            state.list = newList;
            state.filtered = newList;
        },
        reducerForm: (state, action) => {
            state.selectedActor[action.payload.key] = action.payload.value;
        },
        cleanData: (state, action) => {
            state.selectedActor = {
                id: 0,
                name: "",
                birthdate: "",
                avatar: "",
                created_at: "",
                updated_at: "",
            };
        },
        insertActor: (state, action) => {
            state.list.push(action.payload.value);
            state.filtered.push(action.payload.value);
        },
        updateActor: (state, action) => {
            const director = action.payload.value;
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
            state.selectedActor = {
                id: 0,
                name: "",
                birthdate: "",
                avatar: "",
                created_at: "",
                updated_at: "",
            };
        },
        searchTextActor: (state, action) => {
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
    setListActor,
    setSelectedActor,
    deleteActorList,
    reducerForm,
    cleanData,
    insertActor,
    updateActor,
    searchTextActor,
    setPage,
    setPageSize,
} = actorSlice.actions;

export default actorSlice.reducer;