
import { createSlice } from '@reduxjs/toolkit';

export const accessSlice = createSlice({
  name: 'accessSlice',
  initialState: {
    dataAccess: {
      id: 0,
      name: "",
      level: "",
    },
    list: [],
    listFilter: [],
    isLoading: true,
    filterLevel: []
  },
  reducers: {
    setDataAccess: (state, action) => {
      state.dataAccess[action.payload.key] = action.payload.value
    },
    setAccess: (state, action) => {
      const sorted = action.payload.value;
      sorted.sort((a, b) => a.level - b.level);
      state.list = sorted;
      state.listFilter = sorted;
      state.isLoading = false
    },
    setData: (state, action) => {
      state.dataAccess = action.payload.value
    },
    deleteAccess: (state, action) => {
      const newList = state.list.filter(e => e.id !== action.payload.value)
      state.list = newList;
      state.listFilter = newList;
    },
    insertFromAccess: (state, action) => {
      state.list.push(action.payload.value);
      state.listFilter.push(action.payload.value);

      state.list.sort((a, b) => a.level - b.level);
      state.listFilter.sort((a, b) => a.level - b.level);
    },
    setEditAccess: (state, action) => {
      state.dataAccess = action.payload.value;
    },
    updateFromAccess: (state, action) => {
      const modificadaList = state.list.map((e) => {
        if (e.id === state.dataAccess.id) return state.dataAccess;
        return e;
      });
      const modificadaListFilter = state.listFilter.map((e) => {
        if (e.id === state.dataAccess.id) return state.dataAccess;
        return e;
      });
      modificadaList.sort((a, b) => a.level - b.level);
      modificadaListFilter.sort((a, b) => a.level - b.level);
      state.list = modificadaList;
      state.listFilter = modificadaListFilter;
    },
    searchTextAccess: (state, action) => {
      if (action.payload.value === "") {
        state.listFilter = state.list;
        return;
      }
      const filtered = state.list.filter(e => e.name.toLowerCase().includes(action.payload.value.toLowerCase()))
      state.listFilter = filtered;
    },
    searchNumberAccess: (state, action) => {
      state.filterLevel = action.payload.value;
      if (action.payload.value === "") {
        state.listFilter = state.list;
        return;
      }
      const filtered = state.list.filter(e => e.level.toString().includes(action.payload.value.toString()));
      state.listFilter = filtered;
    },
    reducerForm: (state, action) => {
      let { value, key } = action.payload;

      state.dataAccess = {
        ...state.dataAccess,
        [key]: value
      }
    },
    cleanData: (state, action) => {
      state.dataAccess = {
        id: 0,
        name: "",
        level: "",
      }
    }
  }
})


export const {
  setDataAccess,
  setAccess,
  deleteAccess,
  setData,
  insertFromAccess,
  setEditAccess,
  updateFromAccess,
  searchTextAccess,
  searchNumberAccess,
  reducerForm,
  cleanData,
} = accessSlice.actions
export default accessSlice.reducer

