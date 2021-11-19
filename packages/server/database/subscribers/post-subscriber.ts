import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent
} from 'typeorm'
import { Post } from '../entities/Post'
import Broadcaster from '../../services/broadcast'

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Post> {
  listenTo() {
    return Post
  }

  afterInsert(event: InsertEvent<Post>) {
    const { entity } = event
    Broadcaster.sendEvents('Post', JSON.stringify(entity))
  }
}
