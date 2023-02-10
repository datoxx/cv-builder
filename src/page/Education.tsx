import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FormValues } from '../types';
import axios from 'axios';
import FormsHeader from '../components/FormsHeader';
import FormFooter from '../components/FormFooter';
import EducationCv from '../components/cv/EducationCv';


type DegreeType = {
  id: number,
  title: string
}

function Education() {

  const navigate = useNavigate();

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

    if (jsongeneralinfo === null || jsonexperiences === null || jsoneducations === null ) return;

    const generadlinfo =  JSON.parse((jsongeneralinfo))
    const experiences =  JSON.parse((jsonexperiences))
    const educations =  JSON.parse((jsoneducations))

    console.log("localstorage generalinfo", generadlinfo);
    console.log("localstorage experiences", experiences);
    console.log("localstorage educations", educations);
    console.log("imageee>>>>bineryy>>>", generadlinfo.image);


    const formData = new FormData();
    formData.append('image', generadlinfo.image);

    console.log("formData>>>", formData)




    const responsData = {
      name: generadlinfo.name,
      surname: generadlinfo.surname,
      email: generadlinfo.email,
      phone_number: generadlinfo.phone_number,
      ...experiences,
      ...educations,
      about_me: generadlinfo.about_me
    }

    console.log("responsData>>>>>>", responsData)

    

    fetch(generadlinfo.image)
    .then((res) => res.blob())
    .then((blob) => {
      const newFile = new File([blob], "image");
      responsData.image = newFile;
      sendResponse(responsData as any);
    });

    const sendResponse  = async (props: any) => {

      const response = await axios.post("https://resume.redberryinternship.ge/api/cvs",  props, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log("beqidan dabrunebuli pasuxiii>>>>", response.data)

    }







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

    <FormsHeader />

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
      <FormFooter />


    </form>

        <div>
            {/* {getValues("educations").map((item) =>  {
            return  <section key={Math.floor(Math.random() * (1000000 - 1 + 1) + 1)} >
                  <p>{item.institute}</p>
                  <p>{item.degree_id }</p>
                  <p>{item.due_date}</p>
                  <p>{item.description}</p>
                  <hr />
              </section>
            }) } */}

              <EducationCv educations={getValues("educations")} />

        </div>

    </div>
  )
}

export default Education