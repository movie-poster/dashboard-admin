import toastSlice from "./main/toastReducer";
import menuSlice from "./main/menuReducer";
import loadingStateSlice from "./main/loadingReducer";

import userSlice from "./user/reducerUsers";

import loginSlice from "./auth/reducerLogin";
import recoverCredentialsSlice from "./auth/reducerRecoverCredentials";

import directorSlice from "./director/reducerDirector";

const reducer = {
    toastSlice,
    menuSlice,
    loadingStateSlice,
    userSlice,
    loginSlice,
    recoverCredentialsSlice,
    directorSlice,
};

export default reducer;