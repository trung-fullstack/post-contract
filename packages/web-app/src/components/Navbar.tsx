import { Box, Flex, Heading } from '@chakra-ui/react'
import WalletButton from '../components/WalletButton'

export function Navbar() {
  return (
    <Flex
      bg={'white'}
      color={'gray.600'}
      minH={'60px'}
      py={{ base: 2 }}
      px={{ base: 4 }}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={'gray.200'}
      align={'center'}
      h={16}
      alignItems={'center'}
      justifyContent={'space-between'}
      paddingX={8}
    >
      <Box>
        <Heading size="lg" isTruncated>
          Challenge
        </Heading>
      </Box>

      <WalletButton mr={3} />
    </Flex>
  )
}
