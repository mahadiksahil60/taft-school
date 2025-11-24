import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

//  Async thunk for API call
export const fetchRequests = createAsyncThunk(
    'fetchRequests',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.get("api/fetch-request");
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const acceptRequest = createAsyncThunk(
    'acceptRequest',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.post("api/accept-request", payload);
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteRequest = createAsyncThunk(
    'deleteRequest',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.post("api/remove-request", payload);
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const logout = createAsyncThunk(
    'logout',
    async (thunkAPI) => {
        try {
            const response = await axios.post("api/interpreter-sign-out");
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchAcceptedRequests = createAsyncThunk(
    'fetchAcceptedRequests',
    async (payload, thunkAPI) => {
      
        try {
            const response = await axios.post("api/accepted-requests", payload);
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);