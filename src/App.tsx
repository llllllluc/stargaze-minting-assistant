import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import {FormInputs} from "./schema"
import "./styles.css";
import {nftStorageUpload} from "./stargaze-tools/nft-storage-upload"


function App() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>();

  const onSubmitFunc = (data: FormInputs) => {
    alert(JSON.stringify(data));
    // console.log(data.mainImage[0])
    // console.log(data.imageDirectory[0])
    // console.log(data.metadataDirectory[0])
    nftStorageUpload(data)
  }

  const imageDirectoryRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (imageDirectoryRef.current !== null) {
      imageDirectoryRef.current.setAttribute("directory", "");
      imageDirectoryRef.current.setAttribute("webkitdirectory", "");
    }
  }, [imageDirectoryRef]);

  const { ref: r1, ...rest1 } = register("imageDirectory", { required: true })

  const metadataDirectoryRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (metadataDirectoryRef.current !== null) {
      metadataDirectoryRef.current.setAttribute("directory", "");
      metadataDirectoryRef.current.setAttribute("webkitdirectory", "");
    }
  }, [metadataDirectoryRef]);

  const { ref: r2, ...rest2 } = register("metadataDirectory", { required: true })


  return (
    <form
      onSubmit={handleSubmit(onSubmitFunc)}
    >
      <label>Name</label>
      <input {...register("name", { required: true })} />
      {errors.name && <p>This field is required</p>}

      <label>Symbol</label>
      <input {...register("symbol", { required: true })} />
      {errors.symbol && <p>This field is required</p>}

      <label>Description</label>
      <input {...register("description", { required: true })} />
      {errors.description && <p>This field is required</p>}

      <label>nft.storage API key</label>
      <input {...register("nftStorageApiKey", { required: true })} />
      {errors.nftStorageApiKey && <p>This field is required</p>}

      <label>Main Image</label>
      <input {...register("mainImage", { required: true })} type="file" />
      {errors.mainImage && <p>This field is required</p>}

      <label>Image Directory</label>
      <input {...rest1} type="file" ref={(e) => {
        r1(e)
        imageDirectoryRef.current = e
      }} />
      {errors.imageDirectory && <p>This field is required</p>}

      <label>Metadata Directory</label>
      <input {...rest2} type="file" ref={(e) => {
        r2(e)
        metadataDirectoryRef.current = e
      }} />
      {errors.metadataDirectory && <p>This field is required</p>}

      <input type="submit" value={"generate json!"} />
    </form>
  );
}
export default App;
