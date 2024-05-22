import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const PriceDetails: React.FC = () => {
  const { priceDetails } = useSelector((state: RootState) => state.price);

  if (!priceDetails) return null;

  return (
    <section className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Price Details</h2>
      <div className="mb-2">Base Price: {priceDetails.basePrice}</div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Discounts</h3>
        {priceDetails.discounts.map((discount: any) => (
          <div key={discount.name} className="mb-1">{discount.name}: {discount.value} EUR</div>
        ))}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Coverages</h3>
        {priceDetails.coverages.map((coverage: any) => (
          <div key={coverage.name} className="mb-1">{coverage.name}: {coverage.value} EUR</div>
        ))}
      </div>
      <div className="mt-4 text-lg font-semibold">Total Price: {priceDetails.totalPrice}</div>
    </section>
  );
};

export default PriceDetails;
