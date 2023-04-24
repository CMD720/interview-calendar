import React, {ReactElement} from 'react';
import styled, {css} from "styled-components";
import {FontSize} from "./week/type";

const Button = (props:StyledButtonProps) => {
    return (
        <StyledButton{...props}/>
    );
};

export default Button;

type StyledButtonProps ={
    fontSize?: FontSize;
    color?: string;
    align?: string;
    background?:string;
    display?:string;
    primary?:boolean;
    outlined?:boolean;
    minimal?:boolean;
    onClick?:()=>void;
    children?: string |string[] | number | ReactElement| JSX.Element | JSX.Element[] ;
}

const StyledButton=styled.button<StyledButtonProps>`
  border: none;
  padding: 10px 15px;
  font-weight: 600;
  cursor: pointer;
  align-self: ${props => props.align || 'stretch '};
  &:focus {
    outline: none;
  }
   display: ${props => props.display || props.theme.display.block};
  
  ${props => props.primary && css<StyledButtonProps>`
    color: ${props => props.color || '#ff3131'};
    background : ${props => props.background || 'white'};
    font-size: ${props => props.fontSize || '1.5em'};
  `}
  ${props => props.outlined && css<StyledButtonProps>`
    color: ${props => props.color || '#ff3131'};
    border: 1px solid ${props => props.color || '#ff3131'};
    background : transparent;
    font-size: ${props => props.fontSize || '1.5em'};
  `}
  ${props => props.minimal && css<StyledButtonProps>`
    color: ${props => props.color || '#ff3131'};
    background : transparent;
    font-size: ${props => props.fontSize || '1.5em'};
    padding: 0;
    
    @media ${props => props.theme.media.phone} {
      font-size: ${props.theme.fontSize.sm};
    }
  `}
`