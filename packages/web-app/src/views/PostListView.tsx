import * as React from 'react'
import { Stack, Text, Button } from '@chakra-ui/react'
import { Paper } from '../components/Paper'
import {
  Post,
  usePosts,
  usePostSubscription,
  useClearPosts
} from '../lib/queries'

function PostList() {
  const { isLoading, isError, error, data } = usePosts()

  if (isLoading) {
    return (
      <Stack
        direction={{ base: 'column', md: 'row' }}
        justifyContent="space-between"
      >
        <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
          Loading...
        </Text>
      </Stack>
    )
  }
  if (isError) {
    const { message } = error as Error
    return (
      <Stack
        direction={{ base: 'column', md: 'row' }}
        justifyContent="space-between"
      >
        <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
          {message}
        </Text>
      </Stack>
    )
  }

  return (
    <React.Fragment>
      {(data as Post[]).map(({ content, id }) => {
        return (
          <Stack
            key={id}
            direction={{ base: 'column', md: 'row' }}
            justifyContent="space-between"
          >
            <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
              {content}
            </Text>
          </Stack>
        )
      })}
    </React.Fragment>
  )
}

export function PostListView() {
  usePostSubscription()
  const clearPosts = useClearPosts()

  return (
    <Paper width="100%">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Text fontWeight="semibold">Posts</Text>
        <Button
          onClick={() => {
            clearPosts.mutate()
          }}
        >
          Clear
        </Button>
      </Stack>

      <PostList />
    </Paper>
  )
}
