import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'formSlice',
  initialState: {
    data: {
      id: 0,
      name: "",
      description: "",
    },
    list: [],
    listFilter: [],
    isLoading: false,
    selectedForm: {
      id: 0,
      clusters: [],
      actors: [],
      url_template: "",
    },
    codesForm: [],
    codesQuestions: [],
  },
  reducers: {
    reducerForm: (state, action) => {
      state.selectedForm[action.payload.key] = action.payload.value;
    },
    setListForm: (state, action) => {
      state.list = action.payload.value;
      state.listFilter = action.payload.value;
      state.isLoading = false;
    },
    deleteForm: (state, action) => {
      const newList = state.list.filter(e => e.id !== action.payload.value);
      state.list = newList;
      state.listFilter = newList;
    },
    setSelectedForm: (state, action) => {
      state.selectedForm = action.payload.value ?? { id: 0, name: "", description: "", clusters: [], actors: [] };
    },
    addForm: (state, action) => {
      state.list.push(action.payload.value);
      state.listFilter.push(action.payload.value);
    },
    updateForm: (state, action) => {
      const form = action.payload.value;
      const modifiedList = state.list.map((e) => {
        if (e.id === form.id) {
          return form;
        }
        return e;
      });
      const modifiedListFilter = state.listFilter.map((e) => {
        if (e.id === form.id) {
          return form;
        }
        return e;
      });
      state.list = modifiedList;
      state.listFilter = modifiedListFilter;
    },
    searchForm: (state, action) => {
      if (action.payload.value === "") {
        state.listFilter = state.list;
        return;
      }
      const filtered = state.list.filter(e => e.name.toLowerCase().includes(action.payload.value.toLowerCase()));
      state.listFilter = filtered;
    },
    cleanData: (state, action) => {
      state.selectedForm = {
        id: 0,
        clusters: [],
        actors: [],
        url_template: "",
      };
    },
    setCodes: (state, action) => {
      switch (action.payload.type) {
        case "CODES_FORM":
          state.codesForm = action.payload.value;
          break;
        default:
          console.log("Tipo de código no válido")
      }
    },
  }
});

export const {
  reducerForm,
  setListForm,
  deleteForm,
  addForm,
  updateForm,
  searchForm,
  setSelectedForm,
  cleanData,
  setCodes,
} = formSlice.actions;

export default formSlice.reducer;