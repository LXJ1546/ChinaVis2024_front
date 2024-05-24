import styled from 'styled-components'

export const MonthFeature1Wrapper = styled.div`
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
    .view {
      width: 0%;
      height: 100%;
      position: relative;
      .leftbar {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: rgb(245, 245, 245);
        padding-left: 80px;
        padding-right: 80px;
        .info {
          font-size: 15px;
          opacity: 0.8;
        }
      }
      .asvg {
        width: 100%;
        height: calc(100% - 40px);
        position: absolute;
        overflow: auto;
        display: flex;
      }
    }
    .table {
      width: 65%;
      height: 100%;
      position: relative;
      .atable {
        width: 100%;
        height: calc(100% - 40px);
        position: absolute;
        overflow: auto;
      }
      .rightbar {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: rgb(245, 245, 245);
        padding-left: 8px;
        padding-right: 8px;
        .num {
          display: flex;
          .info {
            font-size: 15px;
            opacity: 0.8;
            width: 130px;
          }
        }
      }
    }
  }
`
