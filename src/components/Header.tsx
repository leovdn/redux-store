import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header
      style={{
        padding: "16px 8px",
        backgroundColor: "#764abc",
        display: "flex",
        height: "2rem",
      }}
    >
      <h3>Redux Store </h3>

      <nav>
        <ul>
          <li>
            <Link to="/cart">Carrinho</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
