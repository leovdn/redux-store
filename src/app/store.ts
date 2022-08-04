import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import productsReducer from "../features/products/productsSlice"
import cartReducer from "../features/cart/cartSlice"

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    cart: cartReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
