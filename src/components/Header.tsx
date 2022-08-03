import { Link } from "react-router-dom"
import { CartIcon } from "../icons"

const Header = () => {
  return (
    <nav>
      <div className="nav-center">
        <Link to="/">
          <h3>Redux Store</h3>
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
