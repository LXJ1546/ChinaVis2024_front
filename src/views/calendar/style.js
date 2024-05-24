import styled from 'styled-components'

export const CalendarWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .title {
    height: 30px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #9b9ca0;
    margin-bottom: 6px;
    font-size: 16px;
    opacity: 0.8;
  }
  .calendarHighview {
    flex: 1 1 0%;
    .calendarview {
      width: 100%;
      height: 100%;
      overflow: auto;
    }
    .answerSessionview {
      width: 100%;
      height: 100%;
    }
  }
`
