import React, { memo, useEffect } from 'react'
import { TitleCompareWrapper } from './style'
import * as d3 from 'd3'

const TitleCompare = (props) => {
  const {
    isIndividual,
    questionList,
    submitData1,
    correctRate1,
    submitData2,
    correctRate2
  } = props
  // 防止报错
  console.log(
    questionList,
    submitData1,
    correctRate1,
    submitData2,
    correctRate2
  )
  let flag = 1
  function drawTitleCompare(flag) {
    const width = d3
      .select('#TitleCompareSvg')
      .node()
      .getBoundingClientRect().width
    const height = d3
      .select('#TitleCompareSvg')
      .node()
      .getBoundingClientRect().height

    //前一个月和后一个月提交数和答题数
    var titledata = {
      Q1: [30, 25, 0.5, 0.6],
      Q2: [15, 18, 0.8, 0.7],
      Q3: [30, 28, 0.7, 0.2],
      Q4: [22, flag, 0.9, 0.6],
      Q5: [18, 22, 0.7, 0.7],
      Q6: [25, 30, 0.7, 0.2],
      Q7: [28, 26, 0.6, 0.5],
      Q8: [24, 29, 0.1, 0.3],
      Q9: [17, 16, 0.3, 0.9],
      Q10: [19, 21, 0.9, 0.6]
    }
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
      .domain([column3Min, column3Max]) // 输入数据范围
      .range(['#ffccd5', '#E0464E']) // 输出颜色范围
    const aftercolorScale = d3
      .scaleLinear()
      .domain([column4Min, column4Max]) // 输入数据范围
      .range(['#BFD4EE', '#6A93C6']) // 输出颜色范围

    const svg = d3
      .select('#TitleCompareSvg')
      .append('svg')
      .attr('id', 'titlecompare')
      .attr('width', width)
      .attr('height', height - 5)
      .attr('transform', 'translate(0,0)')
    // 创建SVG容器
    console.log(svg)

    // 定义数据范围和比例尺
    var xScale = d3
      .scaleBand()
      .domain(Object.keys(titledata))
      .range([0, width - 60])
      .padding(0.1)

    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(Object.values(titledata).flat())])
      .range([height - 20, 40])

    // 添加横轴
    // let xAxis =
    svg
      .append('g')
      .attr('transform', 'translate(30,183)')
      .call(d3.axisBottom(xScale))

    // 添加纵轴
    svg
      .append('g')
      .attr('transform', 'translate(30, -5)')
      .call(d3.axisLeft(yScale))

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
        console.log(d[1][1])
        return beforecolorScale(d[1][2])
      })

    // 添加蓝色圆
    svg
      .selectAll('.circle-after')
      .data(Object.entries(titledata))
      .enter()
      .append('circle')
      .attr('class', 'circle-after')
      .attr('cx', function (d) {
        return xScale(d[0]) + xScale.bandwidth() / 2 + 30
      })
      .attr('cy', function (d) {
        return yScale(d[1][1]) - 5
      })
      .attr('r', 4)
      .attr('fill', function (d) {
        return aftercolorScale(d[1][3])
      })

    // // 添加缩放功能
    // function zoomed() {
    //   // 更新x轴
    //   xAxis.call(d3.axisBottom(xScale))
    //   // 更新圆和线的位置
    //   svg.selectAll('.circle-sept').attr('cx', function (d) {
    //     return xScale(d[0]) + xScale.bandwidth() / 2
    //   })
    //   svg.selectAll('.circle-oct').attr('cx', function (d) {
    //     return xScale(d[0]) + xScale.bandwidth() / 2
    //   })
    //   svg
    //     .selectAll('.line')
    //     .attr('x1', function (d) {
    //       return xScale(d[0]) + xScale.bandwidth() / 2
    //     })
    //     .attr('x2', function (d) {
    //       return xScale(d[0]) + xScale.bandwidth() / 2
    //     })
    // }

    // var zoom = d3.zoom().scaleExtent([1, 10]).on('zoom', zoomed)

    // svg.call(zoom)

    svg
      .append('text')
      .text('题目')
      .attr('x', 450)
      .attr('y', 200)
      .style('font-size', '10px')
    svg
      .append('text')
      .text('提交次数')
      .attr('x', 30)
      .attr('y', 30)
      .style('font-size', '10px')
    svg
      .append('text')
      .text('提交次数对比点线图')
      .attr('x', 10)
      .attr('y', 13)
      .style('font-size', '12px')

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
      .attr('x', 150)
      .attr('y', 5)
      .style('fill', 'url(#gradient)')
    svg
      .append('text')
      .text('10月/正确率')
      .attr('x', 205)
      .attr('y', 15)
      .style('font-size', '12px')

    const gradient2 = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'gradient2')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%')
    // 添加渐变色段
    gradient2.append('stop').attr('offset', '0%').attr('stop-color', '#BFD4EE')
    gradient2
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#6A93C6')

    // 创建矩形
    svg
      .append('rect')
      .attr('width', 50)
      .attr('height', 10)
      .attr('x', 275)
      .attr('y', 5)
      .style('fill', 'url(#gradient2)')
    svg
      .append('text')
      .text('11月/正确率')
      .attr('x', 330)
      .attr('y', 15)
      .style('font-size', '12px')
    svg
      .append('line')
      .attr('x1', 400)
      .attr('y1', 12)
      .attr('x2', 420)
      .attr('y2', 12)
      .attr('stroke', 'black')
    svg
      .append('text')
      .text('次数差距')
      .attr('x', 430)
      .attr('y', 15)
      .style('font-size', '12px')
  }

  useEffect(() => {
    if (isIndividual) {
      flag = flag + 10
      d3.select('#titlecompare').remove()
      drawTitleCompare(flag)
    }
  }, [isIndividual])
  return (
    <TitleCompareWrapper>
      <div className="TitleCompareview" id="TitleCompareSvg"></div>
    </TitleCompareWrapper>
  )
}
export default memo(TitleCompare)
