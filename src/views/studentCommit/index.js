import React, { memo, useEffect, useRef } from 'react'
import ReactEcharts from 'echarts-for-react'
import { StudentCommitWrapper } from './style'
import * as d3 from 'd3'
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
    // 创建SVG元素
    const svg = d3
      .select('.commitsvg')
      .append('svg')
      .attr('class', 'studentCommitsvg')
      .attr('width', '98%')
      // .attr('height', '68%')
      .attr('transform', 'translate(10,0)')
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
    const questions = Object.keys(commitdata)
    const commitnum = questions.map((question) => commitdata[question].length)
    const commits = Object.values(commitdata).flatMap((commits, index) =>
      commits.map((commit) => ({ question: questions[index], ...commit }))
    )
    console.log(commits)

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
        text: '提交事件',
        textStyle: {
          fontSize: 15,
          fontWeight: 'normal'
        }
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
        data: questions,
        axisLabel: {
          fontSize: 10,
          interval: 0,
          rotate: 30
        }
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

    // 设置画布大小和边距
    const margin = { top: 30, right: 20, bottom: 20, left: 20 }
    const width = parseInt(svg.style('width')) - margin.left - margin.right
    // const height = parseInt(svg.style('height')) - margin.top - margin.bottom

    let QuestionFlag = {} //记录前一个同一个问题的y值
    let xScale = d3
      .scaleBand()
      .domain(questions)
      .range([margin.left, width + 15])

    const commitevent = svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)

    // // 创建 X 轴生成器
    // const xAxisGenerator = d3.axisBottom(xScale)

    // // 在 SVG 中添加 X 轴
    // commitevent
    //   .append('g')
    //   .attr('transform', 'translate(0,50)') // 将 X 轴移动到合适的位置
    //   .call(xAxisGenerator) // 调用 X 轴生成器来创建 X 轴

    // // 添加 X 轴标题
    // commitevent
    //   .append('text')
    //   .attr('x', 200) // 设置标题的位置
    //   .attr('y', 80)
    //   .style('text-anchor', 'middle') // 文本对齐方式，居中
    //   .text('X 轴')
    commitevent
      .selectAll('rect')
      .data(commits)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.question) + xScale.bandwidth() / 4)
      .attr('y', function (d) {
        // 检查questionflag中是否已存在该key
        if (Object.prototype.hasOwnProperty.call(QuestionFlag, d.question)) {
          // 如果已存在，修改对应的value值
          QuestionFlag[d.question] =
            QuestionFlag[d.question] + xScale.bandwidth() / 2 + 2
        } else {
          // 如果不存在，增加新的key-value对
          QuestionFlag[d.question] = 5
        }
        return QuestionFlag[d.question]
      })
      .attr('width', xScale.bandwidth() / 2 - 15)
      .attr('height', xScale.bandwidth() / 2 - 15)

    // 监听ECharts的dataZoom事件,提交事件同步修改缩放
    commitCountChart.on('dataZoom', function () {
      const startvalue = commitCountChart.getOption().dataZoom[0].startValue
      const endvalue = commitCountChart.getOption().dataZoom[0].endValue
      const filteredQuestions = questions.slice(startvalue, endvalue + 1)
      const filteredCommits = commits.filter((commit) =>
        filteredQuestions.includes(commit.question)
      )
      xScale.domain(filteredQuestions)
      let QuestionFlag = {} //记录前一个同一个问题的y值
      // xScale.domain(filteredQuestions)
      commitevent.selectAll('*').remove()
      commitevent
        .selectAll('rect')
        .data(filteredCommits)
        .enter()
        .append('rect')
        .attr('x', (d) => xScale(d.question) + xScale.bandwidth() / 4)
        .attr('y', function (d) {
          // 检查questionflag中是否已存在该key
          if (Object.prototype.hasOwnProperty.call(QuestionFlag, d.question)) {
            // 如果已存在，修改对应的value值
            QuestionFlag[d.question] =
              QuestionFlag[d.question] + xScale.bandwidth() / 2 + 2
          } else {
            // 如果不存在，增加新的key-value对
            QuestionFlag[d.question] = 5
          }
          return QuestionFlag[d.question]
        })
        .attr('width', xScale.bandwidth() / 2 - 15)
        .attr('height', xScale.bandwidth() / 2 - 15)

      // const rects = commitevent
      //   .selectAll('rect')
      //   .data(filteredCommits, (d) => d.question + d[4])
      // rects
      //   .enter()
      //   .append('rect')
      //   .merge(rects)
      //   .attr('x', (d) => xScale(d.question) + xScale.bandwidth() / 4)
      //   .attr('y', function (d) {
      //     console.log(d)
      //     // 检查questionflag中是否已存在该key
      //     if (Object.prototype.hasOwnProperty.call(QuestionFlag, d.question)) {
      //       // 如果已存在，修改对应的value值
      //       QuestionFlag[d.question] =
      //         QuestionFlag[d.question] + xScale.bandwidth() / 2 + 2
      //     } else {
      //       // 如果不存在，增加新的key-value对
      //       QuestionFlag[d.question] = 10
      //     }
      //     console.log(d)
      //     return QuestionFlag[d.question]
      //   })
      //   .attr('width', xScale.bandwidth() / 2)
      //   .attr('height', xScale.bandwidth() / 2)

      // rects.exit().remove()
      // 获取 SVG 的边界框
      const bbox = svg.node().getBBox()

      // 动态设置 SVG 的宽度和高度
      svg.attr('height', bbox.height + bbox.x)
    })
    // 获取 SVG 的边界框
    const bbox = svg.node().getBBox()

    // 动态设置 SVG 的宽度和高度
    svg.attr('height', bbox.height + bbox.x)
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
    d3.select('svg').remove() //移除已有的svg元素
    // 选择现有的 SVG 元素，如果已经存在则移除它
    d3.select('.studentCommitsvg').remove()
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
            <div className="commitsvg"></div>
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
