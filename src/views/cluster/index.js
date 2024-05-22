import React, { memo, useEffect, useState } from 'react'
import ReactEcharts from 'echarts-for-react'
import { ScatterWrapper } from './style'
import { getClusterData, getCorrelationData, getTransferData } from '../../api'
import { Select } from 'antd'
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
  const [symbolSize, setSymbolSize] = useState(7)
  // 定义一个状态来控制组件的显示和隐藏
  const [visible, setVisible] = useState(true)
  // 保存相关性矩阵数据
  const [correlationData, setCorrelationData] = useState([])
  // 相关性数据的下标
  const [correlationIndex, setCorrelationIndex] = useState(1)
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
      { left: '8%', top: '9%', right: '3%', bottom: '70%' },
      { left: '8%', top: '34%', right: '3%', bottom: '48%' },
      { left: '8%', top: '56%', right: '3%', bottom: '27%' },
      { left: '8%', top: '78%', right: '3%', bottom: '6%' }
    ],
    xAxis: [
      {
        gridIndex: 0,
        type: 'category',
        data: ['针对型', '多样型', '尝试型'],
        axisLabel: {
          show: false
        }
      },
      {
        gridIndex: 1,
        type: 'category',
        data: ['针对型', '多样型', '尝试型'],
        axisLabel: {
          show: false
        }
      },
      {
        gridIndex: 2,
        type: 'category',
        data: ['针对型', '多样型', '尝试型'],
        axisLabel: {
          show: false
        }
      },
      {
        gridIndex: 3,
        type: 'category',
        data: ['针对型', '多样型', '尝试型']
      }
    ],
    yAxis: [
      {
        gridIndex: 0,
        type: 'value',
        axisLabel: {
          fontSize: 9
        }
      },
      {
        gridIndex: 1,
        type: 'value',
        axisLabel: {
          fontSize: 9
        }
      },
      {
        gridIndex: 2,
        type: 'value',
        axisLabel: {
          fontSize: 9
        }
      },
      {
        gridIndex: 3,
        type: 'value',
        axisLabel: {
          fontSize: 9
        }
      }
    ],
    series: [
      {
        type: 'boxplot',
        name: '提交次数',
        data: [
          [25, 70, 45, 10, 87, 42, 53],
          [91, 34, 60, 89, 2, 48, 78],
          [8, 15, 33, 67, 54, 99, 73]
        ],
        xAxisIndex: 0,
        yAxisIndex: 0,
        itemStyle: {
          color: '#FF7F50', // 设置箱子的填充颜色
          borderColor: '#F4A460', // 设置边框颜色
          borderWidth: 1 // 设置边框宽度
        }
      },
      {
        type: 'boxplot',
        name: '活跃天数',
        data: [
          [25, 70, 45, 10, 87, 42, 53],
          [91, 34, 60, 89, 2, 48, 78],
          [8, 15, 33, 67, 54, 99, 73]
        ],
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          color: '#98FB98', // 设置箱子的填充颜色
          borderColor: '#F4A460', // 设置边框颜色
          borderWidth: 1 // 设置边框宽度
        }
      },
      {
        type: 'boxplot',
        name: '答题数',
        data: [
          [25, 70, 45, 10, 87, 42, 53],
          [91, 34, 60, 89, 2, 48, 78],
          [8, 15, 33, 67, 54, 99, 73]
        ],
        xAxisIndex: 2,
        yAxisIndex: 2,
        itemStyle: {
          color: '#AFEEEE', // 设置箱子的填充颜色
          borderColor: '#F4A460', // 设置边框颜色
          borderWidth: 1 // 设置边框宽度
        }
      },
      {
        type: 'boxplot',
        name: '正确占比',
        data: [
          [25, 70, 45, 10, 87, 42, 53],
          [91, 34, 60, 89, 2, 48, 78],
          [8, 15, 33, 67, 54, 99, 73]
        ],
        xAxisIndex: 3,
        yAxisIndex: 3,
        itemStyle: {
          color: '#87CEFA', // 设置箱子的填充颜色
          borderColor: '#F4A460', // 设置边框颜色
          borderWidth: 1 // 设置边框宽度
        }
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
      left: '13%'
    },
    xAxis: {
      type: 'category',
      data: ['提交次数', '活跃天数', '答题数', '正确占比'],
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
        data: correlationData[correlationIndex],
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
  // 演变视图相关数据处理
  //   let data1 = [215, 563, 513, 73]
  //   let dataList = [
  //     [0, 245, 204, 13],
  //     [0, 0, 14, 2],
  //     [44, 86, 0, 0],
  //     [93, 14, 214, 0]
  //   ]
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
    getCorrelationData().then((res) => {
      setCorrelationData(res)
    })
    getTransferData().then((res) => {
      setTransferCircleData(res[0])
      setTransferLinksData(res[1])
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
      // 是否显示演变视图
      setIsTransfer(false)
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
      // 是否显示演变视图
      setIsTransfer(false)
      setCorrelationIndex(1)
    } else if (value == 2) {
      // 是否显示演变视图
      setIsTransfer(true)
    }
  }
  const handleChangeMonth = (value) => {
    if (value == 9) {
      setNowClusterData(clusterData[0])
      setXmax(45)
      setYmax(40)
      // 更改父组件的月份状态
      changeMonth(9)
      // 更改相关性数据的索引
      setCorrelationIndex(0)
    } else if (value == 10) {
      setNowClusterData(clusterData[1])
      setXmax(60)
      setYmax(40)
      changeMonth(10)
      setCorrelationIndex(1)
    } else if (value == 11) {
      setNowClusterData(clusterData[2])
      setXmax(60)
      setYmax(40)
      changeMonth(11)
      setCorrelationIndex(2)
    } else if (value == 12) {
      setNowClusterData(clusterData[3])
      setXmax(40)
      setYmax(60)
      changeMonth(12)
      setCorrelationIndex(3)
    } else if (value == 1) {
      setNowClusterData(clusterData[4])
      setXmax(20)
      setYmax(25)
      changeMonth(1)
      setCorrelationIndex(4)
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
            {visible && !isTransfer && (
              <Select
                defaultValue="2023-10"
                style={{ width: 100, marginLeft: '10px' }}
                onChange={handleChangeMonth}
                options={monthsChoice}
              />
            )}
            {isTransfer && (
              <div className="monthbtn">
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
