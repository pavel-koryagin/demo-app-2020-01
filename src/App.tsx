import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import './views/globals.scss';
import store from './redux/store'
import { DialogsProvider } from './widgets/DialogWidget';
import AuthLoaderWidget from './widgets/AuthLoaderWidget';
import AppRouter from './AppRouter';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <DialogsProvider>
        <BrowserRouter>
          <AuthLoaderWidget>
            <AppRouter />
          </AuthLoaderWidget>
        </BrowserRouter>
      </DialogsProvider>
    </Provider>
  );
}

export default App;
