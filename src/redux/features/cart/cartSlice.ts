
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
        },

        incrementOrderQuantity: (state, action) => {
            const medicinToIncrement = state.medicins.find(
                (medicin) => medicin._id === action.payload
            );

            if (medicinToIncrement) {
                medicinToIncrement.orderQuantity += 1;
                return;
            }
        },
        
        decrementOrderQuantity: (state, action) => {
            const medicinToIncrement = state.medicins.find(
                (medicin) => medicin._id === action.payload
            );

            if (medicinToIncrement && medicinToIncrement.orderQuantity > 1) {
                medicinToIncrement.orderQuantity -= 1;
                return;
            }
        },
    }
});

export const orderMedicinsSelector = (state: RootState) => { return state.cart.medicins }

export const { addMedicin, incrementOrderQuantity, decrementOrderQuantity } = cartSlice.actions;
export default cartSlice.reducer;