import styled from 'styled-components'

export const KnowledgeWrapper = styled.div`
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
  .Knowledgeview {
    flex: 1 1 0%;
    .knowledge {
      height: 30%;
      width: 60%;
      position: absolute;
      top: 40px;
    }
    .subKnowledge {
      height: 30%;
      width: 40%;
      position: absolute;
      top: 40px;
      left: 60%;
    }
    .titlescore {
      height: calc(50% - 40px);
      width: 100%;
      position: absolute;
      top: calc(30% + 40px);
    }
    // .titlescore {
    //     height: 30%;
    //     width: 60%;
    //     position: absolute;
    //     top: calc(30% + 30px);
    //   }
    // .titleKnowledge {
    //   height: 30%;
    //   width: 40%;
    //   position: absolute;
    //   top: calc(30% + 30px);
    //   left: 60%;
    // }
  }
`
