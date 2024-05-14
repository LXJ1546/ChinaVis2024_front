import React, { memo } from 'react'
// import * as echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import { TemplateWrapper } from './style'
import { Card } from 'antd'
const Template = () => {
  //   const renderView = () => {
  //     let myChart = echarts.init(document.getElementById('view'))
  //     const option = {
  //       grid: {
  //         left: '3%', // 设置左边距
  //         right: '4%', // 设置右边距
  //         bottom: '3%', // 设置底边距
  //         top: '5%',
  //         containLabel: true
  //       },
  //       xAxis: {
  //         type: 'category',
  //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  //       },
  //       yAxis: {
  //         type: 'value'
  //       },
  //       series: [
  //         {
  //           data: [150, 230, 224, 218, 135, 147, 260],
  //           type: 'line'
  //         }
  //       ]
  //     }
  //     myChart.setOption(option)
  //   }
  //   useEffect(() => {
  //     renderView()
  //   }, [])
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
      <Card className="card">
        <div className="title">视图模板</div>
        {/* <div id="view" className="view"></div> */}
        <ReactEcharts option={option} style={{ height: '300px' }} />
      </Card>
    </TemplateWrapper>
  )
}
export default memo(Template)
