import "./App.css"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import ProductsList from "./features/products/ProductsList"
import ProductItem from "./features/products/ProductItem"
import Cart from "./features/cart/Cart"
import { makeServer } from "./services/mirage"
import AddNewProduct from "./features/products/AddNewProduct"

makeServer()

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ProductsList />} />

        <Route path="product">
          <Route index element={<AddNewProduct />} />
          <Route path=":productId" element={<ProductItem />} />
          {/* <Route path=":productId" element={<SinglePostPage />} />
          <Route path="edit/:productId" element={<EditPostForm />} /> */}
        </Route>

        <Route path="cart">
          <Route index element={<Cart />} />
          {/* <Route path=":productId" element={<SinglePostPage />} />
          <Route path="edit/:productId" element={<EditPostForm />} /> */}
        </Route>
      </Route>
    </Routes>
  )
}

export default App
