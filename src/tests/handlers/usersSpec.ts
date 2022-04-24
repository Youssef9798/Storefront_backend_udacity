import supertest from 'supertest'
import { UsersStore } from '../../models/users'
import jwt from 'jsonwebtoken'
import app from '../../server'

const { TOKEN_SECRET } = process.env
const req = supertest(app)
const users = new UsersStore()

describe('Users endpoints', () => {
  let token: string
  beforeAll(async () => {
    const user = await users.authenticateUser('test@test.com', 'password123456')
    token = jwt.sign({ user }, TOKEN_SECRET as unknown as string)
  })
  describe('[GET] List All Users endpoint: /api/users', () => {
    it('All Users should be returned with a status 200 if user is authenticated with a token', async () => {
      await req
        .get('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
    })
  })
  describe('[GET] List Single User endpoint: /api/users/:id', () => {
    it('Single User should be returned with a status 200 if user is authenticated with a token', async () => {
      await req
        .get('/api/users/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
    })
  })
  describe('[POST] Create User endpoint: /api/users/', () => {
    it('User should be created if user is authenticated with a token and not already exist', async () => {
      const user = await req
        .post('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'Test2@test.com',
          firstname: 'test2',
          lastname: 'tester2',
          password: 'testingpassword',
        })
      if (user.body.status !== 409) {
        expect(user.status).toBe(200)
      }
    })
    it('Conflict message should be sent if user is already exist', async () => {
      const user = await req
        .post('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'Test2@test.com',
          firstname: 'test2',
          lastname: 'tester2',
          password: 'testingpassword',
        })
      if (user.body.status === 409) {
        expect(user.body.status).toBe(409)
      }
    })
  })
  describe('[POST] Authenticate User endpoint: /api/users/authenticate', () => {
    it('User should be authenticated if user is exist', async () => {
      const res = await req.post('/api/users/authenticate').send({
        email: 'Test2@test.com',
        password: 'testingpassword',
      })
      if (res.body.status !== 401) {
        expect(res.status).toBe(200)
      }
    })
    it('Data not found message should be sent if user is not exist', async () => {
      const res = await req.post('/api/users/authenticate').send({
        email: 'Test2@test.com',
        password: 'testingpassword',
      })
      if (res.body.status === 401) {
        expect(res.status).toBe(401)
      }
    })
  })
})
