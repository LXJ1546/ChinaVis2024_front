import React, { memo, useEffect, useRef } from 'react'
import ReactEcharts from 'echarts-for-react'
import { StudentCommitWrapper } from './style'
import * as d3 from 'd3'
import * as echarts from 'echarts'
import d3Tip from 'd3-tip'
import { getEventInfo } from '../../api'
import { createFromIconfontCN } from '@ant-design/icons'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4565164_29wjxd2qn5k.js'
})

const StudentCommit = (props) => {
  // 拿到父组件传递的模式状态
  const {
    amode,
    month,
    calendarSelectFlag,
    studentIDfromCalendar,
    studentDatefromCalendar
  } = props
  console.log(month)
  const commitCountChartRef = useRef(null)
  //绘制学生提交事件图
  function drawCommit(commitdata) {
    // 创建SVG元素
    //tooltip
    const tip = d3Tip()
      .attr('class', 'd3-tip')
      .html(function (d) {
        return `Class ${d[0]},人数: <span >${d}</span>`
      })

    const svg = d3
      .select('.commitsvg')
      .append('svg')
      .attr('class', 'studentCommitsvg')
      .attr('width', '98%')
      // .attr('height', '68%')
      .attr('transform', 'translate(10,0)')
    svg.call(tip)
    // //创建图例svg
    const legendsvg = d3
      .select('#legend')
      .append('svg')
      .attr('class', 'commitlegendsvg')
      .attr('width', '100%')
      .attr('height', '90%')
    const legendData = [
      { category: '完全正确', value: '#27B774' },
      { category: '部分正确', value: '#68D8A3' },
      { category: '错误', value: '#F26D64' },
      { category: 'Method_C', value: '#3770A7' },
      { category: 'Method_g', value: '#886D80' },
      { category: 'Method_5', value: '#E5C765' },
      { category: 'Method_m', value: '#D9644A' },
      { category: 'Method_B', value: '#7C5227' },
      { category: '用时/内存分布', value: 'grey' }
    ]

    const legend = legendsvg.append('g').attr('class', 'legend')
    // 添加图例条目
    legend
      .selectAll('rect')
      .data(legendData)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 90 + 10)
      .attr('y', 10)
      .attr('width', 20)
      .attr('height', 15)
      .attr('fill', (d) => d.value)

    // 添加图例文本
    legend
      .selectAll('text')
      .data(legendData)
      .enter()
      .append('text')
      .attr('x', (d, i) => i * 90 + 35)
      .attr('y', 18)
      .attr('dy', '0.35em')
      .text((d) => d.category)
      .attr('font-size', 12)
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
        left: 'left',
        text:
          '    学生: ' +
          studentIDfromCalendar +
          ' 在 ' +
          studentDatefromCalendar +
          ' 的提交次数统计',
        textStyle: {
          fontSize: 12,
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
        top: '25%', // 上边距
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
            color: '#f28482'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#f28482'
              },
              {
                offset: 1,
                color: '#ffccd5'
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

    //提交事件组
    const commitevent = svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
    //语言方法组
    const methodevent = svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
    //用时组
    const timeevent = svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
    //内存组
    const memoryevent = svg
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

    //绘制事件矩形
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
      .attr('width', xScale.bandwidth() / 2)
      .attr('height', xScale.bandwidth() / 2)
      .attr('fill', function (d) {
        if (d[2] == 'Partially_Correct') {
          return '#68D8A3'
        } else if (d[2] == 'Absolutely_Correct') {
          return '#27B774'
        } else {
          return '#F26D64'
        }
      })
      .on('mouseover', function (e, d) {
        d3.select(this).style('stroke', 'grey').style('stroke-width', 2)
        tip.html(`<div style="line-height: 1;
              font-weight: bold;
              padding: 12px;
              background: white;
              color: grey;
              border-radius: 2px;
              pointer-events: none;
              font-family: Arial, sans-serif;
              font-size: 12px;
              text-align: center;">答题状态: ${d[2]}</p><p>提交时间: ${d[4]}</p><div>`)
        tip.show(d, this)
      })
      .on('mouseout', function () {
        tip.hide()
        d3.select(this).style('stroke-width', 0)
      })
    //绘制语言的矩形
    QuestionFlag = {} //重置语言的y值存储器
    //使用语言的颜色映射
    const methodcolor = d3
      .scaleOrdinal()
      .domain(['Method_C', 'Method_g', 'Method_5', 'Method_m', 'Method_B'])
      .range(['#3770A7', '#886D80', '#E5C765', '#DD5233', '#7C5227'])
    methodevent
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
        if (d[2] == 'Partially_Correct' || d[2] == 'Absolutely_Correct') {
          // return QuestionFlag[d.question] + xScale.bandwidth() / 2 / 4
          return QuestionFlag[d.question]
        } else {
          return QuestionFlag[d.question]
        }
      })
      .attr('width', xScale.bandwidth() / 2 / 4)
      .attr('height', function (d) {
        if (d[2] == 'Partially_Correct' || d[2] == 'Absolutely_Correct') {
          // return xScale.bandwidth() / 2 / 2
          return xScale.bandwidth() / 2
        } else {
          return xScale.bandwidth() / 2
        }
      })
      .attr('fill', function (d) {
        return methodcolor(d[3])
      })
      .on('mouseover', function (e, d) {
        d3.select(this).style('stroke', 'grey').style('stroke-width', 2)
        tip.html(`<div style="line-height: 1;
              font-weight: bold;
              padding: 12px;
              background: white;
              color: grey;
              border-radius: 2px;
              pointer-events: none;
              font-family: Arial, sans-serif;
              font-size: 12px;
              text-align: center;">使用语言: ${d[3]}</p><div>`)
        tip.show(d, this)
      })
      .on('mouseout', function () {
        tip.hide()
        d3.select(this).style('stroke-width', 0)
      })
    //用时分布
    QuestionFlag = {} //重置语言的y值存储器
    timeevent
      .selectAll('rect')
      .data(commits)
      .enter()
      .append('rect')
      .attr(
        'x',
        (d) =>
          xScale(d.question) +
          xScale.bandwidth() / 4 +
          xScale.bandwidth() / 2 / 4
      )
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
      .attr('width', function (d) {
        if (d[2] == 'Partially_Correct' || d[2] == 'Absolutely_Correct') {
          return (xScale.bandwidth() / 2 - xScale.bandwidth() / 2 / 4) * d[0]
        } else {
          return 0
        }
      })
      .attr('height', xScale.bandwidth() / 2 / 4)
      .attr('fill', 'grey')
      .on('mouseover', function (e, d) {
        d3.select(this).style('stroke', 'grey').style('stroke-width', 2)
        tip.html(`<div style="line-height: 1;
              font-weight: bold;
              padding: 12px;
              background: white;
              color: grey;
              border-radius: 2px;
              pointer-events: none;
              font-family: Arial, sans-serif;
              font-size: 12px;
              text-align: center;">用时分布: ${d[0]}</p><div>`)
        tip.show(d, this)
      })
      .on('mouseout', function () {
        tip.hide()
        d3.select(this).style('stroke-width', 0)
      })
    //内存分布
    QuestionFlag = {} //重置语言的y值存储器
    memoryevent
      .selectAll('rect')
      .data(commits)
      .enter()
      .append('rect')
      .attr(
        'x',
        (d) =>
          xScale(d.question) +
          xScale.bandwidth() / 4 +
          xScale.bandwidth() / 2 / 4
      )
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
        return QuestionFlag[d.question] + ((xScale.bandwidth() / 2) * 3) / 4
      })
      .attr('width', function (d) {
        if (d[2] == 'Partially_Correct' || d[2] == 'Absolutely_Correct') {
          return (xScale.bandwidth() / 2 - xScale.bandwidth() / 2 / 4) * d[1]
        } else {
          return 0
        }
      })
      .attr('height', xScale.bandwidth() / 2 / 4)
      .attr('fill', 'grey')
      .on('mouseover', function (e, d) {
        d3.select(this).style('stroke', 'grey').style('stroke-width', 2)
        tip.html(`<div style="line-height: 1;
              font-weight: bold;
              padding: 12px;
              background: white;
              color: grey;
              border-radius: 2px;
              pointer-events: none;
              font-family: Arial, sans-serif;
              font-size: 12px;
              text-align: center;">内存分布: ${d[1]}</p><div>`)
        tip.show(d, this)
      })
      .on('mouseout', function () {
        tip.hide()
        d3.select(this).style('stroke-width', 0)
      })

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
        .attr('width', xScale.bandwidth() / 2)
        .attr('height', xScale.bandwidth() / 2)
        .attr('fill', function (d) {
          if (d[2] == 'Partially_Correct') {
            return '#68D8A3'
          } else if (d[2] == 'Absolutely_Correct') {
            return '#27B774'
          } else {
            return '#F26D64'
          }
        })
        .on('mouseover', function (e, d) {
          d3.select(this).style('stroke', 'grey').style('stroke-width', 2)
          tip.html(`<div style="line-height: 1;
                font-weight: bold;
                padding: 12px;
                background: white;
                color: grey;
                border-radius: 2px;
                pointer-events: none;
                font-family: Arial, sans-serif;
                font-size: 12px;
                text-align: center;">答题状态: ${d[2]}</p><p>提交时间: ${d[4]}</p><div>`)
          tip.show(d, this)
        })
        .on('mouseout', function () {
          tip.hide()
          d3.select(this).style('stroke-width', 2)
        })
      //绘制语言的矩形
      methodevent.selectAll('*').remove()
      QuestionFlag = {} //重置语言的y值存储器
      methodevent
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
          if (d[2] == 'Partially_Correct' || d[2] == 'Absolutely_Correct') {
            // return QuestionFlag[d.question] + xScale.bandwidth() / 2 / 4
            return QuestionFlag[d.question]
          } else {
            return QuestionFlag[d.question]
          }
        })
        .attr('width', xScale.bandwidth() / 2 / 4)
        .attr('height', function (d) {
          if (d[2] == 'Partially_Correct' || d[2] == 'Absolutely_Correct') {
            // return xScale.bandwidth() / 2 / 2
            return xScale.bandwidth() / 2
          } else {
            return xScale.bandwidth() / 2
          }
        })
        .attr('fill', function (d) {
          return methodcolor(d[3])
        })
        .on('mouseover', function (e, d) {
          d3.select(this).style('stroke', 'grey').style('stroke-width', 2)
          tip.html(`<div style="line-height: 1;
              font-weight: bold;
              padding: 12px;
              background: white;
              color: grey;
              border-radius: 2px;
              pointer-events: none;
              font-family: Arial, sans-serif;
              font-size: 12px;
              text-align: center;">使用语言: ${d[3]}</p><div>`)
          tip.show(d, this)
        })
        .on('mouseout', function () {
          tip.hide()
          d3.select(this).style('stroke-width', 0)
        })
      //用时分布
      QuestionFlag = {} //重置语言的y值存储器
      timeevent.selectAll('*').remove()
      timeevent
        .selectAll('rect')
        .data(filteredCommits)
        .enter()
        .append('rect')
        .attr(
          'x',
          (d) =>
            xScale(d.question) +
            xScale.bandwidth() / 4 +
            xScale.bandwidth() / 2 / 4
        )
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
        .attr('width', function (d) {
          if (d[2] == 'Partially_Correct' || d[2] == 'Absolutely_Correct') {
            return (xScale.bandwidth() / 2 - xScale.bandwidth() / 2 / 4) * d[0]
          } else {
            return 0
          }
        })
        .attr('height', xScale.bandwidth() / 2 / 4)
        .attr('fill', 'grey')
        .on('mouseover', function (e, d) {
          d3.select(this).style('stroke', 'grey').style('stroke-width', 2)
          tip.html(`<div style="line-height: 1;
                font-weight: bold;
                padding: 12px;
                background: white;
                color: grey;
                border-radius: 2px;
                pointer-events: none;
                font-family: Arial, sans-serif;
                font-size: 12px;
                text-align: center;">用时分布: ${d[0]}</p><div>`)
          tip.show(d, this)
        })
        .on('mouseout', function () {
          tip.hide()
          d3.select(this).style('stroke-width', 0)
        })
      //内存分布
      QuestionFlag = {} //重置语言的y值存储器
      memoryevent.selectAll('*').remove()
      memoryevent
        .selectAll('rect')
        .data(filteredCommits)
        .enter()
        .append('rect')
        .attr(
          'x',
          (d) =>
            xScale(d.question) +
            xScale.bandwidth() / 4 +
            xScale.bandwidth() / 2 / 4
        )
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
          return QuestionFlag[d.question] + ((xScale.bandwidth() / 2) * 3) / 4
        })
        .attr('width', function (d) {
          if (d[2] == 'Partially_Correct' || d[2] == 'Absolutely_Correct') {
            return (xScale.bandwidth() / 2 - xScale.bandwidth() / 2 / 4) * d[1]
          } else {
            return 0
          }
        })
        .attr('height', xScale.bandwidth() / 2 / 4)
        .attr('fill', 'grey')
        .on('mouseover', function (e, d) {
          d3.select(this).style('stroke', 'grey').style('stroke-width', 2)
          tip.html(`<div style="line-height: 1;
                font-weight: bold;
                padding: 12px;
                background: white;
                color: grey;
                border-radius: 2px;
                pointer-events: none;
                font-family: Arial, sans-serif;
                font-size: 12px;
                text-align: center;">内存分布: ${d[1]}</p><div>`)
          tip.show(d, this)
        })
        .on('mouseout', function () {
          tip.hide()
          d3.select(this).style('stroke-width', 0)
        })

      // 获取 SVG 的边界框
      const bbox = svg.node().getBBox()

      // 动态设置 SVG 的宽度和高度
      svg.attr('height', bbox.height)
    })
    // 获取 SVG 的边界框
    const bbox = svg.node().getBBox()

    // 动态设置 SVG 的宽度和高度
    svg.attr('height', bbox.height)
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

    if ((amode == 0 || amode == 2) && calendarSelectFlag == true) {
      //获取学习日历的学生ID和日期
      getEventInfo(studentIDfromCalendar, studentDatefromCalendar).then(
        (res) => {
          // 选择现有的 SVG 元素，如果已经存在则移除它
          d3.select('.studentCommitsvg').remove()
          d3.select('.commitlegendsvg').remove()
          drawCommit(res)
        }
      )
    }
  }, [
    amode,
    calendarSelectFlag,
    studentIDfromCalendar,
    studentDatefromCalendar
  ])

  return (
    <StudentCommitWrapper>
      {/* amode=0答题模式 ，amode=1时间模式*/}
      {(amode == 0 || amode == 2) && (
        <div className="title">
          <div className="title-icon">
            <IconFont type="icon-a-tijiaoshangchuantiqu" />
          </div>
          学生提交事件
        </div>
      )}
      {amode == 1 && <div className="title">高峰分析矩阵图</div>}
      <div className="Studentview">
        {/* amode=0答题模式 ，amode=1时间模式*/}
        {(amode == 0 || amode == 2) && (
          <div className="StudentCommitview">
            <div id="legend" className="legendsvg"></div>
            <div className="commitchart" ref={commitCountChartRef}></div>
            <div className="commitsvg"></div>
          </div>
        )}
        {amode == 1 && (
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
