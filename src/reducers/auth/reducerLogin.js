import { createSlice } from '@reduxjs/toolkit';
import { decodeToken } from '../../utils/decodeJWT';

const init = () => {
    const parsed = JSON.parse(localStorage.getItem('user'));
    const auth = parsed ? { auth: parsed.auth, ...decodeToken(parsed.token) } : { auth: false };

    const obj = {
        auth,
        user: {
            nick_name: "",
            password: ""
        },
    }
    return obj;
}

export const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: init(),
    reducers: {
        setUser: (state, action) => {
            state.user[action.payload.key] = action.payload.value
        },
        loginUser: (state, action) => {
            state.auth = { auth: action.payload.value.auth, ...decodeToken(action.payload.value.token) }
            localStorage.setItem('user', JSON.stringify(action.payload.value));
            state.user = {
                nick_name: "",
                password: ""
            };
        },
        logout: (state) => {
            localStorage.removeItem('user');
            state.auth = {
                "auth": false,
                "message": "usuario no autenticado, no encontrado",
                "title": "No autenticado"
            };
        },
    },
});

export const { setUser, loginUser, logout } = loginSlice.actions;
export default loginSlice.reducer;
