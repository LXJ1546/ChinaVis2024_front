import React, { memo, useEffect } from 'react'
import { TitleCompareWrapper } from './style'
import * as d3 from 'd3'
import d3Tip from 'd3-tip'

const TitleCompare = (props) => {
  const {
    isIndividual,
    questionList,
    submitData1,
    correctRate1,
    submitData2,
    correctRate2
  } = props

  //前一个月和后一个月提交数和答题数
  let titledata = {}

  //tooltip
  const tip = d3Tip()
    .attr('class', 'd3-tip')
    .html(function (d) {
      return `Class ${d[0]},人数: <span >${d}</span>`
    })

  function drawTitleCompare(titledata) {
    const width = d3
      .select('#TitleCompareSvg')
      .node()
      .getBoundingClientRect().width
    const height = d3
      .select('#TitleCompareSvg')
      .node()
      .getBoundingClientRect().height

    // 计算最大值和最小值
    // 获取第3列和第4列的数据
    var column3 = Object.values(titledata).map(function (d) {
      return d[2]
    })
    var column4 = Object.values(titledata).map(function (d) {
      return d[3]
    })
    var column3Max = d3.max(column3)
    var column3Min = d3.min(column3)
    var column4Max = d3.max(column4)
    var column4Min = d3.min(column4)

    //设置颜色比例尺
    const beforecolorScale = d3
      .scaleLinear()
      .domain([
        d3.min([column3Min, column4Min]),
        d3.max([column3Max, column4Max])
      ]) // 输入数据范围
      .range(['#ffccd5', '#E0464E']) // 输出颜色范围
    // const aftercolorScale = d3
    //   .scaleLinear()
    //   .domain([column4Min, column4Max]) // 输入数据范围
    //   .range(['#BFD4EE', '#6A93C6']) // 输出颜色范围
    // console.log(aftercolorScale)

    const svg = d3
      .select('#TitleCompareSvg')
      .append('svg')
      .attr('id', 'titlecompare')
      .attr('width', width)
      .attr('height', height - 5)
      .attr('transform', 'translate(0,0)')
    // 创建SVG容器

    svg.call(tip)
    // 定义数据范围和比例尺
    var xScale = d3
      .scaleBand()
      .domain(Object.keys(titledata))
      .range([0, width - 60])
      .padding(0.1)

    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(Object.values(titledata).flat())])
      .range([height - 38, 40])

    // 添加横轴
    // let xAxis =
    svg
      .append('g')
      .attr('transform', 'translate(30,165)')
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('font-size', '8px') // 设置字体大小
      //   .style('text-anchor', 'end')
      .attr('dx', '2.3em') // 水平偏移
      .attr('dy', '0.1em') // 垂直偏移
      .attr('transform', 'rotate(60)') // 旋转角度
      .style('opacity', 0.8)

    // 设置缩放行为

    // 添加纵轴
    svg
      .append('g')
      .attr('transform', 'translate(30, -5)')
      .call(d3.axisLeft(yScale))
      .style('opacity', 0.8)

    // 添加连接线
    svg
      .selectAll('.line')
      .data(Object.entries(titledata))
      .enter()
      .append('line')
      .attr('class', 'line')
      .attr('x1', function (d) {
        return xScale(d[0]) + xScale.bandwidth() / 2 + 30
      })
      .attr('y1', function (d) {
        return yScale(d[1][0]) - 5
      })
      .attr('x2', function (d) {
        return xScale(d[0]) + xScale.bandwidth() / 2 + 30
      })
      .attr('y2', function (d) {
        return yScale(d[1][1]) - 5
      })
      .attr('stroke', 'black')
      .style('opacity', 0.8)

    // 添加红色圆
    svg
      .selectAll('.circle-before')
      .data(Object.entries(titledata))
      .enter()
      .append('circle')
      .attr('class', 'circle-before')
      .attr('cx', function (d) {
        return xScale(d[0]) + xScale.bandwidth() / 2 + 30
      })
      .attr('cy', function (d) {
        return yScale(d[1][0]) - 5
      })
      .attr('r', 4)
      .attr('fill', function (d) {
        return beforecolorScale(d[1][2])
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
      text-align: center;">问题: ${d[0]} <p>提交次数: ${d[1][0]}</p> <p>正确率: ${d[1][2].toFixed(2)}</p><div>`)
        tip.show(d, this)
        d3.select(this).style('stroke', 'grey').style('stroke-width', 2)
      })
      .on('mouseout', function () {
        tip.hide()
        d3.select(this).style('stroke-width', 0)
      })

    // 添加红色三角形
    // svg
    //   .selectAll('.circle-after')
    //   .data(Object.entries(titledata))
    //   .enter()
    //   .append('circle')
    //   .attr('class', 'circle-after')
    //   .attr('cx', function (d) {
    //     return xScale(d[0]) + xScale.bandwidth() / 2 + 30
    //   })
    //   .attr('cy', function (d) {
    //     return yScale(d[1][1]) - 5
    //   })
    //   .attr('r', 4)
    //   .attr('fill', function (d) {
    //     return aftercolorScale(d[1][3])
    //   })
    svg
      .selectAll('.polygon-after')
      .data(Object.entries(titledata))
      .enter()
      .append('polygon')
      .attr('class', 'polygon-after')
      .attr('points', function (d) {
        // 根据中心坐标确定多边形的顶点坐标
        var centerX = xScale(d[0]) + xScale.bandwidth() / 2 + 30
        var centerY = yScale(d[1][1]) - 5 // 修改y坐标，让三角尖朝下
        var sideLength = 8 // 设置多边形的边长，这里假设为20
        var halfSide = sideLength / 2
        var vertices = [
          [centerX, centerY - halfSide],
          [centerX - halfSide, centerY + halfSide],
          [centerX + halfSide, centerY + halfSide],
          [centerX, centerY - halfSide] // 添加最后一个顶点以闭合多边形
        ]
        // 根据顶点坐标生成多边形的points属性值
        return vertices.join(' ')
      })
      .attr('fill', function (d) {
        return beforecolorScale(d[1][3])
      })
      .on('mouseover', function (e, d) {
        tip.html(`<div style="line-height: 1;
      font-weight: bold;
      padding: 10px;
      background: white;
      color: grey;
      border-radius: 2px;
      pointer-events: none;
      font-family: Arial, sans-serif;
      font-size: 12px;
      text-align: center;">问题: ${d[0]} <p>提交次数: ${d[1][1]}</p> <p>正确率: ${d[1][3].toFixed(2)}</p><div>`)
        tip.show(d, this)
        d3.select(this).style('stroke', 'grey').style('stroke-width', 2)
      })
      .on('mouseout', function () {
        tip.hide()
        d3.select(this).style('stroke-width', 0)
      })

    //增加X轴缩放事件
    // 缩放处理函数
    // 创建一个缩放行为，只在 X 轴上进行缩放
    // 创建一个缩放行为
    // var zoom = d3
    //   .zoom()
    //   .scaleExtent([1, 10]) // 设置缩放范围
    //   .translateExtent([
    //     [0, 0],
    //     [0, 0]
    //   ]) // 禁用Y轴上的平移
    //   .on('zoom', zoomed) // 设置缩放事件处理函数

    // // 将缩放行为应用到SVG元素上
    // svg.call(zoom)

    // // 缩放事件处理函数
    // function zoomed(event) {
    //   // 获取当前的缩放状态
    //   var transform = event.transform

    //   // 对SVG元素进行缩放和平移
    //   svg.attr('transform', transform)
    // }
    //绘制题目
    svg
      .append('text')
      .text('题目')
      .attr('x', 460)
      .attr('y', 175)
      .style('font-size', '10px')
      .style('opacity', 0.8)
    svg
      .append('text')
      .text('提交次数')
      .attr('x', 30)
      .attr('y', 30)
      .style('font-size', '10px')
      .style('opacity', 0.8)
    svg
      .append('text')
      .text('提交次数对比点线图')
      .attr('x', 10)
      .attr('y', 13)
      .style('font-size', '12px')
      .style('opacity', 0.8)

    //绘制图例

    const gradient = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%')
    // 添加渐变色段
    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#ffccd5')
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#E0464E')

    // 创建矩形
    svg
      .append('rect')
      .attr('width', 50)
      .attr('height', 10)
      .attr('x', 380)
      .attr('y', 6)
      .style('fill', 'url(#gradient)')
    svg
      .append('text')
      .text('正确率')
      .attr('x', 440)
      .attr('y', 15)
      .style('font-size', '12px')
      .style('opacity', 0.8)
    // 添加红色圆
    svg
      .append('circle')
      .attr('cx', 195)
      .attr('cy', 12)
      .attr('r', 4)
      .attr('fill', '#E0464E')
    svg
      .append('text')
      .text('10月')
      .attr('x', 205)
      .attr('y', 15)
      .style('font-size', '12px')
      .style('opacity', 0.8)
    svg

      .append('polygon')
      .attr('points', function () {
        // 根据中心坐标确定多边形的顶点坐标
        var centerX = 240
        var centerY = 11 // 修改y坐标，让三角尖朝下
        var sideLength = 8 // 设置多边形的边长，这里假设为20
        var halfSide = sideLength / 2
        var vertices = [
          [centerX, centerY - halfSide],
          [centerX - halfSide, centerY + halfSide],
          [centerX + halfSide, centerY + halfSide],
          [centerX, centerY - halfSide] // 添加最后一个顶点以闭合多边形
        ]
        // 根据顶点坐标生成多边形的points属性值
        return vertices.join(' ')
      })
      .attr('fill', '#E0464E')
    svg
      .append('text')
      .text('11月')
      .attr('x', 250)
      .attr('y', 15)
      .style('font-size', '12px')
      .style('opacity', 0.8)
    svg
      .append('line')
      .attr('x1', 280)
      .attr('y1', 12)
      .attr('x2', 310)
      .attr('y2', 12)
      .attr('stroke', 'black')
      .style('opacity', 0.8)
    svg
      .append('text')
      .text('次数差距')
      .attr('x', 320)
      .attr('y', 15)
      .style('font-size', '12px')
      .style('opacity', 0.8)
  }

  useEffect(() => {
    if (isIndividual) {
      //   titledata = {
      //     Q1: [30, 25, 0.5, 0.6],
      //     Q2: [15, 18, 0.8, 0.7],
      //     Q3: [30, 28, 0.7, 0.2],
      //     Q4: [22, 2, 0.9, 0.6],
      //     Q5: [18, 22, 0.7, 0.7],
      //     Q6: [25, 30, 0.7, 0.2],
      //     Q7: [28, 26, 0.6, 0.5],
      //     Q8: [24, 29, 0.1, 0.3],
      //     Q9: [17, 16, 0.3, 0.9],
      //     Q10: [19, 21, 0.9, 0.6]
      //   }
      // 将数据组织成字典的形式
      for (var i = 0; i < questionList.length; i++) {
        var key = 'Q_' + questionList[i].split('_')[1].substring(0, 3) // 构造键，例如 Q1, Q2, ...
        titledata[key] = [
          submitData1[i],
          submitData2[i],
          correctRate1[i],
          correctRate2[i]
        ]
      }
      d3.select('#titlecompare').remove()
      drawTitleCompare(titledata)
    }
  }, [
    isIndividual,
    questionList,
    submitData1,
    submitData2,
    correctRate1,
    correctRate2
  ])
  return (
    <TitleCompareWrapper>
      <div className="TitleCompareview" id="TitleCompareSvg"></div>
    </TitleCompareWrapper>
  )
}
export default memo(TitleCompare)
