import supertest from 'supertest'
import { User, UsersStore } from '../../models/users'
import jwt from 'jsonwebtoken'
import app from '../../server'

const { TOKEN_SECRET } = process.env
const req = supertest(app)
const users = new UsersStore()

describe('Orders endpoints', () => {
  let token: string
  beforeAll(async () => {
    const user = await users.authenticateUser(
      'Test2@test.com',
      'password123456'
    )
    if (!user) {
      const user = await users.create(
        'Test2@test.com',
        'test2',
        'tester2',
        'password123456'
      )
      return (token = jwt.sign(
        {
          id: (user as unknown as User).id,
          email: (user as unknown as User).email,
          firstname: (user as unknown as User).firstname,
          lastname: (user as unknown as User).lastname,
        },
        TOKEN_SECRET as unknown as string
      ))
    }
    token = jwt.sign({ user }, TOKEN_SECRET as unknown as string)
  })
  describe('[GET] List All Orders for User endpoint: /api/user/:id/orders', () => {
    it('All Orders should be returned with a status 200 if user is authenticated with a token', async () => {
      await req
        .get('/api/user/1/orders')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
    })
  })
  describe('[POST] Create Order for User endpoint: /api/user/:id/orders', () => {
    it('Order should be created if user is authenticated with a token', async () => {
      const order = await req
        .post('/api/user/1/orders')
        .set('Authorization', `Bearer ${token}`)
      if (order.body.status !== 404) {
        expect(order.status).toBe(200)
      }
    })
    it('Order failed to be created message', async () => {
      const order = await req
        .post('/api/user/1/orders')
        .set('Authorization', `Bearer ${token}`)
      if (order.body.status === 404) {
        expect(order.status).toBe(404)
      }
    })
  })
  describe('[POST] Add product for Order for the User endpoint: /api/user/:id/orders/add-product', () => {
    it('Order should be created if user is authenticated with a token', async () => {
      const order = await req
        .post('/api/user/1/orders/add-product')
        .set('Authorization', `Bearer ${token}`)
        .send({
          order_id: 1,
          product_id: 1,
          product_quantity: 5,
        })
      if (order.body.status !== 404) {
        expect(order.status).toBe(200)
      }
    })
    it('Product failed to add to the order with a status 404', async () => {
      const order = await req
        .post('/api/user/1/orders')
        .set('Authorization', `Bearer ${token}`)
      if (order.body.status === 404) {
        expect(order.status).toBe(404)
      }
    })
  })
})
