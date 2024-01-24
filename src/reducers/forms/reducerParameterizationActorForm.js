import { createSlice } from '@reduxjs/toolkit';

export const parameterizationActorFormSlice = createSlice({
  name: 'parameterizationActorFormSlice',
  initialState: {
    parameterization: {
      id: 0,
      form_id: 0,
      actor_id: 0,
      type_fields_id: 0,
      type_files_id: 0,
      name: "",
      length_min: "",
      length_max: "",
      required: "",
      value_select: "",
      alert_required: false,
      type_contact: "NO_CONTACT",
    },
    list: [],
    listFilter: [],
    isLoading: true
  },
  reducers: {
    reducerForm: (state, action) => {
      state.parameterization[action.payload.key] = action.payload.value;
    },
    setListParameterization: (state, action) => {
      state.list = action.payload.value;
      state.listFilter = action.payload.value;
      state.isLoading = false
    },
    setDataGetById: (state, action) => {
      state.parameterization = action.payload.value !== undefined ? action.payload.value : {
        id: 0,
        form_id: 0,
        actor_id: 0,
        type_fields_id: 0,
        type_files_id: 0,
        name: "",
        length_min: "",
        length_max: "",
        required: "",
        value_select: "",
        alert_required: false,
        type_contact: "NO_CONTACT",
        apply_format: false,
      };
    },
    deleteParameterization: (state, action) => {
      const newList = state.list.filter(e => e.id !== action.payload.value);
      state.list = newList;
      state.listFilter = newList;
    },
    orderParameterization: (state, action) => {
      const { id, order } = action.payload.value;
      const currentIndex = state.listFilter.findIndex(e => e.id === id);
      const element = state.listFilter[currentIndex];

      state.listFilter.splice(currentIndex, 1);
      state.listFilter.splice(order, 0, element);
    },
    //Agregar el objeto creado a la lista
    addParameterization: (state, action) => {
      state.list.push(action.payload.value);
    },
    cleanData: (state) => {
      state.parameterization = {
        id: 0,
        form_id: 0,
        actor_id: 0,
        type_fields_id: 0,
        type_files_id: 0,
        name: "",
        length_min: "",
        length_max: "",
        required: "",
        value_select: "",
        alert_required: false,
        type_contact: "NO_CONTACT",
        apply_format: false,
      }
    },
    searchByNameParameterize: (state, action) => {
      if (action.payload.value === "") {
        state.listFilter = state.list;
        return;
      }
      const filtered = state.list.filter(e => e.name.toLowerCase().includes(action.payload.value.toLowerCase()));
      state.listFilter = filtered;
    },
    nullLengths: (state, action) => {
      state.parameterization = {
        ...state.parameterization,
        length_min: "",
        length_max: "",
      };
    },
  },
});

export const {
  reducerForm,
  deleteParameterization,
  orderParameterization,
  setListParameterization,
  addParameterization,
  setDataGetById,
  cleanData,
  searchByNameParameterize,
  nullLengths,
} = parameterizationActorFormSlice.actions;

export default parameterizationActorFormSlice.reducer;