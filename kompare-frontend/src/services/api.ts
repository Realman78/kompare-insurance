import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const calculateInsurance = async (data: any) => {
  try {
    console.log(data);
    const response = await axios.post(`${API_URL}/calculate`, data);
    console.log("parin");
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCoverages = async () => {
  try {
    const response = await axios.get(`${API_URL}/coverages`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchDiscounts = async () => {
  try {
    const response = await axios.get(`${API_URL}/discounts`);
    return response.data;
  } catch (error) {
    throw error;
  }
};