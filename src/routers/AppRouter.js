import { useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
} from 'react-router-dom';
import Home from '../app/components/Home'

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import GeneralRoutes from './AuthRoutes';

const AppRouter = () => {
    const { auth } = useSelector(state => state.loginSlice.auth);

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        isAuthenticated={auth}
                        exact
                        path="/auth/*"
                        component={GeneralRoutes}
                    />

                    <PrivateRoute
                        isAuthenticated={auth}
                        path="/"
                        component={Home}
                    />
                </Switch>
            </div>
        </Router>
    );
}

export default AppRouter;