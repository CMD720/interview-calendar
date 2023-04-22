import styled, {createGlobalStyle} from "styled-components";


export const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Corbel Light, sans-serif;
  }
`

export const Wrapper = styled.section`
  padding: 2em;
  background: #ebebeb;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const CalendarBody = styled.section`
  background: white;
  height: 100%;
  width: 100%;
  max-width: 740px;
`

