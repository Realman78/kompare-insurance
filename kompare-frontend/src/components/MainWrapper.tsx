import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { cleanCoverageAndDiscounts, toggleCoverage, toggleDiscount } from '../store/reducers/formReducer';
import { calculatePrice } from '../store/reducers/priceReducer';
import Header from './Header';
import MainForm from './MainForm';
import PriceDetails from './PriceDetails';
import Sidebar from './Sidebar';

const MainWrapper: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [shouldSubmit, setShouldSubmit] = useState(false);
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
  
    useEffect(() => {
      if (shouldSubmit) {
        handleSubmit();
        setShouldSubmit(false);
      }
    }, [shouldSubmit, formState]);
  
    const handleCoverageChange = (coverageId: string) => {
      dispatch(toggleCoverage(coverageId));
      setShouldSubmit(true);
    };
    const handleDiscountChange = (discountId: string) => {
      dispatch(toggleDiscount(discountId));
      setShouldSubmit(true);
    };
  
    return (
      <>
        <Header handleTransactionalChange={handleDiscountChange} loading={loading} />
        <div className="flex mt-4 flex-row">
          <div className="flex-grow ml-4">
            <MainForm
              handleSubmit={async (e?: React.FormEvent<HTMLFormElement>) => {
                if (e)
                  e.preventDefault();
                dispatch(cleanCoverageAndDiscounts());
                setTimeout(() => {
                  setShouldSubmit(true);
                }, 0);
              }}
              loading={loading}
            />
            <PriceDetails />
          </div>
          <Sidebar handleTransactionalChange={handleCoverageChange} loading={loading} />
        </div>
      </>
    );
  };

export default MainWrapper