import React, { memo, useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'
import ReactEcharts from 'echarts-for-react'
import { MonthFeatureWrapper } from './style'
import { getMonthQuestionSubmit } from '../../api'
import d3Tip from 'd3-tip'
const MonthFeature = (props) => {
  const { brushData, month, parallelList, handleClickRowKeys } = props
  // 拿到svg的引用
  const svgRef = useRef(null)
  // 问题列表
  const [questionList, setQuestionList] = useState([])
  // 问题的提交数据
  const [submitData, setSubmitData] = useState([])
  // 问题的正确率
  const [correctRate, setCorrectRate] = useState([])
  // 是否展示个人视图
  const [isIndividual, setIsIndividual] = useState(false)
  // 是否展示平行坐标系
  const [isParallel, setIsParallel] = useState(false)
  // 初始状态为包含三个空列表的数组
  // const [parallelLists, setParallelLists] = useState([[], [], []])
  const student = brushData.map((item) => item.key)
  // 正确率的数据
  const correct = brushData.map((item) => item.correct)
  // 提交的数据
  const submit = brushData.map((item) => item.submit)
  // 活跃的数据
  const active = brushData.map((item) => item.active)
  // 答题的数据
  const question = brushData.map((item) => item.question)
  // 矩形条的数据
  // 提取的字段名
  const fieldsToExtract = [
    'key',
    'label',
    'correct',
    'submit',
    'active',
    'question'
  ]
  // 使用 map 方法提取字段值并创建新数组
  const extractedArrays = brushData.map((item) => {
    return fieldsToExtract.map((field) => item[field])
  })
  const option1 = {
    grid: { left: '0%', top: '5%', right: '0%', bottom: '0%' },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: student,
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      min: 0,
      max: 1
    },
    dataZoom: {
      type: 'inside'
    },
    series: [
      {
        data: correct,
        type: 'line',
        color: '#FFC0CB',
        areaStyle: {}
      }
    ]
  }
  const option2 = {
    grid: { left: '0%', top: '5%', right: '0%', bottom: '0%' },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: student,
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      min: 0,
      max: 350
    },
    dataZoom: {
      type: 'inside'
    },
    series: [
      {
        data: submit,
        type: 'line',
        color: '#FFC0CB',
        areaStyle: {}
      }
    ]
  }
  const option3 = {
    grid: { left: '0%', top: '5%', right: '0%', bottom: '0%' },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: student,
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      min: 0,
      max: 30
    },
    dataZoom: {
      type: 'inside'
    },
    series: [
      {
        data: active,
        type: 'line',
        color: '#FFC0CB',
        areaStyle: {}
      }
    ]
  }
  const option4 = {
    grid: { left: '0%', top: '5%', right: '0%', bottom: '0%' },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: student,
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      min: 0,
      max: 38
    },
    dataZoom: {
      type: 'inside'
    },
    series: [
      {
        data: question,
        type: 'line',
        color: '#FFC0CB',
        areaStyle: {}
      }
    ]
  }
  const individualOption = {
    grid: { left: '10%', top: '20%', right: '10%', bottom: '15%' },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    toolbox: {
      feature: {
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true }
      }
    },
    legend: {
      top: '2%'
    },
    xAxis: [
      {
        type: 'category',
        data: questionList,
        axisPointer: {
          type: 'shadow'
        },
        axisLabel: {
          formatter: function (value) {
            // 拆分字符串，以 '_' 作为分隔符
            const parts = value.split('_')
            // 获取第二部分的前3个字符
            const shortId = parts[1].substring(0, 3)
            // 返回缩写后的ID
            return `Q_${shortId}`
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: false
        }
      },
      {
        type: 'value',
        min: 0,
        max: 1
      }
    ],
    dataZoom: {
      type: 'inside'
    },
    series: [
      {
        name: '提交次数',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' 次'
          }
        },
        data: submitData
      },
      {
        name: '正确率',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            // 将小数转换为百分比，并保留两位小数
            const percentage = (value * 100).toFixed(2)
            return percentage + '%'
          }
        },
        data: correctRate
      }
    ]
  }
  // const radarOption = {
  //   legend: {
  //     left: '5%'
  //   },
  //   radar: {
  //     indicator: [
  //       { text: '提交次数' },
  //       { text: '活跃天数' },
  //       { text: '正确率' },
  //       { text: '答题数' }
  //     ],
  //     center: ['50%', '50%'],
  //     radius: '70%',
  //     startAngle: 90,
  //     splitNumber: 4,
  //     shape: 'circle',
  //     nameGap: 5,
  //     axisName: {
  //       color: '#428BD4'
  //     },
  //     splitArea: {
  //       // areaStyle: {
  //       //   // color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
  //       //   shadowColor: 'rgba(0, 0, 0, 0.2)',
  //       //   shadowBlur: 10
  //       // }
  //     },

  //     axisLine: {
  //       lineStyle: {
  //         color: 'rgba(211, 253, 250, 0.8)'
  //       }
  //     },
  //     splitLine: {
  //       lineStyle: {
  //         color: 'rgb(220,220,220)'
  //       }
  //     }
  //   },
  //   series: [
  //     {
  //       type: 'radar',
  //       emphasis: {
  //         lineStyle: {
  //           width: 4
  //         }
  //       },
  //       data: [
  //         {
  //           value: [100, 8, 0.4, -80, 2000],
  //           name: '学生 A'
  //         },
  //         {
  //           value: [60, 5, 0.3, -100, 1500],
  //           name: '学生 B',
  //           areaStyle: {
  //             color: 'rgba(255, 228, 52, 0.6)'
  //           }
  //         }
  //       ]
  //     }
  //   ]
  // }
  const parallelOption = {
    parallel: {
      left: '6%',
      top: '15%',
      right: '13%',
      bottom: '6%',
      parallelAxisDefault: {
        nameGap: 8,
        areaSelectStyle: {
          width: 0 // 默认不允许框选
        }
      }
    },
    tooltip: {
      valueFormatter: function (value) {
        // 将小数转换为百分比，并保留两位小数
        const percentage = (value * 100).toFixed(2)
        return percentage + '%'
      }
    },
    parallelAxis: [
      { dim: 0, name: '提交次数', min: '0', max: '600' },
      { dim: 1, name: '活跃天数', min: '0', max: '30' },
      { dim: 2, name: '答题数', min: '0', max: '38' },
      { dim: 3, name: '正确率', min: '0', max: '1' },
      {
        dim: 4,
        name: '模式',
        type: 'category',
        data: ['针对型', '多样型', '尝试型'],
        areaSelectStyle: { width: 15 }
      }
    ],
    series: [
      {
        type: 'parallel',
        lineStyle: {
          width: 1
        },
        data: parallelList[0]
      },
      {
        type: 'parallel',
        lineStyle: {
          width: 1
        },
        data: parallelList[1]
      },
      {
        type: 'parallel',
        lineStyle: {
          width: 1
        },
        data: parallelList[2]
      }
    ]
  }
  //tooltip
  const tip = d3Tip()
    .attr('class', 'd3-tip')
    .html(function (d) {
      return `Class ${d[0]},人数: <span >${d}</span>`
    })
  useEffect(() => {
    const svg = d3.select(svgRef.current)
    // 清空之前的绘制
    svg.selectAll('*').remove()
    // 创建颜色比例尺
    const colorScale1 = d3
      .scaleSequential(
        d3.interpolateRgbBasis(['#ffebcd', '#f4a460', '#d2691e'])
      )
      .domain([0, 1])
    const colorScale2 = d3
      .scaleSequential(
        d3.interpolateRgbBasis(['#ffebcd', '#f4a460', '#d2691e'])
      )
      .domain([0, 400])
    const colorScale3 = d3
      .scaleSequential(
        d3.interpolateRgbBasis(['#ffebcd', '#f4a460', '#d2691e'])
      )
      .domain([0, 30])
    const colorScale4 = d3
      .scaleSequential(
        d3.interpolateRgbBasis(['#ffebcd', '#f4a460', '#d2691e'])
      )
      .domain([0, 38])
    const colorScales = [colorScale1, colorScale2, colorScale3, colorScale4]
    // 渲染矩形
    svg
      .selectAll('g')
      .data(extractedArrays)
      .enter()
      .append('g')
      .attr('transform', (_, i) => `translate(5, ${i * 30})`) // 每个学生之间间隔30像素
      /* eslint-disable no-unused-vars */
      .each(function (d, i) {
        // 在每个 g 元素中添加一个圆
        d3.select(this)
          .on('click', function (event, d) {
            // 处理点击事件
            // 给表格选中数据传入新的选择
            handleClickRowKeys(d[0])
            // 获取个人视图和平行坐标系的数据
            getMonthQuestionSubmit(d[0], month).then((res) => {
              // 个人图x轴标签
              setQuestionList(res[0])
              // 个人图数据
              setSubmitData(res[1])
              setCorrectRate(res[2])
              setIsIndividual(true)
              setIsParallel(true)
            })
          })
          .append('circle')
          .attr('cx', 8) // 圆形的 x 坐标为 10
          .attr('cy', 10) // 圆形的 y 坐标为矩形的高度的一半，使其垂直居中
          .attr('r', 7) // 圆形的半径为 8 像素
          .attr('fill', function (d) {
            // 根据字符串的值来决定填充颜色
            if (d[1] === '针对型') {
              return 'steelblue'
            } else if (d[1] === '多样型') {
              return 'red'
            } else {
              return 'green'
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
                  text-align: center;">学生ID: ${d[0]}</p><p>答题模式: ${d[1]}</p><div>`)
            tip.show(d, this)
          })
          .on('mouseout', function () {
            tip.hide()
            d3.select(this).style('stroke-width', 0)
          })

        // 在每个 g 元素中根据数据添加矩形
        d3.select(this)
          .selectAll('rect')
          .data((d) => d.slice(2))
          .enter()
          .append('rect')
          .attr('x', (_, i) => 22 + i * 130) // 矩形的 x 坐标，留出空间给圆形和间隔
          .attr('y', 0)
          .attr('width', 120) // 每个矩形的固定宽度为100像素
          .attr('height', 20) // 每个矩形的固定高度为20像素
          .attr('fill', (d, i) => colorScales[i](d)) // 使用颜色比例尺编码矩形的颜色
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
                  text-align: center;"><p> ${d}</p><div>`)
            tip.show(d, this)
          })
          .on('mouseout', function () {
            tip.hide()
            d3.select(this).style('stroke-width', 0)
          })

        svg.call(tip)
      })
  }, [brushData])
  return (
    <MonthFeatureWrapper>
      <div className="title">学生月答题数据视图</div>
      <div className="content">
        <div className="leftview">
          <div className="leftbar">
            <h3 className="info">正确率</h3>
            <h3 className="info">提交次数</h3>
            <h3 className="info">活跃天数</h3>
            <h3 className="info">答题数</h3>
          </div>
          <div className="underview">
            <div className="echartview">
              <div className="echartbox">
                <ReactEcharts
                  option={option1}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div className="echartbox">
                <ReactEcharts
                  option={option2}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div className="echartbox">
                <ReactEcharts
                  option={option3}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div className="echartbox">
                <ReactEcharts
                  option={option4}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>
            <div className="asvg">
              <svg
                ref={svgRef}
                width="100%"
                height={extractedArrays.length * 30}
              />
            </div>
          </div>
        </div>
        <div className="rightview">
          <div className="individual">
            {isIndividual && (
              <ReactEcharts
                option={individualOption}
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </div>
          <div className="compare">
            {isParallel && (
              <ReactEcharts
                option={parallelOption}
                style={{ width: '99%', height: '99%' }}
              />
            )}
          </div>
        </div>
      </div>
    </MonthFeatureWrapper>
  )
}
export default memo(MonthFeature)
