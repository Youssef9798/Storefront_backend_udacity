import { Product, ProductsStore } from '../models/products'
import express, { Request, Response } from 'express'
import tokenValidator from '../middlewares/auth.middleware'

const products = new ProductsStore()

const index = async (_req: Request, res: Response) => {
  try {
    const pds: Product[] = await products.index()
    res.json({
      status: 'success',
      data: pds,
      message: 'products fetched successfully',
    })
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: (err as Error).message,
    })
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const pd: Product = await products.show(id)
    res.json({
      status: 'success',
      data: pd,
      message: 'Product fetched successfully',
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
    const { name, price, category } = req.body

    if ((name && price) || category) {
      const newPd: Product = await products.create(name, price, category)
      return res.json({
        status: 'success',
        data: newPd,
        message: 'Product created successfully',
      })
    }
    return res
      .status(500)
      .json({ msg: 'Faild to create Product, data not found' })
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: (err as Error).message,
    })
  }
}

const products_routes = (app: express.Application) => {
  app.get('/api/products', index)
  app.get('/api/products/:id', show)
  app.post('/api/products', tokenValidator, create)
}

export default products_routes
