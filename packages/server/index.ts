import { App } from './app'

const initApp = async () => {
  const server = new App()
  await server.load()

  server.start(process.env.PORT ? Number(process.env.PORT) : 3001)
}

initApp()
