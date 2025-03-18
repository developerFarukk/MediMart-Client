

import { RootState } from "@/redux/store";
import { TCartItem } from "@/types/medicins";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TPaymentMethod = 'Cash' | 'Online';

export interface TInitialState {
    medicins: TCartItem[];
    totalQuantity: number;
    totalPrice: number;
    city: string;
    shippingAddress: string;
    precriptionImage: string;
    paymentMethod: TPaymentMethod

}

const initialState: TInitialState = {
    medicins: [],
    totalQuantity: 0,
    totalPrice: 0,
    city: "",
    shippingAddress: "",
    precriptionImage: "",
    paymentMethod: 'Online'
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
                medicinToAdd.subTotalPrice = action.payload.subTotalPrice
            } else {

                // state.medicins.push(action.payload);
                state.medicins.push({
                    ...action.payload,
                    subTotalPrice: action.payload.price * action.payload.orderQuantity
                });
            }


            state.totalQuantity += action.payload.orderQuantity;
            state.totalPrice += action.payload.price * action.payload.orderQuantity;
        },

        // Update the quantity of a specific medicine in the cart
        updateQuantity: (
            state,
            action: PayloadAction<{ id: string; orderQuantity: number }>
        ) => {
            const { id, orderQuantity } = action.payload;
            const existingItem = state.medicins.find((item) => item._id === id);

            if (existingItem && orderQuantity > 0) {
                // Calculate the difference in quantity
                const quantityDifference = orderQuantity - existingItem.orderQuantity;

                existingItem.subTotalPrice = existingItem.price * existingItem.orderQuantity;

                // Update the item's quantity
                existingItem.orderQuantity = orderQuantity;

                // Update total quantity and total price
                state.totalQuantity += quantityDifference;
                state.totalPrice += quantityDifference * existingItem.price;
            }
        },

        // Increment the quantity of a specific medicine in the cart
        incrementOrderQuantity: (state, action: PayloadAction<string>) => {
            const medicinToIncrement = state.medicins.find(
                (medicin) => medicin._id === action.payload
            );

            if (medicinToIncrement && medicinToIncrement.orderQuantity < medicinToIncrement.quantity) {
                // Increment the quantity
                medicinToIncrement.orderQuantity += 1;

                medicinToIncrement.subTotalPrice = medicinToIncrement.price * medicinToIncrement.orderQuantity;

                // Update total quantity and total price
                state.totalQuantity += 1;
                state.totalPrice += medicinToIncrement.price;
            }
        },

        // Decrement the quantity of a specific medicine in the cart
        decrementOrderQuantity: (state, action: PayloadAction<string>) => {
            const medicinToDecrement = state.medicins.find(
                (medicin) => medicin._id === action.payload
            );

            if (medicinToDecrement && medicinToDecrement.orderQuantity > 1) {
                // Decrement the quantity
                medicinToDecrement.orderQuantity -= 1;

                medicinToDecrement.subTotalPrice = medicinToDecrement.price * medicinToDecrement.orderQuantity;

                // Update total quantity and total price
                state.totalQuantity -= 1;
                state.totalPrice -= medicinToDecrement.price;

            }
        },

        removeFromMedicin(state, action: PayloadAction<string>) {
            const itemId = action.payload;
            const existingItem = state.medicins.find((item) => item._id === itemId);
            if (existingItem) {
                state.totalQuantity -= existingItem.orderQuantity;
                state.totalPrice -= existingItem.price * existingItem.orderQuantity;
                state.medicins = state.medicins.filter((item) => item._id !== itemId);
            }
        },

        updateCity: (state, action) => {
            state.city = action.payload;
        },

        updateShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
        },

        updatePrecriptionImage: (state, action) => {
            state.precriptionImage = action.payload;
        },

        updatePaymentMathod: (state, action) => {
            state.paymentMethod = action.payload
        },

        clearCart: (state) => {
            state.medicins = [];
            state.city = "";
            state.shippingAddress = "";
            state.precriptionImage = "";
            state.totalQuantity = 0;
            state.totalPrice = 0;
            state.paymentMethod = "Online"
        },
    },
});

// Selector to get all medicines in the cart
export const orderMedicinsSelector = (state: RootState) => state.cart.medicins;

// Export actions
export const { addMedicin, incrementOrderQuantity, decrementOrderQuantity, updateQuantity, removeFromMedicin, updateCity,
    updateShippingAddress, updatePrecriptionImage, clearCart, updatePaymentMathod } = cartSlice.actions;


export default cartSlice.reducer;