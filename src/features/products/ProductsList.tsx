import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "../../services/api"

export type Product = {
  id: string
  title: string
  price: number
  img?: string
}

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([])

  async function getProducts() {
    await api.get("/api/products").then((res) => setProducts(res.data.products))
  }

  function deleteProduct(id: string) {
    api.delete(`api/products/${id}`)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <section>
      <h3>Lista de Produtos</h3>

      <div className="products-container">
        {products?.map((product) => (
          <div key={product.id} className="product-item">
            {/* <div className="bg-img"></div> */}
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
