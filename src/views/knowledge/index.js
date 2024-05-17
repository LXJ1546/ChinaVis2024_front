import React, { memo } from 'react'
// import * as echarts from 'echarts'
import { KnowledgeWrapper } from './style'
// import { Card } from 'antd'
import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
const Knowledge = () => {
  const knowledgeRef = useRef(null)
  const subKnowledgeRef = useRef(null)
  const titlescoreRef = useRef(null)
  const titleKnowledgeRef = useRef(null)
  //主知识点和从属知识点的掌握情况
  function drawKnowledge() {
    const KnowledgeChart = echarts.init(knowledgeRef.current)
    const KnowledgeOption = {
      title: {
        text: '主知识点掌握情况',
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
        left: '15%', // 距离左边框的距离
        right: '2%', // 距离右边框的距离
        top: '20%', // 距离上边框的距离
        bottom: '20%' // 距离下边框的距离
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', '8'],
        axisLabel: {
          textStyle: {
            fontSize: 10
          },
          interval: 0
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          textStyle: {
            fontSize: 10
          }
        }
      },
      series: [
        {
          data: [0.82, 0.5, 0.6, 0.2, 0.54, 0.32, 0.1, 0.7],
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
    KnowledgeChart.setOption(KnowledgeOption)
    window.onresize = KnowledgeChart.resize

    // 根据主知识点图表的提示信息更新从属知识点图表的数据
    KnowledgeChart.on('click', function () {
      const subKnowledgeChart = echarts.init(subKnowledgeRef.current)
      subKnowledgeChart.clear() //清空实例重画
      const subOption = {
        title: {
          text: '从属知识点掌握情况',
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
          left: '15%', // 距离左边框的距离
          right: '2%', // 距离右边框的距离
          top: '20%', // 距离上边框的距离
          bottom: '20%' // 距离下边框的距离
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', '8'],
          axisLabel: {
            textStyle: {
              fontSize: 10
            },
            interval: 0
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              fontSize: 10
            }
          }
        },
        series: [
          {
            data: [0.82, 0.5, 0.6, 0.2, 0.54, 0.32, 0.1, 0.7],
            type: 'line',
            smooth: true
          }
        ]
      }

      subKnowledgeChart.setOption(subOption)
    })
  }
  //知识点对应题目的掌握情况
  function drawtitlescore() {
    // const titleScoreChart = echarts.init(titlescoreRef.current)
    // const titleScoreOption = {
    //   title: {
    //     text: '题目掌握情况',
    //     textStyle: {
    //       fontSize: 10,
    //       fontWeight: 'normal'
    //     }
    //   },
    //   tooltip: {
    //     trigger: 'item',
    //     axisPointer: {
    //       type: 'shadow'
    //     }
    //   },
    //   grid: {
    //     left: '15%', // 距离左边框的距离
    //     right: '2%', // 距离右边框的距离
    //     top: '20%', // 距离上边框的距离
    //     bottom: '20%' // 距离下边框的距离
    //   },
    //   xAxis: {
    //     type: 'category',
    //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', '8'],
    //     axisLabel: {
    //       textStyle: {
    //         fontSize: 10
    //       },
    //       interval: 0
    //     }
    //   },
    //   yAxis: {
    //     type: 'value',
    //     axisLabel: {
    //       textStyle: {
    //         fontSize: 10
    //       }
    //     }
    //   },
    //   series: [
    //     {
    //       data: [0.82, 0.5, 0.6, 0.2, 0.54, 0.32, 0.1, 0.7],
    //       type: 'line',
    //       smooth: true
    //     }
    //   ],
    //   dataZoom: [
    //     {
    //       id: 'dataZoomX',
    //       type: 'inside',
    //       zooLock: true,
    //       xAxisIndex: [0],
    //       filterMode: 'filter'
    //     }
    //   ]
    // }
    // titleScoreChart.setOption(titleScoreOption)
    // window.onresize = titleScoreChart.resize
    // // 根据主知识点图表的提示信息更新从属知识点图表的数据
    // titleScoreChart.on('click', function () {
    //   const titleKnowledgeChart = echarts.init(titleKnowledgeRef.current)
    //   titleKnowledgeChart.clear() //清空实例重画
    //   const titleOption = {
    //     title: {
    //       text: '题目对应知识点掌握情况',
    //       textStyle: {
    //         fontSize: 10,
    //         fontWeight: 'normal'
    //       }
    //     },
    //     tooltip: {
    //       trigger: 'item',
    //       axisPointer: {
    //         type: 'shadow'
    //       }
    //     },
    //     grid: {
    //       left: '15%', // 距离左边框的距离
    //       right: '2%', // 距离右边框的距离
    //       top: '20%', // 距离上边框的距离
    //       bottom: '20%' // 距离下边框的距离
    //     },
    //     xAxis: {
    //       type: 'category',
    //       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', '8'],
    //       axisLabel: {
    //         textStyle: {
    //           fontSize: 10
    //         },
    //         interval: 0
    //       }
    //     },
    //     yAxis: {
    //       type: 'value',
    //       axisLabel: {
    //         textStyle: {
    //           fontSize: 10
    //         }
    //       }
    //     },
    //     series: [
    //       {
    //         data: [0.82, 0.5, 0.6, 0.2, 0.54, 0.32, 0.1, 0.7],
    //         type: 'line',
    //         smooth: true
    //       }
    //     ]
    //   }
    //   titleKnowledgeChart.setOption(titleOption)
    // })
    //旭日图
    var data = [
      {
        name: 'Grandpa',
        children: [
          {
            name: 'Uncle Leo',
            value: 15
          },
          {
            name: 'Aunt Jane',
            children: [
              {
                name: 'Cousin Kate',
                value: 4
              }
            ]
          },
          {
            name: 'Father',
            value: 10,
            children: [
              {
                name: 'Me',
                value: 5,
                itemStyle: {
                  color: 'red'
                }
              },
              {
                name: 'Brother Peter',
                value: 1
              }
            ]
          }
        ]
      },
      {
        name: 'Mike',
        children: [
          {
            name: 'Uncle Dan',
            children: [
              {
                name: 'Cousin Lucy',
                value: 3
              },
              {
                name: 'Cousin Luck',
                value: 4
              }
            ]
          }
        ]
      },
      {
        name: 'Nancy',
        children: [
          {
            name: 'Uncle Nike',
            children: [
              {
                name: 'Cousin Betty',
                value: 1
              },
              {
                name: 'Cousin Jenny',
                value: 2
              }
            ]
          }
        ]
      }
    ]
    const titlescoreChart = echarts.init(titlescoreRef.current)
    titlescoreChart.clear() //清空实例重画
    const titlescoreOption = {
      visualMap: {
        type: 'continuous',
        min: 0,
        max: 10,
        inRange: {
          color: ['#2F93C8', '#AEC48F', '#FFDB5C', '#F98862']
        }
      },
      grid: {
        left: '10%', // 左边距
        top: '10%', // 上边距
        right: '10%', // 右边距
        bottom: '10%' // 下边距
      },
      series: {
        type: 'sunburst',
        data: data,
        radius: [0, '100%'],
        label: {
          rotate: 'radial'
        }
      }
    }

    titlescoreChart.setOption(titlescoreOption)
  }

  useEffect(() => {
    drawKnowledge()
    drawtitlescore()
  })

  return (
    <KnowledgeWrapper>
      <div className="title">知识点掌握程度</div>
      <div className="Knowledgeview">
        <div className="knowledge" ref={knowledgeRef}></div>
        <div className="subKnowledge" ref={subKnowledgeRef}></div>
        <div className="titlescore" ref={titlescoreRef}></div>
        <div className="titleKnowledge" ref={titleKnowledgeRef}></div>
      </div>
    </KnowledgeWrapper>
  )
}
export default memo(Knowledge)
