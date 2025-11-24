import {createSlice} from '@reduxjs/toolkit';
import {
    acceptRequest,
    deleteRequest,
    fetchAcceptedRequests,
    fetchRequests,
    logout
} from "@/app/redux/interpreter/interpreterThunk.js";

const interpreterSlice = createSlice({
    name: 'interpreters',
    initialState: {
        requests: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRequests.pending, (state) => {
                state.isLoading = true;
                state.requests = [];
                state.error = null;
            })
            .addCase(fetchRequests.fulfilled, (state, action) => {
                state.isLoading = false;
                state.requests = action.payload;
            })
            .addCase(fetchRequests.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(acceptRequest.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(acceptRequest.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(acceptRequest.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteRequest.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteRequest.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deleteRequest.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchAcceptedRequests.pending, (state) => {
                state.isLoading = true;
                state.requests = [];
                state.error = null;
            })
            .addCase(fetchAcceptedRequests.fulfilled, (state, action) => {
                state.isLoading = false;
                state.requests = action.payload
            })
            .addCase(fetchAcceptedRequests.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {} = interpreterSlice.actions;
export default interpreterSlice.reducer;