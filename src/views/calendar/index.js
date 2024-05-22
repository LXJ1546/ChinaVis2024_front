import React, { memo, useEffect } from 'react'
import ReactEcharts from 'echarts-for-react'
import { CalendarWrapper } from './style'
import * as d3 from 'd3'
import d3Tip from 'd3-tip'
const Calendar = (props) => {
  // 拿到父组件传递的模式状态
  const { mode, month } = props
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
      const dayDatas = generateDataset({
        startDate: '2023-5-01',
        endDate: '2023-5-31',
        fill: dataArr
      })
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
        .attr('class', 'month-title')
        .selectAll()
        .data(monthAll)
        .enter()
        .append('text')
        .attr('x', (d, i) => {
          return i * 71 * 4.25 + 190 + studentNum * 370
        })
        .attr('y', 60)
        .attr('fill', 'black')
        .attr('font-size', '20px')
        .attr('font-family', 'monospace')
        .text(studentName)
    }
    //对选中的每个学生都生成这个图
    studentID.forEach(function (item, index) {
      console.log(item, index)
      const dataArr = {
        '2023-05-8': [0.9, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 55],
        '2023-05-9': [0.9, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 260],
        '2023-05-10': [0.9, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 55],
        '2023-05-11': [0.9, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 55],
        '2023-05-12': [0.9, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 100],
        '2023-05-13': [0.9, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 55],
        '2023-05-14': [0.9, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 55],
        '2023-05-16': [0.9, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 55],
        '2023-05-17': [0.4, 11, [0.1, 0.5, 0.2, 0.1, 0.1], 24],
        '2023-05-18': [0.9, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 55],
        '2023-05-19': [0.9, 4, [0.2, 0.3, 0.2, 0.1, 0.1], 60],
        '2023-05-20': [0.5, 38, [0.1, 0.5, 0.2, 0.1, 0.1], 60],
        '2023-05-26': [0.49, 3, [0.1, 0.5, 0.2, 0.1, 0.1], 60],
        '2023-05-27': [0.69, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 90],
        '2023-05-28': [0.69, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 90],
        '2023-05-29': [0.69, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 90],
        '2023-05-30': [0.69, 20, [0.1, 0.5, 0.2, 0.1, 0.1], 90],
        '2023-05-31': [0.9, 24, [0.1, 0.5, 0.2, 0.1, 0.1], 60]
      }
      drawStudentCalendar(item, index, dataArr)
    })
    // 获取 SVG 的边界框
    const bbox = svg.node().getBBox()

    // 动态设置 SVG 的宽度和高度
    svg.attr('width', bbox.width + bbox.x)
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
    if (mode == 0) {
      //更新重画
      // d3.select('svg').remove() //移除已有的svg元素
      // // 选择现有的 SVG 元素，如果已经存在则移除它
      d3.select('.calendarsvg').remove()
      drawCalendar(['学生1', '学生2', '学生3'])
    }
  }, [mode])

  return (
    <CalendarWrapper>
      {/* mode=0答题模式 ，mode=1时间模式*/}
      {mode == 0 && <div className="title">学习日历</div>}
      {mode == 1 && <div className="title">高峰分析矩阵图</div>}
      <div className="calendarHighview">
        {/* mode=0答题模式 ，mode=1时间模式*/}
        {mode == 0 && <div className="calendarview"></div>}
        {mode == 1 && (
          <ReactEcharts
            option={option2}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </div>
    </CalendarWrapper>
  )
}
export default memo(Calendar)
