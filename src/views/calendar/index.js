/* eslint-disable no-debugger */
import React, { memo, useEffect, useState } from 'react'
// import ReactEcharts from 'echarts-for-react'
import { CalendarWrapper } from './style'
import * as d3 from 'd3'
import d3Tip from 'd3-tip'
import {
  getCalenderInfo,
  getAllPeriodInfo,
  getOnePeriodInfo,
  getallPeriodDayPeople
} from '../../api'
import { Select } from 'antd'
// import { createFromIconfontCN } from '@ant-design/icons'
// const IconFont = createFromIconfontCN({
//   scriptUrl: '//at.alicdn.com/t/c/font_4565164_ivno85eyhk.js'
// })
import Frame from '../../assets/images/frame.svg'
import Amonth from '../../assets/images/month.svg'

const Calendar = (props) => {
  // 拿到父组件传递的模式状态
  const {
    amode,
    month,
    handleCalendarSelectFlag,
    handleStudentIDfromCalendar,
    handleStudentDatefromCalendar,
    selectedRowKeys,
    calendarFlag,
    brushSelectedData,
    transferFirstMonth,
    transferSecondMonth,
    transferLinksData,
    handleRowKeys
  } = props
  let studentID = []
  let studentCalandarInfo = {}
  let maxcommitnum = 0
  let newList = [] //存储刷取的学生的ID和类型
  let tempclick
  const [order, setOrder] = useState('workOrder') //用于调整排纵轴的排序方式
  const [selectMonth, setSelectMonth] = useState('9') //用于获取点击某个时间段的月份
  const [selectIsWork, setSelectIsWork] = useState(1) //用于获取点击某个时间段是否为工作日
  const [selectPeriod, setSelectPeriod] = useState('凌晨') //用于获取点击某个时间段的具体时间段
  let CalendarCompareNum = 0 //用于标志对比日历图中生成了多少个日历图
  // 创建一个映射对象，将 'top', 'mid', 'low' 转换为 'A', 'B', 'C'
  const rankMap = {
    top: 'A级',
    mid: 'B级',
    low: 'C级'
  }
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
      { category: '正确占比', value: '#6abf57' },
      { category: '答题数', value: '#EFA3A3' },
      { category: 'Method_C', value: '#3770A7' },
      { category: 'Method_g', value: '#886D80' },
      { category: 'Method_5', value: '#E5C765' },
      { category: 'Method_m', value: '#D9644A' },
      { category: 'Method_B', value: '#7C5227' }
    ]
    //         .range(['#f6bd60', '#ff7d00', '#bc4749', '#7f5539', '#669bbc'])
    // .range(['#3770A7', '#886D80', '#E5C765', '#D9644A', '#7C5227'])

    const legend = svg.append('g').attr('class', 'legend')
    // 添加图例条目
    legend
      .selectAll('rect')
      .data(legendData)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 90 + 15)
      .attr('y', 10)
      .attr('width', 20)
      .attr('height', 15)
      .attr('fill', (d) => d.value)
      .attr('rx', 4) // 设置水平圆角半径
      .attr('ry', 4) // 设置垂直圆角半径

    // 添加图例文本
    legend
      .selectAll('text')
      .data(legendData)
      .enter()
      .append('text')
      .attr('x', (d, i) => i * 90 + 40)
      .attr('y', 18)
      .attr('dy', '0.35em')
      .text((d) => d.category)
      .attr('font-size', 12)
      .style('opacity', 0.8)
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
    // gradient.append('stop').attr('offset', '0%').attr('stop-color', '#E4F1F4')
    // gradient.append('stop').attr('offset', '100%').attr('stop-color', '#47A2BE')
    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#aed8f5')
    gradient.append('stop').attr('offset', '50%').attr('stop-color', '#569ddb')
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#2f7fce')

    // 创建矩形
    d3.select('.calendarsvg')
      .append('rect')
      .attr('width', 100)
      .attr('height', 18)
      //   .attr('x', 30)
      //   .attr('y', 40)
      .attr('x', 640)
      .attr('y', 8)
      .style('fill', 'url(#gradient)')
    //创建标签
    // 创建矩形
    d3.select('.calendarsvg')
      .append('text')
      .attr('x', 750)
      .attr('y', 18)
      .attr('dy', '0.35em')
      .text('提交次数')
      .attr('font-size', 12)
      .style('opacity', 0.8)
    //画日历
    function drawStudentCalendar(studentName, studentNum, dataArr) {
      tempclick = svg.append('circle').attr('cx', 0).attr('cy', -100)
      //假数据
      //日期，正确占比，答题数，五种语言占比，提交次数
      // console.log(Object.values(data).map((item) => item[3])) //打印所有列表的某一列的值
      //定义比例尺和配置信息
      //提交次数颜色隐射
      // const commitscaleColor = d3
      //   .scaleLinear()
      //   .domain([0, d3.max(Object.values(dataArr).map((item) => item[3]))])
      //   .range(['#ABE2FE', '#236D92'])
      const commitscaleColor = d3
        .scaleLinear()
        .domain([0, maxcommitnum])
        // .range(['#E4F1F4', '#47A2BE'])
        .range(['#aed8f5', '#569ddb', '#2f7fce'])
      //正确占比颜色映射
      const rightcolor = d3
        .scaleOrdinal()
        .domain(['rightrate', 'errorrate'])
        // .range(['#179349', 'red'])
        .range(['#6abf57', 'red'])
      // .range(['#49c486', 'red'])

      //使用语言的颜色映射
      const languagecolor = d3
        .scaleOrdinal()
        .domain(['Method_C', 'Method_g', 'Method_5', 'Method_m', 'Method_B'])
        .range(['#3770A7', '#886D80', '#E5C765', '#D9644A', '#7C5227'])
      // .range(['#0081a7', '#00afb9', '#f6bd60', '#9c6644', '#f07167'])
      // .range(['#f6bd60', '#ff7d00', '#bc4749', '#7f5539', '#669bbc'])
      // .range(d3.schemeCategory10)
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
      if (month == 10 || month == 12) {
        dayDatas = generateDataset({
          startDate: '2023-' + month + '-01',
          endDate: '2023-' + month + '-31',
          fill: dataArr
        })
      } else if (month == 1) {
        dayDatas = generateDataset({
          startDate: '2024-' + month + '-01',
          endDate: '2024-' + month + '-31',
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
          d3.select(this).style('stroke', 'grey').style('stroke-width', 2)
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
                text-align: center;">日期: ${d.name}  <p>答题数: ${d.titletotal}</p> <p>Method_C: ${d.language[0].toFixed(2)}</p> <p>Method_g: ${d.language[1].toFixed(2)}</p> <p>Method_5: ${d.language[2].toFixed(2)}</p> <p>Method_m: ${d.language[3].toFixed(2)}</p> <p>Method_B: ${d.language[4].toFixed(2)}</p><p>提交平均次数: ${d.commitcount.toFixed(2)}</p><div>`)
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
        .on('mouseout', function () {
          tip.hide()
          d3.select(this).style('stroke-width', 0)
        })

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
          .attr('fill', '#EFA3A3')
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
        .attr('r', function (d) {
          if (!d.commitcount) {
            return 0
          } else {
            return 11
          }
        }) // 半径
        .attr('cx', (d) => Math.floor(d.dayTem / 7) * 66 + 33)
        .attr('cy', (d) => (d.dayTem % 7) * 66 + 33)
        .attr('fill', (d) => {
          if (!d.commitcount) {
            return '#FBFAFA'
          }
          return commitscaleColor(d.commitcount)
        })
        .on('click', function (event, d) {
          // 在点击事件中，可以访问数据（d）和索引（i）
          handleCalendarSelectFlag(true)
          handleStudentIDfromCalendar(studentName)
          handleStudentDatefromCalendar(d.name)
          tip.hide()
          tempclick.style('r', 11)
          d3.select(this).style('r', 8)
          tempclick = d3.select(this)
        })
        .on('mouseover', function (e, d) {
          tip.html(`<div style="line-height: 1;
          font-weight: bold;
          padding: 12px;
          background: white;
          color: grey;
          border-radius: 2px;
          pointer-events: none;
          font-family: Arial, sans-serif;
          font-size: 12px;
          text-align: center;">日期: ${d.name} <p>提交平均次数: ${d.commitcount.toFixed(2)}</p><div>`)
          tip.show(d, this)
          d3.select(this).style('stroke', 'grey').style('stroke-width', 2)
        })
        .on('mouseout', function () {
          tip.hide()
          d3.select(this).style('stroke-width', 0)
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
        .style('opacity', 0.8)

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
          return i * 71 * 4.25 + 80 + studentNum * 370
        })
        .attr('y', 60)
        .attr('fill', function () {
          if (newList[1][studentNum] == '针对型') {
            return '#37A2DA'
          } else if (newList[1][studentNum] == '多样型') {
            return '#e06343'
          } else {
            return '#6ABF57'
          }
        })
        .attr('font-size', '15px')
        // .attr('font-family', 'serif')
        .attr('font-family', 'Segoe UI')
        .text(
          '学习者ID: ' +
            studentName +
            '(' +
            rankMap[newList[2][studentNum]] +
            ')'
        )
    }
    //对选中的每个学生都生成这个图
    studentID.forEach(function (item, index) {
      console.log(item, index)
      const dataArr = studentCalandarInfo[item]
      console.log(dataArr)
      drawStudentCalendar(item, index, dataArr)
    })
    // 获取 SVG 的边界框
    const bbox = svg.node().getBBox()

    // 动态设置 SVG 的宽度和高度
    svg.attr('width', bbox.width + bbox.x)
  }
  //绘制演变视图的对比日历
  function drawCalenderCompare(studentID) {
    //用于判断生成了多少个日历图

    //判断是否已经存在svg
    const svg = d3
      .select('.calendarview')
      .append('svg')
      .attr('class', 'calendarsvg')
      //   .attr('width', '100%')
      .attr('height', '99%')
    svg.call(tip)
    tempclick = svg.append('circle').attr('cx', 0).attr('cy', -100)
    //图例
    //图例数据
    const legendData = [
      { category: '正确占比', value: '#6abf57' },
      { category: '答题数', value: '#EFA3A3' },
      { category: 'Method_C', value: '#3770A7' },
      { category: 'Method_g', value: '#886D80' },
      { category: 'Method_5', value: '#E5C765' },
      { category: 'Method_m', value: '#D9644A' },
      { category: 'Method_B', value: '#7C5227' }
    ]

    const legend = svg.append('g').attr('class', 'legend')
    // 添加图例条目
    legend
      .selectAll('rect')
      .data(legendData)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 90 + 15)
      .attr('y', 10)
      .attr('width', 20)
      .attr('height', 15)
      .attr('fill', (d) => d.value)
      .attr('rx', 5) // 设置水平圆角半径
      .attr('ry', 5) // 设置垂直圆角半径

    // 添加图例文本
    legend
      .selectAll('text')
      .data(legendData)
      .enter()
      .append('text')
      .attr('x', (d, i) => i * 90 + 40)
      .attr('y', 18)
      .attr('dy', '0.35em')
      .text((d) => d.category)
      .attr('font-size', 12)
      .style('opacity', 0.8)
    //添加中间线性映射的圆的提交次数的颜色
    //   定义颜色映射的线性渐变
    const gradient = d3
      .select('.calendarsvg')
      .append('defs')
      .append('linearGradient')
      .attr('id', 'gradientcompare')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%')

    // 添加渐变色段
    // gradient.append('stop').attr('offset', '0%').attr('stop-color', '#E4F1F4')
    // gradient.append('stop').attr('offset', '100%').attr('stop-color', '#47A2BE')
    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#aed8f5')
    gradient.append('stop').attr('offset', '50%').attr('stop-color', '#569ddb')
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#2f7fce')

    // 创建矩形
    d3.select('.calendarsvg')
      .append('rect')
      .attr('width', 100)
      .attr('height', 18)
      //   .attr('x', 30)
      //   .attr('y', 40)
      .attr('x', 640)
      .attr('y', 8)
      .style('fill', 'url(#gradientcompare)')
    //创建标签
    // 创建矩形
    d3.select('.calendarsvg')
      .append('text')
      .attr('x', 750)
      .attr('y', 18)
      .attr('dy', '0.35em')
      .text('提交次数')
      .attr('font-size', 12)
      .style('opacity', 0.8)

    //画日历
    function drawStudentCalendarCompare(
      studentName,
      studentNum,
      dataArr,
      monthFlag
    ) {
      const commitscaleColor = d3
        .scaleLinear()
        .domain([0, maxcommitnum])
        // .range(['#E4F1F4', '#47A2BE'])
        .range(['#aed8f5', '#569ddb', '#2f7fce'])

      //正确占比颜色映射
      const rightcolor = d3
        .scaleOrdinal()
        .domain(['rightrate', 'errorrate'])
        .range(['#6abf57', 'red'])
      // .range(['#49c486', 'red'])

      //使用语言的颜色映射
      const languagecolor = d3
        .scaleOrdinal()
        .domain(['Method_C', 'Method_g', 'Method_5', 'Method_m', 'Method_B'])
        .range(['#3770A7', '#886D80', '#E5C765', '#D9644A', '#7C5227'])
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

      //绘制每个月的日历

      let dayDatas = {}
      if (monthFlag == 10 || monthFlag == 12) {
        dayDatas = generateDataset({
          startDate: '2023-' + monthFlag + '-01',
          endDate: '2023-' + monthFlag + '-31',
          fill: dataArr
        })
      } else if (monthFlag == 1) {
        dayDatas = generateDataset({
          startDate: '2024-' + monthFlag + '-01',
          endDate: '2024-' + monthFlag + '-31',
          fill: dataArr
        })
      } else {
        dayDatas = generateDataset({
          startDate: '2023-' + monthFlag + '-01',
          endDate: '2023-' + monthFlag + '-30',
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
          d3.select(this).style('stroke', 'grey').style('stroke-width', 2)
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
                text-align: center;">日期: ${d.name}  <p>答题数: ${d.titletotal}</p> <p>Method_C: ${d.language[0].toFixed(2)}</p> <p>Method_g: ${d.language[1].toFixed(2)}</p> <p>Method_5: ${d.language[2].toFixed(2)}</p> <p>Method_m: ${d.language[3].toFixed(2)}</p> <p>Method_B: ${d.language[4].toFixed(2)}</p><p>提交平均次数: ${d.commitcount.toFixed(2)}</p><div>`)
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
        .on('mouseout', function () {
          tip.hide()
          d3.select(this).style('stroke-width', 0)
        })

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
          .attr('fill', '#EFA3A3')
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
        .attr('r', function (d) {
          if (!d.commitcount) {
            return 0
          } else {
            return 11
          }
        }) // 半径
        .attr('cx', (d) => Math.floor(d.dayTem / 7) * 66 + 33)
        .attr('cy', (d) => (d.dayTem % 7) * 66 + 33)
        .attr('fill', (d) => {
          if (!d.commitcount) {
            return '#FBFAFA'
          }
          return commitscaleColor(d.commitcount)
        })
        .on('click', function (event, d) {
          // 在点击事件中，可以访问数据（d）和索引（i）
          handleCalendarSelectFlag(true)
          handleStudentIDfromCalendar(studentName)
          handleStudentDatefromCalendar(d.name)
          tip.hide()
          tempclick.style('r', 11)
          d3.select(this).style('r', 8)
          tempclick = d3.select(this)
        })
        .on('mouseover', function (e, d) {
          tip.html(`<div style="line-height: 1;
        font-weight: bold;
        padding: 12px;
        background: white;
        color: grey;
        border-radius: 2px;
        pointer-events: none;
        font-family: Arial, sans-serif;
        font-size: 12px;
        text-align: center;">日期: ${d.name} <p>提交平均次数: ${d.commitcount.toFixed(2)}</p><div>`)
          tip.show(d, this)
          d3.select(this).style('stroke', 'grey').style('stroke-width', 2)
        })
        .on('mouseout', function () {
          tip.hide()
          d3.select(this).style('stroke-width', 0)
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
        .style('opacity', 0.8)

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
          return i * 71 * 4.25 + 90 + studentNum * 370
        })
        .attr('y', 60)
        .attr('fill', function () {
          if (newList[1][CalendarCompareNum] == '针对型') {
            return '#37A2DA'
          } else if (newList[1][CalendarCompareNum] == '多样型') {
            return '#e06343'
          } else {
            return '#37a354'
          }
        })
        .attr('font-size', '15px')
        // .attr('font-family', 'serif')
        .attr('font-family', 'Segoe UI')
        .text('学习者ID: ' + studentName + '(' + monthFlag + '月)')
    }

    //对选中的每个学生都生成这个图
    studentID.forEach(function (item, index) {
      console.log(item, index)
      let monthList = [transferFirstMonth, transferSecondMonth]
      monthList.forEach((m, i) => {
        const dataArr = studentCalandarInfo[item + '-' + monthList[i]]
        console.log(dataArr)
        drawStudentCalendarCompare(item, CalendarCompareNum, dataArr, m)
        CalendarCompareNum = CalendarCompareNum + 1
      })
    })
    // 获取 SVG 的边界框
    const bbox = svg.node().getBBox()

    // 动态设置 SVG 的宽度和高度
    svg.attr('width', bbox.width + bbox.x)
  }

  //绘制时间模式的答题时间段对比分析图
  function drawAnswerSession(sessionPeriods, answerData, allPeriodPeople) {
    //假数据
    //每个时段,每个月对应的提交/活跃度/人数

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

    //创建svg
    const svg = d3
      .select('#answerSession')
      .append('svg')
      .attr('id', 'answerSessionsvg')
      .attr('width', '80%')
      .attr('height', '100%')
    const margin = { top: 30, right: 100, bottom: 30, left: 70 }
    const width =
      svg.node().getBoundingClientRect().width -
      margin.left -
      margin.right -
      160
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
      .attr('stop-color', '#C3E3EC')
    gradientanswercommit
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#46A8C6')
    // 创建矩形
    svg
      .append('rect')
      .attr('width', 100)
      .attr('height', 18)
      .attr('x', 10)
      .attr('y', 10)
      .style('fill', 'url(#gradientanswercommit)')

    //创建标签
    // 创建矩形
    svg
      .append('text')
      .attr('x', 120)
      .attr('y', 20)
      .attr('dy', '0.35em')
      .text('提交次数')
      .attr('font-size', 12)
      .style('opacity', 0.8)

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
      .attr('stop-color', '#6ABF57')
    gradientanswerpeople
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#EB8277')

    // 创建矩形
    svg
      .append('rect')
      .attr('width', 100)
      .attr('height', 18)
      .attr('x', 180)
      .attr('y', 10)
      .style('fill', 'url(#gradientanswerpeople)')

    //创建标签
    // 创建矩形
    svg
      .append('text')
      .attr('x', 290)
      .attr('y', 20)
      .attr('dy', '0.35em')
      .text('活跃人数')
      .attr('font-size', 12)
      .style('opacity', 0.8)

    //图例数据
    const legendData = [
      { category: '集中针对型', value: '#86C6F0' },
      { category: '广泛多样型', value: '#EB8277' },
      { category: '探索尝试型', value: '#6ABF57' }
    ]
    const legend = svg.append('g').attr('class', 'legend')
    // 添加图例条目
    legend
      .selectAll('rect')
      .data(legendData)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 90 + 350)
      .attr('y', 12)
      .attr('width', 20)
      .attr('height', 15)
      .attr('fill', (d) => d.value)
      .attr('rx', 4) // 设置水平圆角半径
      .attr('ry', 4) // 设置垂直圆角半径

    // 添加图例文本
    legend
      .selectAll('text')
      .data(legendData)
      .enter()
      .append('text')
      .attr('x', (d, i) => i * 90 + 375)
      .attr('y', 20)
      .attr('dy', '0.35em')
      .text((d) => d.category)
      .attr('font-size', 12)
      .style('opacity', 0.8)

    //创建横纵坐标比例尺
    // 数据
    const sessionMonths = [9, 10, 11, 12, 1]

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
      .range(['#C3E3EC', '#46A8C6'])
    // .range(['#ABE2FE', '#236D92'])

    //创建活跃度圆心大小的比例尺
    const acticityradiusScale = d3
      .scaleLinear()
      .domain([minActivity, maxActivity])
      .range([rectWidth / 4 - 5, rectWidth / 2 - 5])

    //创建人数颜色的比例尺
    const peopleColorScale = d3
      .scaleLinear()
      .domain([minPeople, maxPeople])
      // .range(['#6ABF57', '#E06343'])
      .range(['#6ABF57', '#EB8277'])
    // .range(['#8DCF8A', '#D06B63'])

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
      .style('opacity', 0.8)
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
      .style('opacity', 0.8)

    workAxisg
      .selectAll('.domain, .tick line') // 选择轴线和刻度线
      .style('display', 'none') // 隐藏轴线和刻度线

    // 选择Y轴元素设置字体大小
    workAxisg
      .select('.y-axis')
      // 设置字体大小为14像素
      .selectAll('text')
      .style('font-size', '13px')
      .style('opacity', 0.8)

    workAxisg
      .select('.x-axis')
      // 设置字体大小为14像素
      .selectAll('text')
      .style('font-size', '13px')
      .style('opacity', 0.8)

    //绘制答题情况
    const workg = svg
      .append('g')
      .attr('id', 'workanswer')
      .attr('transform', `translate(${margin.left},${margin.top + 20})`)

    //假数据，每个月的每天的人数
    // const peopleDetial = {
    //   '上午-休息日': {
    //     1: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     9: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     10: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     11: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     12: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15]
    //   },
    //   '上午-工作日': {
    //     1: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     9: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     10: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     11: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     12: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15]
    //   },
    //   '下午-休息日': {
    //     1: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     9: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     10: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     11: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     12: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15]
    //   },
    //   '下午-工作日': {
    //     1: [
    //       12, 16, 19, 18, 19, 17, 14, 22, 22, 12, 10, 10, 12, 16, 10, 12, 11,
    //       12, 13, 15
    //     ],
    //     9: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     10: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     11: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     12: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15]
    //   },
    //   '凌晨-休息日': {
    //     1: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     9: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //     10: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     11: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     12: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15]
    //   },
    //   '凌晨-工作日': {
    //     1: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     9: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     10: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     11: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     12: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15]
    //   },
    //   '晚上-休息日': {
    //     1: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     9: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     10: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     11: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     12: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15]
    //   },
    //   '晚上-工作日': {
    //     1: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     9: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     10: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     11: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15],
    //     12: [12, 16, 19, 18, 19, 17, 1, 2, 3, 5, 1, 0, 2, 6, 0, 2, 1, 2, 3, 15]
    //   }
    // }
    const peopleDetial = allPeriodPeople

    for (const key in answerData) {
      const monthdata = answerData[key]
      const peopledata = peopleDetial[key]
      for (const monthkey in monthdata) {
        const monthvalue = monthdata[monthkey]
        const monthpeople = peopledata[monthkey]

        // 绘制提交次数矩形
        workg
          .append('rect')
          .attr('width', rectWidth)
          .attr('height', rectWidth)
          .attr('rx', 3)
          .attr('x', xScale(parseInt(monthkey)))
          .attr('y', yScale(key))
          .attr('fill', submitColorScale(monthvalue[0]))
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
                  text-align: center;">提交次数: ${monthvalue[0].toFixed(0)}  <p>活跃度: ${monthvalue[1].toFixed(2)}</p> <p>活跃人数: ${monthvalue[2]}</p><div>`)
            tip.show(d, this)
          })
          .on('mouseout', function () {
            tip.hide()
            d3.select(this).style('stroke-width', 0)
          })
        // .on('click', function () {
        //   tip.hide
        //   const keyParts = key.split('-')
        //   setSelectMonth(monthkey)
        //   if (keyParts[1] == '工作日') {
        //     setSelectIsWork(1)
        //   } else {
        //     setSelectIsWork(0)
        //   }
        //   setSelectPeriod(keyParts[0])
        // })
        //绘制活跃度圆形
        workg
          .append('circle')
          .attr('r', acticityradiusScale(monthvalue[1]))
          .attr('cx', xScale(parseInt(monthkey)) + rectWidth / 2)
          .attr('cy', yScale(key) + rectWidth / 2)
          .attr('fill', peopleColorScale(monthvalue[2]))
          .on('mouseover', function (d) {
            // d3.select(this).transition().duration(200).style('opacity', 0.7)
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
                  text-align: center;">活跃度: ${monthvalue[1].toFixed(2)} <p>活跃人数: ${monthvalue[2]}</p><div>`)
            tip.show(d, this)
          })
          .on('mouseout', function () {
            tip.hide()
            d3.select(this).style('stroke-width', 0)
          })
          .on('click', function () {
            const keyParts = key.split('-')
            setSelectMonth(monthkey)
            if (keyParts[1] == '工作日') {
              setSelectIsWork(1)
            } else {
              setSelectIsWork(0)
            }
            setSelectPeriod(keyParts[0])
            tip.hide()
          })
        //绘制活跃度矩形
        //单独设置比例尺
        const peopleScale = d3
          .scaleLinear()
          .domain([0, d3.max(monthpeople)])
          .range([rectWidth / 4 - 10, acticityradiusScale(monthvalue[1]) - 1])
        const peopleg = workg.append('g')
        peopleg
          .selectAll('rect')
          .data(monthpeople)
          .enter()
          .append('rect')
          .attr('x', xScale(parseInt(monthkey)) + rectWidth / 2)
          .attr('y', yScale(key) + rectWidth / 2)
          .attr('width', 1)
          .attr('height', function (d) {
            return peopleScale(d)
          })
          .attr('fill', 'white')
          .attr('transform', function (d, i) {
            return `rotate(${(i * 360) / monthpeople.length + 180},${xScale(parseInt(monthkey)) + rectWidth / 2},${yScale(key) + rectWidth / 2})`
          })
      }
    }

    //绘制该月该时段下每天的学生答题模式类型,按人数排序
  }
  function drawAnswerCalendar(dataAnswerArr) {
    //假数据
    // const dataAnswerArr = {
    //   '2023-09-8': [200, 300, 500],
    //   '2023-09-9': [300, 200, 500],
    //   '2023-09-10': [300, 200, 500],
    //   '2023-09-11': [300, 200, 500],
    //   '2023-09-12': [322, 300, 420],
    //   '2023-09-13': [300, 200, 500],
    //   '2023-09-14': [300, 200, 500],
    //   '2023-09-16': [300, 200, 500],
    //   '2023-09-17': [300, 200, 500],
    //   '2023-09-18': [300, 200, 500],
    //   '2023-09-19': [300, 200, 500],
    //   '2023-09-20': [900, 50, 51],
    //   '2023-09-26': [300, 200, 500],
    //   '2023-09-27': [300, 200, 500],
    //   '2023-09-28': [320, 20, 700],
    //   '2023-09-29': [300, 200, 500],
    //   '2023-09-30': [300, 200, 500],
    //   '2023-09-31': [300, 200, 500]
    // }
    console.log(dataAnswerArr)
    //创建svg
    const svg = d3
      .select('#answerDetailSession')
      .append('svg')
      .attr('id', 'answerDetailSessionsvg')
      .attr('width', '100%')
      .attr('height', '100%')

    svg.call(tip)
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
    //判断是5列日历还是6列日历以此安排画布位置
    let monthmargin = 0
    // if (answermonthnum == 9 || answermonthnum == 12) {
    //   monthmargin = 430
    // } else {
    //   monthmargin = 455
    // }
    if (selectMonth == 9 || selectMonth == 12) {
      monthmargin = 23
    } else {
      monthmargin = 48
    }
    let dayDatas = {}
    if (selectMonth == 9 || selectMonth == 11) {
      dayDatas = generateAnswerDataset({
        startDate: '2023-' + selectMonth + '-01',
        endDate: '2023-' + selectMonth + '-30',
        fill: dataAnswerArr
      })
    } else if (selectMonth == 1) {
      dayDatas = generateAnswerDataset({
        startDate: '2024-' + selectMonth + '-01',
        endDate: '2024-' + selectMonth + '-31',
        fill: dataAnswerArr
      })
    } else {
      dayDatas = generateAnswerDataset({
        startDate: '2023-' + selectMonth + '-01',
        endDate: '2023-' + selectMonth + '-31',
        fill: dataAnswerArr
      })
    }
    console.log(dayDatas)
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
          return '#EEEDED'
        }
        //   return commitscaleColor(d.commitcount)
        else {
          return '#EDECEC'
        }
      })
      .on('mouseover', function (e, d) {
        d3.select(this).style('stroke', 'grey').style('stroke-width', 2)
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
            text-align: center;">日期: ${d.name} <p> 集中针对型: ${d.point} 人</p><p> 广泛多样型: ${d.various}人</p><p> 探索尝试型: ${d.trying}人</p><div>`)
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
      .on('mouseout', function () {
        tip.hide()
        d3.select(this).style('stroke-width', 0)
      })
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
      .attr('x', 0)
      .attr('y', 90)
      .attr('dy', (d, i) => i * 66 + 30)
      .attr('fill', 'black')
      .text((d) => d)
      .style('opacity', 0.8)

    //根据日历图布局，绘制周文本
    let monthAll = []
    dayDatas.forEach((element) => {
      monthAll = monthAll.concat(element.monthGroup)
    })
    let workFlag = '休息日'
    if (selectIsWork == 1) {
      workFlag = '工作日'
    }
    answertitle
      .append('g')
      .attr('class', 'month-title')
      .selectAll()
      .data(monthAll)
      .enter()
      .append('text')
      .attr('x', (d, i) => {
        return i * 71 * 4.25 + 180
      })
      .attr('y', 60)
      .attr('fill', 'black')
      .attr('font-size', '15px')
      .attr('font-family', 'monospace')
      .text(selectMonth + '月-' + workFlag + '-' + selectPeriod)
      .style('opacity', 0.8)

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
      .range(['#86C6F0', '#EB8277', '#94DC84'])
    //矩形数据比例尺
    const modenumScale = d3
      .scaleLinear()
      .domain([minmodeNum, maxmodeNum])
      .range([10, 50])
    //数量最大的
    const modemaxNumSvg = answerymontSvg
      .append('g')
      .attr('class', 'modemaxNumSvg')
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
        // 如果point, various或trying为null, 返回null不画rect
        if (d.point === null || d.various === null || d.trying === null) {
          return null
        }
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
        // 如果point, various或trying为null, 返回null不画rect
        if (d.point === null || d.various === null || d.trying === null) {
          return null
        }
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
      .on('mouseover', function (e, d) {
        d3.select(this).style('stroke', 'grey').style('stroke-width', 2)
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
            text-align: center;">日期: ${d.name} <p> 集中针对型: ${d.point} 人</p><p> 广泛多样型: ${d.various}人</p><p> 探索尝试型: ${d.trying}人</p><div>`)
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
      .on('mouseout', function () {
        tip.hide()
        d3.select(this).style('stroke-width', 0)
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
        // 如果point, various或trying为null, 返回null不画rect
        if (d.point === null || d.various === null || d.trying === null) {
          return null
        }
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
        // 如果point, various或trying为null, 返回null不画rect
        if (d.point === null || d.various === null || d.trying === null) {
          return null
        }
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
      .on('mouseover', function (e, d) {
        d3.select(this).style('stroke', 'grey').style('stroke-width', 2)
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
            text-align: center;">日期: ${d.name} <p> 集中针对型: ${d.point} 人</p><p> 广泛多样型: ${d.various}人</p><p> 探索尝试型: ${d.trying}人</p><div>`)
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
      .on('mouseout', function () {
        tip.hide()
        d3.select(this).style('stroke-width', 0)
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
        // 如果point, various或trying为null, 返回null不画rect
        if (d.point === null || d.various === null || d.trying === null) {
          return null
        }
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
        // 如果point, various或trying为null, 返回null不画rect
        if (d.point === null || d.various === null || d.trying === null) {
          return null
        }
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
      .on('mouseover', function (e, d) {
        d3.select(this).style('stroke', 'grey').style('stroke-width', 2)
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
            text-align: center;">日期: ${d.name} <p> 集中针对型: ${d.point} 人</p><p> 广泛多样型: ${d.various}人</p><p> 探索尝试型: ${d.trying}人</p><div>`)
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
      .on('mouseout', function () {
        tip.hide()
        d3.select(this).style('stroke-width', 0)
      })
  }

  // 表格勾选清空
  useEffect(() => {
    handleRowKeys([])
    console.log(selectedRowKeys)
  }, [amode])

  //视图更新
  useEffect(() => {
    if (amode == 0 && selectedRowKeys != []) {
      //更新重画
      studentID = selectedRowKeys
      let modeList = []
      let rankList = []
      selectedRowKeys.forEach((id) => {
        brushSelectedData.forEach((item) => {
          if (item['key'] == id) {
            modeList.push(item['label'])
            rankList.push(item['rank'])
          }
        })
      })
      newList = [selectedRowKeys, modeList, rankList]

      getCalenderInfo(studentID, month, amode).then((res) => {
        d3.select('.calendarsvg').remove()
        studentCalandarInfo = res
        console.log(res)
        // 遍历 JSON 对象的每个键,获取这一组学生的提交最大值
        for (const key1 in studentCalandarInfo) {
          if (Object.prototype.hasOwnProperty.call(studentCalandarInfo, key1)) {
            // 获得 key1 对应的数字
            const key2Array = studentCalandarInfo[key1]
            for (const key2 in key2Array) {
              if (Object.prototype.hasOwnProperty.call(key2Array, key2)) {
                // 遍历 key2Array 数组中的每个对象
                if (key2Array[key2][3] > maxcommitnum) {
                  maxcommitnum = key2Array[key2][3]
                }
              }
            }
          }
        }
        drawCalendar(studentID)
      })
    } else if (amode == 2 && selectedRowKeys != []) {
      console.log(selectedRowKeys)
      studentID = selectedRowKeys
      let modeList = []
      selectedRowKeys.forEach((id) => {
        transferLinksData[0].forEach((item) => {
          if (item['key'] == id) {
            modeList.push(item['label'])
            modeList.push(item['label1'])
          }
        })
      })
      newList = [selectedRowKeys, modeList] //需要更改,获取的前一个月和后一个月的模式

      getCalenderInfo(studentID, transferFirstMonth, amode).then((res) => {
        d3.select('.calendarsvg').remove()
        studentCalandarInfo = res
        console.log(studentID, transferFirstMonth, amode, res)
        //假数据
        // studentCalandarInfo = {
        //   '0b307ee95b41e222f204-9': {
        //     '2023-09-02': [1, 1, [2, 3, 5, 0, 4], 0]
        //   },
        //   '0b307ee95b41e222f204-10': {
        //     '2023-10-21': [0.5, 3, [2, 3, 6, 0, 4], 1]
        //   },
        //   '18cdd44af62c6935e7a0-9': {
        //     '2023-09-05': [1, 1, [2, 3, 5, 0, 4], 0]
        //   },
        //   '18cdd44af62c6935e7a0-10': {
        //     '2023-10-11': [0.5, 3, [2, 3, 6, 0, 4], 1]
        //   }
        // }
        // 遍历 JSON 对象的每个键,获取这一组学生的提交最大值
        for (const key1 in studentCalandarInfo) {
          if (Object.prototype.hasOwnProperty.call(studentCalandarInfo, key1)) {
            // 获得 key1 对应的数字
            const key2Array = studentCalandarInfo[key1]
            for (const key2 in key2Array) {
              if (Object.prototype.hasOwnProperty.call(key2Array, key2)) {
                // 遍历 key2Array 数组中的每个对象
                if (key2Array[key2][3] > maxcommitnum) {
                  maxcommitnum = key2Array[key2][3]
                }
              }
            }
          }
        }
        console.log(studentCalandarInfo)
        drawCalenderCompare(studentID)
      })
    } else if (amode == 1) {
      // d3.select('.calendarsvg').remove()
      // d3.select('#answerSessionsvg').remove()
      let sessionPeriods = [
        '凌晨-工作日',
        '上午-工作日',
        '下午-工作日',
        '晚上-工作日',
        '凌晨-休息日',
        '上午-休息日',
        '下午-休息日',
        '晚上-休息日'
      ]
      if (order == 'timeOrder') {
        sessionPeriods = [
          '凌晨-工作日',
          '凌晨-休息日',
          '上午-工作日',
          '上午-休息日',
          '下午-工作日',
          '下午-休息日',
          '晚上-工作日',
          '晚上-休息日'
        ]
      }
      let allPeriodPeople = {}
      getAllPeriodInfo().then((res) => {
        getallPeriodDayPeople().then((res2) => {
          allPeriodPeople = res2
          d3.select('#answerSessionsvg').remove()
          d3.select('.calendarsvg').remove()
          const answerData = res
          console.log(allPeriodPeople)
          drawAnswerSession(sessionPeriods, answerData, allPeriodPeople)
        })
      })
    }
  }, [order, calendarFlag, selectedRowKeys])

  //监听是否有选中的时间段
  useEffect(() => {
    if (amode == 1 && selectMonth != null) {
      //如果有选中再画出该时段下的学生模式
      // d3.select('#answerDetailSessionsvg').remove()
      let period = null
      if (selectPeriod == '凌晨') {
        period = 'Dawn'
      } else if (selectPeriod == '上午') {
        period = 'Morning'
      } else if (selectPeriod == '下午') {
        period = 'Afternoon'
      } else {
        period = 'Evening'
      }
      getOnePeriodInfo(
        parseInt(selectMonth),
        parseInt(selectIsWork),
        period
      ).then((res) => {
        d3.select('#answerDetailSessionsvg').remove()
        const answerDetailData = res
        console.log(answerDetailData)
        drawAnswerCalendar(answerDetailData)
      })
    }
  }, [amode, selectMonth, selectIsWork, selectPeriod])

  //定义新函数,用于修改Order
  function handleOrder(value) {
    setOrder(value)
  }

  return (
    <CalendarWrapper>
      {/* amode=0答题模式 ，amode=1时间模式*/}
      {(amode == 0 || amode == 2) && (
        <div className="title">
          <div className="title-icon">
            {/* <IconFont type="icon-yuefen" /> */}
            <img
              src={Amonth}
              alt="日历图标"
              style={{ width: 20, height: 20 }}
            />
          </div>
          学习日历环形图
        </div>
      )}
      {amode == 1 && (
        <div className="title">
          <div className="title-icon">
            {/* <IconFont type="icon-shiyongshiduanfenxi" /> */}
            <img
              src={Frame}
              alt="答题时段图标"
              style={{ width: 20, height: 20 }}
            />
          </div>
          答题时段特征矩阵气泡图与模式统计日历图
        </div>
      )}
      <div className="calendarHighview">
        {/* amode=0答题模式 ，amode=1时间模式*/}
        {(amode == 0 || amode == 2) && <div className="calendarview"></div>}
        {amode == 1 && (
          <div id="answerSession" className="answerSessionview">
            <div id="answerDetailSession" className="answerDetailview"></div>
            <div id="orderSelect" className="orderSelectview">
              <Select
                defaultValue="按照工作日/休息日排序"
                style={{ width: 200, position: 'absolute' }}
                onChange={handleOrder}
                options={[
                  {
                    label: <span>选择排序方式</span>,
                    title: '选择排序方式',
                    options: [
                      {
                        label: <span>按照工作日/休息日排序</span>,
                        value: 'workOrder'
                      },
                      {
                        label: <span>按照时间段排序</span>,
                        value: 'timeOrder'
                      }
                    ]
                  }
                ]}
              />
            </div>
          </div>
        )}
      </div>
    </CalendarWrapper>
  )
}
export default memo(Calendar)
