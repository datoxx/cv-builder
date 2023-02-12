import React from 'react'
import GeneralCv from './GeneralCv'
import { useEffect, useState } from 'react';
import { ExperienceContainer } from '../../styled-components/layout/cv/container';

function ExperienceCv({experiences}: any) {

  const [general, setGeneral] = useState()
  const [image, setImage] = useState()

  useEffect(() => {
    const jsonStr = localStorage.getItem("generalInfo");
    if (jsonStr === null ) return;
    const formValues = JSON.parse(jsonStr);

    setImage(formValues.image)
    setGeneral(formValues)
    
  }, [])

  return (
    <ExperienceContainer>
      <GeneralCv general={general} image={image} />

      <h4 className='experience' >გამოცდილება</h4>

      {experiences?.map((item: any) =>  {
        return  (
          <section className='experienceSection' key={Math.floor(Math.random() * (1000000 - 1 + 1) + 1)} >
            <p className='abutWork' >{item.position}, {item.employer}</p>
            <p className='aboutDuration'>{item.start_date} - {item.due_date}</p>
            <p className='aboutJob' >{item.description}</p>
        </section>
        )})}
    </ExperienceContainer>
  )
}

export default ExperienceCv;
