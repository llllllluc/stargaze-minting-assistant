# Introduction
As of August 2022, the only way to launch NFT projects (mint NFT, deploy contracts, etc...) on Stargaze is using a series of scripts called [stargaze-tools](https://github.com/public-awesome/stargaze-tools) implemented by Stargazer team, this required creators to update js config file and interact with the script in terminal.

This web UI I'm building serves as an alternative of the official cli scripts for Stargaze network. It brings 2 advantages.
1. Creators no longer need to touch any js config or interact with terminal.
2. Creators no longer need to expose their private key / seed phrase which prevent losing money. If only using the officail script, although it can generate the JSON output as well, but it ask creators to enter private key in order to complete the entire minting process (send transactions to Stargaze network).

## Instructions
1. Enter the NFT project info (name, creator address, some other config) on the UI.
2. Upload their images directory and metadata directory on the UI.
3. Enter their nft.storage API key. 
    - This step might sound suspicious at the beginning, why am I asking for API key? 
    - One alternative I thought about is I create an nft.storage account and upload everyone's image / metadata to my account, but I think after all it's better to let creators own these data themselves. Beside this is a pure client side web app, API key is not uploaded to any server (or me, the writer of this app). Anyone can inspect the code to verify.
4. Click mint and copy the JSON output.
Once you have the JSON, you can copy that to Stargaze minting page [mainnet](https://app.stargaze.zone/tx) or [testnet](https://testnet.publicawesome.dev/tx) then sign with your Keplr wallet.


## Example folder structures for images and metadata
Project Folder:
- images
  - 1.jpg
  - 2.jpg
  - 3.jpg
- metadata
  - 1.json
  - 2.json
  - 3.json

## Example result JSON output
```
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
```

# TODO
1. add input validation
2. support whitelist
3. support external_link
4. add examples / videos walk through
5. more testing on edge cases

# Development
## How it works
The overall flow can be seen as combination of below steps / scripts in stargaze-tools.
1. Use react hook form to collect info is equivalent to store these info in `config.js`.
2. Click `mint` on UI is equivalent to 
    1. `yarn pack-images` which generate CID (a type of identifier in IPFS) for images directory.
    2. `yarn pack-metadata` which generate CID (a type of identifier in IPFS) for metadata directory.
    3. Update each images' IPFS link in corresponding metadata files.
    4. `yarn minter` that takes everything above then generate the JSON result.

## Some challenges
1. Biggest challenge is the scripts are made for NodeJS environment, when I try to move it to browser, there were compatibility issues.
    1. I remember webpack was broken and took some time to fix it.
    2. File manipulation is different since I need to update metadata files after uploading images to IPFS, in scripts it's intuitive cause we have access to local file system, but in browser, I can only play with `File` object.



## Available Scripts
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
