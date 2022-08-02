import { NFTStorage } from 'nft.storage';
import { naturalCompare } from './utils/sort';
import { checkFiles, validateMetadata } from './utils/validation';
import { FormInputs } from '../schema';

export async function nftStorageUpload(config: FormInputs): Promise<string[]> {
  // Configure NFT.storage
  const client = new NFTStorage({ token: config.nftStorageApiKey });

  // console.log(
  //   'Deploying files to IPFS via NFT.storage using the following configuration:'
  // );
  // console.log(config);

  const images: File[] = Array.from(config.imageDirectory)
  const metadata: File[] = Array.from(config.metadataDirectory)

  // Sort files (need to be in natural order)
  images.sort(naturalCompare);
  metadata.sort(naturalCompare);

  // Validation
  checkFiles(images, metadata);

  // // Validate metadata attribute values
  validateMetadata(metadata);

  // // Upload images folder
  const imagesBaseUri = await client.storeDirectory(config.imageDirectory);
  const mainImageUri = `ipfs://${imagesBaseUri}/images/${config.mainImage.item(0)?.name}`;

  const metadataWithImageIPFS: File[] = []
  // Update metadata with IPFS hashes
  const promises = metadata.map(async (file, index: number) => {
    // Read JSON file
    let metadataJson = JSON.parse(
      await file.text()
    );

    // Set image to upload image IPFS hash
    metadataJson.image = `ipfs://${imagesBaseUri}/images/${images[index].name}`;

    const metadataJsonString = JSON.stringify(metadataJson)
    // Write updated metadata to tmp folder
    metadataWithImageIPFS.push(new File([metadataJsonString], file.name, { type: file.type, lastModified: file.lastModified }));
  });
  await Promise.all(promises)

  console.log(metadataWithImageIPFS)
  metadataWithImageIPFS.sort(naturalCompare);

  // Upload metadata
  const result = await client.storeDirectory(metadataWithImageIPFS);

  // // Project will have been uploaded into a randomly name folder
  // const projectPath = tmpFolder.split('/').pop();

  // Set base token uri
  // TODO: ask stargaze team, do we need this project path?
  // const baseTokenUri = `ipfs://${result}/${projectPath}`;
  const baseTokenUri = `ipfs://${result}`;

  console.log('Set this field in your config.js file: ');
  console.log('baseTokenUri: ', baseTokenUri);

  return [mainImageUri, baseTokenUri];
}
