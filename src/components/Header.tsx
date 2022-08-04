import { Link } from "react-router-dom"
import { CartIcon } from "../icons"

const Header = () => {
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
            <p className="total-amount">{0}</p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
