import { Link, useNavigate } from 'react-router-dom';
import BackArrow from '../assets/images/vector.svg'

import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';

function GeneralInformation() {

  const [image, setImage] = useState("")
  const [values, setValues] = useState()

  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode: "onChange",
    values
  });


  useEffect(() => {

    const jsonStr = localStorage.getItem("generalInfo");
    if (jsonStr === null ) return;
    const formValues = JSON.parse(jsonStr);

    setValues(formValues)
    setImage(formValues.image)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    localStorage.setItem("generalInfo", JSON.stringify(watch()));  

    if(image !== "") {
      const jsonStr = JSON.parse(localStorage.getItem("generalInfo" ) as string );
      localStorage.setItem("generalInfo", JSON.stringify({...jsonStr, image: image}));   
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch(), image])
 

  const handleImage = (e: any) => {

    // way 1
    const reader = new FileReader();
    reader.onloadend = () => {  setImage(reader.result?.toString() as string)}
    reader.readAsDataURL(e.target.files[0])

    //way 2
    // const reader = new FileReader();
    // reader.onload = () => {  setImage(reader.result?.toString() as string)}
    // reader.readAsBinaryString(e.target.files[0])

    //way 3
    // setImage(URL.createObjectURL(e.target.files[0] ))
    }
    
  console.log(image)

  const onSubmit = (data: any) => {
    console.log( "dataaaa", data);

    navigate("/experience");

  }


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

              <label htmlFor="name">სახელი</label>
              <input type="text"  {...register("name", {required: true, minLength: 2,   pattern: /^[\u10A0-\u10FF]+$/ })}  />
              {errors.name?.type === "required" && <span>არ დატოვე ცარიელი</span> }
              {errors.name?.type === "pattern" && <span>შეიყვანე ქართულად</span> }


              <label htmlFor="surname">გვარი</label>
              <input   type="text" {...register("surname", { required: true, minLength:2, pattern: /^[\u10A0-\u10FF]+$/ })} />

              <label>პირადი ფოტოს ატვირთვა</label>              <input  type="file" {...register('image', { required: true, onChange: handleImage})} accept="image/*"/>

              <label htmlFor='aboutme'>ჩემს შესახებ (არასავალდებულო)</label>
              <textarea   {...register("aboutme", { pattern: /^[\u10A0-\u10FF]+$/ })} /> i

              <label htmlFor="email">ელ.ფოსტა</label>
              <input  
                 type="email"
                 {...register("email", {required: true,  pattern:  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(redberry\.ge)$/ })} 
                />
               {errors.email?.type === "pattern" && <span>eehh meili arasowria</span> }

              <label htmlFor="mobileNumber">მობილურის ნომერი</label>
              <input   type="tel" {...register("mobileNumber", { required: true,  pattern: /^(\+995)(79\d{7}|5\d{8})$/ })} />
              {errors.mobileNumber?.type === "pattern" && <span>telefoni arasworiaaa</span> }

              <input type="submit" value="შემდეგი" />

            </form>

          </div>
        </div>
      </div>

      <div className='showplace'>

          { watch("name") }
          {watch("surname")}
          {image !== "" && <img src={image} alt="es aris fhoto" />}
          { watch("aboutme") }
          { watch("email") }
          {watch("mobileNumber")}

      </div>
      
    </div>
  )
}

export default GeneralInformation