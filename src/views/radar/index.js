import React, { memo, useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const Radar = (props) => {
  const { transferRadarData } = props
  //防止报错
  console.log(transferRadarData)
  const radarRef = useRef(null)

  const res = {
    '9月': [0.46962646079945264, 0.5551806867812913, 31.842490842490843],
    '10月': [0.6250595748462441, 0.7619955945820197, 15.493887530562347]
  }
  useEffect(() => {
    drawRadar()
  }, [])

  const drawRadar = () => {
    const radarInstance = echarts.getInstanceByDom(radarRef.current)
    if (radarInstance) {
      radarInstance.dispose()
    }
    let myChart = echarts.init(radarRef.current)
    let option

    option = {
      legend: {
        orient: 'vertical',
        x: 'left',
        // left: '4%',
        width: '10px',
        data: ['9月', '10月']
      },
      tooltip: {
        trigger: 'item',
        show: 'true',
        formatter: (params) => {
          //   console.log('tooltip', params.data)
          let { value, name } = params.data
          return `${name}<br />掌握程度： ${value[0].toFixed(2)}<br />正确率：  &nbsp &nbsp${value[1].toFixed(2)}<br />活跃度：&nbsp  ${value[2].toFixed(2)}`
        }
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '掌握程度' },
          { name: '正确率' },
          { name: '活跃度' }
        ],
        axisName: {
          color: '#888'
        },
        center: ['50%', '55%']
      },
      // color: ['#F3D475', '#F3B28A', '#F1928E'],
      color: ['#FAD891', '#6D9AC4', '#777B98'],
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: res['9月'],
              name: '9月'
            },
            {
              value: res['10月'],
              name: '10月'
            }
          ]
        }
      ]
    }

    myChart.setOption(option)
  }

  return (
    <div
      style={{
        width: '25%',
        height: '25%',
        position: 'absolute',
        zIndex: 10,
        top: '12%',
        left: '1%'
      }}
    >
      <div
        className="radarContainer"
        ref={radarRef}
        style={{ width: '100%', height: '100%' }}
      ></div>
    </div>
  )
}

export default memo(Radar)
