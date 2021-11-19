
import { VStack } from '@chakra-ui/react'

import { Layout } from '../components/Layout'
import { ConnectBanner } from '../views/ConnectBanner'
import { PostingView } from '../views/PostingView'
import { PostListView } from '../views/PostListView'

import { useContract } from '../providers/ContractProvider'

export function Home() {
  const { isConnected } = useContract()

  if (!isConnected) {
    return (
      <Layout flex={1}>
        <ConnectBanner />
      </Layout>
    )
  }

  return (
    <Layout flex={1}>
      <VStack spacing={8}>
        <PostingView />
        <PostListView />
      </VStack>
    </Layout>
  )
}
