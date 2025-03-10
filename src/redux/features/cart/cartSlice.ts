
import { TMedicine } from "@/types/medicins";
import { createSlice } from "@reduxjs/toolkit";

interface TInitialState {
    medicins: TMedicine[];
}

const initialState: TInitialState = {
    medicins: []
};



const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {}
});




export default cartSlice.reducer;