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
    title: {
      text: 'Stacked Area Chart'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
      top: '10%'
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      top: '10%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: 'Search Engine',
        type: 'line',
        stack: 'Total',
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320]
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
