import { createServer, Factory, Model } from "miragejs"
import { faker } from "@faker-js/faker"

export function makeServer() {
  const server = createServer({
    models: {
      product: Model,
    },
    factories: {
      product: Factory.extend({
        id(i: number) {
          return i + 1
        },

        title() {
          return faker.commerce.productName()
        },

        price() {
          return faker.commerce.price()
        },

        img() {
          return faker.image.imageUrl(undefined, undefined, undefined, true)
        },
      }),
    },

    routes() {
      this.namespace = "api"
      this.urlPrefix = "http://localhost:3500"

      this.get("/products")
      this.get("/products/:id")
      this.post("/products")
    },

    seeds(server) {
      server.createList("product", 10)
    },
  })

  return server
}
