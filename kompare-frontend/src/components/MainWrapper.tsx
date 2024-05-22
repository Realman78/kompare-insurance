import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { cleanCoverageAndDiscounts } from '../store/reducers/formReducer';
import { calculatePrice } from '../store/reducers/priceReducer';
import Header from './Header';
import MainForm from './MainForm';
import PriceDetails from './PriceDetails';
import Sidebar from './Sidebar';

const MainWrapper: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const formState = useSelector((state: RootState) => state.form);
    const dispatch = useDispatch<AppDispatch>();
  
    const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
      if (e) e.preventDefault();
      setLoading(true);
      try {
        await dispatch(calculatePrice(formState));
      } catch (e: any) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <>
        <Header handleSubmit={handleSubmit} loading={loading} />
        <div className="flex mt-4 flex-row">
          <div className="flex-grow ml-4">
            <MainForm
              handleSubmit={async (e?: React.FormEvent<HTMLFormElement>) => {
                if (e)
                    e.preventDefault();
                dispatch(cleanCoverageAndDiscounts());
                setTimeout(() => {
                  handleSubmit(e);
                }, 0);
              }}
              loading={loading}
            />
            <PriceDetails />
          </div>
          <Sidebar handleSubmit={handleSubmit} loading={loading} />
        </div>
      </>
    );
  };

export default MainWrapper