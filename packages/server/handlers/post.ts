import { Response, Request } from 'express'
import { getRepository } from 'typeorm'
import { Post } from '../database/entities/Post'
import Utils from '../services/utils'

export class PostHandler {
  public list = async (req: Request, res: Response) => {
    const posts = await getRepository(Post).find()
    return res.json(posts)
  }

  public create = async (req: Request, res: Response) => {
    const post = await getRepository(Post).create(req.body)
    const results = await getRepository(Post).save(post)
    return res.json(results)
  }

  public clear = async (req: Request, res: Response) => {
    await getRepository(Post).clear()
    return res.json({
      message: 'succes'
    })
  }

  public createFromEvent = async (eventBody: string) => {
    const post = await getRepository(Post).create({
      content: Utils.convertString(eventBody)
    })
    const { content } = await getRepository(Post).save(post)
    return content
  }
}
