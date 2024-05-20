import React, { memo } from 'react'
import { KnowledgeWrapper } from './style'
// import { Card } from 'antd'
import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
const Knowledge = (props) => {
  const { classNum } = props
  const knowledgeRef = useRef(null)
  const subKnowledgeRef = useRef(null)
  const titlescoreRef = useRef(null)
  const titleKnowledgeRef = useRef(null)
  //主知识点和从属知识点的掌握情况
  function drawKnowledge() {
    // 检查是否已有图表实例存在，并销毁它
    const existingInstance = echarts.getInstanceByDom(knowledgeRef.current)
    if (existingInstance) {
      existingInstance.dispose()
    }
    const KnowledgeChart = echarts.init(knowledgeRef.current)
    const KnowledgeOption = {
      title: {
        text: '题目掌握情况',
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
    KnowledgeChart.on('click', function (params) {
      // 检查是否已有图表实例存在，并销毁它
      const existingInstance = echarts.getInstanceByDom(subKnowledgeRef.current)
      if (existingInstance) {
        existingInstance.dispose()
      }
      const subKnowledgeChart = echarts.init(subKnowledgeRef.current)
      subKnowledgeChart.clear() //清空实例重画
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
          textStyle: {
            fontSize: 10,
            fontWeight: 'normal'
          }
        },
        // visualMap: {
        //   type: 'continuous',
        //   min: 0,
        //   max: 10,
        //   inRange: {
        //     color: ['#2F93C8', '#AEC48F', '#FFDB5C', '#F98862']
        //   }
        // },
        grid: {
          left: '20%', // 左边距
          top: '20%', // 上边距
          right: '20%', // 右边距
          bottom: '20%' // 下边距
        },
        series: {
          type: 'sunburst',
          data: data1,
          radius: [0, '80%'],
          label: {
            rotate: 'radial'
            // position: 'inside' // 将标签放置在圆弧内部
          }
        }
        // tooltip: {
        //   trigger: 'item',
        //   axisPointer: {
        //     type: 'shadow'
        //   }
        // },
        // grid: {
        //   left: '15%', // 距离左边框的距离
        //   right: '2%', // 距离右边框的距离
        //   top: '20%', // 距离上边框的距离
        //   bottom: '20%' // 距离下边框的距离
        // },
        // xAxis: {
        //   type: 'category',
        //   data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', '8'],
        //   axisLabel: {
        //     textStyle: {
        //       fontSize: 10
        //     },
        //     interval: 0
        //   }
        // },
        // yAxis: {
        //   type: 'value',
        //   axisLabel: {
        //     textStyle: {
        //       fontSize: 10
        //     }
        //   }
        // },
        // series: [
        //   {
        //     data: [0.82, 0.5, 0.6, 0.2, 0.54, 0.32, 0.1, 0.7],
        //     type: 'line',
        //     smooth: true
        //   }
        // ]
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
    // //旭日图
    var data = [
      {
        name: 'R',
        value: 0.65,
        itemStyle: {
          borderColor: '#cccc'
        },
        children: [
          {
            name: 'R_e',
            value: 0.8,
            children: [
              {
                name: 'Q1',
                value: 0.7
              },
              {
                name: 'Q2',
                value: 0.6
              }
            ]
          },
          {
            name: 'R_a',
            value: 0.7,
            children: [
              {
                name: 'Q2',
                value: 0.8
              },
              {
                name: 'Q4',
                value: 0.45
              }
            ]
          },
          {
            name: 'R_j',
            value: 0.7,
            children: [
              {
                name: 'Q9',
                value: 0.9
              },
              {
                name: 'Q11',
                value: 0.3
              }
            ]
          }
        ]
      },
      {
        name: 'B',
        value: 0.6,
        itemStyle: {
          borderColor: '#cccc'
        },
        children: [
          {
            name: 'B_k',
            value: 0.5,
            children: [
              {
                name: 'Q9',
                value: 0.67
              },
              {
                name: 'Q7',
                value: 0.4
              }
            ]
          }
        ]
      },
      {
        name: 'C',
        value: 0.2,
        itemStyle: {
          borderColor: '#cccc'
        },
        children: [
          {
            name: 'C_3',
            value: 0.4,
            children: [
              {
                name: 'Q5',
                value: 0.6
              },
              {
                name: 'Q12',
                value: 0.2
              }
            ]
          },
          {
            name: 'C_5',
            value: 0.6,
            children: [
              {
                name: 'Q32',
                value: 0.7
              },
              {
                name: 'Q18',
                value: 0.8
              }
            ]
          }
        ]
      }
    ]
    // 检查是否已有图表实例存在，并销毁它
    const existingInstance = echarts.getInstanceByDom(titlescoreRef.current)
    if (existingInstance) {
      existingInstance.dispose()
    }
    const titlescoreChart = echarts.init(titlescoreRef.current)
    titlescoreChart.clear() //清空实例重画
    const titlescoreOption = {
      //旭日图
      //   visualMap: {
      //     type: 'continuous',
      //     min: 0,
      //     max: 10,
      //     inRange: {
      //       color: ['#2F93C8', '#AEC48F', '#FFDB5C', '#F98862']
      //     }
      //   },
      //   grid: {
      //     left: '10%', // 左边距
      //     top: '10%', // 上边距
      //     right: '10%', // 右边距
      //     bottom: '10%' // 下边距
      //   },
      //   series: {
      //     type: 'sunburst',
      //     data: data,
      //     radius: [0, '100%'],
      //     label: {
      //       rotate: 'radial'
      //     }
      //   }
      //矩阵树图
      title: {
        text: '知识点掌握情况',
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        }
      },
      tooltip: {
        formatter: function (info) {
          var value = info.value
          var treePathInfo = info.treePathInfo
          var treePath = []
          for (var i = 1; i < treePathInfo.length; i++) {
            treePath.push(treePathInfo[i].name)
          }
          return [
            '<div class="tooltip-title">' +
              echarts.format.encodeHTML(treePath.join('/')) +
              '</div>',
            '掌握程度: ' + echarts.format.addCommas(value)
          ].join('')
        }
      },
      series: [
        {
          type: 'treemap',
          data: data,
          label: {
            show: true,
            formatter: '{b}'
          },
          upperLabel: {
            show: true,
            height: 20
          },
          // itemStyle: {
          //   borderColor: '#fff',
          //   gapWidth: 1
          // },
          //   leafDepth: 1,
          levels: [
            {},
            {
              itemStyle: {
                // borderColor: '#555',
                borderWidth: 5,
                gapWidth: 1
              },
              colorSaturation: [0.35, 0.5]
            },
            {
              itemStyle: {
                borderWidth: 5,
                gapWidth: 1
              },
              colorSaturation: [0.35, 0.5]
            }
          ],
          color: ['#942e38', '#aaa', '#269f3c'], // 设置颜色
          colorMappingBy: 'value' // 根据值来映射颜色
        }
      ]
    }
    titlescoreChart.setOption(titlescoreOption)
  }

  useEffect(() => {
    console.log('知识' + classNum)
    drawKnowledge()
    drawtitlescore()
  }, [classNum])

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
