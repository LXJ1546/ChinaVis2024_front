import React, { memo } from 'react'
// import * as echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import { TemplateWrapper } from './style'
// import { Card } from 'antd'
const Template = () => {
  // const renderView = () => {
  //   let myChart = echarts.init(document.getElementById('view'))
  //   const option = {
  //     grid: {
  //       left: '3%', // 设置左边距
  //       right: '4%', // 设置右边距
  //       bottom: '3%', // 设置底边距
  //       top: '5%',
  //       containLabel: true
  //     },
  //     xAxis: {
  //       type: 'category',
  //       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  //     },
  //     yAxis: {
  //       type: 'value'
  //     },
  //     series: [
  //       {
  //         data: [150, 230, 224, 218, 135, 147, 260],
  //         type: 'line'
  //       }
  //     ]
  //   }
  //   myChart.setOption(option)
  // }
  // useEffect(() => {
  //   renderView()
  // }, [])
  const option = {
    grid: {
      left: '3%', // 设置左边距
      right: '4%', // 设置右边距
      bottom: '3%', // 设置底边距
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  }
  return (
    <TemplateWrapper>
      {/* <Card className="card" style={{ width: 600, height: 400 }}>
        <div className="title">视图模板</div>
        <div className="view">
          <ReactEcharts option={option} style={{ width: 400, height: 200 }} />
        </div>
      </Card> */}
      {/* <div className="title">视图模板</div> */}
      <div className="title">视图模板</div>
      <div className="view">
        <ReactEcharts
          option={option}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </TemplateWrapper>
  )
}
export default memo(Template)
