import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Title from "../Title";
import {FontSize} from "../week/type";
import Flex from "../Flex";
import Button from "../Button";
import {useAppDispatch, useAppSelector} from "../../redux/storeHook";
import {calendarSelector} from "../../redux/Calendar/selectors";
import {deleteMeeting, findMeeting} from "../../redux/Calendar/slice";


const StyledFooter = styled.div`
  background: #f6f6f6;
  padding: 20px 40px;
  color: #ff3131;
  border-top: solid 1px #ebebeb;
`

type FooterProps = {}
const Footer = (props: FooterProps) => {
    const dispatch = useAppDispatch()
    const {viewMeeting,currentMeeting} = useAppSelector(calendarSelector)

    const display = viewMeeting ? 'block' : 'none'

    const onClickDelete = () => {
        if (window.confirm("Are you sure, you want to remove?")) {
            dispatch(deleteMeeting(currentMeeting))
            dispatch(findMeeting(false))
        }
    }

    useEffect(()=>{

    },[])
    // console.log(viewMeeting);

    return (
        <StyledFooter {...props}>
            <Flex justify={'space-between'}>
                <Button minimal>
                    Today
                </Button>
                <Button onClick={()=>onClickDelete()} minimal display={display}>
                    Delete
                </Button>
            </Flex>
        </StyledFooter>
    );
};

export default Footer;