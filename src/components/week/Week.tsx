import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {getMonthYear, getWeek, getWeekDays} from "./GetWeek";
import {FontSize, SectorProps, StyledSectorAreaProps} from "./type";
import Title from "../Title";
import moment, {Moment} from "moment/moment";
import Flex from "../Flex";
import Button from "../Button";
import {
    addMeetingsWeek,
    clearActiveMeetings,
    findMeeting,
    TMeetingsWeek,
    updActiveMeeting
} from "../../redux/Calendar/slice";
import {useAppSelector} from "../../redux/storeHook";
import {calendarSelector} from "../../redux/Calendar/selectors";
import {useDispatch} from "react-redux";
import {momentSelector} from "../../redux/Moment/selectors";
import {currentMoment} from "../../redux/Moment/slice";

const StyledWeek = styled.div`
  display: grid;
  grid-template: auto / 12.5%;
  grid-template-areas: 
          'sidebar block';

  background: #f6f6f6;
  border-bottom: solid 1px #ebebeb;
  border-top: solid 1px #ebebeb;
`


const StyledSector = styled.div<SectorProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: ${props => props.fontSize || props.theme.fontSize.mdP};
  font-weight: bolder;
  padding: 10px;
  @media ${props => props.theme.media.phone} {
    font-size: ${props => props.fontSize || props.theme.fontSize.sm || "0.8em" };
    padding: 5px;
  }
`

const StyledSectorArea = styled.div<StyledSectorAreaProps>`
  display: flex;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${props => props.background || props.theme.background.backgroundGrey};
  color: ${props => props.color || props.theme.colors.fontColors};
  border-radius: 50%;
  
  @media ${props => props.theme.media.phone} {
    width: 30px;
    height: 30px;
  }
  
`
const Block = styled.div`
  grid-area: block;
  width: auto;
  height: auto;
`
const Week = (props:StyledSectorAreaProps) => {
    const dispatch = useDispatch()
    const {activeMeetings} = useAppSelector(calendarSelector)

    const {firstWeekday, lastWeekday} = useAppSelector(momentSelector)
    const [week, setWeek] = useState<number[]>([])
    const [isMount, setIsMount] = useState(true)

    const days = getWeekDays()
    const {month, year, today, currentWeek, presentWeek} = getMonthYear({firstWeekday})

    const temp: TMeetingsWeek = {
        year: year,
        month: month,
        weekNumber: currentWeek,
        dataMeetings: activeMeetings,
    }

    const onClickPreviousWeek = () => {
        if (activeMeetings.length !== 0) {
            dispatch(addMeetingsWeek(temp))
            dispatch(clearActiveMeetings())
        }

        //TODO ! ошибка в кансоли : non-serializable value was detected in the state, in the path: `moment.firstWeekday`. Value: M
        const startEnd = {
            firstWeekday:firstWeekday.startOf('isoWeek').subtract(1, 'week'),
            lastWeekday:lastWeekday.endOf('isoWeek').subtract(1, 'week'),
        }
        dispatch(currentMoment(startEnd))
        dispatch(findMeeting(false))
        setWeek(getWeek({firstWeekday, lastWeekday}))
    }
    const onClickNextWeek = () => {
        if (activeMeetings.length !== 0) {
            dispatch(addMeetingsWeek(temp))
            dispatch(clearActiveMeetings())
        }

        //TODO ! ошибка в консоли : non-serializable value was detected in the state, in the path: `moment.firstWeekday`. Value: M
        const startEnd = {
            firstWeekday:firstWeekday.startOf('isoWeek').add(1, 'week'),
            lastWeekday:lastWeekday.endOf('isoWeek').add(1, 'week'),
        }
        dispatch(currentMoment(startEnd))
        dispatch(findMeeting(false))
        setWeek(getWeek({firstWeekday, lastWeekday}))
    }

    const daysWeek = days.map((day, i) => <StyledSector key={i} fontSize={FontSize.sm}>{day}</StyledSector>)
    const dateWeek = week.map((date, i) => <StyledSector key={i}>
        <StyledSectorArea
            background={today === date && presentWeek === currentWeek ? '#ff3131' : ''}
            color={today === date && presentWeek === currentWeek ? 'white' : ''}>
            {date}
        </StyledSectorArea></StyledSector>)


    useEffect(() => {
        if (isMount) {
            setWeek(getWeek({firstWeekday, lastWeekday}))
        }
        setIsMount(false)
    }, []);
    useEffect(() => {
        dispatch(updActiveMeeting(temp))
        setWeek(getWeek({firstWeekday, lastWeekday}))
    }, [currentWeek , firstWeekday]);

    return (
        <StyledWeek {...props}>
            <Block>
                <Flex>
                    {daysWeek}
                </Flex>
                <Flex>
                    {dateWeek}
                </Flex>
                <Flex justify={'space-around'}>
                    <Button minimal onClick={() => onClickPreviousWeek()}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg" fill="#ff3131" width="35px" height="35px"
                            viewBox="0 0 24 24">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                        </svg>
                    </Button>
                    <Title title={FontSize.md}>
                        {month} - {year}
                    </Title>
                    <Button minimal onClick={() => onClickNextWeek()}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg" fill="#ff3131" width="35px" height="35px"
                            viewBox="0 0 24 24">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                        </svg>
                    </Button>
                </Flex>
            </Block>
        </StyledWeek>
    );
};

export default Week;