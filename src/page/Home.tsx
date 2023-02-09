import logo from '../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import homeBg from '../assets/images/home-bg.png';
import mark from '../assets/images/redberry-mark.svg';


function  Home() {
  return (
    <Wrapper homeBg={homeBg}> 
      <Header>
        <img className='logo' src={logo} alt='logo' />
      </Header>
        <Link  to="/general-information" >
          <Button>
              რეზიუმეს დამატება
          </Button>
        </Link>
        <img className='mark' src={mark} alt='mark' />
    </Wrapper>
  )
}

export default  Home


interface WrapperProps {
  homeBg: string;
}

const Wrapper = styled.div<WrapperProps>`
   background-image: url(${props => props.homeBg});
   background-repeat: no-repeat;
   background-size: cover; 
   min-height: 100vh;
   padding: 25px 70px 0px 70px;
   .mark {
      z-index: 1;
      margin-left: 200px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-30%,-20%)
  }
`
const Header = styled.header`
  width: 100%;
  padding-bottom: 26px;
  border-bottom: 1px solid #1A1A1A;

  .logo {
    width: 236px;
    height: 38px;
  }
`
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 464px;
  height: 60px;
  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #FFFFFF;
  background: #1A1A1A;
  border-radius: 8px;
  z-index: 10;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%)
`