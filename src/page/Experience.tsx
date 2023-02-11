//icons
import errorIcon from '../assets/images/errorIcon.png';
import okIcon from '../assets/images/okIcon.png';
//style
import { Form, FromSection, MainContainer, WorkSpace } from '../styled-components/layout/form/container';
import { CvContainer, CvWrapper } from '../styled-components/layout/cv/container';
import { DateInput, DateLable, DatesContainer,
        IconAndInputContainer, Input, InputAndErrorConainer, Lable,
        LongInputContainer, LongLableInputSpanContainer, Preface } from '../styled-components/inputs/Input';
//componnets
import FormsHeader from '../components/FormsHeader';
import FormFooter from '../components/FormFooter';
import ExperienceCv from '../components/cv/ExperienceCv';
import { TextArea, TextAreaAndIcon, TextAreaLableInputSpanContainer } from '../styled-components/inputs/TextArea';
//hooks
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { FormContext } from "../context";
import { useContext } from 'react';
//types
import { FormValues } from '../types';
import { AddButton, RemoveButton } from '../styled-components/button/button';


function Experience() {

  const navigate = useNavigate();
  const context = useContext<any>(FormContext)

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
    values: context.experienceValues
  });


  useEffect(() => {

    const jsonStr = localStorage.getItem("experiences");
    if (jsonStr === null ) return;
    const formValues = JSON.parse(jsonStr);

    context.setExperienceValues(formValues)

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
 
  const checkRequired = (index: number) => {
        for (let [key, value] of Object.entries(watch().experiences?.[index])) {
          if(value !== "") {
            return true
          } else {
            return false
          }
      }
  }

  return (  
    <MainContainer>
      <WorkSpace >
        <FormsHeader />
        <Form onSubmit={handleSubmit(onSubmit)} >

          {fields.map((field, index) => {
            return <FromSection key={field.id} >

                <LongLableInputSpanContainer>
                  <Lable error={errors.experiences?.[index]?.position && watch(`experiences.${index}.position`)  !== "" } htmlFor="position">თანამდებობა</Lable>
                  <InputAndErrorConainer >
                    <LongInputContainer 
                        error={ watch(`experiences.${index}.position`) !== "" &&  errors.experiences?.[index]?.position}
                        ok={ watch(`experiences.${index}.position`) !== "" &&  !errors.experiences?.[index]?.position}
                      >
                      <Input
                          id="position" 
                          type="text" 
                          {...register(`experiences.${index}.position`, {required: index === 0 ? true : checkRequired(index) , minLength: 2, })} 
                      />
                      { watch(`experiences.${index}.position`) === "" || errors.experiences?.[index]?.position ?  null : <img src={okIcon} alt="okIcon" />}
                    </LongInputContainer>
                    {  watch(`experiences.${index}.position`) !== "" && errors.experiences?.[index]?.position ? <img src={errorIcon} alt="errorIcon" /> : null}
                  </InputAndErrorConainer>
                  <Preface>მინიმუმ 2 სიმბოლო</Preface>
                </LongLableInputSpanContainer>


                <LongLableInputSpanContainer style={{margin: "31px 0 31px 0"}} >
                  <Lable error={errors.experiences?.[index]?.employer && watch(`experiences.${index}.employer`)  !== "" } htmlFor="employer">დამსაქმებელი</Lable>
                  <InputAndErrorConainer >
                    <LongInputContainer 
                        error={ watch(`experiences.${index}.employer`) !== "" &&  errors.experiences?.[index]?.employer}
                        ok={ watch(`experiences.${index}.employer`) !== "" &&  !errors.experiences?.[index]?.employer}
                      >
                      <Input
                          id="employer" 
                          type="text" 
                          {...register(`experiences.${index}.employer`, {required: index === 0 ? true : checkRequired(index), minLength:2, })} 
                      />
                      { watch(`experiences.${index}.employer`) === "" || errors.experiences?.[index]?.employer ?  null : <img src={okIcon} alt="okIcon" />}
                    </LongInputContainer>
                    {  watch(`experiences.${index}.employer`) !== "" && errors.experiences?.[index]?.employer ? <img src={errorIcon} alt="errorIcon" /> : null}
                  </InputAndErrorConainer>
                  <Preface>მინიმუმ 2 სიმბოლო</Preface>
                </LongLableInputSpanContainer>


                <DatesContainer>

                  <IconAndInputContainer>
                    <DateLable htmlFor='start_date' >
                      <span className='dateSpan' >დაწყების დრო</span>
                      <DateInput
                        error={ watch(`experiences.${index}.start_date`) !== "" &&  errors.experiences?.[index]?.start_date}
                        ok={ watch(`experiences.${index}.start_date`) !== "" &&  !errors.experiences?.[index]?.start_date}
                        id="start_date" 
                        type="date"
                        {...register(`experiences.${index}.start_date`, { required: index === 0 ? true : checkRequired(index) })} 
                      />
                    </DateLable>
                    { watch(`experiences.${index}.start_date`) === "" || errors.experiences?.[index]?.start_date ?  null : <img src={okIcon} alt="okIcon" />}
                    { watch(`experiences.${index}.start_date`) !== "" && errors.experiences?.[index]?.start_date ? <img src={errorIcon} alt="errorIcon" /> : null}
                  </IconAndInputContainer>

                  <IconAndInputContainer>
                    <DateLable  htmlFor='due_date' >
                      <span className='dateSpan' >დამთავრების დრო</span>
                      <DateInput 
                        error={ watch(`experiences.${index}.due_date`) !== "" &&  errors.experiences?.[index]?.due_date}
                        ok={ watch(`experiences.${index}.due_date`) !== "" &&  !errors.experiences?.[index]?.due_date}                     
                        id="due_date"
                        type="date" 
                        {...register(`experiences.${index}.due_date`,  {required: index === 0 ? true : checkRequired(index)  })} 
                      />
                    </DateLable>
                    { watch(`experiences.${index}.due_date`) === "" || errors.experiences?.[index]?.due_date ?  null : <img src={okIcon} alt="okIcon" />}
                    { watch(`experiences.${index}.due_date`) !== "" && errors.experiences?.[index]?.due_date ? <img src={errorIcon} alt="errorIcon" /> : null}
                  </IconAndInputContainer>

                </DatesContainer>

                <TextAreaLableInputSpanContainer style={{marginTop: "31px"}}>
                  <Lable error={errors.experiences?.[index]?.description && watch(`experiences.${index}.description`) !== "" } htmlFor='description'>აღწერა</Lable>
                  <TextAreaAndIcon>
                    <TextArea
                      error={ watch(`experiences.${index}.description`) !== "" &&  errors.experiences?.[index]?.description}
                      ok={ watch(`experiences.${index}.description`) !== "" &&  !errors.experiences?.[index]?.description} 
                      id="description" 
                      {...register(`experiences.${index}.description`, {  required: index === 0 ? true : checkRequired(index) })}
                    /> 
                    {watch(`experiences.${index}.description`) !== "" &&  errors.experiences?.[index]?.description?  <img src={errorIcon} alt="errorIcon" /> : null}
                    {watch(`experiences.${index}.description`) !== "" &&  !errors.experiences?.[index]?.description ?  <img src={okIcon} alt="okIcon" /> : null}
                  </TextAreaAndIcon>
                </TextAreaLableInputSpanContainer>

             {index > 0 && <RemoveButton type='button' onClick={() => remove(index)} >წაშლა</RemoveButton>}
            </FromSection>
            
          })}


          <AddButton type='button' onClick={() => {
            append({
              position: "",
              employer: "",
              description: "",
              start_date: "",
              due_date: ""
            })
          }}>
            მეტი გამოცდილების დამატება
          </AddButton>
          
          <FormFooter />

         </Form>
      </WorkSpace>


      <CvWrapper>
        <CvContainer>
          <ExperienceCv experiences={getValues("experiences")} />
          </CvContainer>
      </CvWrapper>

    </MainContainer>
  )
}

export default Experience;



