import { useState, useEffect } from 'react';
import ExperienceCv from './ExperienceCv';
import { DegreeType } from '../../page/Education';
import { EducationsContainer } from '../../styled-components/layout/cv/container';
import { filterFromArray } from '../../utils';

function EducationCv({educations, optionsValues}: any) {

    const [experiences, setExperiences] = useState();
  
    useEffect(() => {
      const localStorageExperiences = localStorage.getItem("experiences");

      if (localStorageExperiences === null ) return;
      const experiencesValues = JSON.parse(localStorageExperiences);

      setExperiences(experiencesValues.experiences)
      
    }, [])


  return (
    <EducationsContainer>
          <ExperienceCv experiences={experiences} />

          <h4 className='education'>განათლება</h4>

          <div>
            {filterFromArray(educations)?.map((item: any) =>  {
            return  (
            <section className='educationSection'  key={Math.floor(Math.random() * (10000000 - 1 + 1) + 1)} >
                  <p className='aboutEducation'> {item.institute},  {optionsValues?.find((obj: DegreeType) => obj?.id == item?.degree_id )?.title }</p>
                  <p className='finishEducation'>{item.due_date}</p>
                  <p className='descriptionEducation' >{item.description}</p>
              </section>
              )}) }
           </div>
    </EducationsContainer>
  )
}

export default EducationCv;

