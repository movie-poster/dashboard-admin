import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import ChangePassword from "../modules/Login/components/ChangePassword";
import ToastNotify from "../app/components/ToastNotify";
import Login from "../modules/Login/components/login";

import { useSelector } from "react-redux";

const GeneralRoutes = () => {
    const { show } = useSelector(state => state.toastSlice);

    return (
        <div>
            {show && <ToastNotify />}

            <Router>
                <Switch>
                    <Route exact path="/auth/login"> <Login /> </Route>
                    <Route exact path="/auth/change-password/:token"> <ChangePassword /> </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default GeneralRoutes;