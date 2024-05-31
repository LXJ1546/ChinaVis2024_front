import React, { memo, useEffect, useState } from 'react'
import { EvolutionWrapper } from './style'
import * as d3 from 'd3'
import { Switch, Select } from 'antd'
import d3Tip from 'd3-tip'
import { createFromIconfontCN } from '@ant-design/icons'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4565164_pp0ly9c3kg.js'
})

const Evolution = () => {
  const [showFlag, setShowFlag] = useState('all') //用于监听选择查看哪些演变
  const [backgroundFlag, setBackgroundFlag] = useState(true) //用于监听是否开启背景颜色
  const [lineFlag, setLineFlag] = useState(true) //用于监听是否开启表格线
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

  //tooltip
  const tip = d3Tip()
    .attr('class', 'd3-tip')
    .html(function (d) {
      return `Class ${d[0]},人数: <span >${d}</span>`
    })

  //绘制演变视图
  function drawEvolution() {
    // 定义画布大小和边距
    const width = 1100
    const height = 350
    const padding = 50
    //假数据,第一个是工作日,第二个是休息日,//top,mid,low各自人数//工作日或休息日的正确率//两者平均的正确率
    const data = [
      [
        ['9月-凌晨', '平均型', [500, 200, 100], 0.8, 0.4],
        ['9月-上午', '平均型', [500, 200, 100], 0.3, 0.3],
        ['9月-下午', '平均型', [500, 200, 100], 0.5, 0.5],
        ['9月-晚上', '低峰型', [500, 200, 100], 0.5, 0.6],
        ['10月-凌晨', '平均型', [500, 200, 100], 0.6, 0.4],
        ['10月-上午', '平均型', [500, 200, 100], 0.4, 0.3],
        ['10月-下午', '平均型', [500, 200, 100], 0.6, 0.4],
        ['10月-晚上', '平均型', [500, 200, 100], 0.3, 0.1],
        ['11月-凌晨', '低峰型', [500, 200, 100], 0.5, 0.2],
        ['11月-上午', '高峰型', [500, 200, 100], 0.4, 0.3],
        ['11月-下午', '高峰型', [500, 200, 100], 0.7, 0.4],
        ['11月-晚上', '平均型', [500, 200, 100], 0.8, 0.4],
        ['12月-凌晨', '低峰型', [500, 200, 100], 0.4, 0.1],
        ['12月-上午', '平均型', [500, 200, 100], 0.9, 0.7],
        ['12月-下午', '平均型', [400, 200, 100], 0.1, 0.2],
        ['12月-晚上', '低峰型', [500, 200, 100], 0.4, 0.8],
        ['1月-凌晨', '平均型', [500, 200, 100], 0.5, 0.7],
        ['1月-上午', '平均型', [500, 200, 100], 0.6, 0.3],
        ['1月-下午', '平均型', [500, 200, 100], 0.8, 0.2],
        ['1月-晚上', '低峰型', [500, 200, 100], 0.9, 0.4]
      ],
      [
        ['9月-凌晨', '平均型', [500, 200, 100], 0.1, 0.4],
        ['9月-上午', '平均型', [500, 200, 100], 0.3, 0.3],
        ['9月-下午', '平均型', [500, 200, 100], 0.5, 0.5],
        ['9月-晚上', '低峰型', [500, 200, 100], 0.8, 0.6],
        ['10月-凌晨', '平均型', [500, 200, 100], 0.2, 0.4],
        ['10月-上午', '高峰型', [500, 200, 100], 0.2, 0.3],
        ['10月-下午', '高峰型', [500, 200, 100], 0.2, 0.4],
        ['10月-晚上', '平均型', [500, 200, 100], 0.1, 0.1],
        ['11月-凌晨', '低峰型', [500, 200, 100], 0.5, 0.2],
        ['11月-上午', '平均型', [500, 200, 100], 0.4, 0.3],
        ['11月-下午', '平均型', [500, 200, 100], 0.2, 0.4],
        ['11月-晚上', '平均型', [500, 200, 100], 0.3, 0.4],
        ['12月-凌晨', '低峰型', [500, 200, 100], 0.1, 0.1],
        ['12月-上午', '平均型', [500, 200, 100], 0.9, 0.7],
        ['12月-下午', '平均型', [400, 200, 100], 0.1, 0.2],
        ['12月-晚上', '低峰型', [500, 200, 100], 0.4, 0.8],
        ['1月-凌晨', '平均型', [500, 200, 100], 0.5, 0.7],
        ['1月-上午', '平均型', [500, 200, 100], 0.6, 0.3],
        ['1月-下午', '平均型', [500, 200, 100], 0.2, 0.2],
        ['1月-晚上', '低峰型', [500, 200, 100], 0.9, 0.4]
      ]
    ]

    // 创建SVG元素
    const svg = d3
      .select('.Evolutioncontent')
      .append('svg')
      .attr('id', 'evolutionSvg')
      .attr('width', '100%')
      .attr('height', '100%')

    svg.call(tip)

    // 定义X轴的比例尺
    const xScale = d3
      .scaleBand()
      .domain(timeData)
      .range([padding / 2, width - padding * 2])

    // 创建X轴
    const xAxis = d3
      .axisTop(xScale)
      .ticks(timeData.length)
      // .tickFormat((d, i) => timeData[i])
      .tickFormat((d, i) => timeData[i].split('-')[1])

    //绘制月份
    const monthg = svg.append('g')
    monthg.append('text').text('9月').attr('transform', `translate(140, 60)`)
    monthg.append('text').text('10月').attr('transform', `translate(330, 60)`)
    monthg.append('text').text('11月').attr('transform', `translate(520, 60)`)
    monthg.append('text').text('12月').attr('transform', `translate(720, 60)`)
    monthg.append('text').text('1月').attr('transform', `translate(920, 60)`)

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${padding * 2})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'start')
      .attr('transform', 'translate(15, 0)')

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

    svg
      .selectAll('.domain, .tick line') // 选择轴线和刻度线
      .style('display', 'none') // 隐藏轴线和刻度线

    //绘制正确占比或者得分率的背景色
    //创建线性颜色比例尺
    const rightscaleColor = d3
      .scaleLinear()
      .domain([0, 1])
      .range(['#b2e8cd', '#5ab588'])
    //工作日/休息日平均,工作日或休息日
    if (showFlag == 'all' && backgroundFlag) {
      const rightbackground = svg.append('g').attr('id', 'rightBackground')
      rightbackground
        .selectAll('rect')
        .data(data[1])
        .enter()
        .append('rect')
        .attr('width', xScale.bandwidth())
        .attr('height', yScale.bandwidth() * 3)
        .attr('x', function (d) {
          return xScale(d[0]) + padding / 2
        })
        .attr('y', padding * 2)
        .attr('fill', function (d) {
          return rightscaleColor(d[4])
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
                text-align: center;"> 正确率: ${d[4]}  <div>`)
          tip.show(d, this)
        })
        .on('mouseout', function () {
          tip.hide()
          d3.select(this).style('stroke-width', 0)
        })
    } else if (showFlag == 'work' && backgroundFlag) {
      const rightbackground = svg.append('g').attr('id', 'rightBackground')
      rightbackground
        .selectAll('rect')
        .data(data[0])
        .enter()
        .append('rect')
        .attr('width', xScale.bandwidth())
        .attr('height', yScale.bandwidth() * 3)
        .attr('x', function (d) {
          return xScale(d[0]) + padding / 2
        })
        .attr('y', padding * 2)
        .attr('fill', function (d) {
          return rightscaleColor(d[3])
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
                text-align: center;"> 正确率: ${d[3]}  <div>`)
          tip.show(d, this)
        })
        .on('mouseout', function () {
          tip.hide()
          d3.select(this).style('stroke-width', 0)
        })
    } else if (showFlag == 'relax' && backgroundFlag) {
      const rightbackground = svg.append('g').attr('id', 'rightBackground')
      rightbackground
        .selectAll('rect')
        .data(data[1])
        .enter()
        .append('rect')
        .attr('width', xScale.bandwidth())
        .attr('height', yScale.bandwidth() * 3)
        .attr('x', function (d) {
          return xScale(d[0]) + padding / 2
        })
        .attr('y', padding * 2)
        .attr('fill', function (d) {
          return rightscaleColor(d[3])
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
                text-align: center;"> 正确率: ${d[3]}  <div>`)
          tip.show(d, this)
        })
        .on('mouseout', function () {
          tip.hide()
          d3.select(this).style('stroke-width', 0)
        })
    }

    let workFlag = 0 //0为工作日
    const timeColor = ['blue', 'red']
    const workPosition = [-25, 35]
    const peoplecategory = ['top', 'mid', 'low']

    //利用循环绘制工作日和休息日的演变趋势
    //(工作日和休息日都展示的情况)(工作日情况)(休息日情况)
    if (showFlag == 'all') {
      data.forEach((item) => {
        svg.append('g').attr('id', 'time' + workFlag)
        item.forEach((piedata, index) => {
          svg.append('g').attr('id', 'peoplePie' + workFlag + index)
          // 定义饼图函数
          let pie = d3.pie()

          // 将数据转换为适合饼图的格式
          let arcs = pie(piedata[2])

          // 定义弧度生成器
          var arc = d3.arc().innerRadius(0).outerRadius(16)

          // 绘制饼图
          d3.select('#peoplePie' + workFlag + index)
            .selectAll('path')
            .data(arcs)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function (d, i) {
              return d3.schemeCategory10[i] // 使用内置的颜色方案
            })
            .attr(
              'transform',
              `translate(${xScale(piedata[0]) + padding},${
                yScale(piedata[1]) + 2 * padding + workPosition[workFlag]
              })`
            )
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
                    text-align: center;"> ${peoplecategory[d.index]}: ${d.data} 人 <div>`)
              tip.show(d, this)
            })
            .on('mouseout', function () {
              tip.hide()
              d3.select(this).style('stroke-width', 0)
            })
        })

        // 绘制数据点
        d3.select('#time' + workFlag)
          .selectAll('circle')
          .data(item)
          .enter()
          .append('circle')
          .attr('cx', function (d) {
            return xScale(d[0]) + padding
          })
          .attr('cy', function (d) {
            return yScale(d[1]) + 2 * padding + workPosition[workFlag]
          })
          .attr('r', 5)
          .style('fill', timeColor[workFlag])

        // 创建折线生成器
        const line = d3
          .line()
          .x((d) => xScale(d[0]) + padding)
          .y((d) => yScale(d[1]) + 2 * padding + workPosition[workFlag])
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
      })
    } else if (showFlag == 'work') {
      let item = data[0]
      workFlag = 0

      svg.append('g').attr('id', 'time' + workFlag)
      item.forEach((piedata, index) => {
        svg.append('g').attr('id', 'peoplePie' + workFlag + index)
        // 定义饼图函数
        let pie = d3.pie()

        // 将数据转换为适合饼图的格式
        let arcs = pie(piedata[2])

        // 定义弧度生成器
        var arc = d3.arc().innerRadius(0).outerRadius(16)

        // 绘制饼图
        d3.select('#peoplePie' + workFlag + index)
          .selectAll('path')
          .data(arcs)
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', function (d, i) {
            return d3.schemeCategory10[i] // 使用内置的颜色方案
          })
          .attr(
            'transform',
            `translate(${xScale(piedata[0]) + padding},${
              yScale(piedata[1]) + 2 * padding + workPosition[workFlag]
            })`
          )
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
                  text-align: center;"> ${peoplecategory[d.index]}: ${d.data} 人 <div>`)
            tip.show(d, this)
          })
          .on('mouseout', function () {
            tip.hide()
            d3.select(this).style('stroke-width', 0)
          })
      })

      // 绘制数据点
      d3.select('#time' + workFlag)
        .selectAll('circle')
        .data(item)
        .enter()
        .append('circle')
        .attr('cx', function (d) {
          return xScale(d[0]) + padding
        })
        .attr('cy', function (d) {
          return yScale(d[1]) + 2 * padding + workPosition[workFlag]
        })
        .attr('r', 5)
        .style('fill', timeColor[workFlag])

      // 创建折线生成器
      const line = d3
        .line()
        .x((d) => xScale(d[0]) + padding)
        .y((d) => yScale(d[1]) + 2 * padding + workPosition[workFlag])
        .curve(d3.curveLinear) // 使用线性插值

      // 绘制折线
      d3.select('#time' + workFlag)
        .append('path')
        .datum(item)
        .attr('class', 'line')
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', timeColor[workFlag])
    } else {
      let item = data[1]
      workFlag = 1
      svg.append('g').attr('id', 'time' + workFlag)
      item.forEach((piedata, index) => {
        svg.append('g').attr('id', 'peoplePie' + workFlag + index)
        // 定义饼图函数
        let pie = d3.pie()

        // 将数据转换为适合饼图的格式
        let arcs = pie(piedata[2])

        // 定义弧度生成器
        var arc = d3.arc().innerRadius(0).outerRadius(16)

        // 绘制饼图
        d3.select('#peoplePie' + workFlag + index)
          .selectAll('path')
          .data(arcs)
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', function (d, i) {
            return d3.schemeCategory10[i] // 使用内置的颜色方案
          })
          .attr(
            'transform',
            `translate(${xScale(piedata[0]) + padding},${
              yScale(piedata[1]) + 2 * padding + workPosition[workFlag]
            })`
          )
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
                  text-align: center;"> ${peoplecategory[d.index]}: ${d.data} 人 <div>`)
            tip.show(d, this)
          })
          .on('mouseout', function () {
            tip.hide()
            d3.select(this).style('stroke-width', 0)
          })
      })

      // 绘制数据点
      d3.select('#time' + workFlag)
        .selectAll('circle')
        .data(item)
        .enter()
        .append('circle')
        .attr('cx', function (d) {
          return xScale(d[0]) + padding
        })
        .attr('cy', function (d) {
          return yScale(d[1]) + 2 * padding + workPosition[workFlag]
        })
        .attr('r', 5)
        .style('fill', timeColor[workFlag])

      // 创建折线生成器
      const line = d3
        .line()
        .x((d) => xScale(d[0]) + padding)
        .y((d) => yScale(d[1]) + 2 * padding + workPosition[workFlag])
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
    }

    //绘制表格线
    const tableLine = svg.append('g').attr('id', 'tableLine')
    //表格表头横线
    tableLine
      .append('line')
      .attr('x1', padding)
      .attr('y1', 40)
      .attr('x2', width - (padding * 3) / 2)
      .attr('y2', 40)
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
    tableLine
      .append('line')
      .attr('x1', padding)
      .attr('y1', 70)
      .attr('x2', width - (padding * 3) / 2)
      .attr('y2', 70)
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
    tableLine
      .append('line')
      .attr('x1', padding)
      .attr('y1', padding * 2)
      .attr('x2', width - (padding * 3) / 2)
      .attr('y2', padding * 2)
      .attr('stroke', 'black')
      .attr('stroke-width', 1)

    //表头竖线
    tableLine
      .append('line')
      .attr('x1', padding)
      .attr('y1', 40)
      .attr('x2', padding)
      .attr('y2', 2 * padding)
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
    tableLine
      .append('line')
      .attr('x1', padding + 4 * xScale.bandwidth())
      .attr('y1', 40)
      .attr('x2', padding + 4 * xScale.bandwidth())
      .attr('y2', 2 * padding)
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
    tableLine
      .append('line')
      .attr('x1', padding + 8 * xScale.bandwidth())
      .attr('y1', 40)
      .attr('x2', padding + 8 * xScale.bandwidth())
      .attr('y2', 2 * padding)
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
    tableLine
      .append('line')
      .attr('x1', padding + 12 * xScale.bandwidth())
      .attr('y1', 40)
      .attr('x2', padding + 12 * xScale.bandwidth())
      .attr('y2', 2 * padding)
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
    tableLine
      .append('line')
      .attr('x1', padding + 16 * xScale.bandwidth())
      .attr('y1', 40)
      .attr('x2', padding + 16 * xScale.bandwidth())
      .attr('y2', 2 * padding)
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
    tableLine
      .append('line')
      .attr('x1', padding + 20 * xScale.bandwidth())
      .attr('y1', 40)
      .attr('x2', padding + 20 * xScale.bandwidth())
      .attr('y2', 2 * padding)
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
    tableLine
      .append('line')
      .attr('x1', padding)
      .attr('y1', padding * 2)
      .attr('x2', padding)
      .attr('y2', height + 2 * padding)
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
    tableLine
      .append('line')
      .attr('x1', xScale.bandwidth() * 20 + padding)
      .attr('y1', padding * 2)
      .attr('x2', xScale.bandwidth() * 20 + padding)
      .attr('y2', height + 2 * padding)
      .attr('stroke', 'black')
      .attr('stroke-width', 1)

    if (lineFlag) {
      //表格表内横线
      tableLine
        .append('line')
        .attr('x1', padding)
        .attr('y1', padding * 2 + yScale.bandwidth())
        .attr('x2', width - (padding * 3) / 2)
        .attr('y2', padding * 2 + yScale.bandwidth())
        .attr('stroke', 'grey')
        .attr('stroke-width', 1)
      tableLine
        .append('line')
        .attr('x1', padding)
        .attr('y1', padding * 2 + yScale.bandwidth() * 2)
        .attr('x2', width - (padding * 3) / 2)
        .attr('y2', padding * 2 + yScale.bandwidth() * 2)
        .attr('stroke', 'grey')
        .attr('stroke-width', 1)
      tableLine
        .append('line')
        .attr('x1', padding)
        .attr('y1', padding * 2 + yScale.bandwidth() * 3)
        .attr('x2', width - (padding * 3) / 2)
        .attr('y2', padding * 2 + yScale.bandwidth() * 3)
        .attr('stroke', 'grey')
        .attr('stroke-width', 1)

      //表格内竖线

      tableLine
        .append('line')
        .attr('x1', xScale.bandwidth() * 4 + padding)
        .attr('y1', padding * 2)
        .attr('x2', xScale.bandwidth() * 4 + padding)
        .attr('y2', height + 2 * padding)
        .attr('stroke', 'grey')
        .attr('stroke-width', 1)
      tableLine
        .append('line')
        .attr('x1', xScale.bandwidth() * 8 + padding)
        .attr('y1', padding * 2)
        .attr('x2', xScale.bandwidth() * 8 + padding)
        .attr('y2', height + 2 * padding)
        .attr('stroke', 'grey')
        .attr('stroke-width', 1)
      tableLine
        .append('line')
        .attr('x1', xScale.bandwidth() * 12 + padding)
        .attr('y1', padding * 2)
        .attr('x2', xScale.bandwidth() * 12 + padding)
        .attr('y2', height + 2 * padding)
        .attr('stroke', 'grey')
        .attr('stroke-width', 1)
      tableLine
        .append('line')
        .attr('x1', xScale.bandwidth() * 16 + padding)
        .attr('y1', padding * 2)
        .attr('x2', xScale.bandwidth() * 16 + padding)
        .attr('y2', height + 2 * padding)
        .attr('stroke', 'grey')
        .attr('stroke-width', 1)
    }
  }

  useEffect(() => {
    d3.select('#evolutionSvg').remove('*')
    drawEvolution()
  }, [showFlag, backgroundFlag, lineFlag])

  //选择展示哪些
  const handleChange = (value) => {
    setShowFlag(value)
  }
  const handleDisplay = (checked) => {
    setBackgroundFlag(checked)
  }
  const handleLine = (checked) => {
    setLineFlag(checked)
  }

  return (
    <EvolutionWrapper>
      <div className="title">
        <div className="title-icon">
          <IconFont type="icon-yanhuafenxi" />
        </div>
        时间模式演化
      </div>
      <div className="Evolutioncontent">
        <div className="radioLine">
          <Switch
            checkedChildren="开启表格线"
            unCheckedChildren="关闭表格线"
            onChange={handleLine}
            defaultChecked
          />
        </div>
        <div className="radioRight">
          <Switch
            checkedChildren="开启正确率背景"
            unCheckedChildren="关闭正确率背景"
            onChange={handleDisplay}
            defaultChecked
          />
        </div>
        <div className="selectWork">
          <Select
            defaultValue="工作日/休息日"
            style={{ width: 140 }}
            onChange={handleChange}
            options={[
              {
                label: <span>选择想要展示的内容</span>,
                title: '工作日/休息日',
                options: [
                  {
                    label: <span>工作日/休息日</span>,
                    value: 'all'
                  },
                  {
                    label: <span>只展示工作日</span>,
                    value: 'work'
                  },
                  {
                    label: <span>只展示休息日</span>,
                    value: 'relax'
                  }
                ]
              }
            ]}
          />
        </div>
      </div>
    </EvolutionWrapper>
  )
}
export default memo(Evolution)
