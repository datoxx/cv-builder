//icons
import errorIcon from '../assets/images/errorIcon.png';
import okIcon from '../assets/images/okIcon.png';
import svStar from '../assets/images/svStar.svg';
//styled
import styled from 'styled-components';
import { UserNameAndSurnameContainer,  LableInputSpanContainer,Lable, 
  InputAndErrorConainer, InputContainer, Input, Preface,
  LongLableInputSpanContainer, LongInputContainer,
  MobileLongLableInputSpanContainer } from '../styled-components/inputs/Input';
import { TextAreaLableInputSpanContainer, TextAreaAndIcon, TextArea } from '../styled-components/inputs/TextArea';
import { CvWrapper, CvContainer } from '../styled-components/layout/cv/container';
import { MainContainer, Form,  WorkSpace } from '../styled-components/layout/form/container';
//hooks
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//component
import FormsHeader from '../components/FormsHeader';
import FormFooter from '../components/FormFooter';
import GeneralCv from '../components/cv/GeneralCv';

type GenralInfoType = {
  name?: string;
  surname?: string;
  image?: string;
  about_me?: string;
  email?: string;
  phone_number?: string;
};

function GeneralInformation() {

  const [image, setImage] = useState("")
  const [values, setGeneraInfoValues] = useState<GenralInfoType>()


  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<GenralInfoType>({
    mode: "onChange",
    values: {
      ...values,
      about_me: values?.about_me?.trim(),
   }
  });

  useEffect(() => {

    const jsonStr = localStorage.getItem("generalInfo");
    if (jsonStr === null ) return;
    const formValues = JSON.parse(jsonStr);

    setImage(formValues.image)
    setGeneraInfoValues(formValues)

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
    const reader = new FileReader();
    reader.onload = () => {  setImage(reader.result?.toString() as any)}
    reader.readAsDataURL(e.target.files[0])
  }
    
  const onSubmit = (data: any) => {
    console.log( "dataaaa", data);
    navigate("/experience");
  } 


  return (
    <MainContainer>
      <WorkSpace>
        <FormsHeader />
        <Form  onSubmit={handleSubmit(onSubmit)} >
          <UserNameAndSurnameContainer error={errors.name?.type} >
            <LableInputSpanContainer>
              <Lable error={errors.name?.type && watch("name") !== "" } htmlFor="name">სახელი</Lable>
              <InputAndErrorConainer >
                <InputContainer 
                    error={watch("name") !== "" &&  errors.name?.type}
                    ok={watch("name") !== "" &&  !errors.name?.type}
                  >
                  <Input
                      placeholder='დავით'
                      id="name" 
                      type="text" 
                    {...register("name", {required: true, minLength: 2,   pattern: /^[ა-ჰ]{2,}$/})} 
                  />
                  {watch("name") === "" || errors.name?.type ?  null : <img src={okIcon} alt="okIcon" />}
                </InputContainer>
                { watch("name") !== "" &&  errors.name?.type ? <img src={errorIcon} alt="errorIcon" /> : null}
              </InputAndErrorConainer>
              <Preface>მინიმუმ 2 ასო, ქართული ასოები</Preface>
            </LableInputSpanContainer>

            <LableInputSpanContainer>
              <Lable error={errors.surname?.type  && watch("surname") !== ""} htmlFor="surname">გვარი</Lable>
              <InputAndErrorConainer >
                <InputContainer 
                    error={watch("surname") !== "" &&  errors.surname?.type}
                    ok={watch("surname") !== "" &&  !errors.surname?.type}
                  >
                  <Input 
                     placeholder='არძენაძე'
                    id='surname' 
                    type="text" {...register("surname", { required: true, minLength:2, pattern: /^[ა-ჰ]{2,}$/})}
                  />
                  {watch("surname") === ""|| errors.surname?.type  ?  null : <img src={okIcon} alt="okIcon" />}
                </InputContainer>
                { watch("surname") !== "" &&  errors.surname?.type ? <img src={errorIcon} alt="errorIcon" /> : null}
              </InputAndErrorConainer>
              <Preface>მინიმუმ 2 ასო, ქართული ასოები</Preface>
            </LableInputSpanContainer>
          </UserNameAndSurnameContainer>

            <ImageInutContainer>
            <span className='imgspan'>პირადი ფოტოს ატვირთვა</span>
            <ImageLableWrapper>
                <label className='imageLable' htmlFor="image" >ატვირთვა</label>     
            </ImageLableWrapper>
            {image && <img src={okIcon} alt="okIcon" />}
            <ImageINput  id='image' type="file"  {...register('image', { required: image ? false : true, onChange: handleImage})} accept="image/*"/>
          </ImageInutContainer>

          <TextAreaLableInputSpanContainer>
            <Lable error={errors.about_me?.type && watch("about_me") !== "" } htmlFor='about_me'>ჩემს შესახებ (არასავალდებულო)</Lable>
            <TextAreaAndIcon>
              <TextArea
                error={watch("about_me") !== "" &&  errors.about_me?.type}
                ok={watch("about_me") !== "" &&  !errors.about_me?.type}
                id="about_me" 
                placeholder='ზოგადი ინფორმაცია ჩემს შესახებ'
                /* @ts-ignore */
                {...register("about_me", {required:  watch("about_me")?.length > 1 ? true : false,  pattern: /^[ა-ჰ\s]{2,}$/} )} 
              /> 
              {watch("about_me") !== "" &&  errors.about_me?.type ?  <img src={errorIcon} alt="errorIcon" /> : null}
              {watch("about_me") !== "" &&  !errors.about_me?.type ?  <img src={okIcon} alt="okIcon" /> : null}
            </TextAreaAndIcon>
          </TextAreaLableInputSpanContainer>

          <LongLableInputSpanContainer>
              <Lable error={errors.email?.type && watch("email") !== "" } htmlFor="email">ელ.ფოსტა</Lable>
              <InputAndErrorConainer >
                <LongInputContainer 
                    error={watch("email") !== "" &&  errors.email?.type}
                    ok={watch("email") !== "" &&  !errors.email?.type}
                  >
                  <Input
                     placeholder='dato@redberry.ge'
                      id="email" 
                      type="text" 
                      {...register("email", {required: true,  pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(redberry\.ge)$/ } )} 
                  />
                  {watch("email") === "" || errors.email?.type ?  null : <img src={okIcon} alt="okIcon" />}
                </LongInputContainer>
                { watch("email") !== "" &&  errors.email?.type ? <img src={errorIcon} alt="errorIcon" /> : null}
              </InputAndErrorConainer>
              <Preface>უნდა მთავრდებოდეს @redberry.ge-ით</Preface>
            </LongLableInputSpanContainer>

            <MobileLongLableInputSpanContainer>
              <Lable error={errors.phone_number?.type && watch("phone_number") !== "" } htmlFor="phone_number">მობილურის ნომერი</Lable>
              <InputAndErrorConainer >
                <LongInputContainer 
                    error={watch("phone_number") !== "" &&  errors.phone_number?.type}
                    ok={watch("phone_number") !== "" &&  !errors.phone_number?.type}
                  >
                  <Input
                     placeholder='+995593011121'
                      id="phone_number" 
                      type="text" 
                      {...register("phone_number", { required: true,  pattern: /^(\+995)(79\d{7}|5\d{8})$/ })} 
                  />
                  {watch("phone_number") === "" || errors.phone_number?.type ?  null : <img src={okIcon} alt="okIcon" />}
                </LongInputContainer>
                { watch("phone_number") !== "" &&  errors.phone_number?.type ? <img src={errorIcon} alt="errorIcon" /> : null}
              </InputAndErrorConainer>
              <Preface>უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს</Preface>
            </MobileLongLableInputSpanContainer>
            <FormFooter />
        </Form>   
      </WorkSpace>

      <CvWrapper>
        <CvContainer>
           <GeneralCv  general={watch()} image={image}  />
           <img className='svStar' src={svStar} alt="svStar icon" />
        </CvContainer>
      </CvWrapper>
      
    </MainContainer>
  )
}

export default GeneralInformation


// start image input 
const ImageInutContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 19px; 
  margin-bottom: 49px;

  .imgspan {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: #1A1A1A;
  }
`

const ImageLableWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 12px;
  width: 107px;
  height: 27px;
  background: #0E80BF;
  border-radius: 4px;
  cursor: pointer;

  .imageLable {
    color: #FFFFFF;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
  }
`
const ImageINput = styled.input`
  display: none;
`
// end image input


