import React from 'react';
import styled from "styled-components";
import Flex from "../Flex";
import Button from "../Button";
import {useAppDispatch, useAppSelector} from "../../redux/storeHook";
import {calendarSelector} from "../../redux/Calendar/selectors";
import {
    addMeetingsWeek,
    clearActiveMeetings,
    deleteMeeting,
    findMeeting,
    TMeetingsWeek
} from "../../redux/Calendar/slice";
import {momentSelector} from "../../redux/Moment/selectors";
import {presentMoment} from "../../redux/Moment/slice";
import {getMonthYear} from "../week/GetWeek";


const StyledFooter = styled.div`
  background: ${props => props.theme.background.backgroundGrey};
  padding: 20px 40px;
  color: ${props => props.theme.colors.primary};
  border-top: solid 1px ${props => props.theme.colors.borderColor};

  @media ${props => props.theme.media.phone} {
    padding: 15px 30px;
  }
`

type FooterProps = {

}
const Footer = (props: FooterProps) => {
    const dispatch = useAppDispatch()
    const {viewMeeting, currentMeeting} = useAppSelector(calendarSelector)
    const {activeMeetings} = useAppSelector(calendarSelector)
    const {firstWeekday} = useAppSelector(momentSelector)
    const {month, year, currentWeek} = getMonthYear({firstWeekday})

    const temp: TMeetingsWeek = {
        year: year,
        month: month,
        weekNumber: currentWeek,
        dataMeetings: activeMeetings,
    }

    const display = viewMeeting ? 'block' : 'none'

    const onClickDelete = () => {
        if (window.confirm("Are you sure, you want to remove?")) {
            dispatch(deleteMeeting(currentMeeting))
            dispatch(findMeeting(false))
        }
    }
    const onClickToday = () => {
        dispatch(addMeetingsWeek(temp))
        dispatch(presentMoment())
        dispatch(findMeeting(false))
        dispatch(clearActiveMeetings())
    }
    return (
        <StyledFooter {...props}>
            <Flex justify={'space-between'}>
                <Button onClick={() => onClickToday()} minimal>
                    Today
                </Button>
                <Button onClick={() => onClickDelete()} minimal display={display}>
                    Delete
                </Button>
            </Flex>
        </StyledFooter>
    );
};
export default Footer;