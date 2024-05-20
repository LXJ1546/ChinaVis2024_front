import React, { memo } from 'react'
import ReactEcharts from 'echarts-for-react'
import { AnswerWrapper } from './style'
const Answer = (props) => {
  // 拿到父组件传递的模式状态
  const { mode, month } = props
  console.log(month)
  const option1 = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  }
  const option2 = {
    title: [
      {
        text: 'Tangential Polar Bar Label Position (middle)'
      }
    ],
    polar: {
      radius: [30, '80%']
    },
    angleAxis: {
      max: 4,
      startAngle: 75
    },
    radiusAxis: {
      type: 'category',
      data: ['a', 'b', 'c', 'd']
    },
    tooltip: {},
    series: {
      type: 'bar',
      data: [2, 1.2, 2.4, 3.6],
      coordinateSystem: 'polar',
      label: {
        show: true,
        position: 'middle',
        formatter: '{b}: {c}'
      }
    }
  }
  return (
    <AnswerWrapper>
      <div className="title">答题模式与相关性视图</div>
      <div className="view">
        {mode == 0 && (
          <ReactEcharts
            option={option1}
            style={{ width: '100%', height: '100%' }}
          />
        )}
        {mode == 1 && (
          <ReactEcharts
            option={option2}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </div>
    </AnswerWrapper>
  )
}
export default memo(Answer)
