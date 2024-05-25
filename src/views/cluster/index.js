import React, { memo, useEffect, useState } from 'react'
import ReactEcharts from 'echarts-for-react'
import { ScatterWrapper } from './style'
import { getClusterData, getTransferData } from '../../api'
import { Radio, Select, Switch, Button } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
// const IconFont = createFromIconfontCN({
//   scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
// })
import StatisticFeature from '../statistic/index'
const Scatter = (props) => {
  // 父组件传递的设置模式函数
  const { changeMode, changeMonth } = props
  const [clusterData, setClusterData] = useState([])
  const colorAll = ['#37A2DA', '#e06343', '#37a354']
  // 切换标签
  const [clusterName, setClusterName] = useState(['针对型', '多样型', '尝试型'])
  // 当前使用的聚类数据
  const [nowClusterData, setNowClusterData] = useState([])
  // 设置坐标轴大小
  const [xmax, setXmax] = useState(60)
  const [ymax, setYmax] = useState(40)
  // 设置点的大小
  const [symbolSize, setSymbolSize] = useState(10)
  // 定义一个状态来控制组件的显示和隐藏
  const [visible, setVisible] = useState(true)
  // 转移状态的变换
  const [isTransfer, setIsTransfer] = useState(false)
  // 用来画状态转换的圆
  const [transferCircleData, setTransferCircleData] = useState([])
  // 用来画状态转换的连接
  const [transferLinksData, setTransferLinksData] = useState([])
  // 状态转移的第一月份
  const [firstMonth, setFirstMonth] = useState(null)
  // 状态转移的第二月份
  const [secondMonth, setSecondMonth] = useState(null)
  // 是否展示统计特征箱线图
  const [showStats, setShowStats] = useState(false)
  // 开关是否不可操作
  const [disabledStats, setDisabledStats] = useState(true)
  const monthsChoice = [
    { value: '9', label: '2023-09' },
    { value: '10', label: '2023-10' },
    { value: '11', label: '2023-11' },
    { value: '12', label: '2023-12' },
    { value: '1', label: '2024-01' }
  ]
  // 生成散点图系列
  const series = Object.keys(nowClusterData).map((cluster) => ({
    name: clusterName[cluster],
    type: 'scatter',
    data: nowClusterData[cluster],
    color: colorAll[cluster],
    symbolSize: symbolSize,
    itemStyle: {
      borderColor: '#555',
      opacity: 1
    }
  }))
  const clusterOption = {
    grid: {
      left: '1%', // 设置左边距
      right: '2%', // 设置右边距
      bottom: '3%', // 设置底边距
      top: '4%',
      containLabel: true
    },
    legend: {
      itemWidth: 16,
      itemHeight: 16,
      left: '5%',
      textStyle: {
        fontSize: 14
      }
    },
    xAxis: {
      max: xmax
    },
    yAxis: {
      max: ymax
    },
    dataZoom: [
      {
        type: 'inside', // 使用鼠标滚轮的缩放
        xAxisIndex: 0
      },
      {
        type: 'inside', // 使用鼠标滚轮的缩放
        yAxisIndex: 0
      }
    ],
    series: series
  }

  let allColor = ['#d3d3d3', '#37A2DA', '#e06343', '#37a354']
  let minValue = Number.MAX_VALUE
  let maxValue = Number.MIN_VALUE
  let mappedData = []
  let links = []

  // 找到数据中的最小值和最大值（除0外）
  for (let i = 0; i < transferLinksData.length; i++) {
    for (let j = 0; j < transferLinksData[i].length; j++) {
      if (transferLinksData[i][j] !== 0) {
        minValue = Math.min(minValue, transferLinksData[i][j])
        maxValue = Math.max(maxValue, transferLinksData[i][j])
      }
    }
  }
  // 将数据映射到 [4, 12] 范围内
  for (let i = 0; i < transferLinksData.length; i++) {
    let row = []
    for (let j = 0; j < transferLinksData[i].length; j++) {
      if (transferLinksData[i][j] === 0) {
        row.push(0)
      } else {
        let mappedValue =
          ((transferLinksData[i][j] - minValue) / (maxValue - minValue)) *
            (12 - 4) +
          4
        row.push(mappedValue)
      }
    }
    mappedData.push(row)
  }
  // 动态生成links
  for (let i = 0; i < mappedData.length; i++) {
    for (let j = 0; j < mappedData[i].length; j++) {
      if (mappedData[i][j] != 0) {
        let link = {
          source: i,
          target: j,
          value: transferLinksData[i][j],
          label: {
            show: true,
            formatter: '{c}'
          },
          lineStyle: {
            width: mappedData[i][j],
            color: allColor[i]
          }
        }
        links.push(link)
      }
    }
  }
  // 计算字体大小范围的映射函数
  const mapFontSize = (value) => {
    const minFontSize = 14
    const maxFontSize = 20
    // 将节点的值映射到[15, 20]范围内
    return (
      minFontSize +
      ((value - Math.min(...transferCircleData)) /
        (Math.max(...transferCircleData) - Math.min(...transferCircleData))) *
        (maxFontSize - minFontSize)
    )
  }
  const transferOption = {
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    visualMap: [
      {
        type: 'continuous',
        show: false,
        min: 0, // 数量的最小值
        max: 600, // 数量的最大值
        calculable: true,
        seriesIndex: 0,
        inRange: {
          symbolSize: [40, 100] // 圆的最小和最大大小
        }
      }
    ],
    series: [
      {
        type: 'graph',
        layout: 'none',
        symbolSize: 50,
        label: {
          show: true
        },
        edgeLabel: {
          fontSize: 15
        },
        data: [
          {
            name: '无提交',
            x: 500,
            y: 300,
            value: transferCircleData[0],
            itemStyle: {
              color: allColor[0]
            },
            label: {
              fontSize: mapFontSize(transferCircleData[0]),
              color: 'white'
            }
          },
          {
            name: '针对型',
            x: 600,
            y: 290,
            value: transferCircleData[1],
            itemStyle: {
              color: allColor[1]
            },
            label: {
              fontSize: mapFontSize(transferCircleData[1]),
              color: 'white'
            }
          },
          {
            name: '多样型',
            x: 650,
            y: 200,
            value: transferCircleData[2],
            itemStyle: {
              color: allColor[2]
            },
            label: {
              fontSize: mapFontSize(transferCircleData[2]),
              color: 'white'
            }
          },
          {
            name: '尝试型',
            x: 680,
            y: 380,
            value: transferCircleData[3],
            itemStyle: {
              color: allColor[3]
            },
            label: {
              fontSize: mapFontSize(transferCircleData[3]),
              color: 'white'
            }
          }
        ],
        // links: [],
        links: links,
        lineStyle: {
          opacity: 0.9,
          curveness: 0.3
        }
      }
    ]
  }
  useEffect(() => {
    getClusterData().then((res) => {
      setClusterData(res)
      setNowClusterData(res[1])
    })
    getTransferData().then((res) => {
      setTransferCircleData(res[0])
      setTransferLinksData(res[1])
    })
  }, [])
  const handleChangeMode = (e) => {
    const value = e.target.value
    if (value == 1) {
      setNowClusterData(clusterData[5])
      setXmax(-7)
      setYmax(-7)
      setSymbolSize(25)
      setClusterName(['高峰型', '低峰型', '平均型'])
      setVisible(false)
      // 改变模式
      changeMode(1)
      // 是否显示演变视图
      setIsTransfer(false)
      // 开关不可操作
      setDisabledStats(false)
    } else if (value == 0) {
      setNowClusterData(clusterData[1])
      setXmax(60)
      setYmax(40)
      setSymbolSize(10)
      setClusterName(['针对型', '多样型', '尝试型'])
      setVisible(true)
      changeMode(0)
      // 默认状态为10
      changeMonth(10)
      // 是否显示演变视图
      setIsTransfer(false)
      setDisabledStats(true)
    } else if (value == 2) {
      // 是否显示演变视图
      setIsTransfer(true)
      setDisabledStats(false)
      setShowStats(false)
    }
  }
  const handleChangeMonth = (value) => {
    if (value == 9) {
      setNowClusterData(clusterData[0])
      setXmax(60)
      setYmax(40)
      // 更改父组件的月份状态
      changeMonth(9)
      // 更改相关性数据的索引
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
  // 处理第一个演变视图中选择器的变化
  const handleFirstMonthChange = (value) => {
    setFirstMonth(value)
    setSecondMonth(null) // 重置第二个选择器
  }
  // 处理第一个演变视图中选择器的变化
  const handleSecondMonthChange = (value) => {
    setSecondMonth(value)
    getTransferData(firstMonth, value).then((res) => {
      setTransferCircleData(res[0])
      setTransferLinksData(res[1])
    })
  }
  // 获取第二个选择器的可选项
  const getSecondMonthOptions = () => {
    if (!firstMonth) {
      return monthsChoice
    }
    const firstMonthIndex = monthsChoice.findIndex(
      (monthsChoice) => monthsChoice.value === firstMonth
    )
    return monthsChoice.slice(firstMonthIndex + 1)
  }
  // 切换开关事件
  const onSwitchChange = (checked) => {
    setShowStats(checked)
  }
  return (
    <ScatterWrapper>
      <div className="title">学习模式聚类视图</div>
      <div className="content">
        <div className="left">
          {showStats && <StatisticFeature />}
          <div className="btn">
            <div className="leftbtn">
              <h3 className="label">视图类别</h3>
              <Radio.Group
                onChange={handleChangeMode}
                defaultValue="0"
                style={{ marginLeft: '10px' }}
              >
                <Radio.Button value="0">答题模式</Radio.Button>
                <Radio.Button value="1">时间模式</Radio.Button>
                <Radio.Button value="2">演变视图</Radio.Button>
              </Radio.Group>

              {visible && !isTransfer && (
                <div className="answerbtn">
                  <h3 className="label">月份</h3>
                  <Select
                    defaultValue="2023-10"
                    style={{ width: 100, marginLeft: '10px' }}
                    onChange={handleChangeMonth}
                    options={monthsChoice}
                  />
                </div>
              )}
              {isTransfer && (
                <div className="monthbtn">
                  <h3 className="label">月份</h3>
                  <Select
                    defaultValue="2023-09"
                    style={{ width: 100, marginLeft: '10px' }}
                    options={monthsChoice}
                    onChange={handleFirstMonthChange}
                    value={firstMonth}
                  />
                  <div className="to">to</div>
                  <Select
                    style={{ width: 100, marginLeft: '5px' }}
                    options={getSecondMonthOptions()}
                    onChange={handleSecondMonthChange}
                    value={secondMonth}
                    disabled={!firstMonth}
                  />
                </div>
              )}
            </div>
            <div className="rightbtn">
              <Button icon={<SyncOutlined />}>清空</Button>
              <h3 className="label">特征统计</h3>
              <Switch
                onChange={onSwitchChange}
                value={showStats}
                size={'small'}
                style={{ marginLeft: '10px' }}
                disabled={!disabledStats}
              />
            </div>
          </div>
          <div className="clusterView">
            {!isTransfer && (
              <ReactEcharts
                option={clusterOption}
                style={{ width: '100%', height: '100%' }}
              />
            )}
            {isTransfer && (
              <ReactEcharts
                option={transferOption}
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </div>
        </div>
      </div>
    </ScatterWrapper>
  )
}
export default memo(Scatter)
