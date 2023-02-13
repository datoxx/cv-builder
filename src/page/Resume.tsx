//hooks
import { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
//style
import { ContactInfo, CvContainer, CvWrapper, EducationsContainer, 
  ExperienceContainer, GeneralInfoContainer, IconAndContactInfoContainer, 
  ImageWrapper, InfoWrapper, TelIconAndContactInfoContainer } from '../styled-components/layout/cv/container';
import BackArrow from '../assets/images/vector.svg';
//icons
import mailIcon from '../assets/images/mail.svg'
import closeIcon from '../assets/images/closeIcon.svg'
import svStar from '../assets/images/svStar.svg';
import tel from '../assets/images/tel.svg'
import styled from 'styled-components';

function Resume() {

  const navigate = useNavigate();
  const [apiData, setApiData] = useState<any>({});
  const [modalClose, setModalClose] = useState("")

  useEffect(() => {

    const jsonStr = localStorage.getItem("apiData");
    if (jsonStr === null ) return;
    const formValues = JSON.parse(jsonStr);
    setApiData(formValues)

  }, [])


  const handleStartButton  = () =>{
    localStorage.removeItem("generalInfo");
    localStorage.removeItem("experiences");
    localStorage.removeItem("experiences");


    navigate("/");
  }

  return (
    <MainWrapper>
      <MainContainer>
        <FisrtPageButton onClick={handleStartButton}>
              <img src={BackArrow}  alt="arrow" />
        </FisrtPageButton>

        <CvWrapper style={{border: "0.8px solid #000000", padding: "68px 80px 44px 80px", marginTop: "0px"}}>
          <CvContainer>

            {/* general information */}
            <GeneralInfoContainer>

              <InfoWrapper>
                <h1> {apiData?.name }  {apiData?.surname }</h1>

                <IconAndContactInfoContainer> 
                    <img src={mailIcon} alt='apiimage' />
                    <ContactInfo>{apiData?.email}</ContactInfo> 
                </IconAndContactInfoContainer>

                <TelIconAndContactInfoContainer>
                    <img src={tel} alt='tel' />
                    <ContactInfo>{apiData?.phone_number}</ContactInfo> 
                </TelIconAndContactInfoContainer>


                {apiData?.about_me && <h4>ჩემს შესახებ</h4>}
                <p>{apiData?.about_me}</p>  
              </InfoWrapper>

                <ImageWrapper>
                  {apiData.image ? <img src={`https://resume.redberryinternship.ge/${apiData.image}`} alt="education" /> : null}
                </ImageWrapper>

            </GeneralInfoContainer>


                {/* experience  */}
                <ExperienceContainer>
                  <h4 className='experience' >გამოცდილება</h4>

                  {apiData?.experiences?.map((item: any) =>  {
                    return  (
                      <section className='experienceSection' key={Math.floor(Math.random() * (1000000 - 1 + 1) + 1)} >
                        <p className='abutWork' >{item.position}, {item.employer}</p>
                        <p className='aboutDuration'>{item.start_date} - {item.due_date}</p>
                        <p className='aboutJob' >{item.description}</p>
                    </section>
                    )})}
                </ExperienceContainer>

                {/* educatios */}

                <EducationsContainer>
                      <h4 className='education'>განათლება</h4>

                      <div>
                        {apiData?.educations?.map((item: any) =>  {
                        return  (
                        <section className='educationSection'  key={Math.floor(Math.random() * (10000000 - 1 + 1) + 1)} >
                              <p className='aboutEducation'> {item.institute}, { item.degree}</p>
                              <p className='finishEducation'>{item.due_date}</p>
                              <p className='descriptionEducation' >{item.description}</p>
                          </section>
                          )}) }
                      </div>
                </EducationsContainer>
                <div style={{marginTop: "220px"}}>
                     <img  className='svStar' src={svStar} alt="svStar icon" />
                </div>
          </CvContainer>
        </CvWrapper>

        <Modal close={modalClose}>
          <div  onClick={() => setModalClose("close")} className='close'>
            <img src={closeIcon} alt="close icon" />
          </div>
          <span className='modalText'> რეზიუმე წარმატებით გაიგზავნა 🎉 </span>
        </Modal>

      </MainContainer>
    </MainWrapper>
  )
}

export default Resume


const MainWrapper = styled.div`
  padding: 50px 70px 129px 50px;
  display: flex;
  justify-content: center;
  max-width: 1920px;
  width: 100%;
`
const MainContainer = styled.div`
  display: flex;
  align-items: start;
  width:100%;
`

const FisrtPageButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: #f2f2f2dc;
  border-radius: 50%;
  margin-right: 461px;
`

interface ModalProps {
  close: string
}

const Modal= styled.div<ModalProps>`
  visibility:  ${props => props.close === "close" ? "hidden" : ""}; 
  padding: 40px 30px;
  width: 427px;
  height: 167px;
  background: #FFFFFF;
  border: 1px solid #E4E4E4;
  box-shadow: 0px 4px 28px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  margin-left: 52px;
  position: relative;


  .close {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  .modalText{
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 43px;
    color: #1A1A1A;
  }
`