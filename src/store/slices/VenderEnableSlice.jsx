import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isVendor: false, // Initial value is set to false
};

const venderEnableSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsVendor(state, action) {
            state.isVendor = action.payload; // Set isVendor to the payload value (true or false)
        },
    },
});

export const { setIsVendor } = venderEnableSlice.actions;
export default venderEnableSlice.reducer;   