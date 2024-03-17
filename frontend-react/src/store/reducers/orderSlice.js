import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataOrder: [],
    total_amount: 0,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addItemToOrder: (state, action) => {
            const { product_id, title, quantity, price } = action.payload;

            const product = state.dataOrder?.find(
                (item) => item.product_id === product_id
            );

            if (product) {
                state.dataOrder = state.dataOrder.map((item) =>
                    item === product
                        ? {
                              ...item,
                              quantity: item.quantity + quantity,
                          }
                        : item
                );
            } else {
                state.dataOrder = [
                    ...state.dataOrder,
                    {
                        product_id,
                        title,
                        quantity,
                        price,
                    },
                ];
            }
            state.total_amount += price;
        },

        removeItemFromOrder: (state, action) => {
            state.dataOrder = state.dataOrder.filter(
                (item) => item.product_id !== action.payload.product_id
            );
            state.total_amount -=
                action.payload.price * action.payload.quantity;
        },
        setItemQuantity: (state, action) => {
            if (action.payload.sign === "plus") {
                state.dataOrder = state.dataOrder.map((item) =>
                    item.product_id === action.payload.product.product_id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                state.total_amount += action.payload.product.price;
            } else if (action.payload.sign === "minus") {
                const checkFoundItem = state.dataOrder.find(
                    (item) =>
                        item.product_id === action.payload.product.product_id &&
                        item.quantity > 1
                );
                state.dataOrder = state.dataOrder.map((item) =>
                    item === checkFoundItem
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
                if (checkFoundItem) {
                    state.total_amount -= action.payload.product.price;
                }
            }
        },
    },
});

export const { addItemToOrder, removeItemFromOrder, setItemQuantity } =
    orderSlice.actions;

export default orderSlice.reducer;
