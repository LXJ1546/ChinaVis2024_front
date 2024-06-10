import styled from 'styled-components'

export const HeaderBarWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: white;
  border-bottom: 1px solid rgb(239, 239, 245, 1);
  .title {
    font-weight: 900;
    font-size: 25px;
    flex-shrink: 0;
    opacity: 0.7;
  }
`
