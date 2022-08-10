import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product } from "../products/ProductsList"

interface CartState {
  cartItems: Product[]
  totalAmount: number
  total: number
  status: "idle" | "pending" | "loading" | "succeeded" | "failed"
  error: null | string | undefined
}

const initialState: CartState = {
  cartItems: [],
  totalAmount: 0,
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
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      )

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        }
        console.log("Increased")
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 }
        state.cartItems.push(tempProductItem)
        console.log("Added to Cart")
      }
    },
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem: (state, { payload }: PayloadAction<Product>) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== payload.id)
    },
    getTotal: (state) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem
          const itemTotal = price * cartQuantity

          cartTotal.total += itemTotal
          cartTotal.quantity += cartQuantity

          return cartTotal
        },
        {
          total: 0,
          quantity: 0,
        }
      )
      total = parseFloat(total.toFixed(2))
      state.totalAmount = quantity
      state.total = total
    },
  },
})

export const getAllCartItems = (state: any) => state.cart.cartItems

export const { addToCart, clearCart, removeItem, getTotal } = cartSlice.actions

export default cartSlice.reducer
