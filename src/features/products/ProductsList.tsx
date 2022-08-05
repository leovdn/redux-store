import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { addToCart } from "../cart/cartSlice"
import { deleteProduct, selectProductsResult } from "./productsSlice"

export type Product = {
  id: string
  title: string
  price: number
  img?: string
}

const ProductsList = () => {
  const dispatch = useAppDispatch()

  const { isLoading, isSuccess, isError, data, error } =
    useAppSelector(selectProductsResult)

  console.log(data)

  // const onAddToCart = (item: Product) => {
  //   try {
  //     dispatch(addToCart(item))
  //   } catch (err) {
  //     console.error("Failed to delete the post", err)
  //   }
  // }

  // const onDeleteProductClicked = (id: string) => {
  //   try {
  //     dispatch(deleteProduct({ id: id })).unwrap()
  //   } catch (err) {
  //     console.error("Failed to delete the post", err)
  //   }
  // }

  if (isLoading) {
    return <p>...Loading</p>
  }

  if (isError) {
    console.log({ error })
  }

  return (
    <section>
      <h3>Lista de Produtos</h3>

      {isSuccess && (
        <div className="products-container">
          {data?.products.map((product) => (
            <div key={product.id} className="product-item">
              <Link to={`/product/${product.id}`}>
                <img src={product.img} alt="" className="bg-img" />
              </Link>
              <h4>{product.title}</h4>
              <p>{product.price}</p>

              <div style={{ display: "flex", justifyContent: "space-around" }}>
                {/* <button onClick={() => onAddToCart(product)}>Add</button>
              <button onClick={() => onDeleteProductClicked(product.id)}>
                Remove
              </button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default ProductsList
