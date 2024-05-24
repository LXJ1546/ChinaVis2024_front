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
    margin-bottom: 0px;
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
        justify-content: space-between;
        margin-bottom: 1px;
        width: 100%;
        height: 60px;
        background-color: rgb(245, 245, 245);
        align-items: center;
        .leftbtn {
          display: flex;
          align-items: center;
          .label {
            opacity: 0.8;
            margin-left: 10px;
            font-size: 15px;
          }
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
        .rightbtn {
          display: flex;
          margin-right: 10px;
          align-items: center;
          .label {
            opacity: 0.8;
            margin-left: 10px;
            font-size: 15px;
          }
        }
      }
      .clusterView {
        flex: 1 1 0%;
      }
    }
  }
`
