import styled from 'styled-components'

export const CotrollerWrapper = styled.div`
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
  .Controllerview {
    height: calc(100% - 44px);
    .selectData {
      width: 48%;
      position: absolute;
      top: 25%;
      left: 1.5%;
    }
    .weightInput {
      width: 24%;
      position: absolute;
      top: 12%;
    }
    .initialize {
      height: 30px;
      width: 48%;
      position: absolute;
      top: 25%;
      left: 51%;
    }
  }
`
