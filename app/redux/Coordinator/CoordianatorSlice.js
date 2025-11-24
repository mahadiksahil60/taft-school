import {createSlice} from '@reduxjs/toolkit';
import {fetchInterpreters, sendInvite} from "@/app/redux/Coordinator/CoordinatorThunk.js";

const coordinatorSlice = createSlice({
    name: 'requests',
    initialState: {
        interpreters: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendInvite.pending, (state) => {
                state.isLoading = true;

                state.error = null;
            })
            .addCase(sendInvite.fulfilled, (state, action) => {
                state.isLoading = false;

            })
            .addCase(sendInvite.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchInterpreters.pending, (state) => {
                state.isLoading = true;
                state.interpreters = []
            })
            .addCase(fetchInterpreters.fulfilled, (state, action) => {
                state.isLoading = false;
                state.interpreters = action.payload
            })
            .addCase(fetchInterpreters.rejected, (state, action) => {
                state.isLoading = false;
                state.interpreters = []

            })


    },
});

export const {} = coordinatorSlice.actions;
export default coordinatorSlice.reducer;