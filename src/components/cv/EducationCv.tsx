import { useState, useEffect } from 'react';
import ExperienceCv from './ExperienceCv';

function EducationCv({educations}: any) {

    const [experiences, setExperiences] = useState();
  
    useEffect(() => {
      const localStorageExperiences = localStorage.getItem("experiences");

      if (localStorageExperiences === null ) return;
      const experiencesValues = JSON.parse(localStorageExperiences);

      setExperiences(experiencesValues.experiences)
      
    }, [])

  return (
    <div>
          <ExperienceCv experiences={experiences} />

          <div>
            {educations?.map((item: any) =>  {
            return  <section key={Math.floor(Math.random() * (1000000 - 1 + 1) + 1)} >
                  <p>{item.institute}</p>
                  <p>{item.degree_id }</p>
                  <p>{item.due_date}</p>
                  <p>{item.description}</p>
                  <hr />
              </section>
              }) }
    </div>
    </div>
  )
}

export default EducationCv