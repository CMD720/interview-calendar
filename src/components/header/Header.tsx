import React, {useEffect, useRef, useState} from 'react';
import Title from "../Title";
import styled from "styled-components";
import moment from "moment/moment";
import {FontSize} from "../week/type";
import {getMonthYear, getWeek, getWeekDays} from "../week/GetWeek";
import {useAppDispatch, useAppSelector} from "../../redux/storeHook";
import {momentSelector} from "../../redux/Moment/selectors";
import {calendarSelector} from "../../redux/Calendar/selectors";
import {setActiveMeetings} from "../../redux/Calendar/slice";


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
    const dispatch = useAppDispatch()
    const {firstWeekday, lastWeekday} = useAppSelector(momentSelector)
    const {activeMeetings, meetingsWeek} = useAppSelector(calendarSelector)

    const [d, setD] = useState('')
    const [dd, setDD] = useState<number[]>([])
    const days = getWeekDays()
    const week = getWeek({firstWeekday, lastWeekday})
    const isMout = useRef(false)
    // const times = {
    //     8: [1, 2, 3, 4, 5, 6, 7],
    //     9: [8, 9, 10, 11, 12, 13, 14],
    //     10: [15, 16, 17, 18, 19, 20, 21],
    //     11: [22, 23, 24, 25, 26, 27, 28],
    //     12: [29, 30, 31, 32, 33, 34, 35],
    //     13: [36, 37, 38, 39, 40, 41, 42],
    //     14: [43, 44, 45, 46, 47, 48, 49],
    //     15: [50, 51, 52, 53, 54, 55, 56],
    //     16: [57, 58, 59, 60, 61, 62, 63],
    //     17: [64, 65, 66, 67, 68, 69, 70],
    //     18: [71, 72, 73, 74, 75, 76, 77],
    //     19: [78, 79, 80, 81, 82, 83, 84],
    //     20: [85, 86, 87, 88, 89, 90, 91],
    // }
    const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    const times = [
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19, 20, 21],
        [22, 23, 24, 25, 26, 27, 28],
        [29, 30, 31, 32, 33, 34, 35],
        [36, 37, 38, 39, 40, 41, 42],
        [43, 44, 45, 46, 47, 48, 49],
        [50, 51, 52, 53, 54, 55, 56],
        [57, 58, 59, 60, 61, 62, 63],
        [64, 65, 66, 67, 68, 69, 70],
        [71, 72, 73, 74, 75, 76, 77],
        [78, 79, 80, 81, 82, 83, 84],
        [85, 86, 87, 88, 89, 90, 91]]
    // console.log(times);

    ////////////////
    // const firstWeekday = moment().startOf('isoWeek')
    // const lastWeekday = moment().endOf('isoWeek')
    // const {month, year, today, currentWeek} = getMonthYear({firstWeekday})
    // const day = getWeek({firstWeekday, lastWeekday})
    // const index = day.findIndex(i => i === today) + 1
    // console.log(today);
    // console.log(day);
    // console.log(index);
    ///////////////

    const addMeeting = () => {
        // const date = prompt('Enter event time: YYYY-MM-DD  HH-mm-ss');
        // if (date !== null) {
        //     setD(date)
        // }
        const str = '2023-04-22-10-22';
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
    }

    const getActiveMeet = (ddd: number[]) => {

        const index1 = hours.indexOf(ddd[3]);
        const index2 = week.indexOf(ddd[2]);
        // const index2 = time.indexOf(dd[2])
        console.log(hours);
        console.log('times', times[index1]);
        console.log('index', index1, 'item', hours[index1]);
        console.log('index', index2, 'item', times[index1][index2]);
        // console.log('index',index2 , 'item',times[index1][index2])
        console.log(ddd);
        dispatch(setActiveMeetings(times[index1][index2]))
    }

    useEffect(() => {
        if (isMout.current) {
            getActiveMeet(dd);
        }
        isMout.current = true
    }, [dd])

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