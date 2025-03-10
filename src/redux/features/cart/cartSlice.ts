
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
    reducers: {
        addMedicin: (state, action) => {
            state.medicins.push(action.payload);
        }
    }
});



export const { addMedicin } = cartSlice.actions;
export default cartSlice.reducer;