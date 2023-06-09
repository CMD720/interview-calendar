import React, {ReactElement, PropsWithChildren} from 'react';
import styled from "styled-components";
import {FontSize} from "./week/type";

type TitleProps = {
    children?: string |string[] | number | ReactElement| JSX.Element | JSX.Element[]
    color?:string;
    title?: FontSize;
}

const StyledTitle = styled.h1<PropsWithChildren>`
   font-size: ${props => props.title || props.theme.fontSize.lg};
  text-align: center;
  color: ${props => props.color || 'black'};
  @media ${props => props.theme.media.phone} {
    font-size: ${props => props.theme.fontSize.md};
  }
`

const Title = (props:TitleProps) => {
    return <StyledTitle {...props}/>
};

export default Title;