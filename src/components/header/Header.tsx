import React, {useEffect, useRef, useState} from 'react';
import Title from "../Title";
import styled from "styled-components";
import moment from "moment/moment";
import {getMonthYear, getWeek, getWeekDays} from "../week/GetWeek";
import {useAppDispatch, useAppSelector} from "../../redux/storeHook";
import {momentSelector} from "../../redux/Moment/selectors";
import {calendarSelector} from "../../redux/Calendar/selectors";
import {
    addMeetingsWeek,
    clearActiveMeetings,
    findMeeting,
    setActiveMeetings,
    TMeetingsWeek
} from "../../redux/Calendar/slice";
import {currentMoment} from "../../redux/Moment/slice";

type propHeader = {
    background?: string
}
const StyledHeader = styled.div<propHeader>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  background: ${props => props.background || props.theme.background.backgroundWhite};
  @media ${props => props.theme.media.phone} {
    padding: 22px 25px;
  }
`


const Header = (props: propHeader) => {
    const dispatch = useAppDispatch()
    const {firstWeekday, lastWeekday} = useAppSelector(momentSelector)
    const {activeMeetings, meetingsWeek} = useAppSelector(calendarSelector)
    const {month, year, today, currentWeek, presentWeek} = getMonthYear({firstWeekday})

    const temp: TMeetingsWeek = {
        year: year,
        month: month,
        weekNumber: currentWeek,
        dataMeetings: activeMeetings,
    }
    const week = getWeek({firstWeekday, lastWeekday})
    const isMount = useRef(false)
    const [sectorNumber, setSectorNumber] = useState<number>(0)
    const [readingDate, setReadingDate] = useState('')
    const [meetingData ,setMeetingData] = useState<number[]>([])

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

    const addMeeting = () => {
        const readingMeet = prompt('Enter event time: YYYY-MM-DD-HH-mm  for example: 2023-06-23-12-34  2023-04-27-10-34 ');
        // const readingMeet = '2023-06-20-10-34';

        const target = '-'
        let firstIndex = 0
        let lastIndex = 0
        const createMeetingData:number[] = []

        if (readingMeet) {
            while (true) {
                const a = readingMeet.indexOf(target, firstIndex)
                a !== -1 ? lastIndex = a : lastIndex = readingMeet.length
                const num = Number(readingMeet.slice(firstIndex, lastIndex))
                createMeetingData.push(num)
                firstIndex = a + 1
                if (a === -1) break;
            }
            const index1 = hours.indexOf(createMeetingData[3]);
            const index2 = week.indexOf(createMeetingData[2]);
            setSectorNumber(times[index1][index2])
            setMeetingData(createMeetingData);
            setReadingDate(readingMeet.slice(0, 10))
        }
    }
    const countSectorNumber = () => {
        const firstWeekday = moment(readingDate).startOf('isoWeek');
        const lastWeekday = moment(readingDate).endOf('isoWeek');
        const newWeek = getWeek({firstWeekday, lastWeekday})
        const index1 = hours.indexOf(meetingData[3]);
        const index2 = newWeek.indexOf(meetingData[2]);
        dispatch(setActiveMeetings(times[index1][index2]))
    }

    //TODO можно вынести в отдельный файл
    const checkWeekNumber = (str:string) => {
        const firstWeekday = moment(str).startOf('isoWeek')
        const enteredDate = getMonthYear({firstWeekday})
        return currentWeek === enteredDate.currentWeek
    }

    const dropMeeting = () => {
        if(checkWeekNumber(readingDate)){
            dispatch(setActiveMeetings(sectorNumber))
            // countSectorNumber();
        }else {
            console.log('NOT ===')
            if (activeMeetings.length !== 0) {
                dispatch(addMeetingsWeek(temp))
                dispatch(clearActiveMeetings())
            }
            const startEnd = {
                firstWeekday: moment(readingDate).startOf('isoWeek'),
                lastWeekday: moment(readingDate).endOf('isoWeek'),
            }
            dispatch(currentMoment(startEnd))
            dispatch(findMeeting(false))
            countSectorNumber();
        }

    }

    useEffect(()=>{
        if(isMount.current){
            dropMeeting()
        }
        isMount.current = true
    },[meetingData])

    return (
        <StyledHeader {...props}>
            <Title>
                Interview Calendar
            </Title>
            <svg style={{cursor: 'pointer'}} onClick={addMeeting} fill='#ff3131' width="30px" height="30px"
                 viewBox="0 0 1920 1920"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M866.332 213v653.332H213v186.666h653.332v653.332h186.666v-653.332h653.332V866.332h-653.332V213z"/>
            </svg>

        </StyledHeader>
    );
};

export default Header;

// Rethinking the logic of adding an event