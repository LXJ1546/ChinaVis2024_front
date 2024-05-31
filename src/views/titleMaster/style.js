import styled from 'styled-components'

export const TitleMasterWrapper = styled.div`
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
    .title-icon {
      font-size: 20px;
      margin-left: 4px;
      margin-right: 4px;
    }
  }
  .Titleview {
    flex: 1 1 0%;
    .titleMaster {
      height: 50%;
      width: 70%;
      position: absolute;
      top: 40px;
    }
    .subKnowledge {
      height: 50%;
      width: 40%;
      position: absolute;
      top: 40px;
      left: 65%;
    }
    .timeDistribution {
      height: 40%;
      width: 50%;
      position: absolute;
      top: 60%;
    }
    .memoryDistribution {
      height: 40%;
      width: 50%;
      position: absolute;
      top: 60%;
      left: 50%;
    }
  }
`
