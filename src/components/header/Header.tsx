import React, {useState} from 'react';
import Title from "../Title";
import styled from "styled-components";
import moment from "moment/moment";
import {FontSize} from "../week/type";


const StyledHeader = styled.div<propHeader>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  background: ${props => props.background || '#ffff'};
`


type propHeader = {
    colorTitle?: string
    fillSvg?: string
    background?: string
}
const Header = (props: propHeader) => {
    const [d, setD] = useState('')
    const [dd, setDD] = useState<number[]>([])
    const addMeeting = () => {
        // const date = prompt('Enter event time: YYYY-MM-DD  HH-mm-ss');
        // if (date !== null) {
        //     setD(date)
        // }
        const str = '2023-04-20-10-22';
        const target = '-'
        let firstIndex = 0
        let lastIndex = 0

        while (true) {
            const a = str.indexOf(target, firstIndex)
            a !== -1 ? lastIndex = a : lastIndex = str.length
            const num = Number(str.slice(firstIndex, lastIndex))
            setDD(prevState => ([...prevState, num]))
            firstIndex = a + 1
            if (a === -1) break;
        }
        console.log(dd);

    }
    console.log(dd);
    console.log(d);
    return (
        <StyledHeader {...props}>
            <Title color={props.colorTitle}>
                Interview Calendar
            </Title>
            <svg style={{cursor: 'pointer'}} onClick={addMeeting} fill={props.fillSvg} width="30px" height="30px"
                 viewBox="0 0 1920 1920"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M866.332 213v653.332H213v186.666h653.332v653.332h186.666v-653.332h653.332V866.332h-653.332V213z"/>
            </svg>

        </StyledHeader>
    );
};

export default Header;