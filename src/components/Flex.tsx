import React, {ReactElement} from 'react';
import styled from "styled-components";

type StyledFlexProps = {
    direction?:string;
    items?:string;
    justify?:string;
    margin?:string;
    children?:string |string[] | number | ReactElement| JSX.Element | JSX.Element[]
}

const StyledFlex = styled.div<StyledFlexProps>`
display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.items || 'stretch'};
  justify-content: ${props => props.justify || 'stretch'};
  margin: ${({margin}) => margin || '0'};
`
const Flex = (props:StyledFlexProps) => {
    return (
        <StyledFlex{...props}/>
    );
};

export default Flex;