import {configureStore} from '@reduxjs/toolkit';
import interpreterSlice from "@/app/redux/interpreter/interpreterSlice.js";
import requestSlice from "@/app/redux/Requests/RequestSlice.js";
import coordianatorSlice from "@/app/redux/Coordinator/CoordianatorSlice.js";


export const store = configureStore({
    reducer: {
        interpreter: interpreterSlice,
        requests: requestSlice,
        coordinator: coordianatorSlice
    },
});
