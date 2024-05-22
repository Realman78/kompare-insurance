import { configureStore } from '@reduxjs/toolkit';
import formReducer from './reducers/formReducer';
import configReducer from './reducers/configReducer';
import priceReducer from './reducers/priceReducer';

const store = configureStore({
  reducer: {
    form: formReducer,
    config: configReducer,
    price: priceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
