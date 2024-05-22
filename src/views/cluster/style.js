import styled from 'styled-components'

export const ScatterWrapper = styled.div`
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
  .content {
    flex: 1 1 0%;
    display: flex;
    .left {
      width: 100%;
      display: flex;
      flex-direction: column;
      .btn {
        display: flex;
        margin-left: 3%;
        margin-bottom: 1px;
        .monthbtn {
          display: flex;
        }
        .to {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 5px;
        }
      }
      .clusterView {
        flex: 1 1 0%;
      }
    }
    /* .right {
      width: 35%;
      display: flex;
      flex-direction: column;
      .feature {
        width: 100%;
        height: 64%;
      }
      .correlation {
        width: 100%;
        height: 36%;
      }
    } */
  }
`
