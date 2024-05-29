import React, { memo } from 'react'
import ReactEcharts from 'echarts-for-react'
import { TimeStatisticWrapper } from './style'
const TimeStatisticFeature = (props) => {
  const { statsFeature } = props
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
      // { left: '56%', top: '60%', right: '3%', bottom: '3%' }
    ],
    yAxis: [
      {
        gridIndex: 0,
        type: 'category',
        data: ['高峰型', '低峰型', '平均型'],
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
        data: ['高峰型', '低峰型', '平均型'],
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
        data: ['高峰型', '低峰型', '平均型'],
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
        data: ['高峰型', '低峰型', '平均型'],
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        }
      }
      // {
      //   gridIndex: 4,
      //   type: 'category',
      //   data: ['高峰型', '低峰型', '平均型'],
      //   axisTick: {
      //     show: false
      //   }
      // }
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
      // {
      //   gridIndex: 4,
      //   type: 'value',
      //   position: 'top',
      //   axisLabel: {
      //     fontSize: 9,
      //     margin: 3
      //   },
      //   axisLine: {
      //     show: true
      //   },
      //   splitLine: {
      //     show: false
      //   },
      //   axisTick: {
      //     show: true
      //   }
      // }
    ],
    series: [
      {
        type: 'boxplot',
        name: '平均提交率',
        data: statsFeature['提交次数'],
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
        name: '活跃度',
        data: statsFeature['活跃天数'],
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
        name: '答题多样性',
        data: statsFeature['答题数'],
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
        data: statsFeature['正确占比'],
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
    <TimeStatisticWrapper>
      <div className="view">
        <ReactEcharts
          option={featureOption}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </TimeStatisticWrapper>
  )
}
export default memo(TimeStatisticFeature)
