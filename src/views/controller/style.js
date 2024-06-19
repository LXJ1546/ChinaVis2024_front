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
  .Controllerview {
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-left: 8px;
    padding-right: 8px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    background-color: rgb(245, 245, 245);
    .weight {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .initialize {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
    }
  }
`
