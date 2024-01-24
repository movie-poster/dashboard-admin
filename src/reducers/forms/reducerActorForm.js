import { createSlice } from '@reduxjs/toolkit';

export const actorFormSlice = createSlice({
  name: 'actorFormSlice',
  initialState: {
    list: [],
    listFilter: [],
    isLoading: false,
    selectedActor: {
      id: 0,
      name: "",
      form_id: 0,
    },
  },
  reducers: {
    reducerForm: (state, action) => {
      state.selectedActor[action.payload.key] = action.payload.value;
    },
    setListActor: (state, action) => {
      state.list = action.payload.value
      state.listFilter = action.payload.value
      state.isLoading = false
    },
    deleteActor: (state, action) => {
      const newList = state.list.filter(e => e.id !== action.payload.value)
      state.list = newList;
      state.listFilter = newList;
    },
    //Para editar en Modal
    setSelectedActor: (state, action) => {
      state.selectedActor = action.payload.value;
    },
    setEditSelectedActor: (state, action) => {
      state.selectedActor[action.payload.key] = action.payload.value
    },
    //Agregar el grupo creado a la lista
    addActor: (state, action) => {
      state.list.push(action.payload.value);
      state.listFilter.push(action.payload.value);
    },
    // Actualizar los campos después de editar
    updateActor: (state, action) => {
      const grupos = action.payload.value
      const modificadaList = state.list.map((e) => {
        if (e.id === grupos.id) {
          return grupos
        }
        return e;
      });
      const modificadaListFilter = state.listFilter.map((e) => {
        if (e.id === grupos.id) {
          return grupos;
        }
        return e;
      });
      state.list = modificadaList;
      state.listFilter = modificadaListFilter;
    },
    // Buscar en el input el nombre de la categoría 
    searchActor: (state, action) => {
      if (action.payload.value === "") {
        state.listFilter = state.list;
        return;
      }
      const filtered = state.list.filter(e => e.name.toLowerCase().includes(action.payload.value.toLowerCase()))
      state.listFilter = filtered;
    },
    cleanData: (state, action) => {
      state.selectedActor = {
        id: 0,
        name: "",
        form_id: 0,
      }
    },
  }
})

export const {
  reducerForm,
  setListActor,
  setData,
  addActor,
  updateActor,
  searchActor,
  deleteActor,
  setSelectedActor,
  setEditSelectedActor,
  cleanData,
} = actorFormSlice.actions;

export default actorFormSlice.reducer;