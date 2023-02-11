import styled from 'styled-components';
import mail from '../../assets/images/mail.svg'
import tel from '../../assets/images/tel.svg'

function GeneralCv({general, image}: any) {

  return (
    <Container>

      <InfoWrapper>
        <h1> {general?.name }  {general?.surname }</h1>

        <IconAndContactInfoContainer> 
            <img src={mail} alt='mail' />
            <ContactInfo>{general?.email}</ContactInfo> 
        </IconAndContactInfoContainer>

        <TelIconAndContactInfoContainer>
            <img src={tel} alt='tel' />
            <ContactInfo>{general?.phone_number}</ContactInfo> 
        </TelIconAndContactInfoContainer>


        {general?.about_me && <h4>ჩემს შესახებ</h4>}
        <p>{general?.about_me}</p>  
      </InfoWrapper>

        <ImageWrapper>
          {image ? <img src={image} alt="education" /> : null}
        </ImageWrapper>

    </Container>
  )
}

export default GeneralCv

const Container = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 19px;
  border-bottom: 1px solid #C8C8C8;
  margin-bottom: 24px;

`
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 430px;
  width: 100%;
  margin-top: 20px;
  overflow: hidden;

  h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 42px;
    color: #F93B1D;
    margin-bottom: 17px;
  }

  h4 {
     font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      color: #F93B1D;
      margin-top: 34px;
      margin-bottom: 15px;
  }

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    text-transform: lowercase;
    color: #000000;
  }
`


const IconAndContactInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`
const TelIconAndContactInfoContainer = styled(IconAndContactInfoContainer)`
  margin-top: 10px;
`

const ContactInfo = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #1A1A1A;
`

const ImageWrapper = styled.div`
  width: 246px;
  height: 246px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 133px;

  }
`