import { Response, Request } from 'express'
import Broadcast from '../services/broadcast'

export class SubscribeHandler {
  public create = (req: Request, res: Response) => {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    })

    const clientId = `${new Date().getTime()}`
    Broadcast.addClient({
      clientId,
      res
    })

    req.on('close', () => {
      Broadcast.removeClient(clientId)
      res.end();
    })
  }
}
