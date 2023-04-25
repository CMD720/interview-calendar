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
  @media ${props => props.theme.media.phone} {
    padding-top: 34px;
  }
`
export const TimeSector = styled.div<meetSectorProps>`
  padding-right: 5px;
  font-size: ${props => props.title || props.theme.fontSize.md};
  color: #c0c0c0;
  font-weight: 600;
  display: flex;
  justify-content: end;
  height: 50px;
  background: white;
  
  @media ${props => props.theme.media.phone} {
    font-size: ${props => props.theme.fontSize.sm};
    height: 48px;
  }
`
export const StyledMeet = styled.div`
  grid-area: meeting;
  height: auto;
  display: flex;
  flex-wrap: wrap;
`
export type meetSectorProps = {
    color?: string;
}
export const MeetSector = styled.div <meetSectorProps>`
  display: flex;
  padding: 2px;
  border-bottom: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;
  color: ${props => props.color || props.theme.colors.fontColor};
  height: 50px;
  width: ${100 / 7}%;
  
  @media ${props => props.theme.media.phone} {
    font-size: ${props => props.theme.fontSize.sm};
    height: 48px;
  }
`
type MeetSectorAreaProps = {
    background?: string
}
export const MeetSectorArea = styled.div<MeetSectorAreaProps>`
  border: 1px white;
  background: ${props => props.background || props.theme.background.backgroundWhite};
  width: 100%;
  cursor: pointer;

  &:hover {
    background: #b3b7ff;
  }
  &:active {
    background: #b3b7ff;
  }  
`