import {createSlice} from '@reduxjs/toolkit';
import {createRequests} from "@/app/redux/Requests/RequestThunk.js";

const requestSlice = createSlice({
    name: 'requests',
    initialState: {
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createRequests.pending, (state) => {
                state.isLoading = true;

                state.error = null;
            })
            .addCase(createRequests.fulfilled, (state, action) => {
                state.isLoading = false;

            })
            .addCase(createRequests.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

    },
});

export const {} = requestSlice.actions;
export default requestSlice.reducer;