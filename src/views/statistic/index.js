import React, { memo } from 'react'
import ReactEcharts from 'echarts-for-react'
import { StatisticWrapper } from './style'
const StatisticFeature = (props) => {
  const { statsFeature } = props
  const featureOption = {
    tooltip: {
      trigger: 'item',
      position: 'right',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      itemWidth: 20,
      itemHeight: 11,
      data: [
        {
          name: '提交次数',
          itemStyle: {
            color: '#EC6E66'
          }
        },
        {
          name: '活跃天数',
          itemStyle: {
            color: '#87c977'
          }
        },
        {
          name: '答题数',
          itemStyle: {
            color: '#fae493'
          }
        },
        {
          name: '正确占比',
          itemStyle: {
            color: '#86C6F0'
          }
        }
      ]
    },
    grid: [
      { left: '11%', top: '17%', right: '48%', bottom: '50%' },
      { left: '56%', top: '17%', right: '3%', bottom: '50%' },
      { left: '11%', top: '64%', right: '48%', bottom: '3%' },
      { left: '56%', top: '64%', right: '3%', bottom: '3%' }
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
        data: statsFeature['提交次数'],
        xAxisIndex: 0,
        yAxisIndex: 0,
        itemStyle: {
          color: '#EC6E66', // 设置箱子的填充颜色
          borderColor: '#F4A460', // 设置边框颜色
          borderWidth: 1 // 设置边框宽度
        }
      },
      {
        type: 'boxplot',
        name: '活跃天数',
        data: statsFeature['活跃天数'],
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          color: '#87c977', // 设置箱子的填充颜色
          borderColor: '#F4A460', // 设置边框颜色
          borderWidth: 1 // 设置边框宽度
        }
      },
      {
        type: 'boxplot',
        name: '答题数',
        data: statsFeature['答题数'],
        xAxisIndex: 2,
        yAxisIndex: 2,
        itemStyle: {
          color: '#fae493', // 设置箱子的填充颜色
          borderColor: '#F4A460', // 设置边框颜色
          borderWidth: 1 // 设置边框宽度
        }
      },
      {
        type: 'boxplot',
        name: '正确占比',
        data: statsFeature['正确占比'],
        xAxisIndex: 3,
        yAxisIndex: 3,
        itemStyle: {
          color: '#86C6F0', // 设置箱子的填充颜色
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
