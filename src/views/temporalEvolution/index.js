import React, { memo, useEffect } from 'react'
import { EvolutionWrapper } from './style'
import * as d3 from 'd3'
const Evolution = () => {
  // const evolutionSvg = d3
  //   .select('.Evolutioncontent')
  //   .append('svg')
  //   .attr('id', 'evolutionSvg')
  // console.log(evolutionSvg)
  const timeData = [
    '9月-凌晨',
    '9月-上午',
    '9月-下午',
    '9月-晚上',
    '10月-凌晨',
    '10月-上午',
    '10月-下午',
    '10月-晚上',
    '11月-凌晨',
    '11月-上午',
    '11月-下午',
    '11月-晚上',
    '12月-凌晨',
    '12月-上午',
    '12月-下午',
    '12月-晚上',
    '1月-凌晨',
    '1月-上午',
    '1月-下午',
    '1月-晚上'
  ]
  const timeCategory = ['高峰型', '平均型', '低峰型']

  //绘制演变视图
  function drawEvolution() {
    // 定义画布大小和边距
    const width = 1100
    const height = 400
    const padding = 50
    //假数据
    // const data = {
    //   '9月-凌晨': '平均型',
    //   '9月-上午': '平均型',
    //   '9月-下午': '平均型',
    //   '9月-晚上': '平均型',
    //   '10月-凌晨': '平均型',
    //   '10月-上午': '平均型',
    //   '10月-下午': '平均型',
    //   '10月-晚上': '平均型',
    //   '11月-凌晨': '平均型',
    //   '11月-上午': '平均型',
    //   '11月-下午': '平均型',
    //   '11月-晚上': '平均型',
    //   '12月-凌晨': '平均型',
    //   '12月-上午': '平均型',
    //   '12月-下午': '平均型',
    //   '12月-晚上': '平均型',
    //   '1月-凌晨': '平均型',
    //   '1月-上午': '平均型',
    //   '1月-下午': '平均型',
    //   '1月-晚上': '平均型'
    // }
    const data = [
      [
        ['9月-凌晨', '平均型'],
        ['9月-上午', '平均型'],
        ['9月-下午', '平均型'],
        ['9月-晚上', '低峰型'],
        ['10月-凌晨', '平均型'],
        ['10月-上午', '平均型'],
        ['10月-下午', '平均型'],
        ['10月-晚上', '平均型'],
        ['11月-凌晨', '低峰型'],
        ['11月-上午', '平均型'],
        ['11月-下午', '平均型'],
        ['11月-晚上', '平均型'],
        ['12月-凌晨', '低峰型'],
        ['12月-上午', '平均型'],
        ['12月-下午', '平均型'],
        ['12月-晚上', '低峰型'],
        ['1月-凌晨', '平均型'],
        ['1月-上午', '平均型'],
        ['1月-下午', '平均型'],
        ['1月-晚上', '低峰型']
      ],
      [
        ['9月-凌晨', '平均型'],
        ['9月-上午', '平均型'],
        ['9月-下午', '平均型'],
        ['9月-晚上', '低峰型'],
        ['10月-凌晨', '平均型'],
        ['10月-上午', '高峰型'],
        ['10月-下午', '高峰型'],
        ['10月-晚上', '平均型'],
        ['11月-凌晨', '低峰型'],
        ['11月-上午', '平均型'],
        ['11月-下午', '平均型'],
        ['11月-晚上', '平均型'],
        ['12月-凌晨', '低峰型'],
        ['12月-上午', '平均型'],
        ['12月-下午', '平均型'],
        ['12月-晚上', '低峰型'],
        ['1月-凌晨', '平均型'],
        ['1月-上午', '平均型'],
        ['1月-下午', '平均型'],
        ['1月-晚上', '低峰型']
      ]
    ]
    // 创建SVG元素
    const svg = d3
      .select('.Evolutioncontent')
      .append('svg')
      .attr('id', 'evolutionSvg')
      .attr('width', '100%')
      .attr('height', '100%')

    // 定义X轴的比例尺
    const xScale = d3
      .scaleBand()
      .domain(timeData)
      .range([padding, width - padding])

    // 创建X轴
    const xAxis = d3
      .axisTop(xScale)
      .ticks(timeData.length)
      .tickFormat((d, i) => timeData[i])

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${padding * 2})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'start')
      .attr('transform', 'rotate(-45)')

    // 定义Y轴的比例尺
    const yScale = d3
      .scaleBand()
      .domain(timeCategory)
      .range([padding, height + padding])

    // 创建Y轴
    const yAxis = d3.axisLeft(yScale).tickFormat((d, i) => timeCategory[i])

    svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${padding}, ${padding})`)
      .call(yAxis)
    let workFlag = 0
    const timeColor = ['blue', 'red']
    //利用循环绘制工作日和休息日的演变趋势
    data.forEach((item) => {
      svg.append('g').attr('id', 'time' + workFlag)
      // 绘制数据点
      d3.select('#time' + workFlag)
        .selectAll('circle')
        .data(item)
        .enter()
        .append('circle')
        .attr('cx', function (d) {
          return xScale(d[0]) + padding / 2
        })
        .attr('cy', function (d) {
          return yScale(d[1]) + 2 * padding
        })
        .attr('r', 5)
        .style('fill', timeColor[workFlag])

      // 创建折线生成器
      const line = d3
        .line()
        .x((d) => xScale(d[0]) + padding / 2)
        .y((d) => yScale(d[1]) + 2 * padding)
        .curve(d3.curveLinear) // 使用线性插值

      // 绘制折线
      d3.select('#time' + workFlag)
        .append('path')
        .datum(item)
        .attr('class', 'line')
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', timeColor[workFlag])
      workFlag = 1
      console.log(workFlag)
    })
  }

  useEffect(() => {
    d3.select('#evolutionSvg').remove('*')
    drawEvolution()
  }, [])

  return (
    <EvolutionWrapper>
      <div className="title">时间模式演化</div>
      <div className="Evolutioncontent"></div>
    </EvolutionWrapper>
  )
}
export default memo(Evolution)
