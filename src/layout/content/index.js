import React, { memo, useEffect } from 'react'
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
import MonthFeature from '../../views/monthFeature/index'
import TimeRight3 from '../../views/timeRight3'
import Evolution from '../../views/temporalEvolution/index'
const Content = () => {
  const [amode, setAmode] = useState(0) //模式0代表答题模式，1代表时间模式
  const [month, setMonth] = useState(10) //9,10,11,12,1
  const [classNum, setClassNum] = useState('all') //选中的数据集（所有数据集或某个班级）
  const [brushSelectedData, setBrushSelectedData] = useState([])
  const [calendarSelectFlag, setCalendarSelectFlag] = useState(false) //判断学习日历中是否有人被选中
  const [studentIDfromCalendar, setStudentIDfromCalendar] = useState(null) //提交事件获取学习日历中选中的学生ID
  const [studentDatefromCalendar, setSudentDatefromCalendar] = useState(null) //提交事件获取学习日历中选中的日期
  const [selectedRowKeys, setSelectedRowKeys] = useState([]) // 表格选择数据的数组
  const [calendarFlag, setCalendarFlag] = useState(false) //用于表示表格中是否确认生成日历
  // 平行坐标系的数据
  const [parallelList, setParallelList] = useState([[], [], []])
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
  // 定义新函数，用于更新刷选的数据
  const handleBrushSelectedData = (value) => {
    setBrushSelectedData(value)
  }
  //定义新函数,用于更新是否选择了学习日历中的某个学生
  const handleCalendarSelectFlag = (value) => {
    setCalendarSelectFlag(value)
  }
  //定义新函数,用于更新学习日历中选中的某个学生的ID
  const handleStudentIDfromCalendar = (value) => {
    setStudentIDfromCalendar(value)
  }
  //定义新函数,用于更新学习日历中选中的日期
  const handleStudentDatefromCalendar = (value) => {
    setSudentDatefromCalendar(value)
  }
  //定义新函数,用于生成学习日历的学生
  const handleRowKeys = (value) => {
    setSelectedRowKeys(value)
  }
  //定义新函数,用于确认是否生成日历图
  const handleCalendarFlag = (value) => {
    setCalendarFlag(value)
  }
  //定义新函数,用于更新平行坐标系
  const handleParallelList = (value) => {
    setParallelList(value)
  }
  useEffect(() => {
    // 最开始的时候平行坐标系展示全部数据
    let paraList = [[], [], []]
    brushSelectedData.forEach((item) => {
      let tmp = []
      tmp.push(item['submit'])
      tmp.push(item['active'])
      tmp.push(item['question'])
      tmp.push(item['correct'])
      tmp.push(item['label'])
      if (item['label'] == '针对型') {
        paraList[0].push(tmp)
      } else if (item['label'] == '多样型') {
        paraList[1].push(tmp)
      } else {
        paraList[2].push(tmp)
      }
    })
    setParallelList(paraList)
  }, [brushSelectedData])
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
            <Scatter
              changeMode={handleMode}
              changeMonth={handleMonth}
              changeBrushSelectedData={handleBrushSelectedData}
              brushData={brushSelectedData}
            />
          </Card>
          <Card className="card6">
            {amode == 0 ? (
              <MonthFeature
                brushData={brushSelectedData}
                month={month}
                parallelList={parallelList}
              />
            ) : (
              <Evolution />
            )}
          </Card>
        </div>
        <div className="right">
          <Card className="card7">
            <Correlation
              amode={amode}
              month={month}
              brushData={brushSelectedData}
              handleRowKeys={handleRowKeys}
              selectedRowKeys={selectedRowKeys}
              handleCalendarFlag={handleCalendarFlag}
              calendarFlag={calendarFlag}
              changeParallelList={handleParallelList}
            />
          </Card>
          <Card className="card8">
            <Calendar
              amode={amode}
              month={month}
              handleCalendarSelectFlag={handleCalendarSelectFlag}
              handleStudentIDfromCalendar={handleStudentIDfromCalendar}
              handleStudentDatefromCalendar={handleStudentDatefromCalendar}
              selectedRowKeys={selectedRowKeys}
              calendarFlag={calendarFlag}
            />
          </Card>
          <Card className="card9">
            {amode == 0 ? (
              <StudentCommit
                amode={amode}
                month={month}
                calendarSelectFlag={calendarSelectFlag}
                studentIDfromCalendar={studentIDfromCalendar}
                studentDatefromCalendar={studentDatefromCalendar}
              />
            ) : (
              <TimeRight3 />
            )}
          </Card>
        </div>
      </div>
    </ContentWrapper>
  )
}
export default memo(Content)
