import { Link } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { addToCart } from "../cart/cartSlice"

import { useDeleteProductMutation, useGetProductsQuery } from "./productsSlice"

export type Product = {
  id: string
  title: string
  price: number
  img?: string
}

const ProductsList = () => {
  const [deleteProduct] = useDeleteProductMutation()
  const dispatch = useAppDispatch()

  const { isError, isLoading, error, data, isSuccess } = useGetProductsQuery()

  const onAddToCart = (item: Product) => {
    try {
      dispatch(addToCart(item))
    } catch (err) {
      console.error("Failed to delete the post", err)
    }
  }

  const onDeleteProductClicked = async (id: any) => {
    try {
      deleteProduct(id)
    } catch (err) {
      console.error("Failed to delete the post", err)
    }
  }

  if (isLoading) {
    return <p>...Loading</p>
  }

  if (isError) {
    console.log({ error })
  }

  return (
    <section>
      <h3>Lista de Produtos</h3>

      <div className="products-container">
        {isSuccess &&
          data?.products.map((product) => (
            <div key={product.id} className="product-item">
              <Link to={`/product/${product.id}`}>
                <img src={product.img} alt="" className="bg-img" />
              </Link>
              <h4>{product.title}</h4>
              <p>{product.price}</p>

              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <button onClick={() => onAddToCart(product)}>Add</button>
                <button onClick={() => onDeleteProductClicked(product.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}

export default ProductsList
