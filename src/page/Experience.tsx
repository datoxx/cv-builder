import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


function Experience() {

  const navigate = useNavigate();
  const [values, setValues] = useState()

  const { register, handleSubmit, watch, getValues, formState: { errors }, control } = useForm({
    mode: "onChange",
    defaultValues: {
      experience:[{
        position: "", 
        employer: "",
        description: "",
        startDate: "",
        endDate: ""
     }]
    },
    values
  });


  useEffect(() => {

    const jsonStr = localStorage.getItem("experience");
    if (jsonStr === null ) return;
    const formValues = JSON.parse(jsonStr);

    setValues(formValues)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    localStorage.setItem("experience", JSON.stringify(watch()));  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch()])
 

  const { fields, append, remove, } = useFieldArray({
    name: "experience",
    control
  })


  const onSubmit = (data: any) => {
    console.log( "dataaaa", data);
    navigate("/education");

  }
 
  // console.log("uyure>>", watch().experience)

  const checkRequired = (index: number) => {
        for (let [key, value] of Object.entries(watch().experience?.[index])) {
          if(value !== "") {
            return true
          } else {
            return false
          }
      }
    

  }

  console.log(getValues("experience"))

  return (
    <div>

        <form  onSubmit={handleSubmit(onSubmit)} >


          {fields.map((field, index) => {
            return <section key={field.id} >

                <label >
                  <span>თანამდებობა</span>
                  <input type="text"  {...register(`experience.${index}.position`, {required: index === 0 ? true : checkRequired(index) , minLength: 2, })}  />
                </label>


                <label>
                <span>დამსაქმებელი</span>
                   <input   type="text" {...register(`experience.${index}.employer`, {required: index === 0 ? true : checkRequired(index), minLength:2, })} />
                </label>


                <label>
                <span>დაწყების დრო</span>
                <input type="date" {...register(`experience.${index}.startDate`, { required: index === 0 ? true : checkRequired(index) })} />
                </label>

                <label>
                <span>დამთავრების დრო</span>
                <input type="date" {...register(`experience.${index}.endDate`,  {required: index === 0 ? true : checkRequired(index)  })} />
                </label>

                <label >
                <span>Description</span>
                <textarea   {...register(`experience.${index}.description`, {  required: index === 0 ? true : checkRequired(index) })} /> 
                </label>

             {index > 0 && <button type='button' onClick={() => remove(index)} >წაშლა</button>}
            </section>
            
          })}


          <button type='button' onClick={() => {
            append({
              position: "",
              employer: "",
              description: "",
              startDate: "",
              endDate: ""
            })
          }}>
            დაამატე ახალი
          </button>
          <input type="submit" value="შემდეგი" />

        </form>

            <div>
                {getValues("experience").map((item) =>  {
                 return  <section key={Math.floor(Math.random() * (1000000 - 1 + 1) + 1)} >
                      <p>{item.position}</p>
                      <p>{item.employer}</p>
                      <p>{item.description}</p>
                      <p>{item.startDate}</p>
                      <p>{item.endDate}</p>
                      <hr />
                  </section>
                }) }
                {/* { getValues("experience")[0].name} */}
            </div>
    </div>
  )
}

export default Experience