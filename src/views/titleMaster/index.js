import React, { memo } from 'react'
import { TitleMasterWrapper } from './style'
import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { getTitleMasterInfo } from '../../api'
import { getTitleMemoryInfo } from '../../api'
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
    handleClickTitleFlag
  } = props
  const titleMasterRef = useRef(null)
  // const subKnowledgeRef = useRef(null)
  const timeDistributionRef = useRef(null)
  const memoryDistributionRef = useRef(null)

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
        axisLabel: {
          fontSize: 10
        }
      },
      color: ['#3770A7', '#64B4B1', '#EDCC65'],
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
      handleHighLightedXaix(params.name)
      handleClickTitleFlag(1) //将折线图缩小
      //根据params的name对应该题目名称，提取该题目的数据
      let memoryInfo = {}
      let timeInfo = {}
      getTitleMemoryInfo(classNum, params.name).then((res) => {
        memoryInfo = res.memory
        timeInfo = res.time

        // 检查是否已有图表实例存在，并销毁它
        // const existingInstancesubKnowledge = echarts.getInstanceByDom(
        //   subKnowledgeRef.current
        // )
        // if (existingInstancesubKnowledge) {
        //   existingInstancesubKnowledge.dispose()
        // }
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
        // const subKnowledgeChart = echarts.init(subKnowledgeRef.current)
        // subKnowledgeChart.clear() //清空实例重画
        // //假数据
        // var data1 = [
        //   {
        //     name: 'Q1',
        //     children: [
        //       {
        //         name: 'R',
        //         value: 15
        //       },
        //       {
        //         name: 'B',
        //         children: [
        //           {
        //             name: 'B_a',
        //             value: 4
        //           }
        //         ]
        //       },
        //       {
        //         name: 'D',
        //         value: 10,
        //         children: [
        //           {
        //             name: 'D_p',
        //             value: 5,
        //             itemStyle: {
        //               color: 'red'
        //             }
        //           },
        //           {
        //             name: 'D_y',
        //             value: 5
        //           }
        //         ]
        //       }
        //     ]
        //   }
        // ]
        // const subOption = {
        //   title: {
        //     text: params.name + '对应知识点掌握情况',
        //     left: 'center',
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
        //   visualMap: {
        //     type: 'continuous',
        //     min: 0,
        //     max: 10,
        //     inRange: {
        //       color: ['#5EB8DF', '#5E98DF', '#5E84DF', '#4C7AE4']
        //     },
        //     show: false
        //   },
        //   grid: {
        //     left: '30%', // 左边距
        //     top: '0%', // 上边距
        //     right: '5%',
        //     bottom: '20%' // 下边距
        //   },
        //   series: {
        //     type: 'sunburst',
        //     data: data1,
        //     radius: [0, '78%'],
        //     label: {
        //       rotate: 'radial'
        //       // position: 'inside' // 将标签放置在圆弧内部
        //     }
        //   }
        // }

        // subKnowledgeChart.setOption(subOption)

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
            data: timeInfo.keys
          },
          yAxis: {
            type: 'value'
          },
          color: ['#71B0D1'],
          series: [
            {
              data: timeInfo.value,
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
          color: ['#71B0D1'],
          series: [
            {
              data: memoryInfo.keys,
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
    })

    //根据知识点掌握程度的点击事件生成相应的分布
    if (highlightedXAxisName !== null) {
      handleHighLightedXaix(highlightedXAxisName)
      handleClickTitleFlag(1) //将折线图缩小
      //根据params的name对应该题目名称，提取该题目的数据
      let memoryInfo = {}
      let timeInfo = {}
      getTitleMemoryInfo(classNum, highlightedXAxisName).then((res) => {
        memoryInfo = res.memory
        timeInfo = res.time

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
        const timeDistributionChart = echarts.init(timeDistributionRef.current)
        timeDistributionChart.clear() //清空实例重画
        const timeOption = {
          title: {
            text: highlightedXAxisName + '用时分布',
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
            data: timeInfo.keys
          },
          yAxis: {
            type: 'value'
          },
          color: ['#71B0D1'],
          series: [
            {
              data: timeInfo.value,
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
            text: highlightedXAxisName + '内存分布',
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
          color: ['#71B0D1'],
          series: [
            {
              data: memoryInfo.keys,
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
  }

  useEffect(() => {
    getTitleMasterInfo(classNum).then((res) => {
      drawKnowledge(res)
    })
    // handleHighLightedXaix('Q_n2B')
    // 初始化系统时更新组件
  }, [classNum, isChangeWeight, clicktitleFlag, highlightedXAxisName])

  return (
    <TitleMasterWrapper>
      <div className="title">
        <div className="title-icon">
          <IconFont type="icon-zhangwoshuai" />
        </div>
        题目掌握程度
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
