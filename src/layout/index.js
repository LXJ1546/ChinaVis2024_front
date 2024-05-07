import React, { memo } from 'react'
import { LayoutWrapper } from './style'
import HeaderBar from './header_bar/index'
import Content from './content/index'
const Layout = () => {
  return (
    <LayoutWrapper>
      <HeaderBar />
      <Content />
    </LayoutWrapper>
  )
}
export default memo(Layout)
