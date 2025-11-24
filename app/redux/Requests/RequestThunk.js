import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";


export const createRequests = createAsyncThunk(
    'createRequests',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.post("api/create-request", payload);
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);