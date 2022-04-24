import { OrdersProducts, Order, OrdersStore } from '../models/orders'
import express, { Request, Response } from 'express'
import tokenValidator from '../middlewares/auth.middleware'

const orders = new OrdersStore()

const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const order_status = `${req.query.order_status}`
    const odr: Order = await orders.show(id, order_status)
    if (odr) {
      res.json({
        status: 200,
        data: odr,
        message: 'order fetched successfully',
      })
    }
    res.json({
      status: 404,
      data: odr,
      message: 'no order data found',
    })
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: (err as Error).message,
    })
  }
}

const create = async (req: Request, res: Response) => {
  try {
    // const { product_id, product_quantity, order_status } = req.body
    const user_id = Number(req.params.id)
    console.log(user_id)
    if (user_id) {
      const newOdr: Order = await orders.create(Number(user_id))
      return res.json({
        status: 200,
        data: newOdr,
        message: 'Order created successfully',
      })
    }
    return res
      .status(404)
      .json({ status: 404, msg: 'Faild to create order, data not found' })
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: (err as Error).message,
    })
  }
}

const addProduct = async (req: Request, res: Response) => {
  try {
    const order_id = Number(req.body.order_id)
    const product_id = Number(req.body.product_id)
    const product_quantity = Number(req.body.product_quantity)
    if (order_id && product_id && product_quantity) {
      const pdOdr: OrdersProducts = await orders.addProduct(
        order_id,
        product_id,
        product_quantity
      )
      return res.json({
        status: 200,
        data: pdOdr,
        message: 'product added to the order created successfully',
      })
    } else {
      return res.status(404).json({
        status: 404,
        msg: 'Faild to add the product to the order, data not found',
      })
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: (err as Error).message,
    })
  }
}

const orders_routes = (app: express.Application) => {
  app.get('/api/user/:id/orders', tokenValidator, show)
  app.post('/api/user/:id/orders', tokenValidator, create)
  app.post('/api/user/:id/orders/add-product', tokenValidator, addProduct)
}

export default orders_routes
