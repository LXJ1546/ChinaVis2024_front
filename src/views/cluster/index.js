import React, { memo, useEffect, useState } from 'react'
import ReactEcharts from 'echarts-for-react'
import { ScatterWrapper } from './style'
import { getClusterData } from '../../api'
import { Select } from 'antd'
const Scatter = (props) => {
  // 父组件传递的设置模式函数
  const { changeMode, changeMonth } = props
  const [clusterData, setClusterData] = useState([])
  const colorAll = ['#37A2DA', '#e06343', '#37a354']
  const [clusterName, setClusterName] = useState(['针对型', '多样型', '尝试型'])
  const [nowClusterData, setNowClusterData] = useState([])
  const [xmax, setXmax] = useState(60)
  const [ymax, setYmax] = useState(40)
  const [symbolSize, setSymbolSize] = useState(7)
  // 定义一个状态来控制组件的显示和隐藏
  const [visible, setVisible] = useState(true)
  // 生成散点图系列
  const series = Object.keys(nowClusterData).map((cluster) => ({
    name: clusterName[cluster],
    type: 'scatter',
    data: nowClusterData[cluster],
    color: colorAll[cluster],
    symbolSize: symbolSize,
    itemStyle: {
      borderColor: '#555'
    }
  }))
  const option = {
    grid: {
      left: '3%', // 设置左边距
      right: '3%', // 设置右边距
      bottom: '3%', // 设置底边距
      top: '6%',
      containLabel: true
    },
    legend: {},
    xAxis: {
      max: xmax
    },
    yAxis: {
      max: ymax
    },
    series: series
  }
  useEffect(() => {
    getClusterData().then((res) => {
      setClusterData(res)
      setNowClusterData(res[1])
    })
  }, [])
  const handleChangeMode = (value) => {
    if (value == 1) {
      setNowClusterData(clusterData[5])
      setXmax(-7)
      setYmax(-7)
      setSymbolSize(15)
      setClusterName(['高峰型', '低峰型', '平均型'])
      setVisible(false)
      // 改变模式
      changeMode(1)
    } else if (value == 0) {
      setNowClusterData(clusterData[1])
      setXmax(60)
      setYmax(40)
      setSymbolSize(7)
      setClusterName(['针对型', '多样型', '尝试型'])
      setVisible(true)
      changeMode(0)
      // 默认状态为10
      changeMonth(10)
    }
  }
  const handleChangeMonth = (value) => {
    if (value == 9) {
      setNowClusterData(clusterData[0])
      setXmax(45)
      setYmax(40)
      // 更改父组件的月份状态
      changeMonth(9)
    } else if (value == 10) {
      setNowClusterData(clusterData[1])
      setXmax(60)
      setYmax(40)
      changeMonth(10)
    } else if (value == 11) {
      setNowClusterData(clusterData[2])
      setXmax(60)
      setYmax(40)
      changeMonth(11)
    } else if (value == 12) {
      setNowClusterData(clusterData[3])
      setXmax(40)
      setYmax(60)
      changeMonth(12)
    } else if (value == 1) {
      setNowClusterData(clusterData[4])
      setXmax(20)
      setYmax(25)
      changeMonth(1)
    }
  }
  return (
    <ScatterWrapper>
      <div className="title">学习模式聚类视图</div>
      <div className="btn">
        <Select
          defaultValue="答题模式"
          style={{ width: 100 }}
          onChange={handleChangeMode}
          options={[
            { value: '0', label: '答题模式' },
            { value: '1', label: '时间模式' },
            { value: '2', label: '演变视图' }
          ]}
        />
        {visible && (
          <Select
            defaultValue="2023-10"
            style={{ width: 100, marginLeft: '10px' }}
            onChange={handleChangeMonth}
            options={[
              { value: '9', label: '2023-09' },
              { value: '10', label: '2023-10' },
              { value: '11', label: '2023-11' },
              { value: '12', label: '2023-12' },
              { value: '1', label: '2024-01' }
            ]}
          />
        )}
      </div>
      <div className="view">
        <ReactEcharts
          option={option}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </ScatterWrapper>
  )
}
export default memo(Scatter)
