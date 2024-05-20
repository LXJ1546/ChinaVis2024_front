import styled from 'styled-components'

export const ContentWrapper = styled.div`
  width: 100%;
  flex: 1 1 0%;
  height: 100%;
  background-color: rgba(245, 246, 251);
  .container {
    height: 100%;
    display: flex;
    border-color: rgb(239, 239, 245);
    .left {
      width: 23%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .card1 {
        height: 9%;
        margin: 3px;
        border-radius: 4px;
        .ant-card-body {
          width: 100%;
          height: 100%;
          display: flex;
          padding: 0px;
        }
      }
      .card2 {
        height: 13%;
        margin: 0px 3px 3px 3px;
        border-radius: 4px;
        .ant-card-body {
          width: 100%;
          height: 100%;
          display: flex;
          padding: 0px;
        }
      }
      .card3 {
        height: 27.5%;
        margin: 0px 3px 3px 3px;
        border-radius: 4px;
        .ant-card-body {
          width: 100%;
          height: 100%;
          display: flex;
          padding: 0px;
        }
      }
      .card4 {
        height: 50%;
        margin: 0px 3px 3px 3px;
        border-radius: 4px;
        .ant-card-body {
          width: 100%;
          height: 100%;
          display: flex;
          padding: 0px;
        }
      }
    }
    .middle {
      width: 42%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .card4 {
        height: 50%;
        margin: 3px 3px 3px 0px;
        border-radius: 4px;
        .ant-card-body {
          width: 100%;
          height: 100%;
          display: flex;
          padding: 0px;
        }
      }
      .card5 {
        height: 50%;
        margin: 0px 3px 3px 0px;
        border-radius: 4px;
        .ant-card-body {
          width: 100%;
          height: 100%;
          display: flex;
          padding: 0px;
        }
      }
    }
    .right {
      width: 35%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .card6 {
        height: 50%;
        margin: 3px 3px 3px 0px;
        border-radius: 4px;
        .ant-card-body {
          width: 100%;
          height: 100%;
          display: flex;
          padding: 0px;
        }
      }
      .card7 {
        height: 50%;
        margin: 0px 3px 3px 0px;
        border-radius: 4px;
        .ant-card-body {
          width: 100%;
          height: 100%;
          display: flex;
          padding: 0px;
        }
      }
    }
  }
`
