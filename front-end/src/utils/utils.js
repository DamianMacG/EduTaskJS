import axios from "axios";

const api = axios.create({
  baseURL: "https://reddit-style-backend-nc.onrender.com/api",
});

export const getAssignmentsByTeacherId = async (id) => {
  try {
    const response = await api.get(`/${id}/assignments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching assignments:", error);
    throw error;
  }
};

