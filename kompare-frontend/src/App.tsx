import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import MainForm from './components/MainForm';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PriceDetails from './components/PriceDetails';
import store, { AppDispatch, RootState } from './store';
import { getCoverages, getDiscounts } from './store/reducers/configReducer';
import { UnknownAction } from '@reduxjs/toolkit';
import { cleanCoverageAndDiscounts } from './store/reducers/formReducer';
import { calculatePrice } from './store/reducers/priceReducer';
import MainWrapper from './components/MainWrapper';

const AppContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
 
  useEffect(() => {
    console.log("aloooooooooooooooooo");
    dispatch(getCoverages() as unknown as UnknownAction);
    dispatch(getDiscounts() as unknown as UnknownAction);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <MainWrapper />
    </div>
  );
};

const App: React.FC = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
