import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit"
import { api } from "../../services/api"
import { apiSlice } from "../api/apiSlice"
import { Product } from "./ProductsList"

interface Products {
  products: Product[]
}

interface ProductResponse {
  product: Product
}

const postsAdapter = createEntityAdapter<Product>({
  selectId: (product) => product.id,
})

const initialState = postsAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Products, void>({
      query: () => "/products",
      providesTags: (result, error, data) => ["Product"],
    }),

    getProductById: builder.query<ProductResponse, string | number | undefined>(
      {
        query: (id: string) => `/products/${id}`,
        providesTags: (result, error, data) => ["Product"],
      }
    ),

    addNewProduct: builder.mutation({
      query: (initialPost) => ({
        url: "/products",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation<void, string | number | undefined>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => ["Product"],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddNewProductMutation,
  useDeleteProductMutation,
} = extendedApiSlice

export const selectProductsResult =
  extendedApiSlice.endpoints.getProducts.select()

const selectProductsData = createSelector(
  selectProductsResult,
  (postsResult) => postsResult.data
)

// export const {} = postsAdapter.getSelectors((state) => selectProductsData)

// const productsSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     productsAdded: {
//       reducer(state, action: PayloadAction<Product>) {
//         state.products.push(action.payload)
//       },
//       prepare({ title, price }: Product): any {
//         return {
//           payload: {
//             title,
//             price,
//           },
//         }
//       },
//     },
//   },
//   extraReducers(builder) {
//     builder
//       .addCase(fetchProducts.pending, (state, action) => {
//         state.status = "loading"
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.status = "succeeded"
//         // const loadedProducts = action.payload.map((product: Product) => product)
//         state.products = action.payload.products
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.status = "failed"
//         state.error = action.error.message
//       })

//       .addCase(addNewProduct.fulfilled, (state, action) => {
//         state.products.push(action.payload)
//       })

//       .addCase(deleteProduct.fulfilled, (state, action: any) => {
//         // console.log({ action, state })
//         if (!action.payload) {
//           console.log("Delete not completed")
//           console.log(action.payload)
//           return
//         }

//         const { id } = action.payload
//         const products = state.products.filter((product) => product.id !== id)
//         state.products = products
//       })
//   },
// })

// export const selectAllProducts = (state: any) => state.products.products
// export const getProductsStatus = (state: any) => state.products.status
// export const getProductsError = (state: any) => state.products.error

// export const selectProductById = (state: any, productId: any) =>
//   state.products.products.find((product: any) => product.id === productId)

// export const { productsAdded } = productsSlice.actions

// export default productsSlice.reducer
