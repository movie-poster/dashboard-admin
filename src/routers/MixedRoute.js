import { Route } from 'react-router';
import PropTypes from 'prop-types'; // snipet impt

const MixedRoute = ({
    component: Component,
    ...rest
}) => {
    return (
        <Route {...rest} component={props => (<Component {...props} />)}
        />
    );
}

MixedRoute.propTypes = {
    component: PropTypes.func.isRequired,
}

export default MixedRoute;