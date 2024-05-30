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
  const { classNum } = props
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
          data: classBasicInfo[0]
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
          data: classBasicInfo[1]
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
          data: classBasicInfo[2]
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
          const rectH = (d[2][studentType] / totalStudent) * 40
          return rectH + 'px'
        })
        .attr('fill', function () {
          if (studentType == 0) {
            return '#8AD0EE'
          } else if (studentType == 1) {
            return '#8AB5EE'
          } else {
            return '#5686F0'
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
            return 10 + (d[2][0] / totalStudent) * 40 + 'px'
          } else {
            return (
              10 +
              (d[2][0] / totalStudent) * 40 +
              (d[2][1] / totalStudent) * 40 +
              'px'
            )
          }
        })
    }

    //班级排名视图标签
    const ranklable = svg.append('g').attr('class', 'ranklable')
    ranklable.append('text').text('所有班级').attr('x', '2%').attr('y', '40%')
    ranklable.append('text').text('排名情况').attr('x', '2%').attr('y', '65%')
  }

  //更新班级内部排名视图
  function updateRank(classRankInfo) {
    console.log(classRankInfo)
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
          return '#8AD0EE'
        } else if (rankrate <= 0.7) {
          return '#8AB5EE'
        } else {
          return '#5686F0'
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
      .on('mouseout', tip.hide)

    //班级排名视图标签
    const ranklable = svg.append('g').attr('class', 'ranklable')
    ranklable
      .append('text')
      .text('Class ' + classNum)
      .attr('x', '5%')
      .attr('y', '35%')
    ranklable.append('text').text('排名情况').attr('x', '4%').attr('y', '60%')
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
            return '#8AD0EE'
          } else if (studentType == 1) {
            return '#8AB5EE'
          } else {
            return '#5686F0'
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
          tip.html(`<div style="line-height: 1;
          font-weight: bold;
          padding: 12px;
          background: white;
          color: grey;
          border-radius: 2px;
          pointer-events: none;
          font-family: Arial, sans-serif;
          font-size: 12px;
          text-align: center;">班级：${d[0]}<p> 排名分布: ${d[2]}</p><div>`)
          tip.show(d, this)
        })
        .on('mouseout', tip.hide)
    }

    //班级排名视图标签
    const ranklable = svg.append('g').attr('class', 'ranklable')
    ranklable.append('text').text('所有班级').attr('x', '2%').attr('y', '40%')
    ranklable.append('text').text('排名情况').attr('x', '2%').attr('y', '65%')
  }

  //根据选择的班级更新视图
  useEffect(() => {
    var classBasicInfo = []
    var classRankInfo = []

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
  }, [classNum])

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
        分布特征
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
