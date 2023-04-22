import styled , {css} from "styled-components";

export const StyledBody = styled.div`
  display: grid;
  grid-template: auto / 12.5%;
  grid-template-areas: 
          'time meeting';
`
export const StyledTime = styled.div`
  grid-area: time;
  height: auto;
  padding-top: 32px;
`
export const TimeSector = styled.div`
  padding-right: 5px;
  font-size: ${props => props.title || '1.5em'};
  color: #c0c0c0;
  font-weight: 600;
  display: flex;
  justify-content: end;
  height: 50px;
  background: white;
`
export const StyledMeet = styled.div`
  grid-area: meeting;
  height: auto;
  display: flex;
  flex-wrap: wrap;
`
type MeetSectorProps = {
    primary?: boolean,
    active?:boolean,
}
export const MeetSector = styled.div<MeetSectorProps>`
  display: flex;
  padding: 2px;
  border-bottom: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;
  color: ${props => props.color || '#000000FF'};
  height: 50px;
  width: ${100 / 7}%;
  ${props => props.primary && css`
    border-right: 1px solid #e6e6e6;
  `}
  ${props => props.active && css`
    border: 1px solid #ff3131;
  `}

`
type MeetSectorAreaProps = {
    background?: string
}
export const MeetSectorArea = styled.div<MeetSectorAreaProps>`
  border: 1px white;
  background: ${props => props.background || 'white'};
  width: 100%;
  cursor: pointer;

  &:hover {
    background: #b3b7ff;
  }
  &:active {
    background: #b3b7ff;
  }  
`