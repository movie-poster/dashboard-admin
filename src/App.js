import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import reducer from './reducers';
import './styles/styles.css';

const store = configureStore({ reducer });

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;