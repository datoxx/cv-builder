import mail from '../../assets/images/mail.svg'
import tel from '../../assets/images/tel.svg'
import placeholder from '../../assets/images/placeholder.png'
import { ContactInfo, GeneralInfoContainer, IconAndContactInfoContainer, ImageWrapper, InfoWrapper, TelIconAndContactInfoContainer } from '../../styled-components/layout/cv/container';

function GeneralCv({general, image}: any) {

  return (
    <GeneralInfoContainer>

      <InfoWrapper>
        <h1> {general?.name }  {general?.surname }</h1>

        {general?.email && 
        <IconAndContactInfoContainer> 
            <img src={mail} alt='mail' />
            <ContactInfo>{general?.email}</ContactInfo> 
        </IconAndContactInfoContainer>
        }         
        {general?.phone_number &&   
        <TelIconAndContactInfoContainer>
            <img src={tel} alt='tel' />
            <ContactInfo>{general?.phone_number}</ContactInfo> 
        </TelIconAndContactInfoContainer>

          }   
        {general?.about_me && <h4>ჩემს შესახებ</h4>}
        <p>{general?.about_me}</p>  
      </InfoWrapper>

        <ImageWrapper>
          {image ? <img src={image} alt="education" /> :  <img src={placeholder} alt="placeholder" />}
        </ImageWrapper>

    </GeneralInfoContainer>
  )
}

export default GeneralCv
