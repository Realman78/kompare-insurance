import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Checkbox from './UI/Checkbox';
import { ADVISER_DISCOUNT, STRONG_CAR_SURCHARGE, VIP_DISCOUNT } from '../constants/names.constant';
import { RTSubmitComponentProps, SubmitComponentProps } from '../types/types';

const Header: React.FC<RTSubmitComponentProps> = ({ handleTransactionalChange, loading: globLoading }) => {
  const { discounts, loading, error } = useSelector((state: RootState) => state.config);
  const { vehiclePower, selectedDiscounts, selectedCoverages } = useSelector((state: RootState) => state.form);
  const { priceDetails } = useSelector((state: RootState) => state.price);

  // const handleDiscountChange = (discountId: string) => {
  //   dispatch(toggleDiscount(discountId));
  //   console.log("unutar funkcije:", selectedDiscounts);
  //   handleSubmit()
  //   console.log("unutar funkcije 2:", selectedDiscounts);
  // };

  if (loading) return <div>Loading discounts...</div>;
  if (error) return <div>Error loading discounts: {error}</div>;

  return (
    <header className="bg-gray-100 p-4 shadow rounded flex flex-row">
      <div className="flex flex-row w-full justify-evenly">
        {discounts.map((discount) =>
          <Checkbox key={discount._id} transactionalId={discount._id}
            transactionalName={discount.name}
            checked={selectedDiscounts.includes(discount._id) ||
              (discount.name === STRONG_CAR_SURCHARGE && discount.vehiclePowerCondition
                && vehiclePower > discount.vehiclePowerCondition)}
            handleChange={() => handleTransactionalChange(discount._id)}
            disabled={discount.name === STRONG_CAR_SURCHARGE || loading || globLoading ||
              (discount.name === ADVISER_DISCOUNT && selectedCoverages.length < 2)
            }
            invisible={discount.name === VIP_DISCOUNT && discount.vehiclePowerCondition
              && vehiclePower <= discount.vehiclePowerCondition} />
        )}

      </div>
      <div className="mt-4 text-lg font-semibold">Total Price: {priceDetails?.totalPrice}</div>
    </header>
  );
};

export default Header;
