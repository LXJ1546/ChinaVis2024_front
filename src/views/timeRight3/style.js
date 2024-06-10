import styled from 'styled-components'

export const ActiveWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  .containerGroup {
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
      font-weight: bold;
      .title-icon {
        font-size: 23px;
        margin-left: 4px;
        margin-right: 4px;
      }
    }
    .active-content {
      flex: 1 1 0%;
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: column;
      .active-top {
        display: flex;
        width: 100%;
        height: 50%;
        .active-radar {
          width: 38%;
          height: 100%;
        }
        .active-title {
          width: 65%;
          height: 100%;
        }
      }
      .active-bottom {
        display: flex;
        width: 100%;
        flex: 1 1 0%;
        flex-direction: column;
        .active-btn {
          width: 100%;
          height: 35px;
        }
        .active-children {
          width: 100%;
          height: calc(100% - 40px);
          display: flex;
          .special1 {
            flex: 1;
            height: 100%;
          }
          .special2 {
            flex: 1;
            height: 100%;
          }
          .special3 {
            flex: 1;
            height: 100%;
          }
        }
      }
    }
  }
`
