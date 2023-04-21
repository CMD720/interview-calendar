import React, {useEffect, useState} from 'react';
import styled, {css} from "styled-components";
import moment, {Moment} from "moment/moment";
import {getMonthYear, getWeek, getWeekDays} from "../week/GetWeek";
import {MeetSector, MeetSectorArea, StyledBody, StyledMeet, StyledTime, TimeSector} from "./styles";
import {useAppDispatch, useAppSelector} from "../../redux/storeHook";
import {findMeeting, setActiveMeetings, setCurrentMeeting} from "../../redux/Calendar/slice";
import {useSelector} from "react-redux";
import {calendarSelector} from "../../redux/Calendar/selectors";




const Body = () => {
    const dispatch = useAppDispatch()
    const {activeMeetings} = useAppSelector(calendarSelector)
    ////////////////
    const firstWeekday = moment().startOf('isoWeek')
    const lastWeekday = moment().endOf('isoWeek')
    const {today} = getMonthYear({firstWeekday})
    const days = getWeek({firstWeekday, lastWeekday})
    const index = days.findIndex(i => i===today) + 1
    // console.log(today);
    // console.log(days);
    // console.log(index);
    ///////////////

    const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']
    const meeting: JSX.Element[] = []
    const timesMeeting = times.map((time, index) => <TimeSector key={index}>{time}</TimeSector>)


    // const [activeMeetings, setActiveMeetings] = useState<number[]>([])
    const onClickMeetSector = (i: number) => {
        const findItem = activeMeetings.find((item, index) => item === i)
        console.log(findItem);
        if (findItem) {
            // setActiveMeetings(activeMeetings.filter(item => item !== i))
            dispatch(findMeeting(true))
            dispatch(setCurrentMeeting(i))
        } else {
            // setActiveMeetings([...activeMeetings, i])
            dispatch(setActiveMeetings(i))
            dispatch(findMeeting(false))
        }
    }

    for (let i = 1; i <= 91; i++) {
        meeting.push(<MeetSector key={i}>
                        <MeetSectorArea
                            onClick={() => onClickMeetSector(i)}
                            background={activeMeetings.find((item) => item === i) ? '#ebecff' : 'white'}>
                            {i}
                        </MeetSectorArea>
                    </MeetSector>)
    }

    useEffect(() => {

    }, [activeMeetings])

    console.log(activeMeetings);
    return (
        <StyledBody>
            <StyledTime>
                {timesMeeting}
            </StyledTime>
            <StyledMeet>
                {meeting}
            </StyledMeet>
        </StyledBody>
    );
};

export default Body;