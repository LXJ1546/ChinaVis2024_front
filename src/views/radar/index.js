import React, { memo, useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const Radar = (props) => {
  const { transferRadarData, firstM, secondM } = props
  //防止报错
  // console.log('雷达图数据', transferRadarData)
  const radarRef = useRef(null)
  const attr = {
    active: '活跃天数',
    correct: '正确率',
    master: '掌握程度',
    question: '答题数',
    submit: '提交次数'
  }
  let dataProcess = []
  for (let i in transferRadarData) {
    let tempArr = []
    for (let j in Object.keys(attr)) {
      let sum = transferRadarData[i].reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue[Object.keys(attr)[j]],
        0
      )
      let average = sum / transferRadarData[i].length
      tempArr.push(average)
    }
    dataProcess.push(tempArr)
  }
  // console.log('雷达图数据', dataProcess)

  let res = {}
  res[firstM] = dataProcess[0]
  res[secondM] = dataProcess[1]
  useEffect(() => {
    drawRadar()
    // console.log('雷达图', res)
  }, [transferRadarData])

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
        left: '4%',
        width: '50px',
        data: name
      },
      tooltip: {
        trigger: 'item',
        show: 'true',
        formatter: (params) => {
          //   console.log('tooltip', params.data)
          let { value, name } = params.data
          let str = ''
          for (let i in value) {
            str =
              str +
              Object.values(attr)[i] +
              ':' +
              value[i].toFixed(2) +
              '<br />'
          }
          return `${name}<br />${str}`
        }
      },
      radar: {
        // shape: 'circle',
        indicator: Object.values(attr).map((x) => {
          return { name: x }
        }),
        axisName: {
          color: '#888'
        },
        center: ['50%', '60%']
      },
      // color: ['#F3D475', '#F3B28A', '#F1928E'],
      color: ['#FAD891', '#6D9AC4', '#777B98'],
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: res[firstM],
              name: firstM
            },
            {
              value: res[secondM],
              name: secondM
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
        width: '30%',
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
