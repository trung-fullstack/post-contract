import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { createConnection } from 'typeorm'
import { PostHandler } from './handlers/post'
import { SubscribeHandler } from './handlers/subscribe'

import { Post } from './database/entities/Post'
import { PostSubscriber } from './database/subscribers/post-subscriber'
import { PosterContract } from './services/poster-contract'

import { DATABASE, NETWORK_URL, CONTRACT_ADDRESS } from './configuration'

export class App {
  private app: express.Application

  //Handlers
  postHandler: PostHandler = new PostHandler()
  subscribeHandler: SubscribeHandler = new SubscribeHandler()

  //contract
  poster: PosterContract = new PosterContract(CONTRACT_ADDRESS, NETWORK_URL)

  constructor() {
    this.app = express()
    this.configuration()
  }

  public configuration() {
    this.app.use(cors());
    this.app.use(express.json())
  }

  async load() {
    await createConnection({
      type: 'postgres',
      host: DATABASE.HOST,
      port: DATABASE.PORT,
      username: DATABASE.USERNAME,
      password: DATABASE.PASSWORD,
      database: DATABASE.NAME,
      entities: [Post],
      subscribers: [PostSubscriber],
      synchronize: true
    })

    this.app.get('/posts', this.postHandler.list)
    this.app.post('/posts', this.postHandler.create)
    this.app.get('/subscribe', this.subscribeHandler.create)

    this.poster.listenPostEent(this.postHandler.createFromEvent)
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server is listening ${port} port.`)
    })
  }
}
