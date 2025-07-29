import axios from "axios";

const API_BASE = "http://127.0.0.1:8000"; // Later move to .env

export const getItems = async () => {
  const response = await axios.get(`${API_BASE}/items/`);
  return response.data;
};

export const addItem = async (item) => {
  const response = await axios.post(`${API_BASE}/items/`, item);
  return response.data;
};

export const updateItem = async (id, item) => {
  const response = await axios.put(`${API_BASE}/items/${id}`, item);
  return response.data;
};

export const deleteItem = async (id) => {
  const response = await axios.delete(`${API_BASE}/items/${id}`);
  return response.data;
};
