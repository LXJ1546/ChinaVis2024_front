import React, { memo } from 'react'
import { useState } from 'react'
import { ContentWrapper } from './style'
import { Card } from 'antd'
import Template from '../../views/template/index'
// import Picture from '../../views/picture'
import Controller from '../../views/controller'
import Knowledge from '../../views/knowledge'
import Scatter from '@/views/cluster'
const Content = () => {
  function handleClassNum(classnum) {
    setClassNum(classnum)
  }
  const [classNum, setClassNum] = useState(null) //选中的数据集（所有数据集或某个班级）
  return (
    <ContentWrapper>
      <div className="container">
        <div className="left">
          <Card className="card1">
            <Controller handleClassNum={handleClassNum} />
          </Card>
          <Card className="card2">{/* <Picture /> */}</Card>
          <Card className="card3">
            <Knowledge classNum={classNum} />
          </Card>
        </div>
        <div className="middle">
          <Card className="card4">
            <Scatter />
          </Card>
          <Card className="card5"></Card>
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
