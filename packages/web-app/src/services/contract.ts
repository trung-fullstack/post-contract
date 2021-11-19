import { ethers } from 'ethers'
import { CONTRACT_ADDRESS } from '../config'

const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'content',
        type: 'string'
      }
    ],
    name: 'PostContent',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'content',
        type: 'string'
      }
    ],
    name: 'createPost',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

export const createContract = (signer: ethers.Signer): ethers.Contract => {
  return new ethers.Contract(
    CONTRACT_ADDRESS,
    abi,
    signer
  )
}
