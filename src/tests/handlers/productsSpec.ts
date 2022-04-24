import supertest from 'supertest'
import { UsersStore } from '../../models/users'
import jwt from 'jsonwebtoken'
import app from '../../server'

const { TOKEN_SECRET } = process.env
const req = supertest(app)
const users = new UsersStore()

describe('Products endpoints', () => {
  describe('[GET] List All products endpoint: /api/products', () => {
    it('All products should be returned with a status 200', async () => {
      await req.get('/api/products').expect(200)
    })
  })
  describe('[GET] List Single product endpoint: /api/products/:id', () => {
    it('Single product should be returned with a status 200', async () => {
      await req.get('/api/products').expect(200)
    })
  })
  describe('[POST] Create product endpoint: /api/products/', () => {
    let token: string
    beforeAll(async () => {
      const user = await users.authenticateUser(
        'test@test.com',
        'password123456'
      )
      token = jwt.sign({ user }, TOKEN_SECRET as unknown as string)
    })
    it('Product should be created if user is authenticated with a token', async () => {
      await req
        .post('/api/products')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Test',
          price: 500,
          category: 'testing',
        })
        .expect(200)
    })
  })
})
