import axios from "axios";

const BASE_URL = "http://localhost:8088/api/v1/users";

export const signUpUser = async (data: any) => {
  try {
    const response = await axios.post(BASE_URL, data);
    console.log("Response after save:", response.data);
    return response.data;
  } catch (error: any) {
    throw error.message;
  }
};

export const loginUser = async (data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, data);
    console.log("Response after save:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error while saving:", error.message);
    throw error.message;
  }
};

export const getAllUsers = async (data: any) => {
  try {
    const response = await axios.post(BASE_URL, data);
    console.log("Response after save:", response.data);
  } catch (error) {
    console.error("Error while saving:", error);
  }
};
