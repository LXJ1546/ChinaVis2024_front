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
  }
  .Studentview {
    flex: 1 1 0%;
    width: 100%;
    height: 100%;
    .StudentCommitview {
      width: 100%;
      height: 100%;
      overflow: auto;
      .commitchart {
        width: 99%;
        height: 30%;
      }
    }
  }
`
