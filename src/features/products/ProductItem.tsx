import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { addToCart } from "../cart/cartSlice"
import { Product } from "./ProductsList"
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
} from "./productsSlice"

const ProductItem = () => {
  const { productId } = useParams()
  const navigation = useNavigate()
  const [deleteProduct] = useDeleteProductMutation()
  const dispatch = useAppDispatch()

  const { isError, error, data, isLoading, isSuccess } =
    useGetProductByIdQuery(productId)

  const onDeleteProductClicked = () => {
    try {
      deleteProduct(productId)
      navigation("/")
    } catch (err) {
      console.error("Failed to delete the post", err)
    }
  }

  const onAddToCart = (item: Product) => {
    try {
      dispatch(addToCart(item))
    } catch (err) {
      console.error("Failed to delete the post", err)
    }
  }

  if (isError) {
    return (
      <section>
        <h2>No Product found!</h2>
      </section>
    )
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <section>
      <h3>Lista de Produtos</h3>

      {isSuccess && (
        <div className="products-container">
          <div key={data.product.id} className="product-item">
            <img src={data.product.img} alt="" className="bg-img" />
            <h4>{data.product.title}</h4>
            <p>{data.product.price}</p>

            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button onClick={() => onAddToCart(data.product)}>Add</button>
              <button onClick={onDeleteProductClicked}>Remove</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductItem
