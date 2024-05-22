import React, { memo, useEffect, useRef } from 'react'
import ReactEcharts from 'echarts-for-react'
import { StudentCommitWrapper } from './style'
// import * as d3 from 'd3'
import * as echarts from 'echarts'
const StudentCommit = (props) => {
  // 拿到父组件传递的模式状态
  const { mode, month } = props
  console.log(month)
  const commitCountChartRef = useRef(null)

  //假数据
  //所做的每道题目的每次提交的用时分布、内存分布、答题状态、使用语言、提交时间
  const commitdata = {
    Q1: [
      [0.2, 0.3, 'Error', 'Method_B', 1695996174],
      [0.2, 0.3, 'Error', 'Method_m', 1695996230],
      [0.2, 0.3, 'Partially_Correct', 'Method_g', 1695996338],
      [0.2, 0.3, 'Error', 'Method_B', 1695996482]
    ],
    Q2: [
      [0.2, 0.3, 'Error', 'Method_B', 1695996174],
      [0.2, 0.3, 'Error', 'Method_m', 1695996230],
      [0.2, 0.3, 'Partially_Correct', 'Method_5', 1695996338],
      [0.2, 0.3, 'Absolutely_Correct', 'Method_B', 1695996482]
    ],
    Q3: [
      [0.2, 0.3, 'Error', 'Method_B', 1695996482],
      [0.2, 0.3, 'Error', 'Method_m', 1695996536],
      [0.2, 0.3, 'Error', 'Method_B', 1695999282],
      [0.2, 0.3, 'Error', 'Method_B', 1696036826]
    ],
    Q4: [
      [0.2, 0.3, 'Error', 'Method_B', 1695996174],
      [0.2, 0.3, 'Error', 'Method_m', 1695996230],
      [0.2, 0.3, 'Absolutely_Correct', 'Method_B', 1695996338],
      [0.2, 0.3, 'Error', 'Method_5', 1695996482]
    ],
    Q5: [
      [0.2, 0.3, 'Absolutely_Correct', 'Method_B', 1695996174],
      [0.2, 0.3, 'Error', 'Method_B', 1695996338],
      [0.2, 0.3, 'Error', 'Method_g', 1695996482]
    ]
  }
  //绘制学生提交事件图
  function drawCommit() {
    // const commitrectwidth = 20
    // 获取提交时间和次数的最大值和最小值
    let minTime = Infinity
    let maxTime = -Infinity
    let maxCount = -Infinity

    for (const key in commitdata) {
      const commits = commitdata[key]
      commits.forEach((commit) => {
        minTime = Math.min(minTime, commit[4])
        maxTime = Math.max(maxTime, commit[4])
      })
      maxCount = Math.max(maxCount, commits.length)
    }
    // 绘制提取提交次数数据
    // const commitCounts = Object.entries(commitdata).map(([key, value]) => ({
    //   Question: key,
    //   Count: value.length
    // }))
    // 生成问题名称数组和对应的提交次数数组
    const questionsnum = Object.keys(commitdata)
    const commitnum = questionsnum.map(
      (question) => commitdata[question].length
    )

    // 检查是否已有图表实例存在，并销毁它
    const existingInstance = echarts.getInstanceByDom(
      commitCountChartRef.current
    )
    if (existingInstance) {
      existingInstance.dispose()
    }
    const commitCountChart = echarts.init(commitCountChartRef.current)

    const commitCountOption = {
      title: {
        left: 'center',
        text: 'Large Area Chart'
      },
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
          return [pt[0], '10%']
        }
      },
      grid: {
        left: '5%', // 左边距
        top: '20%', // 上边距
        right: '2%',
        bottom: '20%' // 下边距
      },
      xAxis: {
        type: 'category',
        data: questionsnum
      },
      yAxis: {
        type: 'value'
      },
      dataZoom: [
        {
          type: 'inside'
        }
      ],
      series: [
        {
          data: commitnum,
          type: 'line',
          smooth: true,
          itemStyle: {
            color: 'rgb(255, 70, 131)'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 158, 68)'
              },
              {
                offset: 1,
                color: 'rgb(255, 70, 131)'
              }
            ])
          }
        }
      ]
    }
    commitCountChart.setOption(commitCountOption)
    window.onresize = commitCountChart.resize

    // // 设置画布大小和边距
    // const margin = { top: 30, right: 20, bottom: 20, left: 20 }
    // // 创建SVG元素
    // const svg = d3
    //   .select('.StudentCommitview')
    //   .append('svg')
    //   .attr('class', 'studentCommitsvg')
    //   .attr('width', '100%')
    //   .attr('height', '99%')

    // // 创建比例尺
    // const numQuestions = Object.keys(commitdata).length
    // const barWidth = (width - margin.left) / Object.keys(commitdata).length
    // const XtotalWidth = numQuestions * barWidth
    // const xScale = d3
    //   .scaleBand()
    //   .domain(Object.keys(commitdata))
    //   .range([margin.left, XtotalWidth - margin.right])
    //   .padding(0.1)

    // const yScaleCount = d3
    //   .scaleLinear()
    //   .domain([maxCount, 0])
    //   .range([0, 120 - margin.bottom])

    // const commitCountg = svg
    //   .append('g')
    //   .attr('transform', `translate(${margin.left},${margin.top})`)

    // // 创建横轴
    // commitCountg
    //   .append('g')
    //   .attr('class', 'x-axis')
    //   .attr('transform', `translate(0,${120 - margin.bottom})`)
    //   .call(d3.axisBottom(xScale))
    // // 创建次数纵轴
    // commitCountg
    //   .append('g')
    //   .attr('class', 'y-axis')
    //   .attr('transform', `translate(${margin.right},0)`)
    //   .call(d3.axisLeft(yScaleCount))

    // //绘制提交次数的折线面积图
    // // 提取提交次数数据
    // const commitCounts = Object.entries(commitdata).map(([key, value]) => ({
    //   Question: key,
    //   Count: value.length
    // }))
    // // 创建线生成器
    // const lineGenerator = d3
    //   .line()
    //   .x((d) => xScale(d.Question) + barWidth / 2 - 10)
    //   .y((d) => yScaleCount(d.Count))
    //   .curve(d3.curveBasis) // 设置基数样条曲线插值方法

    // // 绘制提交次数折线图
    // commitCountg
    //   .append('path')
    //   .datum(commitCounts)
    //   .attr('fill', 'none')
    //   .attr('stroke', 'blue')
    //   .attr('stroke-width', 2)
    //   .attr('d', lineGenerator)

    // //绘制面积图
    // // 创建颜色比例尺
    // const areaColorScale = d3
    //   .scaleLinear()
    //   .domain([0, d3.max(commitCounts, (d) => d.Count)])
    //   .range(['#FFFFFF', '#3366CC']) // 渐变颜色范围

    // // 创建面积生成器
    // const areaGenerator = d3
    //   .area()
    //   .x((d) => xScale(d.Question) + barWidth / 2 - 10)
    //   .y0(120 - margin.bottom)
    //   .y1((d) => yScaleCount(d.count))
    // // 绘制面积填充
    // commitCountg
    //   .append('path')
    //   .datum(commitCounts)
    //   .attr('fill', (d) => areaColorScale(d.Count)) // 使用渐变颜色填充面积
    //   .attr('stroke', 'none')
    //   .attr('d', areaGenerator)
  }

  //绘制时间模式的对比分析图
  const option2 = {
    title: [
      {
        text: 'Tangential Polar Bar Label Position (middle)'
      }
    ],
    polar: {
      radius: [30, '80%']
    },
    angleAxis: {
      max: 4,
      startAngle: 75
    },
    radiusAxis: {
      type: 'category',
      data: ['a', 'b', 'c', 'd']
    },
    tooltip: {},
    series: {
      type: 'bar',
      data: [2, 1.2, 2.4, 3.6],
      coordinateSystem: 'polar',
      label: {
        show: true,
        position: 'middle',
        formatter: '{b}: {c}'
      }
    }
  }

  //视图更新
  useEffect(() => {
    //更新重画
    // d3.select('svg').remove() //移除已有的svg元素
    // // 选择现有的 SVG 元素，如果已经存在则移除它
    // d3.select('.studentCommitsvg').remove()
    if (mode == 0) {
      drawCommit()
    }
  }, [mode])

  return (
    <StudentCommitWrapper>
      {/* mode=0答题模式 ，mode=1时间模式*/}
      {mode == 0 && <div className="title">学生提交事件</div>}
      {mode == 1 && <div className="title">高峰分析矩阵图</div>}
      <div className="Studentview">
        {/* mode=0答题模式 ，mode=1时间模式*/}
        {mode == 0 && (
          <div className="StudentCommitview">
            <div className="commitchart" ref={commitCountChartRef}></div>
          </div>
        )}
        {mode == 1 && (
          <ReactEcharts
            option={option2}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </div>
    </StudentCommitWrapper>
  )
}
export default memo(StudentCommit)
