import React from 'react'
import GeneralCv from './GeneralCv'
import { useEffect, useState } from 'react';

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
    <div>

        <GeneralCv general={general} image={image} />

        {experiences?.map((item: any) =>  {
                 return  <section key={Math.floor(Math.random() * (1000000 - 1 + 1) + 1)} >
                      <p>{item.position}</p>
                      <p>{item.employer}</p>
                      <p>{item.description}</p>
                      <p>{item.start_date}</p>
                      <p>{item.due_date}</p>
                      <hr />
                  </section>
                })}
    </div>
  )
}

export default ExperienceCv;