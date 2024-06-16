import React, { memo, useState } from 'react'
import { CotrollerWrapper } from './style'
import { Input, Button, Select } from 'antd'
import { getNewMasterDegree } from '../../api/index'
import { RetweetOutlined, createFromIconfontCN } from '@ant-design/icons'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4565164_juvpif6y83m.js'
})
const Cotroller = (props) => {
  const {
    handleClassNum,
    handleWeight,
    isChangeWeight,
    handleHighLightedXaix,
    handleClickTitleFlag,
    handleClickStudentId
  } = props
  // 定义输入框状态
  const [scoreRate, setScoreRate] = useState('')
  const [correctRate, setCorrectRate] = useState('')
  const [timeUse, setTimeUse] = useState('')
  const [memoryUse, setMemoryUse] = useState('')
  // 定义选择框状态
  const [classNum, setClassNum] = useState('all')
  // 按钮加载状态
  const [loadings, setLoadings] = useState(false)
  //数据集选择函数
  const handleChange = (value) => {
    //重新选择班级后题目掌握程度回到未选择状态
    handleClickTitleFlag(0)
    //将题目高亮的标志清理
    handleHighLightedXaix(null)
    handleClassNum(value)
    // 改变classNum
    setClassNum(value)
    handleClickStudentId(null)
  }
  // 重置按钮相关操作
  const handleReset = () => {
    // 全部重置所有状态
    setScoreRate('')
    setCorrectRate('')
    setTimeUse('')
    setMemoryUse('')
    setClassNum('all')
    handleChange('all')
  }
  // 初始化系统
  const handleInitialize = () => {
    setLoadings(true)
    // 发送请求
    getNewMasterDegree(
      Number(scoreRate),
      Number(correctRate),
      Number(timeUse),
      Number(memoryUse)
    ).then((res) => {
      console.log(res)
      //重新选择班级后题目掌握程度回到未选择状态
      handleClickTitleFlag(0)
      //将题目高亮的标志清理
      handleHighLightedXaix(null)
      // 加载状态完毕
      setLoadings(false)
      // 通知其他组件进行更新
      handleWeight(isChangeWeight + 1)
    })
  }
  // useEffect(() => {
  //   getNewMasterDegree(0.25, 0.25, 0.25, 0.25).then((res) => {
  //     console.log(res)
  //     // 通知其他组件进行更新
  //     handleWeight((precount) => precount + 1)
  //   })
  // }, [])
  return (
    <CotrollerWrapper>
      <div className="title">
        <div className="title-icon">
          <IconFont type="icon-kongzhitai" />
        </div>
        控制面板
      </div>
      <div className="Controllerview">
        {/* 初始化内存的各自占比 */}
        <div className="weight">
          <Input
            placeholder="权重"
            className="weightInput"
            addonBefore="得分率"
            style={{ width: 145 }}
            value={scoreRate}
            onChange={(e) => setScoreRate(e.target.value)}
          />
          <Input
            placeholder="权重"
            className="weightInput"
            addonBefore="正确比"
            style={{ width: 145 }}
            value={correctRate}
            onChange={(e) => setCorrectRate(e.target.value)}
          />
          <Input
            placeholder="权重"
            className="weightInput"
            addonBefore="用时"
            style={{ width: 130 }}
            value={timeUse}
            onChange={(e) => setTimeUse(e.target.value)}
          />
          <Input
            placeholder="权重"
            className="weightInput"
            addonBefore="内存"
            style={{ width: 130 }}
            value={memoryUse}
            onChange={(e) => setMemoryUse(e.target.value)}
          />
        </div>
        {/* 数据集选择 */}
        {/*系统初始化按钮  */}
        <div className="initialize">
          <Select
            defaultValue="所有学习者"
            style={{ width: 200 }}
            onChange={handleChange}
            value={classNum}
            options={[
              {
                label: <span>全部</span>,
                title: '全部',
                options: [
                  {
                    label: <span>所有学习者</span>,
                    value: 'all'
                  }
                ]
              },
              {
                label: <span>班级</span>,
                title: '班级',
                options: [
                  {
                    label: <span>Class 1</span>,
                    value: '1'
                  },
                  {
                    label: <span>Class 2</span>,
                    value: '2'
                  },
                  {
                    label: <span>Class 3</span>,
                    value: '3'
                  },
                  {
                    label: <span>Class 4</span>,
                    value: '4'
                  },
                  {
                    label: <span>Class 5</span>,
                    value: '5'
                  },
                  {
                    label: <span>Class 6</span>,
                    value: '6'
                  },
                  {
                    label: <span>Class 7</span>,
                    value: '7'
                  },
                  {
                    label: <span>Class 8</span>,
                    value: '8'
                  },
                  {
                    label: <span>Class 9</span>,
                    value: '9'
                  },
                  {
                    label: <span>Class 10</span>,
                    value: '10'
                  },
                  {
                    label: <span>Class 11</span>,
                    value: '11'
                  },
                  {
                    label: <span>Class 12</span>,
                    value: '12'
                  },
                  {
                    label: <span>Class 13</span>,
                    value: '13'
                  },

                  {
                    label: <span>Class 14</span>,
                    value: '14'
                  },
                  {
                    label: <span>Class 15</span>,
                    value: '15'
                  }
                ]
              }
            ]}
          />
          <div>
            <Button
              style={{ width: 80, marginRight: 8 }}
              icon={<RetweetOutlined />}
              onClick={handleReset}
            >
              重置
            </Button>
            <Button
              type="primary"
              style={{ width: 200 }}
              onClick={handleInitialize}
              loading={loadings}
            >
              初始化系统
            </Button>
          </div>
        </div>
      </div>
    </CotrollerWrapper>
  )
}
export default memo(Cotroller)
