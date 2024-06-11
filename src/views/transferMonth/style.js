import styled from 'styled-components'

export const TransferMonthWrapper = styled.div`
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
      display: flex;
      align-items: center;
      justify-content: center;
    }
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
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: rgb(245, 245, 245);
        .info {
          width: 128px;
          font-size: 14px;
          opacity: 0.8;
          text-align: center;
        }
      }
      .monthlegend {
        height: 15px;
        width: 100%;
      }
      .underview {
        width: 100%;
        height: calc(100% - 40px);
        position: relative;
        .echartview {
          width: 100%;
          height: 22%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          .echartbox {
            width: 128px;
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
        height: 50%;
      }
      .compare {
        width: 100%;
        height: 50%;
      }
    }
  }
`
