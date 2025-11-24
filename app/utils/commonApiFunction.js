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
    console.log(response, "response from make api calll");
    return response.data;
  } catch (error) {
    console.log(error?.response?.data.error, "error from make api call");
    throw error?.response?.data.error;
  }
};

export const secretKey = "12345678";
