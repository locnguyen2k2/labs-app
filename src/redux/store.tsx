import { configureStore } from "@reduxjs/toolkit";
import balanceSlice from "./userReducer/userSlice";

export const stores = configureStore({
    reducer: {
        userAuth: balanceSlice
    }
})