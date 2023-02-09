import { Link, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { StoreContext } from '../context';

import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import FormsHeader from '../components/FormsHeader';
import FormFooter from '../components/FormFooter';
import styled from 'styled-components';
import errorIcon from '../assets/images/errorIcon.png';
import okIcon from '../assets/images/okIcon.png';


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

    setImage(formValues.image)
    setValues(formValues)


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

console.log("erorrrr>>", errors)  

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
                         id="name" 
                         type="text" 
                        {...register("name", {required: true, minLength: 2,   pattern: /^[\u10A0-\u10FF]{2,}$/ })} 
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
                        id='surname' 
                        type="text" {...register("surname", { required: true, minLength:2, pattern: /^[\u10A0-\u10FF]{2,}$/ })}
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
                    {...register("about_me", { pattern: /^[\u10A0-\u10FF]{2,}$/ } )} 
                  /> 
                  {watch("about_me") !== "" &&  errors.about_me?.type ?  <img src={errorIcon} alt="errorIcon" /> : null}
                  {watch("about_me") !== "" &&  !errors.about_me?.type ?  <img src={okIcon} alt="okIcon" /> : null}
                </TextAreaAndIcon>
              </TextAreaLableInputSpanContainer>





              <LongInputLableInputSpanContainer>
                <Lable htmlFor="email" error={errors.email?.type && watch("email") !== "" }>ელ.ფოსტა</Lable>
                <InputIcon>
                  <LongInput
                    error={watch("email") !== "" &&  errors.email?.type}
                    ok={watch("email") !== "" &&  !errors.email?.type}
                    id="email" 
                    {...register("email", {required: true,  pattern:  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(redberry\.ge)$/ } )} 
                  /> 
                  {watch("email") !== "" &&  errors.email?.type ?  <img src={errorIcon} alt="errorIcon" /> : null}
                  {watch("email") !== "" &&  !errors.email?.type ?  <img src={okIcon} alt="okIcon" /> : null}
                </InputIcon>
                <Preface>უნდა მთავრდებოდეს @redberry.ge-ით</Preface>
              </LongInputLableInputSpanContainer>



              <LongInputLableInputSpanContainer>
                <Lable htmlFor="phone_number" error={errors.phone_number?.type && watch("phone_number") !== "" }>ელ.ფოსტა</Lable>
                <InputIcon>
                  <LongInput
                    error={watch("phone_number") !== "" &&  errors.phone_number?.type}
                    ok={watch("phone_number") !== "" &&  !errors.phone_number?.type}
                    id="phone_number" 
                    {...register("phone_number", { required: true,  pattern: /^(\+995)(79\d{7}|5\d{8})$/ })}  
                  /> 
                  {watch("phone_number") !== "" &&  errors.phone_number?.type ?  <img src={errorIcon} alt="errorIcon" /> : null}
                  {watch("phone_number") !== "" &&  !errors.phone_number?.type ?  <img src={okIcon} alt="okIcon" /> : null}
                </InputIcon>
                <Preface>უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს</Preface>
              </LongInputLableInputSpanContainer>

                <FormFooter />
            </Form>   
      </WorkSpace>

      <div className='showplace'>

          { watch("name") }
          {watch("surname")}
          {image !== "" && <img src={image} alt="es aris fhoto" />}
          { watch("about_me") }
          { watch("email") }
          {watch("phone_number")}

      </div>
      
    </MainContainer>
  )
}

export default GeneralInformation


interface Props {
  error: any;
  ok: boolean;
}

const MainContainer = styled.div`
  display: flex;
  width:100%;
  min-height: 100vh;
`

const WorkSpace = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  max-width: 1098px; 
  width: 100%;
  gap: 77px;
  background: #F9F9F9;
  padding-top: 45px;
  padding-bottom: 65px;
`

const Form = styled.form`
  max-width: 798px;
  margin: 0 auto;
`

interface ErrorProps {
  error: any
}

//start name and surname
const UserNameAndSurnameContainer = styled.div<ErrorProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 54px;
  gap: ${props => props.error ? '20.5px' :'56px'}; 
`

const LableInputSpanContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 405.5;
  gap: 8px;
`

const Lable = styled.label<ErrorProps>`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: ${props => props.error ? "red" : "#000000"} ;
`

const InputAndErrorConainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 13.5px;
`


const InputContainer = styled.div<Props>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 371px;
  height: 48px;
  background: #FFFFFF;
  border: 1px solid ${props => props.error ? "red" : `${props.ok ? "#98E37E " : "#BCBCBC" }` };
  border-radius: 4px;
  padding: 0 15px;

  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: #000000;

  &::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: rgba(0, 0, 0, 0.6);
  }
`

const Input = styled.input`
  all: unset;
  width: 100%;
`
const Preface = styled.span`
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 21px;
  color: #2E2E2E;
`
// end name and surname

// start image 
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
// end image

//start textarea
const TextAreaLableInputSpanContainer = styled(LableInputSpanContainer)`
  width: 100%;
  margin-bottom: 33px;
`

const TextAreaAndIcon = styled.div`
  display: flex;
  align-items: start;
  gap: 13.5px;
`

const TextArea = styled.textarea<Props>`
  resize: none;
  width: 798px;
  height: 103px;
  padding: 13px 16px;
  background: #FFFFFF;
  border: 1px solid ${props => props.error ? "red" : `${props.ok ? "#98E37E " : "#BCBCBC" }` };
  border-radius: 4px;
  overflow:hidden;

  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  text-transform: lowercase;
  color: #000000;
`
//end textarea


// tavidna dasawria qveda nawili ra moklet 

const LongInputLableInputSpanContainer = styled(LableInputSpanContainer)`
  margin-bottom: 29px;
`

const InputIcon = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 13.5px;  
`

const LongInput = styled.input<Props>`
  height: 48px;
  width: 100%;
  padding: 13px 16px;
  background: #FFFFFF;
  border: 1px solid ${props => props.error ? "red" : `${props.ok ? "#98E37E " : "#BCBCBC" }` };
  border-radius: 4px;  
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: #000000;

  &::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: rgba(0, 0, 0, 0.6);
  }
`

