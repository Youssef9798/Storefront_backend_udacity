import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const { TOKEN_SECRET } = process.env

const tokenValidator = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization
    if (authorizationHeader) {
      const bearer = authorizationHeader.split(' ')[0].toLowerCase()
      const token = authorizationHeader.split(' ')[1]
      if (token && bearer === 'bearer') {
        const decodedToken = jwt.verify(
          token,
          TOKEN_SECRET as unknown as string
        )
        if (decodedToken) {
          next()
        } else {
          const error = new Error(`Failed to authenticate the user`)
          next(error)
        }
      } else {
        const error = new Error(`Failed to authenticate the user`)
        next(error)
      }
    } else {
      const error = new Error(`Failed to authenticate the user`)
      next(error)
    }
  } catch (err) {
    const error = new Error(
      `Failed to authenticate user with the following error: ${err}`
    )
    next(error)
  }
}

export default tokenValidator
