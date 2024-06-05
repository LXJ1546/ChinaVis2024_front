import React, { memo, useEffect } from 'react'
import { useState } from 'react'
import { ContentWrapper } from './style'
import { Card } from 'antd'
import Picture from '../../views/picture'
import Controller from '../../views/controller'
import Scatter from '@/views/cluster'
import Correlation from '../../views/correlation'
import TitleMaster from '../../views/titleMaster'
// import KnowledgeIcicle from '../../views/knowledgeNew'
import KnowledgeTree from '../../views/knowledgeNew/test'
import Calendar from '../../views/calendar'
import StudentCommit from '../../views/studentCommit'
import MonthFeature from '../../views/monthFeature/index'
import TimeRight3 from '../../views/timeRight3'
import Evolution from '../../views/temporalEvolution/index'
import MonthTable from '../../views/monthTable/index'
import TransferMonth from '../../views/transferMonth/index'
const Content = () => {
  const [amode, setAmode] = useState(1) //模式0代表答题模式，1代表时间模式
  const [month, setMonth] = useState(10) //9,10,11,12,1
  const [classNum, setClassNum] = useState('all') //选中的数据集（所有数据集或某个班级）
  const [brushSelectedData, setBrushSelectedData] = useState([])
  const [calendarSelectFlag, setCalendarSelectFlag] = useState(false) //判断学习日历中是否有人被选中
  const [studentIDfromCalendar, setStudentIDfromCalendar] = useState(null) //提交事件获取学习日历中选中的学生ID
  const [studentDatefromCalendar, setSudentDatefromCalendar] = useState(null) //提交事件获取学习日历中选中的日期
  const [selectedRowKeys, setSelectedRowKeys] = useState([]) // 表格选择数据的数组
  const [calendarFlag, setCalendarFlag] = useState(false) //用于表示表格中是否确认生成日历
  const [highlightedXAxisName, setHighlightedXAxisName] = useState(null) //用于获取知识点掌握程度与题目掌握的交互高亮
  const [clicktitleFlag, setClickTitleFlag] = useState(0) //用于设置点击事件将题目折线图缩小
  const [studentIDlist, setStudentIDlist] = useState([]) //用于设置选中的学生
  const [studentSelectMastery, setStudentSelectMastery] = useState([])
  // 演变视图转移的学生数据
  const [transferLinksData, setTransferLinksData] = useState([[], []])
  // 演变视图转移的第一个月
  const [transferFirstMonth, setTransferFirstMonth] = useState(9)
  // 演变视图转移的第二个月
  const [transferSecondMonth, setTransferSecondMonth] = useState(10)
  // 平行坐标系的数据
  const [parallelList, setParallelList] = useState([[], [], []])
  // 是否改变权重
  const [isChangeWeight, setIsChangeWeight] = useState(0)
  // 改变班级
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
  //定义新函数,用于在月答题数据视图的点击事件时更新表格的选中数据
  const handleClickRowKeys = (value) => {
    setSelectedRowKeys((prevDataArray) => [...prevDataArray, value])
  }
  //定义新函数,用于确认是否生成日历图
  const handleCalendarFlag = (value) => {
    setCalendarFlag(value)
  }
  //定义新函数,用于更新平行坐标系
  const handleParallelList = (value) => {
    setParallelList(value)
  }
  //定义新函数,用于更新权重改变
  const handleWeight = (value) => {
    setIsChangeWeight(value)
  }
  //定义新函数,用于更新题目掌握情况高亮
  const handleHighLightedXaix = (value) => {
    setHighlightedXAxisName(value)
  }
  //定义新函数,用于确认是否选择了某个题目
  const handleClickTitleFlag = (value) => {
    setClickTitleFlag(value)
  }
  //定义新函数,用于传输选中的学生ID进行高亮
  const handleStudentList = (value) => {
    // 状态是不可变的，不能直接push
    setStudentIDlist((prevList) => [...prevList, value])
    // setStudentIDlist(value)
  }
  // 第二个版本
  const handleStudentList1 = (value) => {
    setStudentIDlist(value)
  }
  //定义新函数,用于传输选中的学生ID的总的掌握程度
  const handleStudentSelectMastery = (value) => {
    setStudentSelectMastery((prevList) => [...prevList, value])
  }
  //定义新函数,用于传输选中的学生ID的总的掌握程度，但主要用于设置空值
  const handleStudentSelectMastery1 = (value) => {
    setStudentSelectMastery(value)
  }
  //定义新函数,用于传输演变连接线对应的学生数据
  const handleTransferLinksData = (value) => {
    setTransferLinksData(value)
  }
  //定义新函数,用于修改演变的第一个月
  const handleTransferFirstMonth = (value) => {
    setTransferFirstMonth(value)
  }
  //定义新函数,用于修改演变的二个月
  const handleTransferSecondMonth = (value) => {
    setTransferSecondMonth(value)
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
            <Controller
              handleClassNum={handleClassNum}
              handleWeight={handleWeight}
              isChangeWeight={isChangeWeight}
              handleHighLightedXaix={handleHighLightedXaix}
              handleClickTitleFlag={handleClickTitleFlag}
            />
          </Card>
          <Card className="card2">
            <Picture
              classNum={classNum}
              isChangeWeight={isChangeWeight}
              handleStudentList={handleStudentList}
              handleStudentList1={handleStudentList1}
              handleStudentSelectMastery={handleStudentSelectMastery}
            />
          </Card>
          <Card className="card3">
            <TitleMaster
              classNum={classNum}
              isChangeWeight={isChangeWeight}
              highlightedXAxisName={highlightedXAxisName}
              handleHighLightedXaix={handleHighLightedXaix}
              clicktitleFlag={clicktitleFlag}
              handleClickTitleFlag={handleClickTitleFlag}
            />
          </Card>
          <Card className="card4">
            {/* <KnowledgeIcicle
              classNum={classNum}
              isChangeWeight={isChangeWeight}
              handleHighLightedXaix={handleHighLightedXaix}
              handleClickTitleFlag={handleClickTitleFlag}
            /> */}
            <KnowledgeTree
              classNum={classNum}
              isChangeWeight={isChangeWeight}
              highlightedXAxisName={highlightedXAxisName}
              handleHighLightedXaix={handleHighLightedXaix}
              handleClickTitleFlag={handleClickTitleFlag}
            />
          </Card>
        </div>
        <div className="middle">
          <Card className="card5">
            <Scatter
              changeMode={handleMode}
              changeMonth={handleMonth}
              changeBrushSelectedData={handleBrushSelectedData}
              brushData={brushSelectedData}
              amode={amode}
              isChangeWeight={isChangeWeight}
              classNum={classNum}
              month={month}
              studentIDlist={studentIDlist}
              handleStudentList1={handleStudentList1}
              studentSelectMastery={studentSelectMastery}
              handleStudentSelectMastery1={handleStudentSelectMastery1}
              handleTransferLinksData={handleTransferLinksData}
              handleTransferFirstMonth={handleTransferFirstMonth}
              handleTransferSecondMonth={handleTransferSecondMonth}
            />
          </Card>
          <Card className="card6">
            {amode == 0 && (
              <MonthFeature
                brushData={brushSelectedData}
                month={month}
                parallelList={parallelList}
                handleClickRowKeys={handleClickRowKeys}
                studentIDlist={studentIDlist}
              />
            )}
            {amode === 1 && <Evolution />}
            {amode === 2 && (
              <TransferMonth
                transferLinksData={transferLinksData}
                transferFirstMonth={transferFirstMonth}
                transferSecondMonth={transferSecondMonth}
                parallelList={parallelList}
                handleClickRowKeys={handleClickRowKeys}
                studentIDlist={studentIDlist}
              />
            )}
          </Card>
        </div>
        <div className="right">
          <Card className="card7">
            {amode == 0 || amode == 2 ? (
              <Correlation
                amode={amode}
                month={month}
                brushData={brushSelectedData}
                handleRowKeys={handleRowKeys}
                handleCalendarFlag={handleCalendarFlag}
                selectedRowKeys={selectedRowKeys}
                calendarFlag={calendarFlag}
                changeParallelList={handleParallelList}
                isChangeWeight={isChangeWeight}
              />
            ) : (
              <MonthTable />
            )}
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
              brushSelectedData={brushSelectedData}
            />
          </Card>
          <Card className="card9">
            {amode == 0 || amode == 2 ? (
              <StudentCommit
                amode={amode}
                month={month}
                calendarSelectFlag={calendarSelectFlag}
                studentIDfromCalendar={studentIDfromCalendar}
                studentDatefromCalendar={studentDatefromCalendar}
              />
            ) : (
              <TimeRight3 isChangeWeight={isChangeWeight} />
            )}
          </Card>
        </div>
      </div>
    </ContentWrapper>
  )
}
export default memo(Content)
