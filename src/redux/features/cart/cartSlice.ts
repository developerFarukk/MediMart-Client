
import { RootState } from "@/redux/store";
import { TCartItem } from "@/types/medicins";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TInitialState {
    medicins: TCartItem[];
    totalQuantity: number;
    totalPrice: number;
}

const initialState: TInitialState = {
    medicins: [],
    totalQuantity: 0,
    totalPrice: 0,
};



const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addMedicin: (state, action: PayloadAction<TCartItem>) => {

            const medicinToAdd = state.medicins.find(
                (medicin) => medicin._id === action.payload._id
            );

            if (medicinToAdd) {
                medicinToAdd.orderQuantity += action.payload.orderQuantity;
            } else {
                state.medicins.push(action.payload);
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