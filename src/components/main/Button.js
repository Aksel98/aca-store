
import styled from 'styled-components';
import { GREY, ORANGE } from './Styles';

const Button = styled.button`

  border-radius:${props => props.radius ? props.radius : '3px'};
  border:transparent;
  background: transparent;
  color:${ORANGE};
 
//   border:${props => props.border ? `1px solid ${GREY}` : `transparent`} ;
  width:${props => props.width ? props.width : '2rem'};
  height: 2rem;
  margin:5px;
  margin-top:${props => props.top ? props.top : 'none'};
  padding:0;
  text-align:center;

 
  &:hover{
    transition: 0.5s all ease-out;
    cursor:pointer;
    box-shadow:-1px -1px 3px 3px ${GREY};
    
  }
`;
export default Button

