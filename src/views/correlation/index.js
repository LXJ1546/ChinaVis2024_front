import React, { memo, useState, useEffect } from 'react'
import ReactEcharts from 'echarts-for-react'
import { CorrelationWrapper } from './style'
import { getCorrelationData } from '../../api'
const Correlation = (props) => {
  // 拿到父组件传递的模式状态
  const { amode, month } = props
  // 保存相关性矩阵数据
  const [correlationData, setCorrelationData] = useState([])
  // 相关性数据的下标
  const [correlationIndex, setCorrelationIndex] = useState(1)
  const featureOption = {
    // title: {
    //   text: '特征箱线图',
    //   left: '2%',
    //   textStyle: {
    //     fontSize: 15,
    //     fontWeight: 'normal'
    //   }
    // },
    tooltip: {
      trigger: 'item',
      position: 'right',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: [
      { left: '10%', top: '7%', right: '49%', bottom: '56%' },
      { left: '56%', top: '7%', right: '3%', bottom: '56%' },
      { left: '10%', top: '57%', right: '49%', bottom: '6%' },
      { left: '56%', top: '57%', right: '3%', bottom: '6%' }
    ],
    yAxis: [
      {
        gridIndex: 0,
        type: 'category',
        data: ['针对型', '多样型', '尝试型'],
        axisTick: {
          show: false
        },
        axisLabel: {
          margin: 4
        }
      },
      {
        gridIndex: 1,
        type: 'category',
        data: ['针对型', '多样型', '尝试型'],
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      {
        gridIndex: 2,
        type: 'category',
        data: ['针对型', '多样型', '尝试型'],
        axisTick: {
          show: false
        },
        axisLabel: {
          margin: 4
        }
      },
      {
        gridIndex: 3,
        type: 'category',
        data: ['针对型', '多样型', '尝试型'],
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        }
      }
    ],
    xAxis: [
      {
        gridIndex: 0,
        type: 'value',
        position: 'top',
        axisLabel: {
          fontSize: 9,
          margin: 3
        },
        axisLine: {
          show: true
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: true
        }
      },
      {
        gridIndex: 1,
        type: 'value',
        position: 'top',
        axisLabel: {
          fontSize: 9,
          margin: 3
        },
        axisLine: {
          show: true
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: true
        }
      },
      {
        gridIndex: 2,
        type: 'value',
        position: 'top',
        axisLabel: {
          fontSize: 9,
          margin: 3
        },
        axisLine: {
          show: true
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: true
        }
      },
      {
        gridIndex: 3,
        type: 'value',
        position: 'top',
        axisLabel: {
          fontSize: 9,
          margin: 3
        },
        axisLine: {
          show: true
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: true
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
    tooltip: {
      position: 'top'
    },
    grid: {
      top: '2%',
      bottom: '12%',
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
  useEffect(() => {
    getCorrelationData().then((res) => {
      setCorrelationData(res)
    })
  }, [])
  useEffect(() => {
    if (amode == 0) {
      if (month == 9) {
        setCorrelationIndex(0)
      } else if (month == 10) {
        setCorrelationIndex(1)
      } else if (month == 11) {
        setCorrelationIndex(2)
      } else if (month == 12) {
        setCorrelationIndex(3)
      } else if (month == 1) {
        setCorrelationIndex(4)
      }
    }
  }, [amode, month])
  return (
    <CorrelationWrapper>
      <div className="title">特征箱线图与相关性矩阵视图</div>
      <div className="content">
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
    </CorrelationWrapper>
  )
}
export default memo(Correlation)
