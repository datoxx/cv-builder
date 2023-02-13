//icons
import errorIcon from '../assets/images/errorIcon.png';
import okIcon from '../assets/images/okIcon.png';
import dropdown from '../assets/images/dropdown.svg';
import svStar from '../assets/images/svStar.svg';
//hooks
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
//components
import FormsHeader from '../components/FormsHeader';
import FormFooter from '../components/FormFooter';
import EducationCv from '../components/cv/EducationCv';
//style
import { Form, FromSection, MainContainer, WorkSpace } from '../styled-components/layout/form/container';
import { CvContainer, CvWrapper } from '../styled-components/layout/cv/container';
import { DateInput, DateLable, DatesContainer, IconAndInputContainer, Input,
        InputAndErrorConainer, Lable, LongInputContainer,
        LongLableInputSpanContainer, Preface } from '../styled-components/inputs/Input';
import styled from 'styled-components';
import { TextArea, TextAreaAndIcon, TextAreaLableInputSpanContainer } from '../styled-components/inputs/TextArea';
import { AddButton, RemoveButton } from '../styled-components/button/button';
// types
import { Props } from '../types/styldProps';
import { EducationType, ExperiencesType, FormValues } from '../types';


export type DegreeType = {
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

  }, [])

  useEffect(() => {
    localStorage.setItem("educations", JSON.stringify(watch()));  
  }, [watch()])
 

  const { fields, append, remove, } = useFieldArray<FormValues>({
    name: "educations",
    control
  })


  const onSubmit = (data: any) => {
      
    const jsongeneralinfo = localStorage.getItem("generalInfo");
    const jsonexperiences = localStorage.getItem("experiences");
  
    if (jsongeneralinfo === null || jsonexperiences === null) return;
    const generalDate = JSON.parse((jsongeneralinfo));
    const experienceDate =  JSON.parse((jsonexperiences));

    const FilterExperiences = experienceDate.experiences?.filter((item: ExperiencesType) => item?.position !== "" );
    const FilterEducations = data.educations?.filter((item: EducationType) => item?.institute !== "" );

    const responsData = {
      name: generalDate.name,
      surname: generalDate.surname,
      email: generalDate.email,
      phone_number: generalDate.phone_number,
      experiences: FilterExperiences,
      educations: FilterEducations,
      about_me: generalDate.about_me,
    }

    // @ts-ignore
    fetch(generalDate.image)
    .then((res) => res.blob())
    .then((blob) => {
      const newFile = new File([blob], "image");
      // @ts-ignore
      responsData.image = newFile;
      responseFu(responsData as any)
    });

    const responseFu = async (props: any) => {
      const response = await axios.post("https://resume.redberryinternship.ge/api/cvs",  props, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if(response.data)  localStorage.setItem("apiData", JSON.stringify(response.data));  
  
      navigate("/resume");
    }

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
    <MainContainer>
      <WorkSpace>
        <FormsHeader />
        <Form  onSubmit={handleSubmit(onSubmit)} >
          {fields.map((field, index) => {
            return <FromSection key={field.id} >
              <LongLableInputSpanContainer>
                <Lable error={errors.educations?.[index]?.institute && watch(`educations.${index}.institute`)  !== "" } htmlFor="institute">სასწავლებელი</Lable>
                <InputAndErrorConainer >
                  <LongInputContainer 
                      error={ watch(`educations.${index}.institute`) !== "" &&  errors.educations?.[index]?.institute}
                      ok={ watch(`educations.${index}.institute`) !== "" &&  !errors.educations?.[index]?.institute}
                    >
                    <Input
                        placeholder='სასწავლებელი'
                        id="institute" 
                        type="text" 
                        {...register(`educations.${index}.institute`, {required: index === 0 ? true : checkRequired(index) , minLength: 2, })} 
                    />
                    { watch(`educations.${index}.institute`) === "" || errors.educations?.[index]?.institute ?  null : <img src={okIcon} alt="okIcon" />}
                  </LongInputContainer>
                  {  watch(`educations.${index}.institute`) !== "" && errors.educations?.[index]?.institute ? <img src={errorIcon} alt="errorIcon" /> : null}
                </InputAndErrorConainer>
                <Preface>მინიმუმ 2 სიმბოლო</Preface>
              </LongLableInputSpanContainer>

              <DatesContainer style={{margin: "31px 0 34px 0"}}>
                <IconAndInputContainer>
                  <DateLable htmlFor='degree_id' >
                    <span className='dateSpan' >ხარისხში</span>
                    <img className='dropdown' src={dropdown}  alt="dropdown" />
                    <Selector 
                      error={ watch(`educations.${index}.degree_id`) !== "" &&  errors.educations?.[index]?.degree_id}
                      ok={ watch(`educations.${index}.degree_id`) !== "" &&  !errors.educations?.[index]?.degree_id}
                      {...register(`educations.${index}.degree_id`,  {required: index === 0 ? true : checkRequired(index)  })}
                    >
                      <option style={{display:"none"}} selected>
                        {
                        values?.educations?.[index]?.degree_id
                        ? optionsValues.find((item:DegreeType) => item?.id === values?.educations?.[index]?.degree_id )?.title 
                        : "აირჩიეთ ხარისხი " 
                        } 
                        </option>
                      {optionsValues?.map((value:DegreeType) => (
                        <option key={value.id} value={value.id}>{value.title}</option>
                      ))}
                    </Selector >
                  </DateLable>
                  { watch(`educations.${index}.degree_id`) === "" || errors.educations?.[index]?.degree_id ?  null : <img src={okIcon} alt="okIcon" />}
                  { watch(`educations.${index}.degree_id`) !== "" && errors.educations?.[index]?.degree_id ? <img src={errorIcon} alt="errorIcon" /> : null}
                </IconAndInputContainer>

                <IconAndInputContainer>
                  <DateLable  htmlFor='education_due_date' >
                    <span className='dateSpan' >დამთავრების დრო</span>
                    <DateInput 
                      error={ watch(`educations.${index}.due_date`) !== "" &&  errors.educations?.[index]?.due_date}
                      ok={ watch(`educations.${index}.due_date`) !== "" &&  !errors.educations?.[index]?.due_date}                     
                      id="education_due_date"
                      type="date" 
                      {...register(`educations.${index}.due_date`,  {required: index === 0 ? true : checkRequired(index)  })} 
                    />
                  </DateLable>
                  { watch(`educations.${index}.due_date`) === "" || errors.educations?.[index]?.due_date ?  null : <img src={okIcon} alt="okIcon" />}
                  { watch(`educations.${index}.due_date`) !== "" && errors.educations?.[index]?.due_date ? <img src={errorIcon} alt="errorIcon" /> : null}
                </IconAndInputContainer>
              </DatesContainer>

              <TextAreaLableInputSpanContainer>
                <Lable error={errors.educations?.[index]?.description && watch(`educations.${index}.description`) !== "" } htmlFor='description'>აღწერა</Lable>
                <TextAreaAndIcon>
                  <TextArea
                    placeholder='განათლების აღწერა'
                    error={ watch(`educations.${index}.description`) !== "" &&  errors.educations?.[index]?.description}
                    ok={ watch(`educations.${index}.description`) !== "" &&  !errors.educations?.[index]?.description} 
                    id="description" 
                    {...register(`educations.${index}.description`, {  required: index === 0 ? true : checkRequired(index) })}
                  /> 
                  {watch(`educations.${index}.description`) !== "" &&  errors.educations?.[index]?.description?  <img src={errorIcon} alt="errorIcon" /> : null}
                  {watch(`educations.${index}.description`) !== "" &&  !errors.educations?.[index]?.description ?  <img src={okIcon} alt="okIcon" /> : null}
                </TextAreaAndIcon>
              </TextAreaLableInputSpanContainer>

            {index > 0 && <RemoveButton type='button' onClick={() => remove(index)} >წაშლა</RemoveButton>}
            </FromSection>
            
          })}

          <AddButton type='button' onClick={() => {
            append({
              institute: "", 
              degree_id: "",
              due_date: "",
              description: "",
            })
          }}>
            მეტი გამოცდილების დამატება
          </AddButton>
          <FormFooter />
        </Form>
      </WorkSpace>

      <CvWrapper>
        <CvContainer>
            <EducationCv optionsValues={optionsValues} educations={getValues("educations")} />
            <img className='svStar' src={svStar} alt="svStar icon" />
          </CvContainer>
      </CvWrapper>
    </MainContainer>
  )
}

export default Education


const Selector = styled.select<Props>`
  all: unset;
  background: #FFFFFF;
  border: 1px solid ${props => props.error ? "red" : `${props.ok ? "#98E37E " : "#BCBCBC" }` };
  border-radius: 4px;
  width: 335px;
  height: 20px;
  padding: 13px 16px;
  position: relative;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: rgba(0, 0, 0, 0.6);

  & option {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    height: 41px;
    line-height: 21px;
    padding: 10px 16px;
    background: #FFFFFF;    
  }

  &:hover {
      cursor: pointer;
    }

`
