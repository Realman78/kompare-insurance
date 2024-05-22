import Coverage from "../models/Coverage.model";
import { Transactional } from "../types/types";
import Discount from "../models/Discount.model";
import {
    ADVISER_DISCOUNT,
    AO_PLUS,
    BONUS_PROTECTION,
    COMMERCIAL_DISCOUNT,
    GLASS_PROTECTION,
    STRONG_CAR_SURCHARGE,
    VIP_DISCOUNT,
    VOUCHER,
} from "../constants/names.constant";
import { ADVISER_SELECTED_CONDITION, AO_PLUS_NO_AGE_CONDITION } from "../constants/errors.constant";
import { calculateBasePrice, round2Decimals } from "../utils/utils";
import { GetCoveragesRequestBody } from "../interfaces/calculation.interface";

const calculateInsurancePrice = async (data: GetCoveragesRequestBody) => {
    const { birthdate, city, vehiclePower, voucher, selectedCoverages, selectedDiscounts } = data;

    const customerBirthdate = new Date(birthdate);
    const today = new Date();

    let age = today.getFullYear() - customerBirthdate.getFullYear();
    if (
        today.getMonth() < customerBirthdate.getMonth() ||
        (today.getMonth() == customerBirthdate.getMonth() && today.getDate() < customerBirthdate.getDate())
    ) {
        age--;
    }

    let basePrice = calculateBasePrice(age, city);

    let coverageTotal = 0;
    let coverageDetails: Transactional[] = [];
    for (const coverageId of selectedCoverages) {
        const coverage = await Coverage.findById(coverageId);
        if (coverage && coverage.name) {
            let coveragePrice = 0;
            switch (coverage.name) {
                case BONUS_PROTECTION:
                    coveragePrice = (coverage.values[0] / 100) * basePrice;
                    break;
                case AO_PLUS:
                    if (coverage.ageCondition) {
                        coveragePrice = coverage.values[age < coverage.ageCondition ? 0 : 1];
                        break;
                    }
                    throw new Error(AO_PLUS_NO_AGE_CONDITION);
                case GLASS_PROTECTION:
                    coveragePrice = (coverage.values[0] / 100) * vehiclePower;
                    break;
                default:
                    continue;
            }

            coverageTotal += coveragePrice;
            coverageDetails.push({ name: coverage.name, value: round2Decimals(coveragePrice) });
        }
    }

    // Apply discounts dynamically
    let discountTotal = 0;
    const discountDetails: Transactional[] = [];
    let vipFlag = false;

    for (const discountId of selectedDiscounts) {
        const discount = await Discount.findById(discountId);
        if (discount && discount.name) {
            let discountPrice = 0;
            switch (discount.name) {
                case COMMERCIAL_DISCOUNT:
                    discountPrice = (discount.values[0] / 100) * basePrice;
                    break;
                case ADVISER_DISCOUNT:
                    if (discount.selectedCondition && selectedCoverages.length >= discount.selectedCondition) {
                        const prevSum = coverageDetails.reduce((ps, a) => ps + a.value, 0);
                        coverageDetails = coverageDetails.map((coverage) => {
                            return {
                                ...coverage,
                                value: (1 - discount.values[0] / 100) * coverage.value,
                            };
                        });
                        const currSum = coverageDetails.reduce((ps, a) => ps + a.value, 0);
                        coverageTotal = currSum;
                        discountDetails.push({ name: discount.name, value: -round2Decimals(prevSum - currSum) });
                        continue;
                    }
                    if (!discount.selectedCondition) throw new Error(ADVISER_SELECTED_CONDITION);
                case VIP_DISCOUNT:
                    vipFlag =
                        discount.vehiclePowerCondition !== null &&
                        discount.vehiclePowerCondition !== undefined &&
                        vehiclePower > discount.vehiclePowerCondition;
                    continue;
                default:
                    continue;
            }
            discountTotal += discountPrice;
            discountDetails.push({ name: discount.name, value: -round2Decimals(discountPrice) });
        }
    }

    let totalPrice = basePrice + coverageTotal - discountTotal;

    // Vehicle power surcharge
    const strongCarSurcharge = await Discount.findOne({ name: STRONG_CAR_SURCHARGE });

    if (
        strongCarSurcharge &&
        strongCarSurcharge.vehiclePowerCondition &&
        vehiclePower > strongCarSurcharge.vehiclePowerCondition
    ) {
        const discountPrice = (strongCarSurcharge.values[0] / 100) * basePrice;
        totalPrice += discountPrice;
        discountDetails.push({ name: strongCarSurcharge.name, value: discountPrice });
    }
    // VIP discount
    const vipDiscount = await Discount.findOne({ name: VIP_DISCOUNT });

    if (
        vipFlag &&
        vipDiscount &&
        vipDiscount.vehiclePowerCondition &&
        vehiclePower > vipDiscount.vehiclePowerCondition
    ) {
        const discountPrice = (vipDiscount.values[0] / 100) * basePrice;
        totalPrice -= discountPrice;
        discountDetails.push({ name: vipDiscount.name, value: -discountPrice });
    }

    if (voucher) {
        totalPrice -= voucher;
        if (totalPrice < 0) totalPrice = 0;
        discountDetails.push({ name: VOUCHER, value: -round2Decimals(voucher) });
    }

    return {
        basePrice: round2Decimals(basePrice),
        coverages: coverageDetails.map((cd) => {
            return {
                ...cd,
                value: round2Decimals(cd.value),
            };
        }),
        discounts: discountDetails.map((dd) => {
            return {
                ...dd,
                value: round2Decimals(dd.value),
            };
        }),
        totalPrice: round2Decimals(totalPrice),
    };
};

export default calculateInsurancePrice;
