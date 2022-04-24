import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'

/**
 * Routes
 */

import ProductsRoutes from './handlers/products.handler'
import OrdersRoutes from './handlers/orders.handler'
import UsersRoutes from './handlers/users.handler'

const app: express.Application = express()
const address = '0.0.0.0:3000'

app.use(bodyParser.json())
app.use(express.json())

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!')
})

ProductsRoutes(app)
OrdersRoutes(app)
UsersRoutes(app)

app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
})

export default app
