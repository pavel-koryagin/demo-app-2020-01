import React, { Suspense } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import './views/globals.scss';
import store from './redux/store'
import LayoutWidget from './widgets/LayoutWidget';
import { DialogsProvider } from './widgets/DialogWidget';
import AuthLoaderWidget from './widgets/AuthLoaderWidget';
import LoaderWidget from './widgets/LoaderWidget';
import AppRouter from './AppRouter';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <DialogsProvider>
        <BrowserRouter>
          <AuthLoaderWidget>
            <LayoutWidget>
              <Suspense fallback={<LoaderWidget />}>
                <AppRouter />
              </Suspense>
            </LayoutWidget>
          </AuthLoaderWidget>
        </BrowserRouter>
      </DialogsProvider>
    </Provider>
  );
}

export default App;
