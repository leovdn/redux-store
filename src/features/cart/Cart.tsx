import { Link } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { Product } from "../products/ProductsList"
import { getAllCartItems } from "./cartSlice"

const Cart = () => {
  const cart = useAppSelector<Product[]>(getAllCartItems)

  return (
    <div>
      <h1>Carrinho de Compras</h1>

      <div className="products-container">
        {cart?.map((product) => (
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
    </div>
  )
}

export default Cart
