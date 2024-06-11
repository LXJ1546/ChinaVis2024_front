import styled from 'styled-components'

export const EvolutionWrapper = styled.div`
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
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .Evolutioncontent {
    flex: 1 1 0%;
    display: flex;
    width: 100%;
    height: 100%;
    .radioLine {
      position: absolute;
      top: 40px;
      left: 690px;
    }
    .radioRight {
      position: absolute;
      top: 40px;
      left: 793px;
    }
    .selectWork {
      position: absolute;
      left: 920px;
    }
  }
`
