import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import "./styles.css";

type Inputs = {
  name: string,
  symbol: string,
  description: string,
  mainImage: string
};

// function App() {
//   const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
//   const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

//   console.log(watch("example")) // watch input value by passing the name of it

//   return (
//     /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {/* register your input into the hook by invoking the "register" function */}
//       <input defaultValue="test" {...register("example")} />
      
//       {/* include validation with required or other standard HTML validation rules */}
//       <input {...register("exampleRequired", { required: true })} />
//       {/* errors will return when field validation fails  */}
//       {errors.exampleRequired && <span>This field is required</span>}
      
//       <input type="submit" />
//     </form>
//   );
// }
function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmitFunc = (data: Inputs) => {
    alert(JSON.stringify(data));

    console.log(data.mainImage[0])
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitFunc)}
    >
      <label>Name</label>
      <input {...register("name", { required: true})}/>
      {errors.name && <p>This field is required</p>}

      <label>Symbol</label>
      <input {...register("symbol", { required: true})}/>
      {errors.symbol && <p>This field is required</p>}

      <label>Description</label>
      <input {...register("description", { required: true})}/>
      {errors.description && <p>This field is required</p>}

      <label>Main Image IPFS Link</label>
      <input {...register("mainImage", { required: true})}/>
      {errors.mainImage && <p>This field is required</p>}

      <input type="submit" />
    </form>
  );
}
export default App;
