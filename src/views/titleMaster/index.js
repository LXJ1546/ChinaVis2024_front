import React, { memo } from 'react'
import { TitleMasterWrapper } from './style'
import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { getTitleMasterInfo } from '../../api'
import {
  getTitleMemoryInfo,
  getPersonalTitleMasterInfo,
  getPersonalTitleTimeMemoryInfo
} from '../../api'
import { createFromIconfontCN } from '@ant-design/icons'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4565164_juvpif6y83m.js'
})

const TitleMaster = (props) => {
  const {
    classNum,
    isChangeWeight,
    highlightedXAxisName,
    handleHighLightedXaix,
    clicktitleFlag,
    handleClickTitleFlag,
    clickStudentId,
    isKonwClick,
    handleIsKnowClick
  } = props
  const titleMasterRef = useRef(null)
  // const subKnowledgeRef = useRef(null)
  const timeDistributionRef = useRef(null)
  const memoryDistributionRef = useRef(null)
  // const [clickedParamsName, setClickedParamsName] = useState(null)
  // const [personalMemoryInfo, setPersonalMemoryInfo] = useState(0)
  // const [personalTimeInfo, setPersonalTimeInfo] = useState(0)
  // const [timeIndex, setTimeIndex] = useState(-1)
  // const [memoryIndex, setMemoryIndex] = useState(-1)

  //主知识点和从属知识点的掌握情况
  function drawKnowledge(titleInfo) {
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
          fontWeight: 'bold'
        },
        left: '1%'
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
        // left: 'right',
        right: '1%'
      },
      grid: {
        left: '8%', // 距离左边框的距离
        right: '5%', // 距离右边框的距离
        top: '15%', // 距离上边框的距离
        bottom: '25%' // 距离下边框的距离
      },
      xAxis: {
        type: 'category',
        data: [
          'Q_bum',
          'Q_62X',
          'Q_ZTb',
          'Q_FNg',
          'Q_hZ5',
          'Q_xql',
          'Q_YWX',
          'Q_X3w',
          'Q_5fg',
          'Q_oCj',
          'Q_EhV',
          'Q_Az7',
          'Q_Ou3',
          'Q_UXq',
          'Q_x2F',
          'Q_Mh4',
          'Q_lU2',
          'Q_Ej5',
          'Q_pVK',
          'Q_QRm',
          'Q_Jr4',
          'Q_7NJ',
          'Q_n2B',
          'Q_Nix',
          'Q_TmK',
          'Q_s6V',
          'Q_tgO',
          'Q_4nH',
          'Q_6RQ',
          'Q_h7p',
          'Q_x2L',
          'Q_3Mw',
          'Q_3oP',
          'Q_rvB',
          'Q_BW0',
          'Q_fZr',
          'Q_q7O',
          'Q_VgK'
        ],
        axisLabel: {
          fontSize: 10,
          rotate: 30
        }
        // axisPointer: {
        //   show: true,
        //   type: 'shadow',
        //   label: {
        //     show: true,
        //     backgroundColor: 'rgba(255, 0, 0, 0.5)' // 设置背景颜色
        //   }
        // }
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 1,
        axisLabel: {
          fontSize: 10
        }
      },
      // color: ['#3A80E2', '#6ABF57', '#EDCC65'],
      color: ['#71B0D1', '#87c977', '#EDCC65'],
      series: titleInfo,
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

    //高亮某个问题
    if (highlightedXAxisName != null) {
      titleMasterChart.setOption({
        xAxis: {
          axisPointer: {
            show: true,
            type: 'shadow',
            value: highlightedXAxisName,
            label: {
              show: true,
              fontSize: 10, // 设置字体大小
              backgroundColor: 'rgba(255, 0, 0, 0.5)'
            },
            handle: {
              show: true,
              color: 'rgba(255, 0, 0, 0.5)',
              size: [10, 30] // 设置大拖条的宽度和高度
            }
          }
        },
        animation: false
      })
    }

    // 根据主知识点图表的提示信息更新从属知识点图表的数据,用时分布的数据，内存分布的数据
    titleMasterChart.on('click', function (params) {
      handleIsKnowClick(false)
      handleHighLightedXaix(params.name)
      handleClickTitleFlag(1) //将折线图缩小
      //根据params的name对应该题目名称，提取该题目的数据
      let memoryInfo = {}
      let timeInfo = {}
      let personalMemoryInfo = 0
      let personalTimeInfo = 0
      // 拿到学生的个人用时和内存分布
      if (clickStudentId != null) {
        const firstRequest = getPersonalTitleTimeMemoryInfo(
          clickStudentId,
          params.name
        ).then((res) => {
          personalMemoryInfo = res.memory
          personalTimeInfo = res.time
        })
        // 第一个请求完成后再执行第二个请求
        Promise.all([firstRequest]).then(() => {
          getTitleMemoryInfo(classNum, params.name).then((res) => {
            memoryInfo = res.memory
            timeInfo = res.time
            // 检查是否已有图表实例存在，并销毁它
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
            //题目对应用时分布
            const timeDistributionChart = echarts.init(
              timeDistributionRef.current
            )
            timeDistributionChart.clear() //清空实例重画
            let timeIndex = -1
            if (personalMemoryInfo != 0 && personalTimeInfo != 0) {
              console.log(personalMemoryInfo, personalTimeInfo)
              // 根据值匹配对应的标签
              if (Object.keys(timeInfo).length != 0) {
                timeIndex = timeInfo.keys
                  .map(parseFloat)
                  .indexOf(personalTimeInfo)
                // setTimeIndex(timeIndex1)
                console.log(timeInfo.keys)
                console.log('timeIndex', timeIndex)
              }
            }
            const timeOption = {
              title: {
                text: params.name + '用时分布',
                left: 'center',
                textStyle: {
                  fontSize: 10,
                  fontWeight: 'bold'
                }
              },
              tooltip: {
                trigger: 'item',
                axisPointer: {
                  type: 'shadow'
                }
              },
              grid: {
                left: '15%', // 左边距
                top: '20%', // 上边距
                right: '10%',
                bottom: '20%' // 下边距
              },
              xAxis: {
                type: 'category',
                data: timeInfo.keys
              },
              yAxis: {
                type: 'value'
              },
              // color: ['#86C6F0'],
              series: [
                {
                  data: timeInfo.value,
                  type: 'bar',
                  itemStyle: {
                    color: (params) => {
                      // 使用箭头函数确保在函数内部可以正确地访问到最新的 timeIndex 值
                      return params.dataIndex === timeIndex
                        ? '#EB8277'
                        : '#86C6F0'
                    }
                  }
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
            // 根据值匹配对应的标签
            let memoryIndex = -1
            if (personalMemoryInfo != 0 && personalTimeInfo != 0) {
              // 根据值匹配对应的标签
              if (Object.keys(memoryInfo).length != 0) {
                memoryIndex = memoryInfo.keys
                  .map(parseFloat)
                  .indexOf(personalMemoryInfo)
                // setMemoryIndex(
                //   memoryInfo.keys.map(parseFloat).indexOf(personalMemoryInfo)
                // )
                // console.log('memoryIndex', memoryIndex)
              }
            }
            const memoryOption = {
              title: {
                text: params.name + '内存分布',
                left: 'center',
                textStyle: {
                  fontSize: 10,
                  fontWeight: 'bold'
                }
              },
              tooltip: {
                trigger: 'item',
                axisPointer: {
                  type: 'shadow'
                }
              },
              grid: {
                left: '15%', // 左边距
                top: '20%', // 上边距
                right: '5%',
                bottom: '20%' // 下边距
              },
              xAxis: {
                type: 'category',
                data: memoryInfo.keys
              },
              yAxis: {
                type: 'value'
              },
              // color: ['#86C6F0'],
              series: [
                {
                  data: memoryInfo.value,
                  type: 'bar',
                  itemStyle: {
                    color: function (params) {
                      return params.dataIndex === memoryIndex &&
                        memoryIndex != -1
                        ? '#EB8277'
                        : '#86C6F0'
                    }
                  }
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
        })
      } else {
        getTitleMemoryInfo(classNum, params.name).then((res) => {
          memoryInfo = res.memory
          timeInfo = res.time
          // 检查是否已有图表实例存在，并销毁它
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
          //题目对应用时分布
          const timeDistributionChart = echarts.init(
            timeDistributionRef.current
          )
          timeDistributionChart.clear() //清空实例重画
          const timeOption = {
            title: {
              text: params.name + '用时分布',
              left: 'center',
              textStyle: {
                fontSize: 10,
                fontWeight: 'bold'
              }
            },
            tooltip: {
              trigger: 'item',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: '15%', // 左边距
              top: '20%', // 上边距
              right: '10%',
              bottom: '20%' // 下边距
            },
            xAxis: {
              type: 'category',
              data: timeInfo.keys
            },
            yAxis: {
              type: 'value'
            },
            // color: ['#86C6F0'],
            series: [
              {
                data: timeInfo.value,
                type: 'bar',
                itemStyle: {
                  color: '#86C6F0'
                }
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
                fontWeight: 'bold'
              }
            },
            tooltip: {
              trigger: 'item',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: '15%', // 左边距
              top: '20%', // 上边距
              right: '5%',
              bottom: '20%' // 下边距
            },
            xAxis: {
              type: 'category',
              data: memoryInfo.keys
            },
            yAxis: {
              type: 'value'
            },
            // color: ['#86C6F0'],
            series: [
              {
                data: memoryInfo.value,
                type: 'bar',
                itemStyle: {
                  color: '#86C6F0'
                }
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
    })

    //根据知识点掌握程度的点击事件生成相应的分布
    if (highlightedXAxisName !== null && isKonwClick) {
      handleHighLightedXaix(highlightedXAxisName)
      handleClickTitleFlag(1) //将折线图缩小
      //根据params的name对应该题目名称，提取该题目的数据
      let memoryInfo = {}
      let timeInfo = {}
      let personalMemoryInfo = 0
      let personalTimeInfo = 0
      // 拿到学生的个人用时和内存分布
      if (clickStudentId != null) {
        const firstRequest = getPersonalTitleTimeMemoryInfo(
          clickStudentId,
          highlightedXAxisName
        ).then((res) => {
          personalMemoryInfo = res.memory
          personalTimeInfo = res.time
        })
        // 第一个请求完成后再执行第二个请求
        Promise.all([firstRequest]).then(() => {
          getTitleMemoryInfo(classNum, highlightedXAxisName).then((res) => {
            memoryInfo = res.memory
            timeInfo = res.time
            // 检查是否已有图表实例存在，并销毁它
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
            //题目对应用时分布
            const timeDistributionChart = echarts.init(
              timeDistributionRef.current
            )
            timeDistributionChart.clear() //清空实例重画
            let timeIndex = -1
            if (personalMemoryInfo != 0 && personalTimeInfo != 0) {
              // 根据值匹配对应的标签
              if (Object.keys(timeInfo).length != 0) {
                timeIndex = timeInfo.keys
                  .map(parseFloat)
                  .indexOf(personalTimeInfo)
              }
            }
            const timeOption = {
              title: {
                text: highlightedXAxisName + '用时分布',
                left: 'center',
                textStyle: {
                  fontSize: 10,
                  fontWeight: 'bold'
                }
              },
              tooltip: {
                trigger: 'item',
                axisPointer: {
                  type: 'shadow'
                }
              },
              grid: {
                left: '15%', // 左边距
                top: '20%', // 上边距
                right: '10%',
                bottom: '20%' // 下边距
              },
              xAxis: {
                type: 'category',
                data: timeInfo.keys
              },
              yAxis: {
                type: 'value'
              },
              // color: ['#86C6F0'],
              series: [
                {
                  data: timeInfo.value,
                  type: 'bar',
                  itemStyle: {
                    color: (params) => {
                      // 使用箭头函数确保在函数内部可以正确地访问到最新的 timeIndex 值
                      return params.dataIndex === timeIndex
                        ? '#EB8277'
                        : '#86C6F0'
                    }
                  }
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
            // 根据值匹配对应的标签
            let memoryIndex = -1
            if (personalMemoryInfo != 0 && personalTimeInfo != 0) {
              // 根据值匹配对应的标签
              if (Object.keys(memoryInfo).length != 0) {
                memoryIndex = memoryInfo.keys
                  .map(parseFloat)
                  .indexOf(personalMemoryInfo)
              }
            }
            const memoryOption = {
              title: {
                text: highlightedXAxisName + '内存分布',
                left: 'center',
                textStyle: {
                  fontSize: 10,
                  fontWeight: 'bold'
                }
              },
              tooltip: {
                trigger: 'item',
                axisPointer: {
                  type: 'shadow'
                }
              },
              grid: {
                left: '15%', // 左边距
                top: '20%', // 上边距
                right: '5%',
                bottom: '20%' // 下边距
              },
              xAxis: {
                type: 'category',
                data: memoryInfo.keys
              },
              yAxis: {
                type: 'value'
              },
              // color: ['#86C6F0'],
              series: [
                {
                  data: memoryInfo.value,
                  type: 'bar',
                  itemStyle: {
                    color: function (params) {
                      return params.dataIndex === memoryIndex &&
                        memoryIndex != -1
                        ? '#EB8277'
                        : '#86C6F0'
                    }
                  }
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
        })
      } else {
        getTitleMemoryInfo(classNum, highlightedXAxisName).then((res) => {
          memoryInfo = res.memory
          timeInfo = res.time
          // 检查是否已有图表实例存在，并销毁它
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
          //题目对应用时分布
          const timeDistributionChart = echarts.init(
            timeDistributionRef.current
          )
          timeDistributionChart.clear() //清空实例重画
          const timeOption = {
            title: {
              text: highlightedXAxisName + '用时分布',
              left: 'center',
              textStyle: {
                fontSize: 10,
                fontWeight: 'bold'
              }
            },
            tooltip: {
              trigger: 'item',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: '15%', // 左边距
              top: '20%', // 上边距
              right: '10%',
              bottom: '20%' // 下边距
            },
            xAxis: {
              type: 'category',
              data: timeInfo.keys
            },
            yAxis: {
              type: 'value'
            },
            // color: ['#86C6F0'],
            series: [
              {
                data: timeInfo.value,
                type: 'bar',
                itemStyle: {
                  color: '#86C6F0'
                }
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
              text: highlightedXAxisName + '内存分布',
              left: 'center',
              textStyle: {
                fontSize: 10,
                fontWeight: 'bold'
              }
            },
            tooltip: {
              trigger: 'item',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: '15%', // 左边距
              top: '20%', // 上边距
              right: '5%',
              bottom: '20%' // 下边距
            },
            xAxis: {
              type: 'category',
              data: memoryInfo.keys
            },
            yAxis: {
              type: 'value'
            },
            // color: ['#86C6F0'],
            series: [
              {
                data: memoryInfo.value,
                type: 'bar',
                itemStyle: {
                  color: '#86C6F0'
                }
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
      // getTitleMemoryInfo(classNum, highlightedXAxisName).then((res) => {
      //   memoryInfo = res.memory
      //   timeInfo = res.time

      //   const existingInstancetime = echarts.getInstanceByDom(
      //     timeDistributionRef.current
      //   )
      //   if (existingInstancetime) {
      //     existingInstancetime.dispose()
      //   }
      //   const existingInstancememory = echarts.getInstanceByDom(
      //     memoryDistributionRef.current
      //   )
      //   if (existingInstancememory) {
      //     existingInstancememory.dispose()
      //   }

      //   //题目对应用时分布
      //   const timeDistributionChart = echarts.init(timeDistributionRef.current)
      //   timeDistributionChart.clear() //清空实例重画
      //   const timeOption = {
      //     title: {
      //       text: highlightedXAxisName + '用时分布',
      //       left: 'center',
      //       textStyle: {
      //         fontSize: 10,
      //         fontWeight: 'bold'
      //       }
      //     },
      //     tooltip: {
      //       trigger: 'item',
      //       axisPointer: {
      //         type: 'shadow'
      //       }
      //     },
      //     grid: {
      //       left: '13%', // 左边距
      //       top: '20%', // 上边距
      //       right: '10%',
      //       bottom: '20%' // 下边距
      //     },
      //     xAxis: {
      //       type: 'category',
      //       data: timeInfo.keys
      //     },
      //     yAxis: {
      //       type: 'value'
      //     },
      //     color: ['#86C6F0'],
      //     series: [
      //       {
      //         data: timeInfo.value,
      //         type: 'bar'
      //       }
      //     ],
      //     dataZoom: [
      //       {
      //         id: 'dataZoomX',
      //         type: 'inside',
      //         zooLock: true,
      //         xAxisIndex: [0],
      //         filterMode: 'filter'
      //       }
      //     ]
      //   }
      //   timeDistributionChart.setOption(timeOption)

      //   //题目对应内存分布
      //   const memoryDistributionChart = echarts.init(
      //     memoryDistributionRef.current
      //   )
      //   memoryDistributionChart.clear() //清空实例重画
      //   const memoryOption = {
      //     title: {
      //       text: highlightedXAxisName + '内存分布',
      //       left: 'center',
      //       textStyle: {
      //         fontSize: 10,
      //         fontWeight: 'bold'
      //       }
      //     },
      //     tooltip: {
      //       trigger: 'item',
      //       axisPointer: {
      //         type: 'shadow'
      //       }
      //     },
      //     grid: {
      //       left: '15%', // 左边距
      //       top: '20%', // 上边距
      //       right: '4%',
      //       bottom: '20%' // 下边距
      //     },
      //     xAxis: {
      //       type: 'category',
      //       data: memoryInfo.keys
      //     },
      //     yAxis: {
      //       type: 'value'
      //     },
      //     color: ['#86C6F0'],
      //     series: [
      //       {
      //         data: memoryInfo.value,
      //         type: 'bar'
      //       }
      //     ],
      //     dataZoom: [
      //       {
      //         id: 'dataZoomX',
      //         type: 'inside',
      //         zooLock: true,
      //         xAxisIndex: [0],
      //         filterMode: 'filter'
      //       }
      //     ]
      //   }
      //   memoryDistributionChart.setOption(memoryOption)
      // })
    }
  }

  useEffect(() => {
    // 当出现点击时，直接更新为该学生的数据
    if (clickStudentId != null) {
      getPersonalTitleMasterInfo(clickStudentId).then((res) => {
        drawKnowledge(res)
      })
    } else {
      getTitleMasterInfo(classNum).then((res) => {
        drawKnowledge(res)
      })
    }
    // handleHighLightedXaix('Q_n2B')
    // 初始化系统时更新组件
  }, [
    classNum,
    isChangeWeight,
    clicktitleFlag,
    highlightedXAxisName,
    clickStudentId
  ])
  return (
    <TitleMasterWrapper>
      <div className="title">
        <div className="title-icon">
          <IconFont type="icon-zhangwoshuai" />
        </div>
        题目掌握程度折线图
      </div>
      <div className="Titleview">
        {clicktitleFlag == 0 && (
          <div className="titleMasterall" ref={titleMasterRef}></div>
        )}
        {clicktitleFlag == 1 && (
          <div>
            <div className="titleMaster" ref={titleMasterRef}></div>
            {/* <div className="subKnowledge" ref={subKnowledgeRef}></div> */}
            <div className="timeDistribution" ref={timeDistributionRef}></div>
            <div
              className="memoryDistribution"
              ref={memoryDistributionRef}
            ></div>
          </div>
        )}
      </div>
    </TitleMasterWrapper>
  )
}
export default memo(TitleMaster)
