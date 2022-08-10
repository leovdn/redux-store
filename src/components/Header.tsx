import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { getAllCartItems, getTotal } from "../features/cart/cartSlice"
import { Product } from "../features/products/ProductsList"
import { CartIcon } from "../icons"

const Header = () => {
  const cart = useAppSelector<Product[]>(getAllCartItems)
  const { totalAmount } = useAppSelector((state) => state.cart)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTotal())
  }, [cart, dispatch])

  return (
    <nav>
      <div className="nav-center">
        <Link to="/">
          <h2>Redux Store</h2>
        </Link>
        <Link to="/product">
          <h4>Add New Product</h4>
        </Link>
        <div className="nav-container">
          <Link to="/cart">
            <CartIcon />
          </Link>
          <div className="amount-container">
            <p className="total-amount">{totalAmount}</p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
