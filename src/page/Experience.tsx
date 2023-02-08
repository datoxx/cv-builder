import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FormValues } from '../types';


function Experience() {

  const navigate = useNavigate();
  const [values, setValues] = useState()

  const { register, handleSubmit, watch, getValues, formState: { errors }, control } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      experiences:[{
        position: "", 
        employer: "",
        description: "",
        start_date: "",
        due_date: ""
     }]
    },
    values
  });


  useEffect(() => {

    const jsonStr = localStorage.getItem("experiences");
    if (jsonStr === null ) return;
    const formValues = JSON.parse(jsonStr);

    setValues(formValues)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    localStorage.setItem("experiences", JSON.stringify(watch()));  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch()])
 

  const { fields, append, remove, } = useFieldArray<FormValues>({
    name: "experiences",
    control
  })


  const onSubmit = (data: any) => {
    console.log( "dataaaa", data);
    navigate("/education");

  }
 
  // console.log("uyure>>", watch().experience)

  const checkRequired = (index: number) => {
        for (let [key, value] of Object.entries(watch().experiences?.[index])) {
          if(value !== "") {
            return true
          } else {
            return false
          }
      }
    

  }

  console.log(getValues("experiences"))

  return (
    <div>

        <form  onSubmit={handleSubmit(onSubmit)} >


          {fields.map((field, index) => {
            return <section key={field.id} >

                <label >
                  <span>თანამდებობა</span>
                  <input type="text"  {...register(`experiences.${index}.position`, {required: index === 0 ? true : checkRequired(index) , minLength: 2, })}  />
                </label>


                <label>
                <span>დამსაქმებელი</span>
                   <input   type="text" {...register(`experiences.${index}.employer`, {required: index === 0 ? true : checkRequired(index), minLength:2, })} />
                </label>


                <label>
                <span>დაწყების დრო</span>
                <input type="date" {...register(`experiences.${index}.start_date`, { required: index === 0 ? true : checkRequired(index) })} />
                </label>

                <label>
                <span>დამთავრების დრო</span>
                <input type="date" {...register(`experiences.${index}.due_date`,  {required: index === 0 ? true : checkRequired(index)  })} />
                </label>

                <label >
                <span>Description</span>
                <textarea   {...register(`experiences.${index}.description`, {  required: index === 0 ? true : checkRequired(index) })} /> 
                </label>

             {index > 0 && <button type='button' onClick={() => remove(index)} >წაშლა</button>}
            </section>
            
          })}


          <button type='button' onClick={() => {
            append({
              position: "",
              employer: "",
              description: "",
              start_date: "",
              due_date: ""
            })
          }}>
            დაამატე ახალი
          </button>
          <input type="submit" value="შემდეგი" />

        </form>

            <div>
                {getValues("experiences").map((item) =>  {
                 return  <section key={Math.floor(Math.random() * (1000000 - 1 + 1) + 1)} >
                      <p>{item.position}</p>
                      <p>{item.employer}</p>
                      <p>{item.description}</p>
                      <p>{item.start_date}</p>
                      <p>{item.due_date}</p>
                      <hr />
                  </section>
                }) }
            </div>
    </div>
  )
}

export default Experience