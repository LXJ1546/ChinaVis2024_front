import styled from 'styled-components'

export const CorrelationWrapper = styled.div`
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
      font-size: 22px;
      margin-left: 4px;
      margin-right: 4px;
    }
  }
  .content {
    flex: 1 1 0%;
    display: flex;
    width: 100%;
    height: 100%;
    .table {
      width: 65%;
      height: 100%;
      position: relative;
      .atable {
        width: 100%;
        height: calc(100% - 30px);
        position: absolute;
        overflow: auto;
        white-space: nowrap;
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
        .littlebtn {
          display: flex;
          align-items: center;
        }
      }
    }
    .correlation {
      width: 35%;
      height: 100%;
    }
  }
`
