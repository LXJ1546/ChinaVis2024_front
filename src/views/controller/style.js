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
    font-size: 16px;
    opacity: 0.8;
    .title-icon {
      font-size: 20px;
      margin-left: 4px;
      margin-right: 4px;
    }
  }
  .Controllerview {
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
    padding-top: 6px;
    padding-left: 8px;
    padding-right: 8px;
    background-color: rgb(245, 245, 245);
    /* .selectData {
      width: 48%;
      position: absolute;
      top: calc(40% + 30px);
      left: 1.5%;
    } */
    /* .weight {
      width: 24%;
      position: absolute;
      top: calc(5% + 30px);
    } */
    /* .initialize {
      height: 30px;
      width: 48%;
      position: absolute;
      top: calc(40% + 30px);
      left: 51%;
    } */
    .weight {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .initialize {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 6px;
    }
  }
`
