import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setFormData } from '../store/reducers/formReducer';
import { SubmitComponentProps } from '../types/types';
import InputField from './UI/InputField';
import { isValidDate } from '../utils/utils';

const MainForm: React.FC<SubmitComponentProps> = ({ handleSubmit, loading, isFormLocked, isFormValid, setIsFormValid }) => {
  const dispatch = useDispatch<AppDispatch>();
  const formState = useSelector((state: RootState) => state.form);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  useEffect(() => {
    setIsFormValid(formState.name.length > 0 && isValidDate(formState.birthdate)
      && formState.city.length > 0 && formState.vehiclePower > 0)
  }, [formState.name.length, formState.birthdate, formState.city.length, formState.vehiclePower])

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded">
      <InputField key={'Name'} name={'name'} required={true} label='Name' type='text' value={formState.name} onChangeHandler={handleChange} isFormLocked={isFormLocked} />
      <InputField key={'Birthdate'} name={'birthdate'} required={true} label='Birthdate' type='date' value={formState.birthdate} onChangeHandler={handleChange} isFormLocked={isFormLocked}/>
      <InputField key={'City'} name={'city'} required={true} label='City' type='text' value={formState.city} onChangeHandler={handleChange} isFormLocked={isFormLocked}/>
      <InputField key={'Vehicle Power'} name={'vehiclePower'} required={true} label='Vehicle Power' type='number' value={formState.vehiclePower} onChangeHandler={handleChange} isFormLocked={isFormLocked}/>
      <InputField key={'Voucher'} name={'voucher'} required={false} label='Voucher' type='number' value={formState.voucher} onChangeHandler={handleChange} isFormLocked={isFormLocked}/>
      <button
        type="submit"
        disabled={loading || !isFormValid}
        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${isFormValid ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-400"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        {isFormLocked ? 'New Customer' : 'Save'}
      </button>
    </form>
  );
};

export default MainForm
