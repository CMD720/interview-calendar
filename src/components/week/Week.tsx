import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {getMonthYear, getWeek, getWeekDays} from "./GetWeek";
import {FontSize, SectorProps} from "./type";
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
  font-size: ${props => props.fontSize || '1.8em'};
  font-weight: bolder;
  padding: 10px;
`
type StyledSectorAreaProps = {
    background?: string
}
//TODO StyledSectorArea расширить StyledSector
const StyledSectorArea = styled.div<StyledSectorAreaProps>`
  display: flex;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${props => props.background || '#f6f6f6'};
  color: ${props => props.color || 'black'};
  border-radius: 50%;
  //cursor: pointer;

  //&:hover {
  //  background: #fd8a8a;
  //  color: white;
  //}
`
const Block = styled.div`
  grid-area: block;
  width: auto;
  height: auto;
`
const Week = () => {
    const dispatch = useDispatch()
    const {activeMeetings, meetingsWeek} = useAppSelector(calendarSelector)

    const {firstWeekday, lastWeekday} = useAppSelector(momentSelector)
    // const [firstWeekday, setFirstWeekday] = useState<Moment>(moment().startOf('isoWeek'))
    // const [lastWeekday, setLastWeekday] = useState<Moment>(moment().endOf('isoWeek'))

    const [week, setWeek] = useState<number[]>([])
    const [isMount, setIsMount] = useState(true)

    const days = getWeekDays()
    const {month, year, today, currentWeek, presentWeek} = getMonthYear({firstWeekday})

    // console.log('firstWeekday',firstWeekday);
    // console.log('lastWeekday',lastWeekday);

    const temp: TMeetingsWeek = {
        year: year,
        month: month,
        weekNumber: currentWeek,
        dataMeetings: activeMeetings,
    }
    // console.log('temp',temp);

    const onClickPreviousWeek = () => {
        if (activeMeetings.length !== 0) {
            dispatch(addMeetingsWeek(temp))
            dispatch(clearActiveMeetings())
        }
        // setFirstWeekday(firstWeekday.startOf('isoWeek').subtract(1, 'week'))
        // setLastWeekday(lastWeekday.endOf('isoWeek').subtract(1, 'week'))

        //работает но! ошибка в кансоли : non-serializable value was detected in the state, in the path: `moment.firstWeekday`. Value: M
        //пока не понятно...
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
        // setFirstWeekday(firstWeekday.startOf('isoWeek').add(1, 'week'))
        // setLastWeekday(lastWeekday.endOf('isoWeek').add(1, 'week'))

        //работает но! ошибка в консоли : non-serializable value was detected in the state, in the path: `moment.firstWeekday`. Value: M
        //пока не понятно...
        const startEnd = {
            firstWeekday:firstWeekday.startOf('isoWeek').add(1, 'week'),
            lastWeekday:lastWeekday.endOf('isoWeek').add(1, 'week'),
        }
        dispatch(currentMoment(startEnd))
        dispatch(findMeeting(false))
        setWeek(getWeek({firstWeekday, lastWeekday}))
    }

    // console.log('WEEK',week);
    // console.log('today',today);
    // console.log('presentWeek',presentWeek);
    // console.log('currentWeek',currentWeek);
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
        <StyledWeek>
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