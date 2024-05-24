import React, { memo } from 'react'
import ReactEcharts from 'echarts-for-react'
import { StatisticWrapper } from './style'
const StatisticFeature = () => {
  const featureOption = {
    tooltip: {
      trigger: 'item',
      position: 'right',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: [
      { left: '11%', top: '10%', right: '48%', bottom: '53%' },
      { left: '56%', top: '10%', right: '3%', bottom: '53%' },
      { left: '11%', top: '60%', right: '48%', bottom: '3%' },
      { left: '56%', top: '60%', right: '3%', bottom: '3%' }
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
  return (
    <StatisticWrapper>
      <div className="view">
        <ReactEcharts
          option={featureOption}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </StatisticWrapper>
  )
}
export default memo(StatisticFeature)
