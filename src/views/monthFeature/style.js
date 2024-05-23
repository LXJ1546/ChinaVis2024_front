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
    margin-bottom: 6px;
    font-size: 16px;
    opacity: 0.8;
  }
  .content {
    flex: 1 1 0%;
    display: flex;
    .view {
      width: 55%;
      height: 100%;
    }
    .table {
      width: 45%;
      height: 100%;
    }
  }
`
