import * as dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/.env' })

interface IDatabaseConfig {
  HOST: string
  PORT: number
  USERNAME: string
  PASSWORD: string
  NAME: string
}

export const DATABASE: IDatabaseConfig = {
  HOST: process.env.DATABASE_HOST || 'localhost',
  PORT: Number(process.env.DATABASE_PORT || 5432),
  USERNAME: process.env.DATABASE_USER || 'postgres',
  PASSWORD: process.env.DATABASE_PASSWORD || 'password',
  NAME: process.env.DATABASE_NAME || 'decentlab',
}


export const NETWORK_URL = process.env.NETWORK_URL || 'http://127.0.0.1:8545'
export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as string
