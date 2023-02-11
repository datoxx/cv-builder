import { useState, useEffect } from 'react';
import ExperienceCv from './ExperienceCv';
import { DegreeType } from '../../page/Education';
import styled from 'styled-components';

function EducationCv({educations, optionsValues}: any) {

    const [experiences, setExperiences] = useState();
  
    useEffect(() => {
      const localStorageExperiences = localStorage.getItem("experiences");

      if (localStorageExperiences === null ) return;
      const experiencesValues = JSON.parse(localStorageExperiences);

      setExperiences(experiencesValues.experiences)
      
    }, [])


  return (
    <Container>
          <ExperienceCv experiences={experiences} />

          <h4 className='education'>განათლება</h4>

          <div>
            {educations?.map((item: any) =>  {
            return  (
            <section className='educationSection'  key={Math.floor(Math.random() * (10000000 - 1 + 1) + 1)} >
                  <p className='aboutEducation'> {item.institute},  {optionsValues?.find((obj: DegreeType) => obj?.id == item?.degree_id )?.title }</p>
                  <p className='finishEducation'>{item.due_date}</p>
                  <p className='descriptionEducation' >{item.description}</p>
              </section>
              )}) }
           </div>
    </Container>
  )
}

export default EducationCv;



const Container = styled.div`
  display: flex;
  flex-direction: column;


  .educationSection {
    padding-bottom: 32px;
    border-bottom: 1px solid #C8C8C8;
    margin-bottom: 26px;
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