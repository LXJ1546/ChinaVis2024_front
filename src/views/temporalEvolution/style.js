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
  }
  .Evolutioncontent {
    flex: 1 1 0%;
    display: flex;
    width: 100%;
    height: 100%;
    .radioLine {
      position: absolute;
      top: 40px;
      left: 700px;
    }
    .radioRight {
      position: absolute;
      top: 40px;
      left: 800px;
    }
    .selectWork {
      position: absolute;
      left: 930px;
    }
  }
`
