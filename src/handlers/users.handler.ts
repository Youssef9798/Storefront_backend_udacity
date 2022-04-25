import { User, UsersStore } from '../models/users'
import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import tokenValidator from '../middlewares/auth.middleware'

const users = new UsersStore()

const { TOKEN_SECRET } = process.env

const index = async (_req: Request, res: Response) => {
  try {
    const usrs: User[] = await users.index()
    res.json({
      status: 200,
      data: usrs,
      message: 'Users fetched successfully',
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
    const usr: User = await users.show(id)
    res.json({
      status: 200,
      data: usr,
      message: 'User fetched successfully',
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
    const { email, firstname, lastname, password } = req.body
    if (firstname && lastname && password) {
      const newUsr = (await users.create(
        email,
        firstname,
        lastname,
        password
      )) as User

      if (newUsr !== null) {
        return res.json({
          status: 200,
          data: newUsr,
          message: 'User created successfully',
        })
      } else {
        return res.json({
          status: 409,
          message: 'User already exist',
        })
      }
    }
    return res.status(404).json({ msg: 'Faild to create user, data not found' })
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: (err as Error).message,
    })
  }
}

const authenticate = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const usr = await users.authenticateUser(email, password)
    if (usr === null) {
      return res.status(401).json({
        status: 401,
        message: 'the email and password are invalid, please try again',
      })
    }
    const token = jwt.sign({ usr }, TOKEN_SECRET as unknown as string)
    return res.json({
      status: 200,
      data: { ...usr, token },
      message: 'user is authenticated successfully',
    })
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: (err as Error).message,
    })
  }
}

const users_routes = (app: express.Application) => {
  app.get('/api/users', tokenValidator, index)
  app.get('/api/users/:id', tokenValidator, show)
  app.post('/api/users', create)
  app.post('/api/users/authenticate', authenticate)
}

export default users_routes
