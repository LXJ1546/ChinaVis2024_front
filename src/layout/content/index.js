import React, { memo } from 'react'
import { useState } from 'react'
import { ContentWrapper } from './style'
import { Card } from 'antd'
import Picture from '../../views/picture'
import Controller from '../../views/controller'
import Scatter from '@/views/cluster'
import Correlation from '../../views/correlation'
import TitleMaster from '../../views/titleMaster'
import KnowledgeIcicle from '../../views/knowledgeNew'
import Calendar from '../../views/calendar'
import StudentCommit from '../../views/studentCommit'
const Content = () => {
  const [amode, setAmode] = useState(0) //模式0代表答题模式，1代表时间模式
  const [month, setMonth] = useState(10) //9,10,11,12,1
  const [classNum, setClassNum] = useState('all') //选中的数据集（所有数据集或某个班级）
  function handleClassNum(classnum) {
    setClassNum(classnum)
  }
  // 定义新函数，用于更新模式状态
  const handleMode = (value) => {
    setAmode(value)
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
            <Controller handleClassNum={handleClassNum} />
          </Card>
          <Card className="card2">
            <Picture classNum={classNum} />
          </Card>
          <Card className="card3">
            <TitleMaster classNum={classNum} />
          </Card>
          <Card className="card4">
            {/* <Knowledge classNum={classNum} /> */}
            <KnowledgeIcicle classNum={classNum} />
          </Card>
          {/* <Card className="card3">
            <TitleMaster classNum={classNum} />
          </Card> */}
          {/* <Card className="card4"></Card> */}
        </div>
        <div className="middle">
          <Card className="card5">
            <Scatter changeMode={handleMode} changeMonth={handleMonth} />
          </Card>
          <Card className="card6"></Card>
        </div>
        <div className="right">
          <Card className="card7">
            <Correlation amode={amode} month={month} />
          </Card>
          <Card className="card8">
            <Calendar amode={amode} month={month} />
          </Card>
          <Card className="card9">
            <StudentCommit amode={amode} month={month} />
          </Card>
        </div>
      </div>
    </ContentWrapper>
  )
}
export default memo(Content)
