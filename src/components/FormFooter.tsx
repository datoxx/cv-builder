import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function FormFooter() {

    const navigate = useNavigate();
    const location = useLocation();


  return (
    <Wrapper buttoEnd={location.pathname === "/general-information"}>
        {location.pathname !== "/general-information" &&  <BackButton onClick={() => navigate(-1)}> უკან </BackButton>}

        <Button> {location.pathname === "/education" ? "დასრულება" :  "შემდეგი" }</Button>
        
    </Wrapper>
  )
}

export default FormFooter

interface WrapperProps {
    buttoEnd: boolean
}

const Wrapper = styled.div<WrapperProps>`
    display: flex;
    justify-content: ${props => props.buttoEnd ? "end": "space-around" };
    align-items: center;
`

const Button = styled.button`
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 151px;
    height: 48px;
    background: #6B40E3;
    border-radius: 4px;
    cursor: pointer;   
    
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.08em;
    color: #FFFFFF;
`

const BackButton = styled(Button)`
    width: 113px;

`;