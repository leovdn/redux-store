import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product } from "../products/ProductsList"

interface CartState {
  cartItems: Product[]
  amount: number
  total: number
  status: "idle" | "pending" | "loading" | "succeeded" | "failed"
  error: null | string | undefined
}

const initialState: CartState = {
  cartItems: [],
  amount: 0,
  total: 0,
  status: "idle",
  error: null,
}

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (name, { getState }) => {}
)

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      let compare = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      )

      if (compare) {
        state.cartItems.push(action.payload)
      }
    },
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem: (state, { payload }: PayloadAction<Product>) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== payload.id)
    },
    calculateTotal: (state, { payload }: PayloadAction<Product[]>) => {
      console.log("Total = ")
    },
  },
})

export const getAllCartItems = (state: any) => state.cart.cartItems

export const { addToCart, clearCart, removeItem, calculateTotal } =
  cartSlice.actions

export default cartSlice.reducer
