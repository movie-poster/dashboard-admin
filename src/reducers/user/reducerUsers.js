import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        dataUser: {
            name: '',
            surname: '',
            type_document_id: "",
            num_document: '',
            nick_name: '',
            level_id: "",
            email: '',
            date_birth: '',
            phone_contact: '',
            phone_contact_two: '',
            address: '',
            can_audit: '0',
            url_document: '',
            url_avatar: '',
        },
        dataFilter: {
            filterName: "",
        },
        list: [],
        listFilter: [],
        isLoading: false,
        //Lista tipo de documento
        listTypeDocument: [],
        //Lista de acceso
        listLevel: [],
        //Propiedad para el search (Buscar por cédula)
        filterNumDocument: [],


    },
    reducers: {
        setDataUsers: (state, action) => {
            state.dataUser[action.payload.key] = action.payload.value
        },
        reducerForm: (state, action) => {
            state.dataUser[action.payload.key] = action.payload.value
        },
        setUsers: (state, action) => {
            state.list = action.payload.value
            state.listFilter = action.payload.value
            state.isLoading = false
        },
        setDataGetById: (state, action) => {
            state.dataUser = action.payload.value
        },
        deleteUsers: (state, action) => {
            const newList = state.list.filter(e => e.id !== action.payload.value);
            state.list = newList;
            state.listFilter = newList;
        },
        setListTypeDocument: (state, action) => {
            state.listTypeDocument = action.payload.value
            state.isLoading = false
        },
        setListLevel: (state, action) => {
            state.listLevel = action.payload.value
            state.isLoading = false
        },

        //Agregar el objeto creado a la lista
        addNewObjectToList: (state, action) => {
            state.list.push(action.payload.value);
            state.listFilter.push(action.payload.value);
            //Colocar las propiedades de los campos vacíos
            state.dataUser = {
                name: '',
                surname: '',
                type_document_id: null,
                num_document: '',
                nick_name: '',
                level_id: null,
                email: '',
                date_birth: '',
                phone_contact: '',
                phone_contact_two: '',
                address: '',
                can_audit: null,
                url_document: '',
                url_avatar: '',
            }
        },

        // Actualizar los campos después de editar
        updateNewObjectAfterEdit: (state, action) => {
            const users = action.payload.value
            const modificadaList = state.list.map((e) => {
                if (e.id === users.id) {
                    return users
                }
                return e;
            });
            const modificadaListFilter = state.listFilter.map((e) => {
                if (e.id === users.id) {
                    return users
                }
                return e;
            });
            state.list = modificadaList;
            state.listFilter = modificadaListFilter;
            state.dataUser = {
                name: '',
                surname: '',
                type_document_id: null,
                num_document: '',
                nick_name: '',
                level_id: null,
                email: '',
                date_birth: '',
                phone_contact: '',
                phone_contact_two: '',
                address: '',
                can_audit: null,
                url_document: '',
                url_avatar: '',
            }
        },
        searchTextUsers: (state, action) => {
            state.dataFilter.filterName = action.payload.value;
            if (action.payload.value === "") {
                state.listFilter = state.list;
                return;
            }
            const filtered = state.list.filter(e => 
                e.name.toLowerCase().includes(action.payload.value.toLowerCase()) ||
                e.email.includes(action.payload.value.toLowerCase())
            )
            state.listFilter = filtered;
        },
        searchNumberUsers: (state, action) => {
            state.filterNumDocument = action.payload.value;
            if (action.payload.value === "") {
                state.listFilter = state.list;
                return;
            }
            const filtered = state.list.filter(e => e.num_document.toString().includes(action.payload.value.toString()));
            state.listFilter = filtered;
        },
        cleanData: (state) => {
            state.dataUser = {
                name: '',
                surname: '',
                type_document_id: "",
                num_document: '',
                nick_name: '',
                level_id: "",
                email: '',
                date_birth: '',
                phone_contact: '',
                phone_contact_two: '',
                address: '',
                can_audit: "0",
                url_document: '',
                url_avatar: '',
            };
        },
    },
});

export const {
    setDataUsers,
    reducerForm,
    setUsers,
    setDataGetById,
    deleteUsers,
    setListTypeDocument,
    setListLevel,
    addNewObjectToList,
    updateNewObjectAfterEdit,
    searchTextUsers,
    searchNumberUsers,
    cleanData,
} = userSlice.actions;

export default userSlice.reducer;