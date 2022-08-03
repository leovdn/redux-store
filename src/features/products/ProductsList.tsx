import { Link } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { api } from "../../services/api"
import { selectAllProducts } from "./productsSlice"

export type Product = {
  id: string
  title: string
  price: number
  img?: string
}

const ProductsList = () => {
  const products = useAppSelector(selectAllProducts)

  function deleteProduct(id: string) {
    api.delete(`api/products/${id}`)
  }

  return (
    <section>
      <h3>Lista de Produtos</h3>

      <div className="products-container">
        {products?.map((product: Product) => (
          <div key={product.id} className="product-item">
            <Link to={`/product/${product.id}`}>
              <img src={product.img} alt="" className="bg-img" />
            </Link>
            <h4>{product.title}</h4>
            <p>{product.price}</p>

            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button>Add</button>
              <button onClick={() => deleteProduct(product.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductsList
