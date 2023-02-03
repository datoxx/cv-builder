import { Link } from 'react-router-dom';
import BackArrow from '../assets/images/vector.svg'

import { useForm } from "react-hook-form";
import { useState } from 'react';

function GeneralInformation() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  // const [image, setImage] = useState("")

 
  const onSubmit = (data: any) => {
    console.log( "dataaaa", data);
  }

    // if(watch("files") ) {
    //   setTimeout(() => {
    //     setImage(window.URL.createObjectURL(watch("files")[0]) as string )
    //   }, 10)
    //  }

  return (
    <div>
      <div className='workplace'>
        <Link to="/">
            <img src={BackArrow}  alt="arrow" />
        </Link>

        <div >
          <header>
            <h1>პირადი ინფო</h1>
            <span>1/3</span>
          </header>
          <div className='container'>
            <form  onSubmit={handleSubmit(onSubmit)} >

~
              <label htmlFor="name">სახელი</label>
              <input type="text" {...register("name", {required: true, minLength: 2,   pattern: /^[\u10A0-\u10FF]+$/ })} />

              <label htmlFor="surname">გვარი</label>
              <input   type="text" {...register("surname", { required: true, minLength:2, pattern: /^[\u10A0-\u10FF]+$/ })} />



              {/* <label>პირადი ფოტოს ატვირთვა</label>
              <input  {...register("files")}  type="file"  />
 */}


              <label htmlFor='aboutme'>ჩემს შესახებ (არასავალდებულო)</label>
              <textarea   {...register("aboutme", { pattern: /^[\u10A0-\u10FF]+$/ })} /> i

              <label htmlFor="email">ელ.ფოსტა</label>
              <input   type="email" {...register("email", {  pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(redberry\.ge)$/ })} />

              <label htmlFor="mobileNumber">მობილურის ნომერი</label>
              <input   type="tel" {...register("mobileNumber", {  pattern: /^(\+995)(79\d{7}|5\d{8})$/ })} />

              <input type="submit" value="შემდეგი" />

            </form>


          </div>
        </div>
      </div>

      <div className='showplace'>

          { watch("name") }
          {watch("surname")}
          {/* {image !== "" && <img src={image} alt="imageee" /> } */}
          { watch("aboutme") }
          { watch("email") }
          {watch("mobileNumber")}

      </div>
      
    </div>
  )
}

export default GeneralInformation