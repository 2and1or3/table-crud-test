import React from 'react';
import './index.scss';
import Header from './Components/Header';
import DashboardPage from './Pages/Dashboard';
import { Provider } from 'react-redux';
import { store } from './Store';

function App() {
  return (
    <>
      <Provider store={store}>
        <div className="layout">
          <Header/>
          <DashboardPage className={'layout__body'}/>
        </div>
      </Provider>
    </>
  );
}

export default App;
