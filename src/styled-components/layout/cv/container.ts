import styled from 'styled-components';


// start cv 
export const CvWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 882px;
  margin: 48px 0 44px 0;
`
export const CvContainer = styled.div`
  width: 680px;
  margin: 0 auto;
`

export const GeneralInfoContainer = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 19px;
  border-bottom: 1px solid #C8C8C8;
  margin-bottom: 24px;

`
export const InfoWrapper = styled.div`
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

export const IconAndContactInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`
export const TelIconAndContactInfoContainer = styled(IconAndContactInfoContainer)`
  margin-top: 10px;
`

export const ContactInfo = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #1A1A1A;
`

export const ImageWrapper = styled.div`
  width: 246px;
  height: 246px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 133px;

  }
`


// experience 
export const ExperienceContainer = styled.div`
  display: flex;
  flex-direction: column;


  .experienceSection {
    padding-bottom: 32px;
    border-bottom: 1px solid #C8C8C8;
    margin-bottom: 26px;
  }

  .experience {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #F93B1D;
  }

  .abutWork{
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #1A1A1A;
    margin: 15px 0 7px 0;
  }

 .aboutDuration {
    font-style: italic;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #919191;
 }

 .aboutJob {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  text-transform: capitalize;
  color: #000000;
  margin-top: 16px;
 }
`

// educations

export const EducationsContainer = styled.div`
  display: flex;
  flex-direction: column;


  .educationSection {
    padding-bottom: 32px;
    border-bottom: 1px solid #C8C8C8;
    margin-bottom: 26px;
    &:last-child {
      border-bottom: none;
    }
  }

  .education {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #F93B1D;
  }

  .aboutEducation{
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #1A1A1A;
    margin: 15px 0 7px 0;
  }

 .finishEducation {
    font-style: italic;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #919191;
 }

 .descriptionEducation {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  text-transform: capitalize;
  color: #000000;
  margin-top: 16px;
 }
`