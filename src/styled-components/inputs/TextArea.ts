import styled from 'styled-components';
import { LableInputSpanContainer } from './Input';
import { Props } from '../../types/styldProps';

//start textarea
export const TextAreaLableInputSpanContainer = styled(LableInputSpanContainer)`
  width: 100%;
  margin-bottom: 33px;
`

export const TextAreaAndIcon = styled.div`
  display: flex;
  align-items: start;
  gap: 13.5px;
`

export const TextArea = styled.textarea<Props>`
  resize: none;
  width: 798px;
  height: 103px;
  padding: 13px 16px;
  background: #FFFFFF;
  border: 1px solid ${props => props.error ? "red" : `${props.ok ? "#98E37E " : "#BCBCBC" }` };
  border-radius: 4px;
  overflow:hidden;

  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  text-transform: lowercase;
  color: #000000;
`
//end textarea
