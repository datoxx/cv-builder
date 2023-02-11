import React from 'react'
import GeneralCv from './GeneralCv'
import { useEffect, useState } from 'react';
import styled from 'styled-components';

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
    <Container>
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
    </Container>
  )
}

export default ExperienceCv;


const Container = styled.div`
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