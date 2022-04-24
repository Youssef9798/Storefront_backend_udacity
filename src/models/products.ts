import Client from '../database'

export type Product = {
  id: number
  name: string
  price: number
  category: string
}

export class ProductsStore {
  async index(): Promise<Product[]> {
    try {
      const connection = await Client.connect()
      const sql = 'SELECT * FROM products'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (err) {
      throw new Error(
        `Failed to get products with the following error: ${
          (err as Error).message
        }`
      )
    }
  }
  async show(id: number): Promise<Product> {
    try {
      const connection = await Client.connect()
      const sql = 'SELECT * FROM products WHERE id=($1)'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(
        `Failed to get the product with the following error: ${
          (err as Error).message
        }`
      )
    }
  }
  async create(
    name: string,
    price: number,
    category: string
  ): Promise<Product> {
    try {
      const connection = await Client.connect()
      const sql =
        'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *'
      const result = await connection.query(sql, [name, price, category])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(
        `Failed to get the product with the following error: ${
          (err as Error).message
        }`
      )
    }
  }
}
