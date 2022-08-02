import { createServer } from "miragejs"
import { products } from "./products"

export function makeServer() {
  const server = createServer({
    routes() {
      this.namespace = "api"
      this.urlPrefix = "http://localhost:3500"
      this.get("/products", () => products)
    },
  })

  return server
}
