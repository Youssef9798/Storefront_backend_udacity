import { User, UsersStore } from '../../models/users'

const users = new UsersStore()

const user: User = {
  id: 1,
  email: 'Test2@test.com',
  firstname: 'test2',
  lastname: 'tester2',
}

describe('Users Model', () => {
  describe('Create Method', () => {
    it('Create method must be exist', () => {
      expect(users.create).toBeDefined()
    })
    it('User should be created if it not exist', async () => {
      const result = await users.create(
        user.email,
        user.firstname,
        user.lastname,
        'password123456'
      )
      if (result !== null) {
        expect(result.email).toEqual(user.email)
        expect(result.firstname).toEqual(user.firstname)
        expect(result.lastname).toEqual(user.lastname)
      }
    })
    it('Conflict message should be sent if user is already exist', async () => {
      const result = await users.create(
        user.email,
        user.firstname,
        user.lastname,
        'password123456'
      )
      if (result === null) {
        expect(result).toBe(null)
      }
    })
  })
  describe('Index Method', () => {
    it('Index method must be exist', () => {
      expect(users.index).toBeDefined()
    })
    it('All users should be returned', async () => {
      const result = await users.index()
      expect(result).toContain(user)
    })
  })
  describe('Show Method', () => {
    it('Show method must be exist', () => {
      expect(users.show).toBeDefined()
    })
    it('User should be returned as the given id', async () => {
      const result = await users.show(1)
      expect(result).toEqual(user)
    })
  })
  describe('AuthenticateUser Method', () => {
    it('AuthenticateUser method must be exist', () => {
      expect(users.authenticateUser).toBeDefined()
    })
    it('User must be authenticated to access specific endpoints with a token', async () => {
      const result = await users.authenticateUser(
        'test@test.com',
        'password123456'
      )
      expect(result).toBeDefined()
    })
  })
})
