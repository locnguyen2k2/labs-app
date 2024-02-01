import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userReducer/userSlice";

export const stores = configureStore({
    reducer: {
        userAuth: userSlice
    }
})