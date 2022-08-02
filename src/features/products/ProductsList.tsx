import { useEffect, useState } from "react"
import { api } from "../../services/api"

export type Product = {
  id: number
  title: string
  price: number
  imgUrl: string
}

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([])

  async function getProducts() {
    await api.get("/api/products").then((res) => setProducts(res.data))
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <section>
      <h3>Lista de Produtos</h3>

      <div className="products-container">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <div className="bg-img"></div>
            <h4>{product.title}</h4>
            <p>{product.price}</p>

            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button>add</button>
              <button>remove</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductsList
