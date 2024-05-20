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
  const clusterOption = {
    grid: {
      left: '1%', // 设置左边距
      right: '2%', // 设置右边距
      bottom: '3%', // 设置底边距
      top: '5%',
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
  const featureOption = {
    title: {
      text: '特征箱线图',
      top: '0%',
      textStyle: {
        fontSize: 15,
        fontWeight: 'normal'
      }
    },
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: [
      { left: '7%', top: '9%', right: '3%', bottom: '66%' },
      { left: '7%', top: '39%', right: '3%', bottom: '36%' },
      { left: '7%', top: '69%', right: '3%', bottom: '6%' }
    ],
    xAxis: [
      {
        gridIndex: 0,
        type: 'category',
        data: ['提交次数', '活跃天数', '答题数', '正确占比'],
        axisLabel: {
          show: false
        }
      },
      {
        gridIndex: 1,
        type: 'category',
        data: ['提交次数', '活跃天数', '答题数', '正确占比'],
        axisLabel: {
          show: false
        }
      },
      {
        gridIndex: 2,
        type: 'category',
        data: ['提交次数', '活跃天数', '答题数', '正确占比']
      }
    ],
    yAxis: [
      { gridIndex: 0, type: 'value' },
      { gridIndex: 1, type: 'value' },
      { gridIndex: 2, type: 'value' }
    ],
    series: [
      {
        type: 'boxplot',
        data: [
          [25, 70, 45, 10, 87, 42, 53],
          [91, 34, 60, 89, 2, 48, 78],
          [8, 15, 33, 67, 54, 99, 73],
          [41, 6, 87, 22, 50, 15, 3]
        ],
        xAxisIndex: 0,
        yAxisIndex: 0
      },
      {
        type: 'boxplot',
        data: [
          [25, 70, 45, 10, 87, 42, 53],
          [91, 34, 60, 89, 2, 48, 78],
          [8, 15, 33, 67, 54, 99, 73],
          [41, 6, 87, 22, 50, 15, 3]
        ],
        xAxisIndex: 1,
        yAxisIndex: 1
      },
      {
        type: 'boxplot',
        data: [
          [25, 70, 45, 10, 87, 42, 53],
          [91, 34, 60, 89, 2, 48, 78],
          [8, 15, 33, 67, 54, 99, 73],
          [41, 6, 87, 22, 50, 15, 3]
        ],
        xAxisIndex: 2,
        yAxisIndex: 2
      }
    ]
  }
  const correlationOption = {
    title: {
      text: '相关性矩阵',
      top: '5%',
      textStyle: {
        fontSize: 15,
        fontWeight: 'normal'
      }
    },
    tooltip: {
      position: 'top'
    },
    grid: {
      top: '17%',
      bottom: '16%',
      right: '3%',
      left: '11%'
    },
    xAxis: {
      type: 'category',
      data: ['a', 'b', 'c', 'd'],
      splitArea: {
        show: true
      }
    },
    yAxis: {
      type: 'category',
      data: ['针对型', '多样型', '尝试型'],
      splitArea: {
        show: true
      }
    },
    visualMap: {
      show: false,
      min: -1,
      max: 1,
      calculable: true,
      orient: 'vertical',
      right: '1%',
      bottom: '10%',
      itemWidth: 10,
      itemHeight: 80
    },
    series: [
      {
        name: '特征相关性',
        type: 'heatmap',
        data: [
          [0, 0, 0.8],
          [0, 1, 0.6],
          [0, 2, -0.2],
          [0, 3, -0.4],
          [1, 0, 0.9],
          [1, 1, 0.7],
          [1, 2, 0.1],
          [1, 3, -0.5],
          [2, 0, -0.6],
          [2, 1, 0.4],
          [2, 2, 0.3],
          [2, 3, 0.8]
        ],
        label: {
          show: true
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
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
      <div className="title">学习模式聚类与相关性视图</div>
      <div className="content">
        <div className="left">
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
          <div className="clusterView">
            <ReactEcharts
              option={clusterOption}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
        <div className="right">
          <div className="feature">
            <ReactEcharts
              option={featureOption}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className="correlation">
            <ReactEcharts
              option={correlationOption}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>
    </ScatterWrapper>
  )
}
export default memo(Scatter)
