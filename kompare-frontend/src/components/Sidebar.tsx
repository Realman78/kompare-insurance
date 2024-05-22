import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { toggleCoverage } from '../store/reducers/formReducer';
import Checkbox from './UI/Checkbox';
import { SubmitComponentProps } from '../types/types';

const Sidebar: React.FC<SubmitComponentProps> = ({ handleSubmit, loading: globLoading }) => {
  const dispatch = useDispatch();
  const { coverages, loading, error } = useSelector((state: RootState) => state.config);
  const { selectedCoverages } = useSelector((state: RootState) => state.form);

  const handleCoverageChange = (coverageId: string) => {
    dispatch(toggleCoverage(coverageId));
    setTimeout(() => {
      handleSubmit()
    }, 0)
  };

  if (loading) return <div>Loading coverages...</div>;
  if (error) return <div>Error loading coverages: {error}</div>;

  return (
    <div className="bg-gray-100 p-8 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Coverages</h2>
      {coverages.map((coverage) => (
        <Checkbox key={coverage._id} transactionalId={coverage._id}
          transactionalName={coverage.name}
          checked={selectedCoverages.includes(coverage._id)}
          handleChange={() => handleCoverageChange(coverage._id)} 
          disabled={loading || globLoading}/>
      ))}
    </div>
  );
};

export default Sidebar;
