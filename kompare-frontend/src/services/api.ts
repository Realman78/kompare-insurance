import axios from "axios";
import { handleError } from "../utils/utils";

const API_URL = process.env.REACT_APP_API_URL;

export const calculateInsurance = async (data: any) => {
    try {
        const response = await axios.post(`${API_URL}/calculate`, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const fetchCoverages = async () => {
    try {
        const response = await axios.get(`${API_URL}/coverages`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const fetchDiscounts = async () => {
    try {
        const response = await axios.get(`${API_URL}/discounts`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
