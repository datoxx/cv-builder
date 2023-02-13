import styled from 'styled-components';
import BackArrow from '../assets/images/vector.svg'
import {useLocation, useNavigate } from 'react-router-dom';

function FormsHeader() {

  const navigate = useNavigate();
  const location = useLocation();

  const handleStartButton  = () =>{
    localStorage.removeItem("generalInfo");
    localStorage.removeItem("experiences");
    localStorage.removeItem("educations");

    navigate("/");
  }

  return (
    <Container>
        <FisrtPageButton onClick={handleStartButton}>
              <img src={BackArrow}  alt="arrow" />
        </FisrtPageButton>

        <Header>
          <h1>{ location.pathname === "/general-information" ? "პირადი ინფო" : location.pathname === "/experience" ? "გამოცდილებ" : "განათლება" } </h1>
          <span>{ location.pathname === "/general-information" ? 1 : location.pathname === "/experience" ? 2 : 3 }/3</span> 
        </Header>

    </Container>
  )
}

export default FormsHeader



const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 61px;
  padding: 0px 150px 0px 48px;
`

const FisrtPageButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 12px;
  border-bottom: 1px solid #1A1A1A;

  h1 {
    font-family: 'HelveticaNeue';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    color: #1A1A1A;
  }

  span {
    font-family: 'HelveticaNeue';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #1A1A1A;
  }
`