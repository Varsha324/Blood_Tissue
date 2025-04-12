import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// AUTH
export const loginUser = (data) => API.post("/api/users/login", data);
export const signUpUser = (data) => API.post("/api/users/signup", data); // FIXED

// RECIPIENTS
export const getRecipient = () => API.get("/api/recipients/");
export const getSingleDRecipient = (id) => API.get(`/api/recipients/${id}`);

export const createRecipients = (data) => API.post("/api/recipients/", data);
export const updateRecipient = (id, data) => API.put(`/api/recipients/${id}`, data);

// DONORS
export const getDonor = () => API.get("/api/donors/");
export const getSingleDonor = (id) => API.get(`/api/donors/${id}`);
export const createDonors = (data) => API.post("/api/donors/", data);
export const updateDonor = (id, data) => API.put(`/api/donors/${id}`, data);
