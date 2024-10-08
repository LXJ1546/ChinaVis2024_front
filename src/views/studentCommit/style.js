import styled from 'styled-components'

export const StudentCommitWrapper = styled.div`
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
    background: rgb(245, 245, 245);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    font-weight: bold;
    .title-icon {
      font-size: 20px;
      margin-left: 4px;
      margin-right: 4px;
    }
  }
  .Studentview {
    flex: 1 1 0%;
    width: 100%;
    height: 100%;
    .StudentCommitview {
      width: 100%;
      height: 100%;
      .commitchart {
        width: 99%;
        height: 28%;
        position: absolute;
        top: 15%;
      }
      .commitsvg {
        overflow: auto;
        position: absolute;
        top: 45%;
        width: 99%;
        height: 55%;
      }
      .legendsvg {
        position: absolute;
        top: 30px;
        width: 99%;
        height: 10%;
      }
    }
  }
`
