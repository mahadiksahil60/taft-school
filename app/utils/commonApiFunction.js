import axios from "axios";

export const makeApiCall = async (method, url, payload = {}, headers = {}) => {
  try {
    const response = await axios({
      method,
      url,
      data: method !== "GET" ? payload : null, // Send payload only for non-GET requests
      params: method === "GET" ? payload : null, // Attach query params for GET requests
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("API Call Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
