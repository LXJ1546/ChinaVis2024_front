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
    .weightInput{
        width:24%;
        position: relative;
        top: 50%;
    }
    .initialize{
        height: 30px;
        width: 95%;
        position: relative;
        top: 75%;
        left: 2.5%;
    }
  }

`
