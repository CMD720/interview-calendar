import React, {useEffect, useState} from 'react';
import styled, {css} from "styled-components";
import moment, {Moment} from "moment/moment";
import {getMonthYear, getWeek, getWeekDays} from "../week/GetWeek";
import {MeetSector, MeetSectorArea, StyledBody, StyledMeet, StyledTime, TimeSector} from "./styles";
import {useAppDispatch, useAppSelector} from "../../redux/storeHook";
import {findMeeting, setActiveMeetings, setCurrentMeeting, updActiveMeeting} from "../../redux/Calendar/slice";
import {useSelector} from "react-redux";
import {calendarSelector} from "../../redux/Calendar/selectors";


const Body = () => {
    const dispatch = useAppDispatch()
    const {activeMeetings, meetingsWeek} = useAppSelector(calendarSelector)
    ////////////////
    const firstWeekday = moment().startOf('isoWeek')
    const lastWeekday = moment().endOf('isoWeek')
    const {month, year, today, currentWeek} = getMonthYear({firstWeekday})
    const days = getWeek({firstWeekday, lastWeekday})
    const index = days.findIndex(i => i === today) + 1
    // console.log(today);
    // console.log(days);
    // console.log(index);
    ///////////////

    const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']
    const meeting: JSX.Element[] = []
    const timesMeeting = times.map((time, index) => <TimeSector key={index}>{time}</TimeSector>)


    const onClickMeetSector = (i: number, event: React.MouseEvent<HTMLDivElement>) => {
        const findItem = activeMeetings.find((item, index) => item === i)
        if (findItem) {
            dispatch(setCurrentMeeting(i))
            dispatch(findMeeting(true))
        } else {
            dispatch(findMeeting(false))
            if (event.ctrlKey) {
                dispatch(setActiveMeetings(i))
                dispatch(findMeeting(false))
            }
        }
    }
    const onDblClickMeetSector = (i: number) => {
        const findItem = activeMeetings.find((item, index) => item === i)
        if (findItem) {
            dispatch(setCurrentMeeting(i))
            dispatch(findMeeting(true))
        } else {
            dispatch(setActiveMeetings(i))
            dispatch(findMeeting(false))
        }
    }

    for (let i = 1; i <= 91; i++) {
        meeting.push(<MeetSector key={i}>
            <MeetSectorArea
                onDoubleClick={() => onDblClickMeetSector(i)}
                onClick={(event) => onClickMeetSector(i, event)}
                background={activeMeetings.find((item) => item === i) ? '#ebecff' : 'white'}>
                {i}
            </MeetSectorArea>
        </MeetSector>)
    }


    // console.log(activeMeetings);
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