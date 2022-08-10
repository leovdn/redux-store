import { apiSlice } from "../api/apiSlice"
import { Product } from "./ProductsList"

interface Products {
  products: Product[]
}

interface ProductResponse {
  product: Product
}

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
