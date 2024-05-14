import React, { memo } from 'react'
import { ContentWrapper } from './style'
import Template from '../../views/template/index'
const Content = () => {
  return (
    <ContentWrapper>
      <div className="container">
        <Template />
      </div>
    </ContentWrapper>
  )
}
export default memo(Content)
