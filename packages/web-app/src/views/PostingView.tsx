import { useState } from 'react'
import { Stack, Text, Button, Input } from '@chakra-ui/react'
import { Paper } from '../components/Paper'
import { useContract } from '../providers/ContractProvider'

export function PostingView() {
  const { contractState } = useContract()
  const [content, setContent] = useState<string>('')

  const { contract } = contractState

  const handleOnPost = async () => {
    if (!contract || !content) {
      return
    }

    try {
      await contract.createPost(content)
    } catch (err) {
      console.log('Error', err)
    }
  }

  return (
    <Paper width="100%">
      <Stack direction="row" alignItems="center">
        <Text fontWeight="semibold">Post</Text>
      </Stack>

      <Stack
        direction={{ base: 'column', md: 'row' }}
        justifyContent="space-between"
      >
        <Input
          placeholder="Your input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Button onClick={handleOnPost}>Post</Button>
      </Stack>
    </Paper>
  )
}
