import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store, { AppDispatch } from './store';
import { getCoverages, getDiscounts } from './store/reducers/configReducer';
import { UnknownAction } from '@reduxjs/toolkit';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainWrapper from './components/MainWrapper';

const AppContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
 
  useEffect(() => {
    dispatch(getCoverages() as unknown as UnknownAction);
    dispatch(getDiscounts() as unknown as UnknownAction);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <MainWrapper />
      <ToastContainer />
    </div>
  );
};

const App: React.FC = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
