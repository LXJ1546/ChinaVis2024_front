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
    background: #add8e6;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
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
        left: 70%;
        top: 6.5%;
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
