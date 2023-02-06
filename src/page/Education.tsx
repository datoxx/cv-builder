import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FormValues } from '../types';
import axios from 'axios';


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
      education:[{
        school: "", 
        degree: "",
        endDate: "",
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

    const jsonStr = localStorage.getItem("education");
    if (jsonStr === null ) return;
    const formValues = JSON.parse(jsonStr);

    setValues(formValues)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    localStorage.setItem("education", JSON.stringify(watch()));  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch()])
 

  const { fields, append, remove, } = useFieldArray<FormValues>({
    name: "education",
    control
  })

  const onSubmit = (data: any) => {
    console.log( "dataaaa", data);
    navigate("/resume");

  }
 
  const checkRequired = (index: number) => {
        for (let [key, value] of Object.entries(watch().education?.[index])) {
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
              <input type="text"  {...register(`education.${index}.school`, {required: index === 0 ? true : checkRequired(index) , minLength: 2, })}  />
            </label>


            <label>
            <span>ხარისხში</span>
              <select {...register(`education.${index}.degree`,  {required: index === 0 ? true : checkRequired(index)  })}>
                  <option style={{display:"none"}} selected>{values?.education[index].degree ? values?.education[index].degree : "აირჩიეთ ხარისხი " } </option>
                  {optionsValues?.map((value:DegreeType) => (
                    <option key={value.id} value={value.title}>{value.title}</option>
                  ))}
              </select >
            </label>

            <label>
            <span>დამთავრების დრო</span>
            <input type="date" {...register(`education.${index}.endDate`,  {required: index === 0 ? true : checkRequired(index)  })} />
            </label>


            <label >
            <span>აღწერა</span>
            <textarea   {...register(`education.${index}.description`, {  required: index === 0 ? true : checkRequired(index) })} /> 
            </label>

        {index > 0 && <button type='button' onClick={() => remove(index)} >წაშლა</button>}
        </section>
        
      })}


      <button type='button' onClick={() => {
        append({
          school: "", 
          degree: "",
          endDate: "",
          description: "",
        })
      }}>
        დაამატე ახალი
      </button>
      <input type="submit" value="შემდეგი" />

    </form>

        <div>
            {getValues("education").map((item) =>  {
            return  <section key={Math.floor(Math.random() * (1000000 - 1 + 1) + 1)} >
                  <p>{item.school}</p>
                  <p>{item.degree}</p>
                  <p>{item.endDate}</p>
                  <p>{item.description}</p>
                  <hr />
              </section>
            }) }
            {/* { getValues("experience")[0].name} */}
        </div>
    </div>
  )
}

export default Education