import React, { memo } from 'react'
import { HeaderBarWrapper } from './style'
const HeaderBar = () => {
  return (
    <HeaderBarWrapper>
      <h2>ETDVis：时序多变量教育数据可视分析系统</h2>
    </HeaderBarWrapper>
  )
}
export default memo(HeaderBar)
