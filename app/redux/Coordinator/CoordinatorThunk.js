import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";


export const sendInvite = createAsyncThunk(
    'sendInvite',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.post("api/coordinator/invite-interpreter", payload);
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchInterpreters = createAsyncThunk(
    'fetchInterpreters',
    async (thunkAPI) => {
        try {
            const response = await axios.post("api/coordinator/fetch-interpreters", {});
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
