import { useRef, useEffect } from 'react'
import { useQuery, UseQueryResult, useQueryClient } from 'react-query'
import { API_URL } from '../config'

export interface Post {
  id: number
  content: string
}

export const QUERY_KEYS = {
  GET_POSTS: 'posts'
}

export const usePosts = (): UseQueryResult<Post[]> => {
  return useQuery(QUERY_KEYS.GET_POSTS, async () => {
    const res = await fetch(`${API_URL}/posts`)
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    return res.json()
  })
}

export const usePostSubscription = () => {
  const queryClient = useQueryClient()
  const eSource = useRef<EventSource>()

  useEffect(() => {
    eSource.current = new EventSource(`${API_URL}/subscribe`)
    eSource.current.addEventListener('Post', (event) => {
      const postEvent = event as MessageEvent
      const newPost: Post = JSON.parse(postEvent.data)

      queryClient.setQueriesData(QUERY_KEYS.GET_POSTS, (oldData) => {
        const posts = oldData as Post[]
        return [...posts, newPost]
      })
    })

    return () => {
      eSource.current?.close()
    }
  }, [queryClient])
}
