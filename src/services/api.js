import axios from "axios";

const BASE_URL = "http://localhost:3000";
const axiosInstance = axios.create({ baseURL: BASE_URL });

// get all items
export const getItems = async () => {
  return (await axiosInstance.get("/item")).data;
};

// get item by id
export const getItemById = async (id) => {
  const response = await axiosInstance.get(`/item/${id}`);
  return response.data;
};

// create item
export const createItem = async (item) => {
  const response = await axiosInstance.post("/item", item);
  return response.data;
};

// delete item by id
export const deleteItemById = async (id) => {
  const response = await axiosInstance.delete(`/item/${id}`);
  return response.data;
};

// update item by id
export const updateItemById = async (data) => {
  const response = await axiosInstance.put(`/item/${data.id}`, data.data);
  return response.data;
};

// post new Bill
export const createBill = async (bill) => {
  console.log(bill);

  const response = await axiosInstance.post("/bill", bill);
  return response.data;
  // return "ok";
};

// get dashboard data
export const getDashboardData = async (dates) => {
  const response = await axiosInstance.post("/dashboard", dates);
  return response.data;
};
