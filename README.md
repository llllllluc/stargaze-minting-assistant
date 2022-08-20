# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## TODO
1. add input validation
2. support whitelist
3. support external_link
4. add examples
5. same nft.storage used for second time, do we need to clenaup? `nft-storage-clean.ts`

## Notes
Project Folder:
  - images
    - 1.jpg
    - 2.jpg
    - 3.jpg
  - metadata
    - 1.json
    - 2.json
    - 3.json


image 
cid    bafybeigi3bwpvyvsmnbj46ra4hyffcxdeaj6ntfk5jpic5mx27x6ih2qvq
ipfs://bafybeigi3bwpvyvsmnbj46ra4hyffcxdeaj6ntfk5jpic5mx27x6ih2qvq

metadata
cid     bafybeifieycaar2vgo3loqi3zgkzttsg5amnr2rsplzikg236l2omumsyq
ipfs://bafybeifieycaar2vgo3loqi3zgkzttsg5amnr2rsplzikg236l2omumsyq

use metadata ipfs as baseTokenUri


? Ready to submit the transaction? Yes
The `wasm` event emitted by the contract execution: {
  type: 'wasm',
  attributes: [
    {
      key: '_contract_address',
      value: 'stars10ymljwrj5k38kq0cg0nmn99ctlve6p8j3lkp0nn56zylmny97tesfwkxhl'
    },
    { key: 'action', value: 'instantiate' },
    { key: 'contract_name', value: 'crates.io:sg-minter' },
    { key: 'contract_version', value: '0.8.0' },
    {
      key: 'sender',
      value: 'stars1cff8zvuxa9v067lkxznv3j0cnp3rq2j3vqsvq0'
    },
    {
      key: '_contract_address',
      value: 'stars13j8dd7sfvwfms9vlqzdn302p90stqwc8v30quxrc0e7mf0sgm6gqadl4ev'
    },
    { key: 'action', value: 'instantiate' },
    { key: 'contract_name', value: 'crates.io:sg-721' },
    { key: 'contract_version', value: '0.8.0' },
    {
      key: 'image',
      value: 'ipfs://bafybeigi3bwpvyvsmnbj46ra4hyffcxdeaj6ntfk5jpic5mx27x6ih2qvq/images/1.png'
    },
    {
      key: '_contract_address',
      value: 'stars10ymljwrj5k38kq0cg0nmn99ctlve6p8j3lkp0nn56zylmny97tesfwkxhl'
    },
    { key: 'action', value: 'instantiate_sg721_reply' }
  ]
}
Add these contract addresses to config.js:
minter contract address:  stars10ymljwrj5k38kq0cg0nmn99ctlve6p8j3lkp0nn56zylmny97tesfwkxhl
sg721 contract address:  stars13j8dd7sfvwfms9vlqzdn302p90stqwc8v30quxrc0e7mf0sgm6gqadl4ev
✨  Done in 12.23s.
➜  stargaze-test-project git:(main) ✗ 




json output from `yarn minter` before actually execute tx

{
  "base_token_uri": "ipfs://bafybeifieycaar2vgo3loqi3zgkzttsg5amnr2rsplzikg236l2omumsyq",
  "num_tokens": 100,
  "sg721_code_id": 1,
  "sg721_instantiate_msg": {
    "name": "testtt 20220724",
    "symbol": "HAHA",
    "minter": "stars1cff8zvuxa9v067lkxznv3j0cnp3rq2j3vqsvq0",
    "collection_info": {
      "creator": "stars1cff8zvuxa9v067lkxznv3j0cnp3rq2j3vqsvq0",
      "description": "An awesome NFT series",
      "image": "ipfs://bafybeigi3bwpvyvsmnbj46ra4hyffcxdeaj6ntfk5jpic5mx27x6ih2qvq/images/1.png",
      "royalty_info": null
    }
  },
  "per_address_limit": 1,
  "start_time": "1660251600000000000",
  "unit_price": {
    "amount": "100000000",
    "denom": "ustars"
  }
}

this can be pasted to stargaze ui and use keplr to sign

if i only generate this json, i don't even need to connect keplr !!!


# How to use
overall goal is to eliminate usage of cli (yarn xxx) for creators.

1. enter basic info (name, description, symbol and IPFS link to main image)
  replace enter these info in config.js
2. enter nft.storage api key
3. add assets to generate images.car
  replace `yarn pack-images` and upload to nft.storage
  manually upload to nft.storage
4. add metadata (contains ipfs of images) to generate metadata.car
  replace `yarn pack-metadata` and upload to nft.storage
5. no user op
  set metadata ipfs link to baseTokenUri in config.js
6. whitelist TODO
7. click mint! get the json output
  replace `yarn minter`
9. go to launch ([testnet](https://testnet.publicawesome.dev/tx), [mainnet](https://app.stargaze.zone/tx)) and paste the output, sign with keplr.
