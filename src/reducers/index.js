import toastSlice from "./main/toastReducer";
import menuSlice from "./main/menuReducer";
import loadingStateSlice from "./main/loadingReducer";

import userSlice from "./user/reducerUsers";

import loginSlice from "./auth/reducerLogin";
import recoverCredentialsSlice from "./auth/reducerRecoverCredentials";

import directorSlice from "./director/reducerDirector";
import actorSlice from "./actor/reducerActor";
import movieSlice from "./movie/reducerMovie";
import genreSlice from "./genre/reducerGenre";

const reducer = {
    toastSlice,
    menuSlice,
    loadingStateSlice,
    userSlice,
    loginSlice,
    recoverCredentialsSlice,
    directorSlice,
    actorSlice,
    movieSlice,
    genreSlice,
};

export default reducer;