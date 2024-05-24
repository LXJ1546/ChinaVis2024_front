import React, { memo, useEffect } from 'react'
// import ReactEcharts from 'echarts-for-react'
import { CalendarWrapper } from './style'
import * as d3 from 'd3'
import d3Tip from 'd3-tip'
import { getCalenderInfo } from '../../api'
const Calendar = (props) => {
  // 拿到父组件传递的模式状态
  const { amode, month } = props
  let studentID = []
  let studentCalandarInfo = {}
  console.log(month)

  //tooltip
  const tip = d3Tip()
    .attr('class', 'd3-tip')
    .html(function (d) {
      return `Class ${d[0]},人数: <span >${d}</span>`
    })
  //绘制答题模式的每月学习日历图
  function drawCalendar(studentID) {
    //判断是否已经存在svg
    const svg = d3
      .select('.calendarview')
      .append('svg')
      .attr('class', 'calendarsvg')
      //   .attr('width', '100%')
      .attr('height', '99%')
    svg.call(tip)

    //图例
    //图例数据
    const legendData = [
      { category: '正确占比', value: 'green' },
      { category: '答题数', value: 'pink' },
      { category: 'Method_C', value: 'orange' },
      { category: 'Method_g', value: 'green' },
      { category: 'Method_5', value: 'red' },
      { category: 'Method_m', value: 'purple' },
      { category: 'Method_B', value: 'blue' }
    ]

    const legend = svg.append('g').attr('class', 'legend')
    // 添加图例条目
    legend
      .selectAll('rect')
      .data(legendData)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 120 + 30)
      .attr('y', 10)
      .attr('width', 30)
      .attr('height', 18)
      .attr('fill', (d) => d.value)

    // 添加图例文本
    legend
      .selectAll('text')
      .data(legendData)
      .enter()
      .append('text')
      .attr('x', (d, i) => i * 120 + 70)
      .attr('y', 20)
      .attr('dy', '0.35em')
      .text((d) => d.category)
    //添加中间线性映射的圆的提交次数的颜色
    //   定义颜色映射的线性渐变
    const gradient = d3
      .select('.calendarsvg')
      .append('defs')
      .append('linearGradient')
      .attr('id', 'gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%')

    // 添加渐变色段
    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#ABE2FE')
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#236D92')

    // 创建矩形
    d3.select('.calendarsvg')
      .append('rect')
      .attr('width', 150)
      .attr('height', 18)
      //   .attr('x', 30)
      //   .attr('y', 40)
      .attr('x', 875)
      .attr('y', 10)
      .style('fill', 'url(#gradient)')
    //创建标签
    // 创建矩形
    d3.select('.calendarsvg')
      .append('text')
      .attr('x', 1030)
      .attr('y', 20)
      .attr('dy', '0.35em')
      .text('提交次数')

    //画日历
    function drawStudentCalendar(studentName, studentNum, dataArr) {
      //假数据
      //日期，正确占比，答题数，五种语言占比，提交次数
      // console.log(Object.values(data).map((item) => item[3])) //打印所有列表的某一列的值
      //定义比例尺和配置信息
      //提交次数颜色隐射
      const commitscaleColor = d3
        .scaleLinear()
        .domain([0, d3.max(Object.values(dataArr).map((item) => item[3]))])
        .range(['#ABE2FE', '#236D92'])

      //正确占比颜色映射
      const rightcolor = d3
        .scaleOrdinal()
        .domain(['rightrate', 'errorrate'])
        .range(['green', 'red'])

      //使用语言的颜色映射
      const languagecolor = d3
        .scaleOrdinal()
        .domain(['Method_C', 'Method_g', 'Method_5', 'Method_m', 'Method_B'])
        .range(d3.schemeCategory10)
      //数据组装
      function generateDataset(options = { fill: {} }) {
        // 开始时间
        const startDate = options.startDate
          ? new Date(options.startDate)
          : new Date(new Date().getFullYear() + '-' + '01' + '-' + '01')
        // 结束时间
        const endDate = options.endDate ? new Date(options.endDate) : new Date()

        // 相隔天数
        const totalDays = Math.floor(
          (endDate.getTime() - startDate.getTime()) / 86400000
        )

        // 循环天数
        let year, month
        let yearIndex = -1,
          monthIndex = -1
        let yearGroup = []
        let dayTem = 0
        while (dayTem <= totalDays) {
          const dateName = d3.timeFormat('%Y-%m-%d')(
            new Date(startDate.getTime() + 86400000 * dayTem)
          )
          const dateArr = dateName.split('-')

          // 年
          if (!year || dateArr[0] !== year) {
            year = dateArr[0]
            yearGroup.push({
              name: dateArr[0],
              monthGroup: []
            })

            yearIndex++
            monthIndex = -1
          }
          // 月
          if (!month || dateArr[1] !== month) {
            month = dateArr[1]
            yearGroup[yearIndex].monthGroup.push({
              name: dateArr[0] + '-' + dateArr[1],
              dayGroup: []
            })
            monthIndex++
          }
          // 获取热力数据值
          let right = null
          let titletotal = null
          let language = []
          let commitcount = null
          if (options.fill.hasOwnProperty.call(dataArr, dateName)) {
            right = options.fill[dateName][0]
            titletotal = options.fill[dateName][1]
            language = options.fill[dateName][2]
            commitcount = options.fill[dateName][3]
          }
          // 天里面的特征
          //日期，正确占比，答题数，五种语言占比，提交次数
          yearGroup[yearIndex].monthGroup[monthIndex].dayGroup.push({
            name: dateName,
            dayTem: dayTem + startDate.getDay(),
            right,
            titletotal,
            language,
            commitcount
          })

          dayTem++
        }

        return yearGroup
      }

      // startDate：日历开始时间 endDate：日历结束时间 dataArr：要展示的数据 - 之前定义好的格式
      let dayDatas = {}
      if (month == 1 || month == 10 || month == 12) {
        dayDatas = generateDataset({
          startDate: '2023-' + month + '-01',
          endDate: '2023-' + month + '-31',
          fill: dataArr
        })
      } else {
        dayDatas = generateDataset({
          startDate: '2023-' + month + '-01',
          endDate: '2023-' + month + '-30',
          fill: dataArr
        })
      }

      // 绘制日历块，给每个日历分组
      const yearSvg = svg
        .append('g')
        .attr('transform', `translate(${50 + studentNum * 370},80)`)
        .selectAll()
        .data(dayDatas)
        .enter()
        .append('g')
        .attr('class', (d) => 'year year-' + d.name)

      const monthSvg = yearSvg
        .selectAll()
        .data((d) => d.monthGroup)
        .enter()
        .append('g')
        .attr('class', (d) => 'month month-' + d.name)
      // 绘制方块,颜色映射改天是否活跃
      monthSvg
        .selectAll()
        .data((d) => d.dayGroup)
        .enter()
        .append('rect')
        .attr('width', 65)
        .attr('height', 65)
        //   .attr('stroke', '#cccc') // 设置边框颜色
        .attr('rx', 3)
        .attr('x', (d) => Math.floor(d.dayTem / 7) * 66)
        .attr('y', (d) => (d.dayTem % 7) * 66)
        // .attr('fill', '#E8E8E8')
        .attr('fill', (d) => {
          if (!d.commitcount) {
            return '#FBFAFA'
          }
          //   return commitscaleColor(d.commitcount)
          else {
            return '#EDECEC'
          }
        })
        .on('mouseover', function (e, d) {
          if (d.commitcount != null) {
            tip.html(`<div style="line-height: 1;
                font-weight: bold;
                padding: 12px;
                background: white;
                color: grey;
                border-radius: 2px;
                pointer-events: none;
                font-family: Arial, sans-serif;
                font-size: 12px;
                text-align: center;">日期: ${d.name}  <p>答题数: ${d.titletotal}</p> <p>Method_C: ${d.language[0]}</p> <p>Method_g: ${d.language[1]}</p> <p>Method_5: ${d.language[2]}</p> <p>Method_m: ${d.language[3]}</p> <p>Method_B: ${d.language[4]}</p><p>提交次数: ${d.commitcount}</p><div>`)
            tip.show(d, this)
          } else {
            tip.html(`<div style="line-height: 1;
            font-weight: bold;
            padding: 12px;
            background: white;
            color: grey;
            border-radius: 2px;
            pointer-events: none;
            font-family: Arial, sans-serif;
            font-size: 12px;
            text-align: center;">日期: ${d.name} 无答题行为<div>`)
            tip.show(d, this)
          }
        })
        .on('mouseout', tip.hide)

      // 定义饼图生成器
      const pie = d3
        .pie()
        .value((d) => d[1])
        .sort(null)

      //绘制正确占比的圆环
      // 定义弧生成器
      const arcright = d3
        .arc()
        .innerRadius(28 * 0.8) // 内半径（控制圆环宽度）
        .outerRadius(28) // 外半径

      const rightSvg = monthSvg
        .selectAll()
        .data((d) => d.dayGroup)
        .enter()
        .append('g')
        .attr(
          'transform',
          (d) =>
            `translate(${Math.floor(d.dayTem / 7) * 66 + 33}, ${(d.dayTem % 7) * 66 + 33})`
        )

      rightSvg.each(function (d) {
        let piedata = {}
        if (d.right != null) {
          piedata = {
            rightrate: d.right.toFixed(2),
            errorrate: (1 - d.right).toFixed(2)
          }
        } else {
          piedata = {}
        }
        let right_data = pie(Object.entries(piedata))
        //对每个 <g> 元素进行操作
        const gRight = d3.select(this)
        // 绘制圆环
        gRight
          .selectAll('path')
          .data(right_data)
          .enter()
          .append('path')
          .attr('d', arcright)
          .attr('fill', function (d) {
            return rightcolor(d.data[0])
          })
          .attr('opacity', function (d) {
            if (d.data[0] == 'rightrate') {
              return 1
            } else {
              return 0
            }
          })
        // .attr('stroke', 'white')
        // .style('stroke-width', '2px')
      })

      //绘制答题数占比
      // 定义弧生成器
      const arctitle = d3
        .arc()
        .innerRadius(23 * 0.8) // 内半径（控制圆环宽度）
        .outerRadius(23) // 外半径

      const titleSvg = monthSvg
        .selectAll()
        .data((d) => d.dayGroup)
        .enter()
        .append('g')
        .attr(
          'transform',
          (d) =>
            `translate(${Math.floor(d.dayTem / 7) * 66 + 33}, ${(d.dayTem % 7) * 66 + 33})`
        )

      titleSvg.each(function (d) {
        let piedata = {}
        if (d.titletotal != null) {
          piedata = {
            titletotalrate: d.titletotal,
            notitletotalrate: 38 - d.titletotal
          }
        } else {
          piedata = {}
        }
        let title_data = pie(Object.entries(piedata))
        //对每个 <g> 元素进行操作
        const gTitle = d3.select(this)
        // 绘制圆环
        gTitle
          .selectAll('path')
          .data(title_data)
          .enter()
          .append('path')
          .attr('d', arctitle)
          .attr('fill', 'pink')
          .attr('opacity', function (d) {
            if (d.data[0] == 'titletotalrate') {
              return 1
            } else {
              return 0
            }
          })
        // .attr('stroke', 'white')
        // .style('stroke-width', '2px')
      })

      //绘制使用语言占比'Method_C', 'Method_g', 'Method_5', 'Method_m', 'Method_B'
      // 定义弧生成器
      const arcMethod = d3
        .arc()
        .innerRadius(18 * 0.7) // 内半径（控制圆环宽度）
        .outerRadius(18) // 外半径

      const MethodSvg = monthSvg
        .selectAll()
        .data((d) => d.dayGroup)
        .enter()
        .append('g')
        .attr(
          'transform',
          (d) =>
            `translate(${Math.floor(d.dayTem / 7) * 66 + 33}, ${(d.dayTem % 7) * 66 + 33})`
        )

      MethodSvg.each(function (d) {
        let piedata = {}
        if (d.language != null) {
          piedata = {
            Method_C: d.language[0],
            Method_g: d.language[1],
            Method_5: d.language[2],
            Method_m: d.language[3],
            Method_B: d.language[4]
          }
        } else {
          piedata = {}
        }
        let Method_data = pie(Object.entries(piedata))
        //对每个 <g> 元素进行操作
        const gMethod = d3.select(this)
        // 绘制圆环
        gMethod
          .selectAll('path')
          .data(Method_data)
          .enter()
          .append('path')
          .attr('d', arcMethod)
          .attr('fill', function (d) {
            return languagecolor(d.data[0])
          })
        // .attr('stroke', 'white')
        // .style('stroke-width', '2px')
      })

      //绘制提交次数的中心圆
      const commitSvg = monthSvg.append('g')
      commitSvg
        .selectAll()
        .data((d) => d.dayGroup)
        .enter()
        .append('circle')
        .attr('r', 11) // 半径
        .attr('cx', (d) => Math.floor(d.dayTem / 7) * 66 + 33)
        .attr('cy', (d) => (d.dayTem % 7) * 66 + 33)
        .attr('fill', (d) => {
          if (!d.commitcount) {
            return '#FBFAFA'
          }
          return commitscaleColor(d.commitcount)
        })

      //绘制月和周
      const title = svg.append('g')

      // 绘制 周
      const weeks = ['日', '一', '二', '三', '四', '五', '六']
      title
        .append('g')
        .attr('class', 'week')
        .selectAll('.label')
        .data(weeks)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', 15)
        .attr('y', 90)
        .attr('dy', (d, i) => i * 66 + 30)
        .attr('fill', 'black')
        .text((d) => d)

      //根据日历图布局，绘制周文本
      let monthAll = []
      dayDatas.forEach((element) => {
        monthAll = monthAll.concat(element.monthGroup)
      })

      title
        .append('g')
        .attr('class', 'student-title')
        .append('text')
        .attr('x', (d, i) => {
          return i * 71 * 4.25 + 100 + studentNum * 370
        })
        .attr('y', 60)
        .attr('fill', 'black')
        .attr('font-size', '15px')
        .attr('font-family', 'monospace')
        .text('学生ID: ' + studentName)
    }
    //对选中的每个学生都生成这个图
    studentID.forEach(function (item, index) {
      console.log(item, index)
      // const dataArr = {
      //   '2023-05-8': [0.9, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 55],
      //   '2023-05-9': [0.9, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 260],
      //   '2023-05-10': [0.9, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 55],
      //   '2023-05-11': [0.9, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 55],
      //   '2023-05-12': [0.9, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 100],
      //   '2023-05-13': [0.9, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 55],
      //   '2023-05-14': [0.9, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 55],
      //   '2023-05-16': [0.9, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 55],
      //   '2023-05-17': [0.4, 11, [0.1, 0.5, 0.2, 0.1, 0.1], 24],
      //   '2023-05-18': [0.9, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 55],
      //   '2023-05-19': [0.9, 4, [0.2, 0.3, 0.2, 0.1, 0.1], 60],
      //   '2023-05-20': [0.5, 38, [0.1, 0.5, 0.2, 0.1, 0.1], 60],
      //   '2023-05-26': [0.49, 3, [0.1, 0.5, 0.2, 0.1, 0.1], 60],
      //   '2023-05-27': [0.69, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 90],
      //   '2023-05-28': [0.69, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 90],
      //   '2023-05-29': [0.69, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 90],
      //   '2023-05-30': [0.69, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 90],
      //   '2023-05-31': [0.9, 24, [0.1, 0.5, 0.2, 0.1, 0.1], 60]
      // }
      const dataArr = studentCalandarInfo[item]
      console.log(dataArr)
      drawStudentCalendar(item, index, dataArr)
    })
    // 获取 SVG 的边界框
    const bbox = svg.node().getBBox()

    // 动态设置 SVG 的宽度和高度
    svg.attr('width', bbox.width + bbox.x)
  }

  //绘制时间模式的答题时间段对比分析图
  function drawAnswerSession() {
    //假数据
    //每个时段,每个月对应的提交/活跃度/人数
    const answerData = {
      '凌晨-工作日': {
        9: [50, 0.6, 200],
        10: [40, 0.4, 100],
        11: [80, 0.8, 350],
        12: [53, 0.65, 206],
        1: [30, 0.2, 35]
      },
      '上午-工作日': {
        9: [50, 0.6, 200],
        10: [40, 0.4, 100],
        11: [80, 0.8, 350],
        12: [53, 0.65, 206],
        1: [30, 0.2, 35]
      },
      '下午-工作日': {
        9: [50, 0.6, 200],
        10: [40, 0.4, 100],
        11: [80, 0.8, 350],
        12: [53, 0.65, 206],
        1: [30, 0.2, 35]
      },
      '晚上-工作日': {
        9: [50, 0.6, 200],
        10: [40, 0.4, 100],
        11: [99, 0.8, 350],
        ' 12': [53, 0.65, 206],
        1: [30, 0.2, 35]
      },
      '凌晨-休息日': {
        9: [50, 0.6, 200],
        10: [40, 0.4, 100],
        11: [80, 0.8, 350],
        12: [53, 0.65, 206],
        1: [30, 0.2, 35]
      },
      '上午-休息日': {
        9: [50, 0.6, 200],
        10: [40, 0.4, 100],
        11: [80, 0.8, 350],
        12: [53, 0.65, 206],
        1: [30, 0.2, 35]
      },
      '下午-休息日': {
        9: [50, 0.6, 200],
        10: [40, 0.4, 100],
        11: [80, 0.8, 350],
        12: [53, 0.65, 206],
        1: [30, 0.2, 35]
      },
      '晚上-休息日': {
        9: [50, 0.6, 200],
        10: [40, 0.4, 100],
        11: [80, 0.8, 350],
        12: [53, 0.65, 206],
        1: [30, 0.2, 35]
      }
    }

    //计算各值得最大最小值进行比例尺映射
    // 初始化最大和最小值
    // 初始化最大和最小值
    let maxSubmitCount = -Infinity
    let minSubmitCount = Infinity
    let maxActivity = -Infinity
    let minActivity = Infinity
    let maxPeople = -Infinity
    let minPeople = Infinity

    // 遍历 answerData 中的数据
    for (const key in answerData) {
      if (Object.prototype.hasOwnProperty.call(answerData, key)) {
        const timeData = answerData[key]
        for (const month in timeData) {
          if (Object.prototype.hasOwnProperty.call(timeData, month)) {
            const [submitCount, activity, people] = timeData[month]

            // 更新最大最小值
            maxSubmitCount = Math.max(maxSubmitCount, submitCount)
            minSubmitCount = Math.min(minSubmitCount, submitCount)
            maxActivity = Math.max(maxActivity, activity)
            minActivity = Math.min(minActivity, activity)
            maxPeople = Math.max(maxPeople, people)
            minPeople = Math.min(minPeople, people)
          }
        }
      }
    }

    // 打印最大最小值
    // console.log('最大提交数:', maxSubmitCount)
    // console.log('最小提交数:', minSubmitCount)
    // console.log('最大活跃度:', maxActivity)
    // console.log('最小活跃度:', minActivity)
    // console.log('最大人数:', maxPeople)
    // console.log('最小人数:', minPeople)

    //创建svg
    const svg = d3
      .select('#answerSession')
      .append('svg')
      .attr('id', 'answerSessionsvg')
      .attr('width', '100%')
      .attr('height', '100%')
    const margin = { top: 30, right: 450, bottom: 30, left: 70 }
    const width =
      svg.node().getBoundingClientRect().width - margin.left - margin.right
    const height =
      svg.node().getBoundingClientRect().height - margin.top - margin.bottom
    svg.call(tip)
    console.log(svg.attr('width'), height)

    //绘制图例
    //添加中间线性映射的圆的提交次数的颜色
    //   定义颜色映射的线性渐变
    const gradientanswercommit = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'gradientanswercommit')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%')

    // 添加渐变色段
    gradientanswercommit
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#ABE2FE')
    gradientanswercommit
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#236D92')
    // 创建矩形
    svg
      .append('rect')
      .attr('width', 150)
      .attr('height', 18)
      .attr('x', 10)
      .attr('y', 10)
      .style('fill', 'url(#gradientanswercommit)')

    //创建标签
    // 创建矩形
    svg
      .append('text')
      .attr('x', 170)
      .attr('y', 20)
      .attr('dy', '0.35em')
      .text('提交次数')

    //   定义颜色映射的线性渐变
    const gradientanswerpeople = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'gradientanswerpeople')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%')

    // 添加渐变色段
    gradientanswerpeople
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#77EB80')
    gradientanswerpeople
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#EB8277')

    // 创建矩形
    svg
      .append('rect')
      .attr('width', 150)
      .attr('height', 18)
      .attr('x', 260)
      .attr('y', 10)
      .style('fill', 'url(#gradientanswerpeople)')

    //创建标签
    // 创建矩形
    svg
      .append('text')
      .attr('x', 420)
      .attr('y', 20)
      .attr('dy', '0.35em')
      .text('活跃人数')

    //创建横纵坐标比例尺
    // 数据
    const sessionMonths = [9, 10, 11, 12, 1]
    const sessionPeriods = [
      '凌晨-工作日',
      '上午-工作日',
      '下午-工作日',
      '晚上-工作日',
      '凌晨-休息日',
      '上午-休息日',
      '下午-休息日',
      '晚上-休息日'
    ]
    // 定义 x 轴比例尺
    const xScale = d3
      .scaleBand()
      .domain(sessionMonths)
      .range([0, width])
      .padding(0.1)

    // 定义 y 轴比例尺
    const yScale = d3
      .scaleBand()
      .domain(sessionPeriods)
      .range([0, height])
      .padding(0.1)
    const rectWidth = yScale.bandwidth()

    //创建提交的颜色比例尺
    const submitColorScale = d3
      .scaleLinear()
      .domain([minSubmitCount, maxSubmitCount])
      .range(['#ABE2FE', '#236D92'])

    //创建活跃度圆心大小的比例尺
    const acticityradiusScale = d3
      .scaleLinear()
      .domain([minActivity, maxActivity])
      .range([rectWidth / 4 - 5, rectWidth / 2 - 5])

    //创建人数颜色的比例尺
    const peopleColorScale = d3
      .scaleLinear()
      .domain([minPeople, maxPeople])
      .range(['#77EB80', '#EB8277'])

    // 创建 X 轴生成器
    const xAxis = d3.axisBottom(xScale).tickFormat((d) => `${d}月`)

    // 创建 Y 轴生成器
    const yAxis = d3.axisLeft(yScale)

    //绘制X轴和Y轴
    const workAxisg = svg
      .append('g')
      .attr('id', 'workaxis')
      .attr('transform', `translate(${margin.left},${margin.top + 20})`)
    // 在 SVG 中添加 X 轴
    workAxisg
      .append('g')
      .attr('transform', `translate(0,${-20})`)
      .call(xAxis)
      .append('text')
      .attr('x', width / 2)
      .attr('y', margin.bottom - 10)
      .attr('fill', '#000')
      .style('text-anchor', 'middle')
    // 在 SVG 中添加 Y 轴
    workAxisg
      .append('g')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 20)
      .attr('fill', '#000')
      .style('text-anchor', 'middle')
    workAxisg
      .selectAll('.domain, .tick line') // 选择轴线和刻度线
      .style('display', 'none') // 隐藏轴线和刻度线
    //绘制答题情况
    const workg = svg
      .append('g')
      .attr('id', 'workanswer')
      .attr('transform', `translate(${margin.left},${margin.top + 20})`)
    for (const key in answerData) {
      const monthdata = answerData[key]
      for (const monthkey in monthdata) {
        const monthvalue = monthdata[monthkey]
        // 绘制提交次数矩形
        console.log(monthvalue)
        workg
          .append('rect')
          .attr('width', rectWidth)
          .attr('height', rectWidth)
          .attr('rx', 3)
          .attr('x', xScale(parseInt(monthkey)))
          .attr('y', yScale(key))
          .attr('fill', submitColorScale(monthvalue[0]))
        //绘制活跃度圆形
        workg
          .append('circle')
          .attr('r', acticityradiusScale(monthvalue[1]))
          .attr('cx', xScale(parseInt(monthkey)) + rectWidth / 2)
          .attr('cy', yScale(key) + rectWidth / 2)
          .attr('fill', peopleColorScale(monthvalue[2]))
      }
    }

    //绘制该月该时段下每天的学生答题模式类型,按人数排序
    function drawAnswerCalendar() {
      //假数据
      const dataAnswerArr = {
        '2023-09-8': [200, 300, 500],
        '2023-09-9': [300, 200, 500],
        '2023-09-10': [300, 200, 500],
        '2023-09-11': [300, 200, 500],
        '2023-09-12': [322, 300, 420],
        '2023-09-13': [300, 200, 500],
        '2023-09-14': [300, 200, 500],
        '2023-09-16': [300, 200, 500],
        '2023-09-17': [300, 200, 500],
        '2023-09-18': [300, 200, 500],
        '2023-09-19': [300, 200, 500],
        '2023-09-20': [900, 50, 51],
        '2023-09-26': [300, 200, 500],
        '2023-09-27': [300, 200, 500],
        '2023-09-28': [320, 20, 700],
        '2023-09-29': [300, 200, 500],
        '2023-09-30': [300, 200, 500],
        '2023-09-31': [300, 200, 500]
      }
      let maxmodeNum = 0
      let minmodeNum = Infinity
      //数据组装
      function generateAnswerDataset(options = { fill: {} }) {
        // 开始时间
        const startDate = options.startDate
          ? new Date(options.startDate)
          : new Date(new Date().getFullYear() + '-' + '01' + '-' + '01')
        // 结束时间
        const endDate = options.endDate ? new Date(options.endDate) : new Date()

        // 相隔天数
        const totalDays = Math.floor(
          (endDate.getTime() - startDate.getTime()) / 86400000
        )

        // 循环天数
        let year, month
        let yearIndex = -1,
          monthIndex = -1
        let yearGroup = []
        let dayTem = 0
        while (dayTem <= totalDays) {
          const dateName = d3.timeFormat('%Y-%m-%d')(
            new Date(startDate.getTime() + 86400000 * dayTem)
          )
          const dateAnswerArr = dateName.split('-')

          // 年
          if (!year || dateAnswerArr[0] !== year) {
            year = dateAnswerArr[0]
            yearGroup.push({
              name: dateAnswerArr[0],
              monthGroup: []
            })

            yearIndex++
            monthIndex = -1
          }
          // 月
          if (!month || dateAnswerArr[1] !== month) {
            month = dateAnswerArr[1]
            yearGroup[yearIndex].monthGroup.push({
              name: dateAnswerArr[0] + '-' + dateAnswerArr[1],
              dayGroup: []
            })
            monthIndex++
          }
          // 获取热力数据值
          let point = null
          let various = null
          let trying = null
          if (options.fill.hasOwnProperty.call(dataAnswerArr, dateName)) {
            // right = options.fill[dateName][0]
            // titletotal = options.fill[dateName][1]
            // language = options.fill[dateName][2]
            // commitcount = options.fill[dateName][3]
            point = options.fill[dateName][0]
            if (point > maxmodeNum) {
              maxmodeNum = options.fill[dateName][0]
            }
            if (point < minmodeNum) {
              minmodeNum = options.fill[dateName][0]
            }
            various = options.fill[dateName][1]
            if (various > maxmodeNum) {
              maxmodeNum = options.fill[dateName][1]
            }
            if (various < minmodeNum) {
              minmodeNum = options.fill[dateName][1]
            }
            trying = options.fill[dateName][2]
            if (trying > maxmodeNum) {
              maxmodeNum = options.fill[dateName][2]
            }
            if (trying < minmodeNum) {
              minmodeNum = options.fill[dateName][2]
            }
          }

          // 天里面的特征
          //日期，正确占比，答题数，五种语言占比，提交次数
          yearGroup[yearIndex].monthGroup[monthIndex].dayGroup.push({
            name: dateName,
            dayTem: dayTem + startDate.getDay(),
            point,
            various,
            trying
          })

          dayTem++
        }

        return yearGroup
      }

      // startDate：日历开始时间 endDate：日历结束时间 dataArr：要展示的数据 - 之前定义好的格式
      const answermonthnum = 9
      //判断是5列日历还是6列日历以此安排画布位置
      let monthmargin = 0
      if (answermonthnum == 9 || answermonthnum == 12) {
        monthmargin = 430
      } else {
        monthmargin = 455
      }
      const dayDatas = generateAnswerDataset({
        startDate: '2023-9-01',
        endDate: '2023-9-31',
        fill: dataAnswerArr
      })

      //绘制日历矩形块
      // 绘制日历块，给每个日历分组
      const answeryearSvg = svg
        .append('g')
        .attr('transform', `translate(${monthmargin},80)`)
        .selectAll()
        .data(dayDatas)
        .enter()
        .append('g')
        .attr('class', (d) => 'year year-' + d.name)

      const answerymontSvg = answeryearSvg
        .selectAll()
        .data((d) => d.monthGroup)
        .enter()
        .append('g')
        .attr('class', (d) => 'month month-' + d.name)
      // 绘制方块,颜色映射改天是否活跃
      answerymontSvg
        .selectAll()
        .data((d) => d.dayGroup)
        .enter()
        .append('rect')
        .attr('width', 65)
        .attr('height', 65)
        //   .attr('stroke', '#cccc') // 设置边框颜色
        .attr('rx', 3)
        .attr('x', (d) => Math.floor(d.dayTem / 7) * 66)
        .attr('y', (d) => (d.dayTem % 7) * 66)
        // .attr('fill', '#E8E8E8')
        .attr('fill', (d) => {
          if (!d.commitcount) {
            return '#EDECEC'
          }
          //   return commitscaleColor(d.commitcount)
          else {
            return '#EDECEC'
          }
        })
        .on('mouseover', function (e, d) {
          if (d.point != null || d.various != null || d.trying != null) {
            tip.html(`<div style="line-height: 1;
                font-weight: bold;
                padding: 12px;
                background: white;
                color: grey;
                border-radius: 2px;
                pointer-events: none;
                font-family: Arial, sans-serif;
                font-size: 12px;
                text-align: center;">日期: ${d.name} <div>`)
            tip.show(d, this)
          } else {
            tip.html(`<div style="line-height: 1;
            font-weight: bold;
            padding: 12px;
            background: white;
            color: grey;
            border-radius: 2px;
            pointer-events: none;
            font-family: Arial, sans-serif;
            font-size: 12px;
            text-align: center;">日期: ${d.name} 无人答题<div>`)
            tip.show(d, this)
          }
        })
        .on('mouseout', tip.hide)
      //绘制月和周
      const answertitle = svg.append('g')

      // 绘制 周
      const weeks = ['日', '一', '二', '三', '四', '五', '六']
      answertitle
        .append('g')
        .attr('class', 'week')
        .selectAll('.label')
        .data(weeks)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', 400)
        .attr('y', 90)
        .attr('dy', (d, i) => i * 66 + 30)
        .attr('fill', 'black')
        .text((d) => d)

      //根据日历图布局，绘制周文本
      let monthAll = []
      dayDatas.forEach((element) => {
        monthAll = monthAll.concat(element.monthGroup)
      })

      answertitle
        .append('g')
        .attr('class', 'month-title')
        .selectAll()
        .data(monthAll)
        .enter()
        .append('text')
        .attr('x', (d, i) => {
          return i * 71 * 4.25 + 600
        })
        .attr('y', 60)
        .attr('fill', 'black')
        .attr('font-size', '12px')
        .attr('font-family', 'monospace')
        .text('9月-工作日-凌晨')

      //绘制学习模式的人数矩形
      //用于找出三个模式中的第一大值,第二大值,最小值
      function findsort(modeobj, num) {
        // 将对象转换为数组，并按值排序
        const items = Object.entries(modeobj).sort((a, b) => a[1] - b[1])

        // 提取最小值键、第二大值键和最大值键
        const minKey = items[0][0]
        const secondLargestKey = items[items.length - 2][0]
        const maxKey = items[items.length - 1][0]
        if (num == 1) {
          return maxKey
        } else if (num == 2) {
          return secondLargestKey
        } else {
          return minKey
        }
      }
      //绘制模式矩形
      //三种模式的颜色比例尺
      const modecolorScale = d3
        .scaleOrdinal()
        .domain(['point', 'various', 'trying'])
        .range(['#86C6F0', '#EB8277', '#86F0B0'])
      //矩形数据比例尺
      const modenumScale = d3
        .scaleLinear()
        .domain([minmodeNum, maxmodeNum])
        .range([10, 50])
      //数量最大的
      const modemaxNumSvg = answerymontSvg.append('g')
      modemaxNumSvg
        .selectAll()
        .data((d) => d.dayGroup)
        .enter()
        .append('rect')
        .attr('width', function (d) {
          const modeobjData = {
            point: d.point,
            various: d.various,
            trying: d.trying
          }
          return modenumScale(d[findsort(modeobjData, 1)])
        })
        .attr('height', function (d) {
          const modeobjData = {
            point: d.point,
            various: d.various,
            trying: d.trying
          }
          return modenumScale(d[findsort(modeobjData, 1)])
        })
        .attr('x', function (d) {
          const modeobjData = {
            point: d.point,
            various: d.various,
            trying: d.trying
          }
          return (
            Math.floor(d.dayTem / 7) * 66 +
            (65 - modenumScale(d[findsort(modeobjData, 1)])) / 2
          )
        })
        .attr('y', function (d) {
          const modeobjData = {
            point: d.point,
            various: d.various,
            trying: d.trying
          }
          return (
            (d.dayTem % 7) * 66 +
            (65 - modenumScale(d[findsort(modeobjData, 1)])) / 2
          )
        })
        .attr('fill', function (d) {
          const modeobjData = {
            point: d.point,
            various: d.various,
            trying: d.trying
          }
          return modecolorScale(findsort(modeobjData, 1))
        })

      //数量第二
      const modesecNumSvg = answerymontSvg.append('g')
      modesecNumSvg
        .selectAll()
        .data((d) => d.dayGroup)
        .enter()
        .append('rect')
        .attr('width', function (d) {
          const modeobjData = {
            point: d.point,
            various: d.various,
            trying: d.trying
          }
          return modenumScale(d[findsort(modeobjData, 2)])
        })
        .attr('height', function (d) {
          const modeobjData = {
            point: d.point,
            various: d.various,
            trying: d.trying
          }
          return modenumScale(d[findsort(modeobjData, 2)])
        })
        .attr('x', function (d) {
          const modeobjData = {
            point: d.point,
            various: d.various,
            trying: d.trying
          }
          return (
            Math.floor(d.dayTem / 7) * 66 +
            (65 - modenumScale(d[findsort(modeobjData, 2)])) / 2
          )
        })
        .attr('y', function (d) {
          const modeobjData = {
            point: d.point,
            various: d.various,
            trying: d.trying
          }
          return (
            (d.dayTem % 7) * 66 +
            (65 - modenumScale(d[findsort(modeobjData, 2)])) / 2
          )
        })
        .attr('fill', function (d) {
          const modeobjData = {
            point: d.point,
            various: d.various,
            trying: d.trying
          }
          return modecolorScale(findsort(modeobjData, 2))
        })
      //数量最少
      const modeminNumSvg = answerymontSvg.append('g')
      modeminNumSvg
        .selectAll()
        .data((d) => d.dayGroup)
        .enter()
        .append('rect')
        .attr('width', function (d) {
          const modeobjData = {
            point: d.point,
            various: d.various,
            trying: d.trying
          }
          return modenumScale(d[findsort(modeobjData, 3)])
        })
        .attr('height', function (d) {
          const modeobjData = {
            point: d.point,
            various: d.various,
            trying: d.trying
          }
          return modenumScale(d[findsort(modeobjData, 3)])
        })
        .attr('x', function (d) {
          const modeobjData = {
            point: d.point,
            various: d.various,
            trying: d.trying
          }
          return (
            Math.floor(d.dayTem / 7) * 66 +
            (65 - modenumScale(d[findsort(modeobjData, 3)])) / 2
          )
        })
        .attr('y', function (d) {
          const modeobjData = {
            point: d.point,
            various: d.various,
            trying: d.trying
          }
          return (
            (d.dayTem % 7) * 66 +
            (65 - modenumScale(d[findsort(modeobjData, 3)])) / 2
          )
        })
        .attr('fill', function (d) {
          const modeobjData = {
            point: d.point,
            various: d.various,
            trying: d.trying
          }
          return modecolorScale(findsort(modeobjData, 3))
        })
    }

    drawAnswerCalendar()
  }

  //视图更新
  useEffect(() => {
    if (amode == 0) {
      //更新重画
      // d3.select('svg').remove() //移除已有的svg元素
      // // 选择现有的 SVG 元素，如果已经存在则移除它
      studentID = [
        '3531c5f9d520759ba697',
        'uon3zzl9a1zr5zmeodmr',
        '2d9a38c93e37bc475cb6'
      ]
      getCalenderInfo(studentID, month).then((res) => {
        d3.select('.calendarsvg').remove()
        studentCalandarInfo = res
        drawCalendar(studentID)
      })
    } else if (amode == 1) {
      d3.select('#answerSessionsvg').remove()
      drawAnswerSession()
    }
  }, [amode])

  return (
    <CalendarWrapper>
      {/* amode=0答题模式 ，amode=1时间模式*/}
      {amode == 0 && <div className="title">学习日历</div>}
      {amode == 1 && <div className="title">答题时段分析图</div>}
      <div className="calendarHighview">
        {/* amode=0答题模式 ，amode=1时间模式*/}
        {amode == 0 && <div className="calendarview"></div>}
        {amode == 1 && (
          <div id="answerSession" className="answerSessionview"></div>
        )}
      </div>
    </CalendarWrapper>
  )
}
export default memo(Calendar)
