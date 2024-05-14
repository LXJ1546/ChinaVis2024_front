import styled from 'styled-components'

export const TemplateWrapper = styled.div`
  .card {
    width: 30%;
    min-width: 600px;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.12);
    .ant-card-body {
      padding: 0px 10px 10px 10px;
    }
    .title {
      height: 30px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #9b9ca0;
      margin-bottom: 6px;
      font-size: 16px;
      opacity: 0.8;
    }
    .view {
      width: 100%;
      height: 300px;
    }
  }
`
