
import { RootState } from "@/redux/store";
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

            const medicinToAdd = state.medicins.find(
                (medicin) => medicin._id === action.payload._id
            );

            if (medicinToAdd) {
                medicinToAdd.orderQuantity += 1;
                return;
            }

            state.medicins.push({ ...action.payload, orderQuantity: 1 });
        }
    }
});

export const orderMedicinsSelector = (state: RootState) => {
    return state.cart.medicins
}

export const { addMedicin } = cartSlice.actions;
export default cartSlice.reducer;