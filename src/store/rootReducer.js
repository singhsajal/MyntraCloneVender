import { combineReducers } from "@reduxjs/toolkit";
import VenderEnableSlice from "./slices/VenderEnableSlice";
import CartSlice from "./slices/CartSlice";


const rootReducer = combineReducers({
    vender: VenderEnableSlice,
    cart: CartSlice

});

export default rootReducer;