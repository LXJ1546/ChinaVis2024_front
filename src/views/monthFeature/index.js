import React, { memo, useRef, useEffect } from 'react'
import * as d3 from 'd3'
import ReactEcharts from 'echarts-for-react'
import { MonthFeatureWrapper } from './style'
const MonthFeature = () => {
  // 拿到svg的引用
  const svgRef = useRef(null)
  const virtualData = [
    [65, 23, 77, 34],
    [25, 44, 89, 56],
    [45, 23, 67, 30],
    [32, 30, 50, 64],
    [32, 30, 50, 64],
    [32, 30, 50, 64],
    [32, 30, 50, 64],
    [32, 30, 50, 64],
    [32, 30, 50, 64],
    [32, 30, 50, 64],
    [32, 30, 50, 64],
    [32, 30, 50, 64],
    [32, 30, 50, 64],
    [32, 30, 50, 64]
  ]
  const option1 = {
    grid: { left: '0%', top: '5%', right: '0%', bottom: '0%' },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'line',
        color: '#FFE4E1',
        areaStyle: {}
      }
    ]
  }
  const option2 = {
    grid: { left: '0%', top: '5%', right: '0%', bottom: '0%' },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'line',
        color: '#FFE4E1',
        areaStyle: {}
      }
    ]
  }
  const option3 = {
    grid: { left: '0%', top: '5%', right: '0%', bottom: '0%' },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'line',
        color: '#FFE4E1',
        areaStyle: {}
      }
    ]
  }
  const option4 = {
    grid: { left: '0%', top: '5%', right: '0%', bottom: '0%' },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'line',
        color: '#FFE4E1',
        areaStyle: {}
      }
    ]
  }
  const individualOption = {
    grid: { left: '10%', top: '20%', right: '10%', bottom: '15%' },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    toolbox: {
      feature: {
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true }
      }
    },
    legend: {
      top: '2%'
    },
    xAxis: [
      {
        type: 'category',
        data: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: 250,
        interval: 50
      },
      {
        type: 'value',
        min: 0,
        max: 25,
        interval: 5
      }
    ],
    series: [
      {
        name: '提交次数',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' ml'
          }
        },
        data: [
          2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
        ]
      },
      {
        name: '正确率',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value + ' °C'
          }
        },
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      }
    ]
  }
  // const radarOption = {
  //   legend: {
  //     left: '5%'
  //   },
  //   radar: {
  //     indicator: [
  //       { text: '提交次数' },
  //       { text: '活跃天数' },
  //       { text: '正确率' },
  //       { text: '答题数' }
  //     ],
  //     center: ['50%', '50%'],
  //     radius: '70%',
  //     startAngle: 90,
  //     splitNumber: 4,
  //     shape: 'circle',
  //     nameGap: 5,
  //     axisName: {
  //       color: '#428BD4'
  //     },
  //     splitArea: {
  //       // areaStyle: {
  //       //   // color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
  //       //   shadowColor: 'rgba(0, 0, 0, 0.2)',
  //       //   shadowBlur: 10
  //       // }
  //     },

  //     axisLine: {
  //       lineStyle: {
  //         color: 'rgba(211, 253, 250, 0.8)'
  //       }
  //     },
  //     splitLine: {
  //       lineStyle: {
  //         color: 'rgb(220,220,220)'
  //       }
  //     }
  //   },
  //   series: [
  //     {
  //       type: 'radar',
  //       emphasis: {
  //         lineStyle: {
  //           width: 4
  //         }
  //       },
  //       data: [
  //         {
  //           value: [100, 8, 0.4, -80, 2000],
  //           name: '学生 A'
  //         },
  //         {
  //           value: [60, 5, 0.3, -100, 1500],
  //           name: '学生 B',
  //           areaStyle: {
  //             color: 'rgba(255, 228, 52, 0.6)'
  //           }
  //         }
  //       ]
  //     }
  //   ]
  // }
  const parallelOption = {
    parallel: {
      left: '6%',
      top: '15%',
      right: '13%',
      bottom: '6%',
      parallelAxisDefault: {
        nameGap: 8
      }
    },
    parallelAxis: [
      { dim: 0, name: '提交次数' },
      { dim: 1, name: '活跃天数' },
      { dim: 2, name: '正确率' },
      { dim: 3, name: '答题数' },
      {
        dim: 4,
        name: '模式',
        type: 'category',
        data: ['针对型', '多样型', '尝试型']
      }
    ],
    series: [
      {
        type: 'parallel',
        lineStyle: {
          width: 2
        },
        data: [
          [100, 8, 0.4, 20, '多样型'],
          [80, 5, 0.5, 13, '尝试型'],
          [30, 2, 0.8, 5, '针对型']
        ]
      },
      {
        type: 'parallel',
        lineStyle: {
          width: 2
        },
        data: [
          [50, 6, 0.4, 10, '多样型'],
          [40, 3, 0.3, 8, '尝试型'],
          [10, 1, 0.6, 3, '针对型']
        ]
      },
      {
        type: 'parallel',
        lineStyle: {
          width: 2
        },
        data: [
          [70, 8, 0.1, 16, '多样型'],
          [65, 7, 0.2, 15, '尝试型'],
          [60, 3, 0.4, 6, '针对型']
        ]
      }
    ]
  }
  useEffect(() => {
    const svg = d3.select(svgRef.current)

    // 清空之前的绘制
    svg.selectAll('*').remove()

    // 创建颜色比例尺
    const colorScale = d3
      .scaleSequential(
        d3.interpolateRgbBasis(['#ffebcd', '#f4a460', '#d2691e'])
      )
      .domain([0, 100]) // 假设数据范围为0到100

    // 渲染矩形
    svg
      .selectAll('g')
      .data(virtualData)
      .enter()
      .append('g')
      .attr('transform', (_, i) => `translate(5, ${i * 30})`) // 每个学生之间间隔30像素
      /* eslint-disable no-unused-vars */
      .each(function (d, i) {
        // 在每个 g 元素中添加一个圆
        d3.select(this)
          .append('circle')
          .attr('cx', 8) // 圆形的 x 坐标为 10
          .attr('cy', 10) // 圆形的 y 坐标为矩形的高度的一半，使其垂直居中
          .attr('r', 7) // 圆形的半径为 8 像素
          .attr('fill', 'steelblue') // 圆形的填充颜色为钢蓝色

        // 在每个 g 元素中根据数据添加矩形
        d3.select(this)
          .selectAll('rect')
          .data((d) => d)
          .enter()
          .append('rect')
          .attr('x', (_, i) => 22 + i * 130) // 矩形的 x 坐标，留出空间给圆形和间隔
          .attr('y', 0)
          .attr('width', 120) // 每个矩形的固定宽度为100像素
          .attr('height', 20) // 每个矩形的固定高度为20像素
          .attr('fill', (d) => colorScale(d)) // 使用颜色比例尺编码矩形的颜色
      })
  }, [virtualData])
  return (
    <MonthFeatureWrapper>
      <div className="title">学生月答题数据视图</div>
      <div className="content">
        <div className="leftview">
          <div className="leftbar">
            <h3 className="info">正确率</h3>
            <h3 className="info">提交次数</h3>
            <h3 className="info">活跃天数</h3>
            <h3 className="info">答题数</h3>
          </div>
          <div className="underview">
            <div className="echartview">
              <div className="echartbox">
                <ReactEcharts
                  option={option1}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div className="echartbox">
                <ReactEcharts
                  option={option2}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div className="echartbox">
                <ReactEcharts
                  option={option3}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div className="echartbox">
                <ReactEcharts
                  option={option4}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>
            <div className="asvg">
              <svg ref={svgRef} width="100%" height={virtualData.length * 30} />
            </div>
          </div>
        </div>
        <div className="rightview">
          <div className="individual">
            <ReactEcharts
              option={individualOption}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className="compare">
            <ReactEcharts
              option={parallelOption}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>
    </MonthFeatureWrapper>
  )
}
export default memo(MonthFeature)
