import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useContext } from "react";
import { StoreContext } from '../context';
import { FormValues } from '../types';
import axios from 'axios';


type DegreeType = {
  id: number,
  title: string
}

function Education() {

  const navigate = useNavigate();

  const { contextImage } = useContext<any>(StoreContext)
  const [testimage, setTestimage] = useState<any>();

  const [values, setValues] = useState<any>()
  const [optionsValues, setOptionsValues] = useState<DegreeType[]>([])

  const { register, handleSubmit, watch, getValues, formState: { errors }, control } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      educations:[{
        institute: "", 
        degree_id: "",
        due_date: "",
        description: "",
     }]
    },
    values
  });

  useEffect(() => {

    const fetchDegree = async () => {
      const date = await axios.get("https://resume.redberryinternship.ge/api/degrees");
      console.log(date.data)
      setOptionsValues(date.data)
    };

    fetchDegree();

    const jsonStr = localStorage.getItem("educations");
    if (jsonStr === null ) return;
    const formValues = JSON.parse(jsonStr);

    setValues(formValues)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    localStorage.setItem("educations", JSON.stringify(watch()));  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch()])
 

  const { fields, append, remove, } = useFieldArray<FormValues>({
    name: "educations",
    control
  })

  const onSubmit =  (data: any) => {

    console.log( "dataaaa", data);

    const jsongeneralinfo = localStorage.getItem("generalInfo");
    const jsonexperiences = localStorage.getItem("experiences");
    const jsoneducations = localStorage.getItem("educations");
    // const image = JSON.parse(localStorage.getItem("image" ) as string );

    if (jsongeneralinfo === null || jsonexperiences === null || jsoneducations === null ) return;

    const generadlinfo =  JSON.parse((jsongeneralinfo))
    const experiences =  JSON.parse((jsonexperiences))
    const educations =  JSON.parse((jsoneducations))

    console.log("localstorage generalinfo", generadlinfo);
    console.log("localstorage experiences", experiences);
    console.log("localstorage educations", educations);
    console.log("imageee>>>>imagee>>>", contextImage);
    console.log("imageee>>>>bineryy>>>", generadlinfo.image);


  //  const gaigavnosphoto = generadlinfo.image.replace(/^data:image\/(png|jpg);base64,/, "");

    const formData = new FormData();
    formData.append('image', generadlinfo.image);

    console.log("formData>>>", formData)


    // const reader = new FileReader();
    // reader.readAsArrayBuffer(contextImage);
    // reader.onloadend = function() {
    //   let  imageBinary: string | ArrayBuffer | null = new Uint8Array(reader.result as any);
    //   console.log("imageBinaryimageBinary<>>>>>>>>",imageBinary)
    //   setTestimage(imageBinary)
    //   // now you have the binary data of the image stored in `imageBinary`
    // };




    const responsData = {
      name: generadlinfo.name,
      surname: generadlinfo.surname,
      email: generadlinfo.email,
      phone_number: generadlinfo.phone_number,
      ...experiences,
      ...educations,
      image: formData,
      about_me: generadlinfo.about_me
    }

    console.log("responsData>>>>>>", responsData)



    const sendResponse  = async () => {

      const response = await axios.post("https://resume.redberryinternship.ge/api/cvs",  responsData);
      
      console.log("beqidan dabrunebuli pasuxiii>>>>", response.data)

    }

    sendResponse()


    // navigate("/resume");

  }
 
  const checkRequired = (index: number) => {
        for (let [key, value] of Object.entries(watch().educations?.[index])) {
          if(value !== "") {
            return true
          } else {
            return false
          }
      }
    

  }

  return (
    <div>

    <form  onSubmit={handleSubmit(onSubmit)} >


      {fields.map((field, index) => {
        return <section key={field.id} >

            <label >
              <span>განათლება</span>
              <input type="text"  {...register(`educations.${index}.institute`, {required: index === 0 ? true : checkRequired(index) , minLength: 2, })}  />
            </label>


            <label>
            <span>ხარისხში</span>
              <select {...register(`educations.${index}.degree_id`,  {required: index === 0 ? true : checkRequired(index)  })}>
                  <option style={{display:"none"}} selected>{values?.educations[index].degree ? values?.educations[index].degree : "აირჩიეთ ხარისხი " } </option>
                  {optionsValues?.map((value:DegreeType) => (
                    <option key={value.id} value={value.id}>{value.title}</option>
                  ))}
              </select >
            </label>

            <label>
            <span>დამთავრების დრო</span>
            <input type="date" {...register(`educations.${index}.due_date`,  {required: index === 0 ? true : checkRequired(index)  })} />
            </label>


            <label >
            <span>აღწერა</span>
            <textarea   {...register(`educations.${index}.description`, {  required: index === 0 ? true : checkRequired(index) })} /> 
            </label>

        {index > 0 && <button type='button' onClick={() => remove(index)} >წაშლა</button>}
        </section>
        
      })}


      <button type='button' onClick={() => {
        append({
          institute: "", 
          degree_id: "",
          due_date: "",
          description: "",
        })
      }}>
        დაამატე ახალი
      </button>
      <input type="submit" value="დასრულება" />

    </form>

        <div>
            {getValues("educations").map((item) =>  {
            return  <section key={Math.floor(Math.random() * (1000000 - 1 + 1) + 1)} >
                  <p>{item.institute}</p>
                  <p>{item.degree_id }</p>
                  <p>{item.due_date}</p>
                  <p>{item.description}</p>
                  <hr />
              </section>
            }) }
        </div>
    </div>
  )
}

export default Education