import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { addNewProduct } from "./productsSlice"

const AddNewProduct = () => {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [img, setImg] = useState(
    "https://loremflickr.com/cache/resized/65535_52145066049_c3b9c3d601_c_640_480_nofilter.jpg"
  )

  const dispatch = useAppDispatch()
  const navigation = useNavigate()

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onPriceChanged = (e) => setPrice(e.target.value)

  const canSave = [title, price].every(Boolean)

  const handleAddNewProduct = () => {
    if (canSave) {
      try {
        dispatch(addNewProduct({ title, price, img })).unwrap()

        navigation("/")
      } catch (error) {
        console.log({ error })
      }
    }
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          name="postTitle"
          id="postTitle"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="postAuthor">Price:</label>
        <input
          type="text"
          name="postTitle"
          id="postTitle"
          value={price}
          onChange={onPriceChanged}
        />

        <button type="button" onClick={handleAddNewProduct} disabled={!canSave}>
          Add new Product
        </button>
      </form>
    </section>
  )
}

export default AddNewProduct
