import React from 'react'
import { Redirect, Route } from 'react-router';
import PropTypes from 'prop-types'; // snipet impt

const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    localStorage.setItem('lastPath', rest.location.pathname);

    return (
        <Route {...rest}
            component={props => (
                isAuthenticated
                    ?
                    (<Component {...props} />)
                    :
                    (<Redirect to='/auth/login' />)
            )}
        />
    );
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
}

export default PrivateRoute;