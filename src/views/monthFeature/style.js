import styled from 'styled-components'

export const MonthFeatureWrapper = styled.div`
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
  }
  .content {
    flex: 1 1 0%;
    display: flex;
    width: 100%;
    height: 100%;
    .leftview {
      width: 55%;
      height: 100%;
      .leftbar {
        height: 30px;
        display: flex;
        align-items: center;
        background-color: rgb(245, 245, 245);
        .info {
          width: 25%;
          width: 100%;
          font-size: 15px;
          opacity: 0.8;
          text-align: center;
        }
      }
      .underview {
        width: 100%;
        height: calc(100% - 30px);
        position: relative;
        .echartview {
          width: 100%;
          height: 22%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          .echartbox {
            width: 23%;
            height: 85%;
            border: 1px solid rgb(220, 220, 220);
          }
        }
        .asvg {
          width: 100%;
          height: 78%;
          position: absolute;
          overflow: auto;
          display: flex;
        }
      }
    }
    .rightview {
      width: 45%;
      height: 100%;
      .individual {
        width: 100%;
        height: 45%;
      }
      .compare {
        width: 100%;
        height: 55%;
      }
    }
  }
`
