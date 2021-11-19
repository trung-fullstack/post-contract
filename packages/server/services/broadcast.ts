import { Response } from 'express'

export interface IBroadcastClient {
  clientId: string
  res: Response
}

export class BroadcastService {
  clientList: IBroadcastClient[] = []

  public addClient(client: IBroadcastClient) {
    this.clientList = [...this.clientList, client]
  }

  public removeClient(clientId: string) {
    this.clientList = this.clientList.filter((c) => c.clientId !== clientId)
  }

  public sendEvents(eventName: string, data: string) {
    this.clientList.forEach((clientContent) => {
      const { res } = clientContent

      if (!res) {
        return
      }

      res.write('\n')
      res.write(`event: ${eventName}\n`)
      res.write(`data: ${data}\n\n`)
    })
  }
}

const defaultBroadcastService = new BroadcastService()
export default defaultBroadcastService
