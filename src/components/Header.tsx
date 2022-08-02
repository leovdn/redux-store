import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header
      style={{
        padding: "16px 8px",
        backgroundColor: "#764abc",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "2rem",
      }}
    >
      <h3>
        <Link to="/" style={{ color: "#ddd" }}>
          Redux Store
        </Link>
      </h3>

      <nav>
        <ul>
          <li>
            <Link to="/cart" style={{ color: "#ddd" }}>
              Carrinho
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
