import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { cleanCoverageAndDiscounts, toggleCoverage, toggleDiscount } from "../store/reducers/formReducer";
import { calculatePrice } from "../store/reducers/priceReducer";
import Header from "./Header";
import MainForm from "./MainForm";
import PriceDetails from "./PriceDetails";
import Sidebar from "./Sidebar";
import { ADVISER_DISCOUNT } from "../constants/names.constant";

const MainWrapper: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [shouldSubmit, setShouldSubmit] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [isFormLocked, setIsFormLocked] = useState<boolean>(false);
    const [lastCheckedId, setLastCheckedId] = useState<string>("");
    const [isLastCheckedCoverage, setIsLastCheckedCoverage] = useState<boolean>(false);

    const formState = useSelector((state: RootState) => state.form);
    const config = useSelector((state: RootState) => state.config);

    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();
        setLoading(true);
        try {
            const result = await dispatch(calculatePrice(formState));
            if ("meta" in result && result.meta.requestStatus === "rejected") {
                if (lastCheckedId) {
                    dispatch(isLastCheckedCoverage ? toggleCoverage(lastCheckedId) : toggleDiscount(lastCheckedId));
                }
            }
        } catch (e: unknown) {
            console.error(e);
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

    useEffect(() => {
        const adviserId = config.discounts.find(d => d.name === ADVISER_DISCOUNT)?._id
        if (adviserId && formState.selectedDiscounts.includes(adviserId) 
        && formState.selectedCoverages.length < 2) {
            dispatch(toggleDiscount(adviserId));
        }
    }, [formState.selectedCoverages.length])

    const handleCoverageChange = (coverageId: string) => {
        dispatch(toggleCoverage(coverageId));
        setLastCheckedId(coverageId);
        setIsLastCheckedCoverage(true);
        setShouldSubmit(true);
    };
    const handleDiscountChange = (discountId: string) => {
        dispatch(toggleDiscount(discountId));
        setLastCheckedId(discountId);
        setIsLastCheckedCoverage(false);
        setShouldSubmit(true);
    };

    return (
        <>
            <Header
                handleTransactionalChange={handleDiscountChange}
                loading={loading || !isFormValid || !isFormLocked}
            />
            <div className="flex mt-4 flex-row">
                <div className="flex-grow ml-4">
                    <MainForm
                        handleSubmit={async (e?: React.FormEvent<HTMLFormElement>) => {
                            if (e) e.preventDefault();
                            setIsFormLocked(!isFormLocked);
                            dispatch(cleanCoverageAndDiscounts());
                            setShouldSubmit(true);
                        }}
                        loading={loading}
                        isFormValid={isFormValid}
                        isFormLocked={isFormLocked}
                        setIsFormValid={setIsFormValid}
                    />
                    <PriceDetails />
                </div>
                <Sidebar
                    handleTransactionalChange={handleCoverageChange}
                    loading={loading || !isFormValid || !isFormLocked}
                />
            </div>
        </>
    );
};

export default MainWrapper;
