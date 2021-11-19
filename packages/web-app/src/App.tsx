import { ChakraProvider, theme } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ContractProvider } from './providers/ContractProvider'
import { Home } from './pages/Home'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

export const App = () => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <ContractProvider>
        <Home />
      </ContractProvider>
    </QueryClientProvider>
  </ChakraProvider>
)
