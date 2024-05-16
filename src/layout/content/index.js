import React, { memo } from 'react'
import { ContentWrapper } from './style'
import { Card } from 'antd'
import Template from '../../views/template/index'
import Ranking from '../../views/ranking'
import Controller from '../../views/controller'
const Content = () => {
  return (
    <ContentWrapper>
      <div className="container">
        <div className="left">
          <Card className="card1">
            <Controller/>
          </Card>
          <Card className="card2"></Card>
          <Card className="card3">
            <Ranking />
          </Card>
        </div>
        <div className="middle">
          <Card className="card4">
            <Template />
          </Card>
          <Card className="card5">
            <Template />
          </Card>
        </div>
        <div className="right">
          <Card className="card6">
            <Template />
          </Card>
          <Card className="card7">
            <Template />
          </Card>
        </div>
      </div>
    </ContentWrapper>
  )
}
export default memo(Content)
