import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const { ENV, POSTGRES_TEST, POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } =
  process.env
let Client: Pool;

if( ENV === 'dev') {
   Client = new Pool({
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
  })
}

if( ENV === 'test') {
  Client = new Pool({
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_TEST,
  })
}


export default Client
