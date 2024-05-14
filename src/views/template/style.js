import styled from 'styled-components'

export const TemplateWrapper = styled.div`
  padding: 4px;
  width: 100%;
  height: 100%;
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
    height: calc(100% - 44px);
    align-items: center;
    justify-content: center;
  }
`
