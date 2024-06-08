import React, { memo } from 'react'
import { HeaderBarWrapper } from './style'
const HeaderBar = () => {
  return (
    <HeaderBarWrapper>
      <div className="title">ETDVis：时序多变量教育数据可视分析系统</div>
    </HeaderBarWrapper>
  )
}
export default memo(HeaderBar)
