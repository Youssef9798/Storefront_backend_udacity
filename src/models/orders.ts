import Client from '../database'

export type Order = {
  id: number
  user_id: number
  order_status: string
}

export type OrdersProducts = {
  id: number
  order_id: number
  product_id: number
  product_quantity: number
}

export class OrdersStore {
  async show(id: number, order_status: string): Promise<Order> {
    try {
      const connection = await Client.connect()
      const sql =
        'SELECT * FROM orders WHERE user_id=($1) AND order_status=($2)'
      const result = await connection.query(sql, [id, order_status])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(
        `Faild to get the order with the following error: ${
          (err as Error).message
        }`
      )
    }
  }
  async create(user_id: number): Promise<Order> {
    try {
      const connection = await Client.connect()
      const orderStatus = 'active'
      const sql =
        'INSERT INTO orders (user_id, order_status) VALUES ($1, $2) RETURNING *'
      const result = await connection.query(sql, [user_id, orderStatus])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(
        `Faild to create the order with the following error: ${
          (err as Error).message
        }`
      )
    }
  }
  async addProduct(
    order_id: number,
    product_id: number,
    product_quantity: number
  ): Promise<OrdersProducts> {
    try {
      const connection = await Client.connect()
      let sql = 'SELECT * FROM orders WHERE id=($1)'
      let result = await connection.query(sql, [order_id])
      if (result.rows.length && result.rows[0].order_status === 'active') {
        sql =
          'INSERT INTO orders_products (order_id, product_id, product_quantity) VALUES ($1, $2, $3) RETURNING *'
        result = await connection.query(sql, [
          order_id,
          product_id,
          product_quantity,
        ])
        connection.release()
        return result.rows[0]
      } else {
        connection.release()
        throw new Error(
          `Faild to add the product to the order, order is not found or maybe completed`
        )
      }
    } catch (err) {
      throw new Error(
        `Faild to add the product to the order with the following error: ${
          (err as Error).message
        }`
      )
    }
  }
}
