import React, { memo } from 'react'
import { useState } from 'react'
import { ContentWrapper } from './style'
import { Card } from 'antd'
import Template from '../../views/template/index'
// import Picture from '../../views/picture'
import Controller from '../../views/controller'
import Knowledge from '../../views/knowledge'
import Scatter from '@/views/cluster'
import Answer from '../../views/answer'
const Content = () => {
  const [mode, setMode] = useState(0) //模式0代表答题模式，1代表时间模式
  const [month, setMonth] = useState(10) //模式0代表答题模式，1代表时间模式
  const [classNum, setClassNum] = useState('all') //选中的数据集（所有数据集或某个班级）
  function handleClassNum(classnum) {
    setClassNum(classnum)
  }
  // 定义新函数，用于更新模式状态
  const handleMode = (value) => {
    setMode(value)
  }
  // 定义新函数，用于更新月份状态
  const handleMonth = (value) => {
    setMonth(value)
  }
  return (
    <ContentWrapper>
      <div className="container">
        <div className="left">
          <Card className="card1">
            <Controller classNum={classNum} handleClassNum={handleClassNum} />
          </Card>
          <Card className="card2">{/* <Picture /> */}</Card>
          <Card className="card3">
            <Knowledge classNum={classNum} />
          </Card>
        </div>
        <div className="middle">
          <Card className="card4">
            <Scatter changeMode={handleMode} changeMonth={handleMonth} />
          </Card>
          <Card className="card5"></Card>
        </div>
        <div className="right">
          <Card className="card6">
            <Answer mode={mode} month={month} />
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
