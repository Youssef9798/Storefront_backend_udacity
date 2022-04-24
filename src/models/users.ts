import Client from '../database'
import bcrypt from 'bcrypt'

export type User = {
  id: number
  email: string
  firstname: string
  lastname: string
}

const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env

const hashPassword = (password: string): string => {
  const salt = parseInt(SALT_ROUNDS as string, 10)
  return bcrypt.hashSync(`${password}${BCRYPT_PASSWORD}`, salt)
}

export class UsersStore {
  async index(): Promise<User[]> {
    try {
      const connection = await Client.connect()
      const sql = 'SELECT id, email, firstname, lastname FROM users'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (err) {
      throw new Error(
        `Failed to get the users with the following error: ${
          (err as Error).message
        }`
      )
    }
  }
  async show(id: number): Promise<User> {
    try {
      const connection = await Client.connect()
      const sql =
        'SELECT id, email, firstname, lastname FROM users WHERE id=($1)'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(
        `Failed to get the user with the following error: ${
          (err as Error).message
        }`
      )
    }
  }
  async create(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ): Promise<User | null> {
    try {
      const connection = await Client.connect()
      let sql = 'SELECT * from users WHERE email=($1)'
      let result = await connection.query(sql, [email])
      if (result.rows[0] !== undefined) {
        connection.release()
        return null
      }
      sql =
        'INSERT INTO users (email, firstName, lastName, password) VALUES ($1, $2, $3, $4) RETURNING *'
      result = await connection.query(sql, [
        email,
        firstName,
        lastName,
        hashPassword(password),
      ])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(
        `Faild to insert user data with the following error: ${
          (err as Error).message
        }`
      )
    }
  }
  async authenticateUser(
    email: string,
    password: string
  ): Promise<User | null> {
    try {
      const connection = await Client.connect()
      const sql = 'SELECT password FROM users WHERE email=($1)'
      const result = await connection.query(sql, [email])
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0]
        const validPassword = bcrypt.compareSync(
          `${password}${BCRYPT_PASSWORD}`,
          hashPassword
        )
        if (validPassword) {
          const userData = await connection.query(
            'SELECT id, email, firstName, lastName FROM users WHERE email=($1)',
            [email]
          )
          connection.release()
          return userData.rows[0]
        }
      }
      connection.release()
      return null
    } catch (err) {
      throw new Error(
        `Failed to login or find the user with the following error: ${
          (err as Error).message
        }`
      )
    }
  }
}
