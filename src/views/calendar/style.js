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
    .title-icon {
      font-size: 20px;
      margin-left: 4px;
      margin-right: 4px;
    }
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
      .orderSelectview {
        position: absolute;
        left: 60%;
        top: 7%;
      }
      .answerDetailview {
        position: absolute;
        height: 100%;
        width: 50%;
        left: 50%;
      }
    }
  }
`
