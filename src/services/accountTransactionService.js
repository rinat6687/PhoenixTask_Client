import axios from 'axios';

const API_BASE_URL = 'https://localhost:7246/api/accountTransaction';


export const getTransactionsLists = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getTransactionsLists`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions lists:", error);
    throw error;
  }
};


export const addTransaction = async (transactionRequest) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add`, transactionRequest);
    return response.data;
  } catch (error) {
    console.error('Error inserting transaction:', error);
    throw error;
  }
};

export const deleteTransaction = async (transactionId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/delete/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error('Error inserting transaction:', error);
    throw error;
  }
};