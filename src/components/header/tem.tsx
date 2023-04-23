import React, {useEffect, useRef, useState} from 'react';
import Title from "../Title";
import styled from "styled-components";
import moment from "moment/moment";
import {FontSize} from "../week/type";
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
    colorTitle?: string
    fillSvg?: string
    background?: string
}
const StyledHeader = styled.div<propHeader>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  background: ${props => props.background || '#ffff'};
`


const Tem = (props: propHeader) => {
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
    const [meetingDate, setMeetingDate] = useState<number[]>([])
    // const meetingDate:number[] = []
    // const [str, setStr] = useState<string>()
    const week = getWeek({firstWeekday, lastWeekday})
    const isMount = useRef(false)

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
        const str = prompt('Enter event time: YYYY-MM-DD-HH-mm  for example: 2023-06-23-12-34  2023-04-20-10-34 ');
        // const str = '2023-06-20-08-34';
        const target = '-'
        let firstIndex = 0
        let lastIndex = 0
        const meetingDataForCurrentWeek = []
        if (str) {
            while (true) {
                const a = str.indexOf(target, firstIndex)
                a !== -1 ? lastIndex = a : lastIndex = str.length
                const num = Number(str.slice(firstIndex, lastIndex))
                // setMeetingDate(prevState => ([...prevState, num]))
                meetingDataForCurrentWeek.push(num)
                firstIndex = a + 1
                if (a === -1) break;
            }

            // const setMoment = str.slice(0, 10);
            // const firstWeekday = moment(setMoment).startOf('isoWeek')
            // const testTest = getMonthYear({firstWeekday})
            // if(currentWeek === testTest.currentWeek){
            if(currentWeek === checkWeekNumber(str)){
                setMeetingDate(meetingDataForCurrentWeek)
                getActiveMeet(meetingDataForCurrentWeek);
                const index1 = hours.indexOf(meetingDataForCurrentWeek[3]);
                const index2 = week.indexOf(meetingDataForCurrentWeek[2]);
                // dispatch(setActiveMeetings(times[index1][index2]))
            }else {
                setMeetingDate(meetingDataForCurrentWeek)
                setMeetingAnotherWeek(str , meetingDataForCurrentWeek)
            }
            // setMeetingAnotherWeek(str)

        }
        // const setMoment = '2023-06-23'
        // if (str){
        //     const setMoment = str.slice(0, 10)
        //     const startEnd = {
        //         firstWeekday:moment(setMoment).startOf('isoWeek'),
        //         lastWeekday:moment(setMoment).endOf('isoWeek'),
        //     }
        //     dispatch(addMeetingsWeek(temp))
        //     dispatch(currentMoment(startEnd))
        //     dispatch(findMeeting(false))
        //     dispatch(clearActiveMeetings())
        // }
    }

    const checkWeekNumber = (str:string) => {
        const setMoment = str.slice(0, 10);
        const firstWeekday = moment(setMoment).startOf('isoWeek')
        const {currentWeek} = getMonthYear({firstWeekday})
        return currentWeek
    }
    const setMeetingAnotherWeek =(str:string, meetingDataForCurrentWeek:number[])=>{
        const setMoment = str.slice(0, 10)
        const startEnd = {
            firstWeekday: moment(setMoment).startOf('isoWeek'),
            lastWeekday: moment(setMoment).endOf('isoWeek'),
        }
        if (activeMeetings.length !== 0) {
            console.log('ok HE OK?')
            dispatch(addMeetingsWeek(temp))
        }
        getActiveMeet(meetingDataForCurrentWeek);
        dispatch(currentMoment(startEnd))
        dispatch(findMeeting(false))
        dispatch(clearActiveMeetings())
    }
    const getActiveMeet = (meetingDate:number[]) => {
        const index1 = hours.indexOf(meetingDate[3]);
        const index2 = week.indexOf(meetingDate[2]);
        dispatch(setActiveMeetings(times[index1][index2]))
    }

    useEffect(() => {
        if (isMount.current) {
            // if(currentWeek === checkWeekNumber(str)) {
            //     getActiveMeet();
            // }
        }
        isMount.current = true
    }, [meetingDate])
    // }, [])

    return (
        <StyledHeader {...props}>
            <Title color={props.colorTitle}>
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

export default Tem;