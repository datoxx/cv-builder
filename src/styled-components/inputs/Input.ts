import styled from 'styled-components';
import { ErrorProps, Props } from '../../types/styldProps';


//start name and surname inputs
export const UserNameAndSurnameContainer = styled.div<ErrorProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 54px;
  gap: ${props => props.error ? '20.5px' :'56px'}; 
`

export const LableInputSpanContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 405.5;
  gap: 8px;
`

export const Lable = styled.label<ErrorProps>`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: ${props => props.error ? "red" : "#000000"} ;
`

export const InputAndErrorConainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 13.5px;
`


export const InputContainer = styled.div<Props>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 371px;
  height: 48px;
  background: #FFFFFF;
  border: 1px solid ${props => props.error ? "red" : `${props.ok ? "#98E37E " : "#BCBCBC" }` };
  border-radius: 4px;
  padding: 0 15px;

  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: #000000;

  &::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: rgba(0, 0, 0, 0.6);
  }
`

export const Input = styled.input`
  all: unset;
  width: 100%;
`
export const Preface = styled.span`
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 21px;
  color: #2E2E2E;
`
// end name and surname inputs

//long input start
export const LongInputContainer = styled(InputContainer)`
  min-width: 798px;
`

export const LongLableInputSpanContainer = styled(LableInputSpanContainer)`
  width: 100%;
`

export const MobileLongLableInputSpanContainer = styled(LongLableInputSpanContainer)`
  margin-top: 29px;
`
// end long input 

// date input
export const DatesContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 25px;
`

export const IconAndInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 13.5px;
`

export const DateLable = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  z-index: 50;
  
  .dropdown {
    position: absolute;
    right: 20px;
    top: 50px;
    z-index: 100;
  }
  .dateSpan {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    color: #000000;
  }
`

export const DateInput = styled.input<Props>`
  background: #FFFFFF;
  border: 1px solid ${props => props.error ? "red" : `${props.ok ? "#98E37E " : "#BCBCBC" }` };
  border-radius: 4px;
  width: 371px;
  height: 48px;
  padding: 13px 16px;

  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: rgba(0, 0, 0, 0.6);
`