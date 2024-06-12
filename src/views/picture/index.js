import React, { memo } from 'react'
import { PictureWrapper } from './style'
import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import * as echarts from 'echarts'
import { getClassBasicInfo } from '../../api/index'
import { createFromIconfontCN } from '@ant-design/icons'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4565164_juvpif6y83m.js'
})
import d3Tip from 'd3-tip'

const Picture = (props) => {
  const {
    classNum,
    isChangeWeight,
    handleStudentList,
    handleStudentList1,
    handleClickStudentId
  } = props
  const distributionRef = useRef(null)
  const majorRef = useRef(null)
  const ageRef = useRef(null)
  const genderRef = useRef(null)

  // const svgRef = useRef(null)
  // const tooltip = d3.select('#tooltip')

  function drawPicture(classBasicInfo) {
    // 检查是否已有图表实例存在，并销毁它
    const existingInstance = echarts.getInstanceByDom(majorRef.current)
    if (existingInstance) {
      existingInstance.dispose()
    }
    //画专业分布图
    const majorChart = echarts.init(majorRef.current)
    const majorOption = {
      title: {
        text: '专业分布',
        left: 'center',
        top: '50%',
        textStyle: {
          fontSize: 12,
          fontWeight: 'normal'
        }
      },
      tooltip: {
        trigger: 'item',
        position: function (pos, params, dom, rect, size) {
          // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
          var obj = { top: 85 }
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
          return obj
        }
      },
      series: [
        {
          type: 'pie',
          radius: ['70%', '110%'],
          center: ['50%', '58%'],
          label: {
            show: false // 不显示标识
          },
          // adjust the start and end angle
          startAngle: 180,
          endAngle: 360,
          data: classBasicInfo[0],
          itemStyle: {
            opacity: 0.7,
            color: function (params) {
              //自定义颜色
              // var colorList = [
              //   '#f6bd60',
              //   '#ff7d00',
              //   '#bc4749',
              //   '#7f5539',
              //   '#669bbc'
              // ]
              var colorList = [
                '#BEE4D7',
                '#8DD2E1',
                '#71B0D1',
                '#6B89BB',
                '#6168AC'
              ]
              // var colorList = [
              //   '#b7eb8f',
              //   '#95de64',
              //   '#87e8de',
              //   '#69b1ff',
              //   '#85a5ff'
              // ]
              return colorList[params.dataIndex]
            }
          }
        }
      ]
    }
    majorChart.setOption(majorOption)
    window.onresize = majorChart.resize
    // 检查是否已有图表实例存在，并销毁它
    const existingInstance1 = echarts.getInstanceByDom(ageRef.current)
    if (existingInstance1) {
      existingInstance1.dispose()
    }
    //年龄分布
    const ageChart = echarts.init(ageRef.current)
    const ageOption = {
      title: {
        text: '年龄分布',
        left: 'center',
        top: '50%',
        textStyle: {
          fontSize: 12,
          fontWeight: 'normal'
        }
      },
      tooltip: {
        trigger: 'item',
        position: function (pos, params, dom, rect, size) {
          // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
          var obj = { top: 85 }
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
          return obj
        }
      },
      series: [
        {
          type: 'pie',
          radius: ['70%', '110%'],
          center: ['50%', '58%'],
          label: {
            show: false // 不显示标识
          },
          // adjust the start and end angle
          startAngle: 180,
          endAngle: 360,
          data: classBasicInfo[1],
          itemStyle: {
            opacity: 0.7,
            color: function (params) {
              //自定义颜色
              // var colorList = [
              //   '#f6bd60',
              //   '#ff7d00',
              //   '#bc4749',
              //   '#7f5539',
              //   '#669bbc',
              //   '#087e8b',
              //   '#22577a'
              // ]
              var colorList = [
                '#BEE4D7',
                '#8DD2E1',
                '#71B0D1',
                '#6B89BB',
                '#6168AC',
                '#3770A7',
                '#777B98'
              ]
              return colorList[params.dataIndex]
            }
          }
        }
      ]
    }
    ageChart.setOption(ageOption)
    window.onresize = ageChart.resize
    // 检查是否已有图表实例存在，并销毁它
    const existingInstance2 = echarts.getInstanceByDom(genderRef.current)
    if (existingInstance2) {
      existingInstance2.dispose()
    }
    //性别分布
    const genderChart = echarts.init(genderRef.current)
    const genderOption = {
      title: {
        text: '性别分布',
        left: 'center',
        top: '50%',
        textStyle: {
          fontSize: 12,
          fontWeight: 'normal'
        }
      },
      tooltip: {
        trigger: 'item',
        position: function (pos, params, dom, rect, size) {
          // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
          var obj = { top: 85 }
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
          return obj
        }
      },
      series: [
        {
          type: 'pie',
          radius: ['70%', '110%'],
          center: ['50%', '58%'],
          label: {
            show: false // 不显示标识
          },
          // adjust the start and end angle
          startAngle: 180,
          endAngle: 360,
          data: classBasicInfo[2],
          itemStyle: {
            opacity: 0.7,
            color: function (params) {
              //自定义颜色
              // var colorList = ['#bc4749', '#669bbc']
              var colorList = ['#71B0D1', '#6168AC']
              return colorList[params.dataIndex]
            }
          }
        }
      ]
    }
    genderChart.setOption(genderOption)
    window.onresize = genderChart.resize
  }

  //初始化所有学生的班级排名视图
  function drawRank(classRankInfo) {
    const rectDistance = 2000 //用于扩大方块之间的差异
    const data = classRankInfo

    // 创建svg画布
    const svg = d3
      .select('.Rankview')
      .append('svg')
      .attr('class', 'ranksvg')
      .attr('width', '100%')
      .attr('height', '100%')
    //tooltip
    const tip = d3Tip()
      .attr('class', 'd3-tip')
      .html(function (d) {
        return `Class ${d[0]},人数: <span >${d}</span>`
      })

    //绘制排名指示标志
    //定义直线的起始点和终点坐标
    var lineData = [
      { x: 90, y: 65 },
      { x: 600, y: 65 }
    ]

    // 定义箭头大小
    var arrowSize = 6

    // 创建直线生成器
    var lineFunction = d3
      .line()
      .x(function (d) {
        return d.x
      })
      .y(function (d) {
        return d.y
      })

    // 绘制直线
    var lineGraph = svg
      .append('path')
      .attr('d', lineFunction(lineData))
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .attr('fill', 'none')
      .style('opacity', 0.8)

    // 添加箭头
    svg
      .append('svg:defs')
      .selectAll('marker')
      .data(['arrow']) // 定义箭头的名称
      .enter()
      .append('svg:marker')
      .attr('id', String)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 0) // 箭头与直线的距离
      .attr('refY', 0)
      .attr('markerWidth', arrowSize) // 箭头大小
      .attr('markerHeight', arrowSize)
      .attr('orient', 'auto') // 箭头方向
      .append('svg:path')
      .attr('d', 'M0,-5L10,0L0,5')
      .style('opacity', 0.8)

    // 给直线添加箭头
    lineGraph.attr('marker-end', 'url(#arrow)')
    svg
      .append('text')
      .text('高')
      .attr('fontSize', '12')
      .attr('x', '11%')
      .attr('y', '85%')
      .style('opacity', 0.8)
    svg
      .append('text')
      .text('低')
      .attr('fontSize', '12')
      .attr('x', '97%')
      .attr('y', '85%')
      .style('opacity', 0.8)

    for (var studentType = 0; studentType < 3; studentType++) {
      var beforeOne = 0
      var rectX = 92 //第一个方块的起始值
      //创建班级排名视图,为该视图创建一个group
      const ranking = svg.append('g')
      ranking
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', '10px')
        .attr('height', function (d) {
          const totalStudent = d[2][0] + d[2][1] + d[2][2]
          const rectH = (d[2][studentType] / totalStudent) * 50
          return rectH + 'px'
        })
        .attr('fill', function () {
          if (studentType == 0) {
            // return '#8AD0EE'
            return '#BEE4D7'
          } else if (studentType == 1) {
            // return '#8AB5EE'
            return '#71B0D1'
          } else {
            // return '#5686F0'
            return '#6B89BB'
          }
        })
        .attr('x', function (d, i) {
          if (i == 0) {
            rectX = rectX + 12
            beforeOne = d[1]
            return '92px'
          } else {
            rectX = rectX + 12 + rectDistance * (beforeOne - d[1])
            beforeOne = d[1]
            return rectX + rectDistance * (beforeOne - d[1]) + 'px'
          }
        })
        .attr('y', function (d) {
          const totalStudent = d[2][0] + d[2][1] + d[2][2]
          if (studentType == 0) {
            return '10px'
          } else if (studentType == 1) {
            return 10 + (d[2][0] / totalStudent) * 50 + 'px'
          } else {
            return (
              10 +
              (d[2][0] / totalStudent) * 50 +
              (d[2][1] / totalStudent) * 50 +
              'px'
            )
          }
        })
        .on('mouseover', function (e, d) {
          d3.select(this).style('stroke', 'grey').style('stroke-width', 2)
          if (
            d3.select(this)._groups[0][0].className.baseVal == 'studentType0'
          ) {
            tip.html(`<div style="line-height: 1;
            font-weight: bold;
            padding: 12px;
            background: white;
            color: grey;
            border-radius: 2px;
            pointer-events: none;
            font-family: Arial, sans-serif;
            font-size: 12px;
            text-align: center;">班级：${d[0]}<p> 前30%人数: ${d[2][0]}</p><div>`)
            tip.show(d, this)
          } else if (
            d3.select(this)._groups[0][0].className.baseVal == 'studentType1'
          ) {
            tip.html(`<div style="line-height: 1;
            font-weight: bold;
            padding: 12px;
            background: white;
            color: grey;
            border-radius: 2px;
            pointer-events: none;
            font-family: Arial, sans-serif;
            font-size: 12px;
            text-align: center;">班级：${d[0]}<p> 30%~70%人数: ${d[2][1]}</p><div>`)
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
            text-align: center;">班级：${d[0]}<p> 后30%人数: ${d[2][2]}</p><div>`)
            tip.show(d, this)
          }
        })
        .on('mouseout', function () {
          d3.select(this).style('stroke', 'grey').style('stroke-width', 0)
          tip.hide()
        })
    }

    //班级排名视图标签
    const ranklable = svg.append('g').attr('class', 'ranklable')
    // ranklable
    //   .append('text')
    //   .text('所有班级')
    //   .attr('x', '2%')
    //   .attr('y', '40%')
    //   .style('opacity', 0.8)
    ranklable
      .append('text')
      .text('班级排名')
      .attr('x', '2%')
      .attr('y', '65%')
      .style('opacity', 0.8)
      .style('font-weight', 'bold')
    svg.call(tip)
  }

  //更新班级内部排名视图
  function updateRank(classRankInfo) {
    // console.log(classRankInfo)
    const rectDistance = 400 //用于扩大方块之间的差异
    var beforeOne = 0
    var rectX = 100 //第一个方块的起始值
    const svg = d3.select('.ranksvg')
    //tooltip
    const tip = d3Tip()
      .attr('class', 'd3-tip')
      .html(function (d) {
        return `Class ${d[0]},人数: <span >${d}</span>`
      })

    svg.call(tip)
    // 清空 SVG 的内容
    svg.selectAll('*').remove()
    //绘制排名指示标志
    //定义直线的起始点和终点坐标
    var lineData = [
      { x: 100, y: 65 },
      { x: 600, y: 65 }
    ]

    // 定义箭头大小
    var arrowSize = 6

    // 创建直线生成器
    var lineFunction = d3
      .line()
      .x(function (d) {
        return d.x
      })
      .y(function (d) {
        return d.y
      })

    // 绘制直线
    var lineGraph = svg
      .append('path')
      .attr('d', lineFunction(lineData))
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .attr('fill', 'none')
      .style('opacity', 0.8)

    // 添加箭头
    svg
      .append('svg:defs')
      .selectAll('marker')
      .data(['arrow']) // 定义箭头的名称
      .enter()
      .append('svg:marker')
      .attr('id', String)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 0) // 箭头与直线的距离
      .attr('refY', 0)
      .attr('markerWidth', arrowSize) // 箭头大小
      .attr('markerHeight', arrowSize)
      .attr('orient', 'auto') // 箭头方向
      .append('svg:path')
      .attr('d', 'M0,-5L10,0L0,5')
      .style('opacity', 0.8)

    // 给直线添加箭头
    lineGraph.attr('marker-end', 'url(#arrow)')
    svg
      .append('text')
      .text('高')
      .attr('fontSize', '12')
      .attr('x', '12%')
      .attr('y', '85%')
      .style('opacity', 0.8)
    svg
      .append('text')
      .text('低')
      .attr('fontSize', '12')
      .attr('x', '97%')
      .attr('y', '85%')
      .style('opacity', 0.8)
    //创建班级排名视图,为该视图创建一个group
    const ranking = svg.append('g')
    ranking
      .selectAll('rect')
      .data(classRankInfo)
      .enter()
      .append('rect')
      .attr('width', '2px')
      .attr('height', '50px')
      .attr('fill', function (d, i) {
        //前30%一种颜色，30%到70%一种颜色，70%之后的一种颜色
        const rankrate = (i + 1) / classRankInfo.length
        if (rankrate <= 0.3) {
          return '#BEE4D7'
        } else if (rankrate <= 0.7) {
          return '#71B0D1'
        } else {
          return '#6B89BB'
        }
      })
      .attr('x', function (d, i) {
        if (i == 0) {
          rectX = rectX + 2
          beforeOne = d[4]
          return '100px'
        } else {
          rectX = rectX + 2 + rectDistance * (beforeOne - d[4])
          beforeOne = d[4]
          return rectX + rectDistance * (beforeOne - d[4]) + 'px'
        }
      })
      .attr('y', '10px')
      .on('mouseover', function (e, d) {
        d3.select(this).attr('width', '5px')
        tip.html(`<div style="line-height: 1;
        font-weight: bold;
        padding: 12px;
        background: white;
        color: grey;
        border-radius: 2px;
        pointer-events: none;
        font-family: Arial, sans-serif;
        font-size: 12px;
        text-align: center;">学生ID: ${d[0]}  <p>专业:${d[1]}</p> <p>年龄:${d[2]}</p><p>性别:${d[3]}</p><p>掌握程度:${d[4]}</p><div>`)
        tip.show(d, this)
      })
      .on('mouseout', function () {
        d3.select(this).attr('width', '2px')
        tip.hide()
      })
      .on('click', function (e, d) {
        // let newArray = [...studentIDlist]
        // newArray.push(d[0])
        // 更新高亮学生的列表
        handleStudentList(d[0])
        // 更新点击学生的id，传给题目掌握程度
        handleClickStudentId(d[0])
      })

    //班级排名视图标签
    const ranklable = svg.append('g').attr('class', 'ranklable')
    // ranklable
    //   .append('text')
    //   .text('Class ' + classNum)
    //   .attr('x', '4%')
    //   .attr('y', '40%')
    //   .style('opacity', 0.8)
    ranklable
      .append('text')
      .text('Class ' + classNum + ' 排名')
      .attr('x', '2%')
      .attr('y', '50%')
      .style('opacity', 0.8)
      .style('font-weight', 'bold')
  }

  //更新所有学生的数据集的班级排名
  function updataclassRank(classRankInfo) {
    const data = classRankInfo
    const rectDistance = 2000 //用于扩大方块之间的差异
    const svg = d3.select('.ranksvg')
    //tooltip
    const tip = d3Tip()
      .attr('class', 'd3-tip')
      .html(function (d) {
        return `Class ${d[0]},人数: <span >${d}</span>`
      })

    svg.call(tip)
    // 清空 SVG 的内容
    svg.selectAll('*').remove()

    //绘制排名指示标志
    //定义直线的起始点和终点坐标
    var lineData = [
      { x: 90, y: 65 },
      { x: 600, y: 65 }
    ]

    // 定义箭头大小
    var arrowSize = 6

    // 创建直线生成器
    var lineFunction = d3
      .line()
      .x(function (d) {
        return d.x
      })
      .y(function (d) {
        return d.y
      })

    // 绘制直线
    var lineGraph = svg
      .append('path')
      .attr('d', lineFunction(lineData))
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .attr('fill', 'none')
      .style('opacity', 0.8)

    // 添加箭头
    svg
      .append('svg:defs')
      .selectAll('marker')
      .data(['arrow']) // 定义箭头的名称
      .enter()
      .append('svg:marker')
      .attr('id', String)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 0) // 箭头与直线的距离
      .attr('refY', 0)
      .attr('markerWidth', arrowSize) // 箭头大小
      .attr('markerHeight', arrowSize)
      .attr('orient', 'auto') // 箭头方向
      .append('svg:path')
      .attr('d', 'M0,-5L10,0L0,5')
      .style('opacity', 0.8)

    // 给直线添加箭头
    lineGraph.attr('marker-end', 'url(#arrow)')
    svg
      .append('text')
      .text('高')
      .attr('fontSize', '12')
      .attr('x', '11%')
      .attr('y', '85%')
      .style('opacity', 0.8)
    svg
      .append('text')
      .text('低')
      .attr('fontSize', '12')
      .attr('x', '97%')
      .attr('y', '85%')
      .style('opacity', 0.8)

    for (var studentType = 0; studentType < 3; studentType++) {
      var beforeOne = 0
      var rectX = 92 //第一个方块的起始值
      //创建班级排名视图,为该视图创建一个group
      const ranking = svg.append('g')
      ranking
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', '10px')
        .attr('height', function (d) {
          const totalStudent = d[2][0] + d[2][1] + d[2][2]
          const rectH = (d[2][studentType] / totalStudent) * 50
          return rectH + 'px'
        })
        .attr('fill', function () {
          if (studentType == 0) {
            return '#BEE4D7'
          } else if (studentType == 1) {
            return '#71B0D1'
          } else {
            return '#6B89BB'
          }
        })
        .attr('x', function (d, i) {
          if (i == 0) {
            rectX = rectX + 12
            beforeOne = d[1]
            return '92px'
          } else {
            rectX = rectX + 12 + rectDistance * (beforeOne - d[1])
            beforeOne = d[1]
            return rectX + rectDistance * (beforeOne - d[1]) + 'px'
          }
        })
        .attr('y', function (d) {
          const totalStudent = d[2][0] + d[2][1] + d[2][2]
          if (studentType == 0) {
            return '10px'
          } else if (studentType == 1) {
            return 10 + (d[2][0] / totalStudent) * 50 + 'px'
          } else {
            return (
              10 +
              (d[2][0] / totalStudent) * 50 +
              (d[2][1] / totalStudent) * 50 +
              'px'
            )
          }
        })
        .attr('class', 'studentType' + studentType)
        .on('mouseover', function (e, d) {
          d3.select(this).style('stroke', 'grey').style('stroke-width', 2)
          if (
            d3.select(this)._groups[0][0].className.baseVal == 'studentType0'
          ) {
            tip.html(`<div style="line-height: 1;
            font-weight: bold;
            padding: 12px;
            background: white;
            color: grey;
            border-radius: 2px;
            pointer-events: none;
            font-family: Arial, sans-serif;
            font-size: 12px;
            text-align: center;">班级：${d[0]}<p> 前30%人数: ${d[2][0]}</p><div>`)
            tip.show(d, this)
          } else if (
            d3.select(this)._groups[0][0].className.baseVal == 'studentType1'
          ) {
            tip.html(`<div style="line-height: 1;
            font-weight: bold;
            padding: 12px;
            background: white;
            color: grey;
            border-radius: 2px;
            pointer-events: none;
            font-family: Arial, sans-serif;
            font-size: 12px;
            text-align: center;">班级：${d[0]}<p> 30%~70%人数: ${d[2][1]}</p><div>`)
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
            text-align: center;">班级：${d[0]}<p> 后30%人数: ${d[2][2]}</p><div>`)
            tip.show(d, this)
          }
        })
        .on('mouseout', function () {
          d3.select(this).style('stroke', 'grey').style('stroke-width', 0)
          tip.hide()
        })
    }

    //班级排名视图标签
    const ranklable = svg.append('g').attr('class', 'ranklable')
    // ranklable
    //   .append('text')
    //   .text('所有班级')
    //   .attr('x', '2%')
    //   .attr('y', '40%')
    //   .style('opacity', 0.8)
    ranklable
      .append('text')
      .text('班级排名')
      .attr('x', '2%')
      .attr('y', '50%')
      .style('opacity', 0.8)
      .style('font-weight', 'bold')
  }

  //根据选择的班级更新视图
  useEffect(() => {
    var classBasicInfo = []
    var classRankInfo = []
    handleStudentList1([])
    getClassBasicInfo(classNum).then((res) => {
      classBasicInfo = res[0]
      classRankInfo = res[1]
      drawPicture(classBasicInfo)
      if (classNum != 'all') {
        updateRank(classRankInfo)
      } else {
        updataclassRank(classRankInfo)
      }
    })
  }, [classNum, isChangeWeight])

  //初始化视图
  useEffect(() => {
    var classBasicInfo = []
    var classRankInfo = []
    getClassBasicInfo(classNum).then((res) => {
      classBasicInfo = res[0]
      classRankInfo = res[1]
      drawPicture(classBasicInfo)
      drawRank(classRankInfo)
    })
  }, [])

  return (
    <PictureWrapper>
      <div className="title">
        <div className="title-icon">
          <IconFont type="icon-fenbu" />
        </div>
        分布特征统计排名图
      </div>
      <div className="Pictureview">
        <div className="distribution" ref={distributionRef}>
          <div className="major" ref={majorRef}></div>
          <div className="age" ref={ageRef}></div>
          <div className="gender" ref={genderRef}></div>
        </div>
        <div className="Rankview"></div>
      </div>
    </PictureWrapper>
  )
}
export default memo(Picture)
