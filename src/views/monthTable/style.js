import styled from 'styled-components'

export const MonthTableWrapper = styled.div`
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
    .table {
      width: 65%;
      height: 100%;
      position: relative;
      .atable {
        width: 100%;
        height: 100%;
        position: absolute;
        overflow: auto;
        white-space: nowrap;
      }
    }
    .correlation {
      width: 35%;
      height: 100%;
    }
  }
`
