import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { api } from "../../services/api"
import { Product } from "./ProductsList"

interface ProductsState {
  products: Product[]
  status: "idle" | "pending" | "loading" | "succeeded" | "failed"
  error: null | string | undefined
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

export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async (initialProduct) => {
    try {
      const res = await api.post("/api/products", initialProduct)
      return res.data.product
    } catch (error: any) {
      return error.message
    }
  }
)

export const deleteProduct = createAsyncThunk<Product, any>(
  "products/deleteProduct",
  async (initialProduct: { id: string }) => {
    const { id } = initialProduct

    try {
      console.log({ initialProduct })
      const res = await api.delete(`api/products/${id}`)

      if (res?.status === 204) return initialProduct

      return `${res?.status}: ${res?.statusText}`
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
      reducer(state, action: PayloadAction<Product>) {
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
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })

      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.products.push(action.payload)
      })

      .addCase(deleteProduct.fulfilled, (state, action: any) => {
        // console.log({ action, state })
        if (!action.payload) {
          console.log("Delete not completed")
          console.log(action.payload)
          return
        }

        const { id } = action.payload
        const products = state.products.filter((product) => product.id !== id)
        state.products = products
      })
  },
})

export const selectAllProducts = (state: any) => state.products.products
export const getProductsStatus = (state: any) => state.products.status
export const getProductsError = (state: any) => state.products.error

export const selectProductById = (state: any, productId: any) =>
  state.products.products.find((product: any) => product.id === productId)

export const { productsAdded } = productsSlice.actions

export default productsSlice.reducer
