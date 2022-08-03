import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { api } from "../../services/api"
import { selectProductById } from "./productsSlice"

interface ProductItemProps {
  id: string
  title: string
  price: number
  img?: string
}

const ProductItem = () => {
  const { productId } = useParams()
  const navigation = useNavigate()

  const product = useAppSelector((state) => selectProductById(state, productId))

  function deleteProduct(id: string) {
    api.delete(`api/products/${id}`)
    navigation("/")
  }

  if (!product) {
    return (
      <section>
        <h2>No Product found!</h2>
      </section>
    )
  }

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
