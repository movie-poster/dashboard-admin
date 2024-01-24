import { createSlice } from '@reduxjs/toolkit';

export const clusterFormSlice = createSlice({
  name: 'clusterFormSlice',
  initialState: {
    list: [],
    listFilter: [],
    isLoading: false,
    selectedGroup: {
      id: 0,
      name: "",
      form_id: 0,
    },
  },
  reducers: {
    reducerForm: (state, action) => {
      state.selectedGroup[action.payload.key] = action.payload.value;
    },
    setGroup: (state, action) => {
      state.list = action.payload.value
      state.listFilter = action.payload.value
      state.isLoading = false
    },
    setData: (state, action) => {
      state.dataTypepeopleGroup = action.payload.value
    },
    deleteGroup: (state, action) => {
      const newList = state.list.filter(e => e.id !== action.payload.value)
      state.list = newList;
      state.listFilter = newList;
    },
    //Para editar en Modal
    setSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload.value;
    },
    setEditSelectedGroup: (state, action) => {
      state.selectedGroup[action.payload.key] = action.payload.value
    },
    //Agregar el grupo creado a la lista
    addGroup: (state, action) => {
      state.list.push(action.payload.value);
      state.listFilter.push(action.payload.value);
    },
    // Actualizar los campos después de editar
    updateGroup: (state, action) => {
      const grupos = action.payload.value
      const modificadaList = state.list.map((e) => {
        if (e.id === grupos.id) {
          return grupos
        }
        return e;
      });
      const modificadaListFilter = state.listFilter.map((e) => {
        if (e.id === grupos.id) {
          return grupos
        }
        return e;
      });
      state.list = modificadaList;
      state.listFilter = modificadaListFilter;
    },
    // Buscar en el input el nombre de la categoría 
    searchGroup: (state, action) => {
      if (action.payload.value === "") {
        state.listFilter = state.list;
        return;
      }
      const filtered = state.list.filter(e => e.name.toLowerCase().includes(action.payload.value.toLowerCase()))
      state.listFilter = filtered;
    },
    cleanData: (state, action) => {
      state.selectedGroup = {
        id: 0,
        name: "",
        form_id: 0,
      }
    },
  }
})

export const {
  reducerForm,
  setGroup,
  setData,
  addGroup,
  updateGroup,
  searchGroup,
  deleteGroup,
  setSelectedGroup,
  setEditSelectedGroup,
  cleanData,
} = clusterFormSlice.actions
export default clusterFormSlice.reducer