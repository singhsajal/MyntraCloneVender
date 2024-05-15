import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartCount: 0, // Initial cart count
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateCartCount(state, action) {
            state.cartCount = action.payload; // Update the cart count with the payload
        },
    },
});

export const { updateCartCount } = cartSlice.actions;

export default cartSlice.reducer;