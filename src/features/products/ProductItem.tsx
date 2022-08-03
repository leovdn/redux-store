import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../../services/api"

interface ProductItemProps {
  id: string
  title: string
  price: number
  img?: string
}

const ProductItem = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState<ProductItemProps>(
    {} as ProductItemProps
  )

  const navigation = useNavigate()

  async function getProducts() {
    await api
      .get(`/api/products/${productId}`)
      .then((res) => setProduct(res.data.product))
  }

  function deleteProduct(id: string) {
    api.delete(`api/products/${id}`)
    navigation("/")
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <section>
      <h3>Lista de Produtos</h3>

      <div className="products-container">
        <div key={product.id} className="product-item">
          <img src={product.img} alt="" className="bg-img" />
          <h4>{product.title}</h4>
          <p>{product.price}</p>

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button>Add</button>
            <button onClick={() => deleteProduct(product.id)}>Remove</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductItem
