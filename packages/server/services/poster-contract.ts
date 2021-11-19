import { ethers } from 'ethers'
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

type FnCallback = (eventBody: string) => Promise<string>

export class PosterContract {
  public address: string
  public contract: ethers.Contract
  constructor(address: string, network: string) {
    this.address = address
    this.contract = new ethers.Contract(
      address,
      abi,
      ethers.getDefaultProvider(network)
    )
  }

  public listenPostEent = (callback: FnCallback) => {
    this.contract.on('PostContent', callback)
  }
}
