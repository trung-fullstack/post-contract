## Installation
  - You'd need `metamask` extension on chrome
  - You must have `node`, `yarn` and `postgres` installed on your machine.
  - In the project directory,  you can run `yarn` to install packages

## How To Run
  In the project direcctory, you can run:

### 1. Start hardhat node
##### `yarn run start:node`

### 2. Deploy contract to hardhat and Update .env

##### `yarn run contract:deploy`

deploy script will print out the contract address on terminal

### 4. Populate .env

  - populate .env in packages/server
  - populate .env in packages/web-app

### 5. Run express server
##### `yarn run start:server`


### 6. Run web app
##### `yarn run start:web`
