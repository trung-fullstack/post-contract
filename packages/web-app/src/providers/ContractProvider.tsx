import React, {
  useCallback,
  useMemo,
  useState,
  createContext,
  useContext
} from 'react'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers } from 'ethers'

import { createContract } from '../services/contract'
import { TARGET_NETWORK, INFURA_ID, NETWORK_URL } from '../config'

export interface ContractState {
  provider?: ethers.providers.Web3Provider
  signer?: ethers.Signer
  contract?: ethers.Contract
  signerAddress?: string
}

interface ContractContextProps {
  isConnected: boolean
  contractState: ContractState
  connectWallet: () => Promise<void>
  disconnectWallet: () => Promise<void>
}

export const ContractContext = createContext<ContractContextProps>({
  isConnected: false,
  contractState: {},
  connectWallet: () => Promise.resolve(),
  disconnectWallet: () => Promise.resolve()
})

export const useContract = () => useContext(ContractContext)

export const ContractProvider: React.FC = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false)
  const [contractState, setContractState] = useState<ContractState>({})

  // Web3Modal also supports many other wallets.
  // You can see other options at https://github.com/Web3Modal/web3modal
  const web3Modal = useMemo(() => {
    const options = TARGET_NETWORK !== 'Hardhat'
      ? {
          infuraId: INFURA_ID
        }
      : {
          rpc: {
            1337: NETWORK_URL
          }
        }
    
    return new Web3Modal({
      network: TARGET_NETWORK,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options
        }
      }
    })
  }, [])

  // Open wallet selection modal.
  const connectWallet = useCallback(async () => {
    const external = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(external)
    const signer = provider.getSigner()
    const contract = createContract(signer)

    const signerAddress = await signer.getAddress()

    setContractState({ provider, signer, contract, signerAddress })
    setIsConnected(true)
  }, [web3Modal])

  const disconnectWallet = useCallback(
    async function () {
      await web3Modal.clearCachedProvider()
      setContractState({})
      setIsConnected(false)
    },
    [web3Modal]
  )

  const context = {
    isConnected,
    contractState,
    connectWallet,
    disconnectWallet
  }

  return (
    <ContractContext.Provider value={context}>
      {' '}
      {children}{' '}
    </ContractContext.Provider>
  )
}
