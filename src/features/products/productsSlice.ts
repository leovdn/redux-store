import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { api } from "../../services/api"
import { Product } from "./ProductsList"

interface ProductsState {
  products: Product[]
  status: "idle" | "pending" | "loading" | "succeeded" | "failed"
  error: null
}

const initialState: ProductsState = {
  products: [],
  status: "idle",
  error: null,
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const res = await api.get("/api/products")
      return res.data
    } catch (error: any) {
      return error.message
    }
  }
)

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsAdded: {
      reducer(state, action: PayloadAction<Product, string>) {
        state.products.push(action.payload)
      },
      prepare({ title, price }: Product): any {
        return {
          payload: {
            title,
            price,
          },
        }
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded"
        // const loadedProducts = action.payload.map((product: Product) => product)
        state.products = action.payload.products
      })
  },
})

export const selectAllProducts = (state: any) => state.products.products
export const getProductsStatus = (state: any) => state.products.status
export const getProductsError = (state: any) => state.products.error

export const { productsAdded } = productsSlice.actions

export default productsSlice.reducer
