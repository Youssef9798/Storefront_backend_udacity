import { Product, ProductsStore } from '../../models/products'

const products = new ProductsStore()

const product: Product = {
  id: 1,
  name: 'Toshiiba TV 55inches',
  price: 5000,
  category: 'Electroinces',
}

describe('Procuts Model', () => {
  describe('Index Method', () => {
    it('Index method must be existed', () => {
      expect(products.index).toBeDefined()
    })
    it('All Products should be returned', async () => {
      const result = await products.index()
      expect(result).toContain(product)
    })
  })
  describe('Show Method', () => {
    it('Show method must be existed', () => {
      expect(products.show).toBeDefined()
    })
    it('Product row should be returned when the product id is given', async () => {
      const result = await products.show(1)
      expect(result).toEqual(product)
    })
  })
  describe('Create Method', () => {
    it('Created method must be existed', () => {
      expect(products.create).toBeDefined()
    })
    it('Product should be created', async () => {
      const result = await products.create(
        product.name,
        product.price,
        product.category
      )
      product.id = result.id
      expect(result).toEqual(product)
    })
  })
})
