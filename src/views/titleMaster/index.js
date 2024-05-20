import React, { memo } from 'react'
import { TitleMasterWrapper } from './style'
// import { Card } from 'antd'
import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const TitleMaster = (props) => {
  const { classNum } = props
  const titleMasterRef = useRef(null)
  const subKnowledgeRef = useRef(null)
  const timeDistributionRef = useRef(null)
  const memoryDistributionRef = useRef(null)

  //主知识点和从属知识点的掌握情况
  function drawKnowledge() {
    // 检查是否已有图表实例存在，并销毁它
    const existingInstance = echarts.getInstanceByDom(titleMasterRef.current)
    if (existingInstance) {
      existingInstance.dispose()
    }
    const titleMasterChart = echarts.init(titleMasterRef.current)
    const titleMasterOption = {
      title: {
        text: '题目掌握情况',
        textStyle: {
          fontSize: 12,
          fontWeight: 'normal'
        }
      },
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        show: true,
        data: ['掌握程度', '得分率', '正确占比'],
        left: 'right'
      },
      grid: {
        left: '8%', // 距离左边框的距离
        right: '5%', // 距离右边框的距离
        top: '20%', // 距离上边框的距离
        bottom: '20%' // 距离下边框的距离
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', '8'],
        axisLabel: {
          fontSize: 10,
          interval: 0
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          fontSize: 10
        }
      },
      series: [
        //分别对应掌握程度、得分率、正确占比
        {
          name: '掌握程度',
          data: [0.82, 0.3, 0.6, 0.6, 0.33, 0.35, 0.5, 0.12],
          type: 'line',
          smooth: true
        },
        {
          name: '得分率',
          data: [0.82, 0.932, 0.901, 0.934, 0.129, 0.133, 0.0132, 0.4],
          type: 'line',
          smooth: true
        },
        {
          name: '正确占比',
          data: [0.2, 0.55, 0.3, 0.44, 0.27, 0.25, 0.6, 0.8],
          type: 'line',
          smooth: true
        }
      ],
      dataZoom: [
        {
          id: 'dataZoomX',
          type: 'inside',
          zooLock: true,
          xAxisIndex: [0],
          filterMode: 'filter'
        }
      ]
    }
    titleMasterChart.setOption(titleMasterOption)
    window.onresize = titleMasterChart.resize

    // 根据主知识点图表的提示信息更新从属知识点图表的数据,用时分布的数据，内存分布的数据
    titleMasterChart.on('click', function (params) {
      //根据params的name对应该题目名称，提取该题目的数据
      //   const titleData =

      // 检查是否已有图表实例存在，并销毁它
      const existingInstancesubKnowledge = echarts.getInstanceByDom(
        subKnowledgeRef.current
      )
      if (existingInstancesubKnowledge) {
        existingInstancesubKnowledge.dispose()
      }
      const existingInstancetime = echarts.getInstanceByDom(
        timeDistributionRef.current
      )
      if (existingInstancetime) {
        existingInstancetime.dispose()
      }
      const existingInstancememory = echarts.getInstanceByDom(
        memoryDistributionRef.current
      )
      if (existingInstancememory) {
        existingInstancememory.dispose()
      }

      //题目对应从属知识点
      const subKnowledgeChart = echarts.init(subKnowledgeRef.current)
      subKnowledgeChart.clear() //清空实例重画
      //假数据
      var data1 = [
        {
          name: 'Q1',
          children: [
            {
              name: 'R',
              value: 15
            },
            {
              name: 'B',
              children: [
                {
                  name: 'B_a',
                  value: 4
                }
              ]
            },
            {
              name: 'D',
              value: 10,
              children: [
                {
                  name: 'D_p',
                  value: 5,
                  itemStyle: {
                    color: 'red'
                  }
                },
                {
                  name: 'D_y',
                  value: 5
                }
              ]
            }
          ]
        }
      ]
      const subOption = {
        title: {
          text: params.name + '对应知识点掌握情况',
          left: 'center',
          textStyle: {
            fontSize: 10,
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          }
        },
        visualMap: {
          type: 'continuous',
          min: 0,
          max: 10,
          inRange: {
            color: ['#5EB8DF', '#5E98DF', '#5E84DF', '#4C7AE4']
          },
          show: false
        },
        grid: {
          left: '30%', // 左边距
          top: '0%', // 上边距
          right: '5%',
          bottom: '20%' // 下边距
        },
        series: {
          type: 'sunburst',
          data: data1,
          radius: [0, '78%'],
          label: {
            rotate: 'radial'
            // position: 'inside' // 将标签放置在圆弧内部
          }
        }
      }

      subKnowledgeChart.setOption(subOption)

      //题目对应用时分布
      const timeDistributionChart = echarts.init(timeDistributionRef.current)
      timeDistributionChart.clear() //清空实例重画
      const timeOption = {
        title: {
          text: params.name + '用时分布',
          left: 'center',
          textStyle: {
            fontSize: 10,
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '10%', // 左边距
          top: '20%', // 上边距
          right: '10%',
          bottom: '20%' // 下边距
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
            data: [
              120,
              {
                value: 200,
                itemStyle: {
                  color: '#a90000'
                }
              },
              150,
              80,
              70,
              110,
              130
            ],
            type: 'bar'
          }
        ],
        dataZoom: [
          {
            id: 'dataZoomX',
            type: 'inside',
            zooLock: true,
            xAxisIndex: [0],
            filterMode: 'filter'
          }
        ]
      }
      timeDistributionChart.setOption(timeOption)

      //题目对应内存分布
      const memoryDistributionChart = echarts.init(
        memoryDistributionRef.current
      )
      memoryDistributionChart.clear() //清空实例重画
      const memoryOption = {
        title: {
          text: params.name + '内存分布',
          left: 'center',
          textStyle: {
            fontSize: 10,
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '10%', // 左边距
          top: '20%', // 上边距
          right: '10%',
          bottom: '20%' // 下边距
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
            data: [
              120,
              {
                value: 200,
                itemStyle: {
                  color: '#a90000'
                }
              },
              150,
              80,
              70,
              110,
              130
            ],
            type: 'bar'
          }
        ],
        dataZoom: [
          {
            id: 'dataZoomX',
            type: 'inside',
            zooLock: true,
            xAxisIndex: [0],
            filterMode: 'filter'
          }
        ]
      }
      memoryDistributionChart.setOption(memoryOption)
    })
  }

  useEffect(() => {
    console.log('知识' + classNum)
    drawKnowledge()
  }, [classNum])

  return (
    <TitleMasterWrapper>
      <div className="title">题目掌握程度</div>
      <div className="Titleview">
        <div className="titleMaster" ref={titleMasterRef}></div>
        <div className="subKnowledge" ref={subKnowledgeRef}></div>
        <div className="timeDistribution" ref={timeDistributionRef}></div>
        <div className="memoryDistribution" ref={memoryDistributionRef}></div>
      </div>
    </TitleMasterWrapper>
  )
}
export default memo(TitleMaster)
