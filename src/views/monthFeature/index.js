import React, { memo, useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'
import ReactEcharts from 'echarts-for-react'
import { MonthFeatureWrapper } from './style'
import { getMonthQuestionSubmit } from '../../api'
// import { createFromIconfontCN } from '@ant-design/icons'
// const IconFont = createFromIconfontCN({
//   scriptUrl: '//at.alicdn.com/t/c/font_4565164_ivno85eyhk.js'
// })
import d3Tip from 'd3-tip'
import Answer from '../../assets/images/answer.svg'

const MonthFeature = (props) => {
  const {
    brushData,
    month,
    parallelList,
    handleClickRowKeys,
    studentIDlist,
    selectedRowKeys
  } = props
  // 拿到svg的引用
  const svgRef = useRef(null)
  // 拿到svg的引用
  const legendRef = useRef(null)
  // 问题列表
  const [questionList, setQuestionList] = useState([])
  // 问题的提交数据
  const [submitData, setSubmitData] = useState([])
  // 问题的正确率
  const [correctRate, setCorrectRate] = useState([])
  // 点击事件获取到的学生id
  const [clickId, setClickId] = useState('')
  // 是否展示个人视图
  const [isIndividual, setIsIndividual] = useState(false)
  // 是否展示平行坐标系
  const [isParallel, setIsParallel] = useState(false)
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
        color: '#b6e3fc',
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
        color: '#b6e3fc',
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
        color: '#b6e3fc',
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
        // color: '#caedc9',
        color: '#b6e3fc',
        areaStyle: {}
      }
    ]
  }
  const individualOption = {
    title: {
      text: `${clickId.substring(0, 14)}...个人答题情况`,
      left: '2%',
      top: '2.5%',
      textStyle: {
        fontSize: 12,
        fontWeight: 'bold'
      }
    },
    grid: { left: '8%', top: '20%', right: '8%', bottom: '10%' },
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
      top: '2%',
      left: '45%',
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        fontSize: 11
      }
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
        itemStyle: {
          color: '#86C6F0'
        },
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
        itemStyle: {
          color: '#6ABF57'
        },
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
  const parallelOption = {
    title: {
      text: '群体对比平行坐标系',
      left: '2%',
      top: '5%',
      textStyle: {
        fontSize: 12,
        fontWeight: 'bold'
      }
    },
    parallel: {
      left: '4%',
      top: '26%',
      right: '11%',
      bottom: '4%',
      parallelAxisDefault: {
        nameGap: 8,
        areaSelectStyle: {
          width: 0 // 默认不允许框选
        },
        nameTextStyle: {
          align: 'left'
        }
      }
    },
    legend: {
      top: '4%',
      left: '40%',
      itemWidth: 20,
      itemHeight: 9,
      textStyle: {
        fontSize: 11
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
      {
        dim: 0,
        name: '提交次数',
        min: '0',
        max: '600'
      },
      { dim: 1, name: '活跃天数', min: '0', max: '30' },
      { dim: 2, name: '答题数', min: '0', max: '38' },
      { dim: 3, name: '正确率', min: '0', max: '1' },
      {
        dim: 4,
        name: '模式',
        type: 'category',
        data: ['针对型', '多样型', '尝试型'],
        axisLabel: {
          formatter: function (value) {
            // 将值映射为需要展示的标签
            if (value === '针对型') return '  集中\n针对型'
            if (value === '多样型') return '  广泛\n多样型'
            if (value === '尝试型') return '  探索\n尝试型'
            return value // 如果没有对应的映射，返回原始值
          }
        },
        areaSelectStyle: { width: 15 }
      }
    ],
    series: [
      {
        name: '集中针对型',
        type: 'parallel',
        lineStyle: {
          color: '#86C6F0',
          width: 1.5
        },
        smooth: true,
        data: parallelList[0]
      },
      {
        name: '广泛多样型',
        type: 'parallel',
        lineStyle: {
          width: 1.5,
          color: '#EB8277'
        },
        smooth: true,
        data: parallelList[1]
      },
      {
        name: '探索尝试型',
        type: 'parallel',
        lineStyle: {
          width: 1.5,
          color: '#6ABF57'
        },
        smooth: true,
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
    if (brushData.length != 0) {
      setIsParallel(true)
    }
    const svg = d3.select(svgRef.current)
    // 图例的svg
    const legendsvg = d3.select(legendRef.current)
    // 清空之前的绘制
    svg.selectAll('*').remove()
    legendsvg.selectAll('*').remove()
    // 创建颜色比例尺
    const colorScale1 = d3
      .scaleSequential(
        d3.interpolateRgbBasis(['#e0f5ff', '#86c6f0', '#679fc9'])
      )
      .domain([0, 1])
    const colorScale2 = d3
      .scaleSequential(
        d3.interpolateRgbBasis(['#e0f5ff', '#86c6f0', '#679fc9'])
      )
      .domain([0, 400])
    const colorScale3 = d3
      .scaleSequential(
        d3.interpolateRgbBasis(['#e0f5ff', '#86c6f0', '#679fc9'])
      )
      .domain([0, 30])
    const colorScale4 = d3
      .scaleSequential(
        d3.interpolateRgbBasis(['#e0f5ff', '#86c6f0', '#679fc9'])
      )
      .domain([0, 38])
    const colorScales = [colorScale1, colorScale2, colorScale3, colorScale4]
    // 定义图例中圆形颜色比例尺
    const circleColorScale = d3
      .scaleOrdinal()
      .domain(['针对型', '多样型', '尝试型'])
      .range(['#86C6F0', '#EB8277', '#6ABF57'])
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
            // 设置个人答题情况的学生id
            setClickId(d[0])
            // 获取个人视图和平行坐标系的数据
            getMonthQuestionSubmit(d[0], month).then((res) => {
              // 个人图x轴标签
              setQuestionList(res[0])
              // 个人图数据
              setSubmitData(res[1])
              setCorrectRate(res[2])
              setIsIndividual(true)
            })
            // 把tip消掉
            tip.hide()
          })
          .append('circle')
          .attr('cx', 7) // 圆形的 x 坐标为 10
          .attr('cy', 10) // 圆形的 y 坐标为矩形的高度的一半，使其垂直居中
          .attr('r', 6) // 圆形的半径为 5 像素
          .attr('fill', (d) => circleColorScale(d[1]))
          .style('stroke', '#FFA500')
          .style('stroke-width', function (d) {
            // 掌握程度那边的高亮以及表格选择时的高亮
            if (
              studentIDlist.indexOf(d[0]) == -1 &&
              selectedRowKeys.indexOf(d[0]) == -1
            ) {
              return 0
            } else {
              return 2
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
          .on('mouseout', function (e, d) {
            tip.hide()
            if (studentIDlist.indexOf(d[0]) == -1) {
              d3.select(this).style('stroke-width', 0)
            } else {
              d3.select(this)
                .style('stroke', '#FFA500')
                .style('stroke-width', 2)
            }
          })

        // 在每个 g 元素中根据数据添加矩形
        d3.select(this)
          .selectAll('rect')
          .data((d) => d.slice(2))
          .enter()
          .append('rect')
          .attr('x', (_, i) => 22 + i * 137) // 矩形的 x 坐标，留出空间给圆形和间隔
          .attr('y', 0)
          .attr('width', 128) // 每个矩形的固定宽度为130像素
          .attr('height', 20) // 每个矩形的固定高度为20像素
          .attr('fill', (d, i) => colorScales[i](d)) // 使用颜色比例尺编码矩形的颜色
          .on('mouseover', function (e, d) {
            d3.select(this).style('stroke', 'grey').style('stroke-width', 2)
            tip.html(`<div style="line-height: 1;
                  font-weight: bold;
                  padding: 12px;:
                  background: white;
                  color: grey;
                  border-radius: 2px;
                  pointer-events: none;
                  font-family: Arial, sans-serif;
                  font-size: 12px;
                  text-align: center;"><p> ${d.toFixed(2)}</p><div>`)
            tip.show(d, this)
          })
          .on('mouseout', function () {
            tip.hide()
            d3.select(this).style('stroke-width', 0)
          })

        svg.call(tip)
      })

    //渲染圆点图例
    legendsvg
      .selectAll('.legend-circle')
      .data(['针对型', '多样型', '尝试型'])
      .enter()
      .append('circle')
      .attr('class', 'legend-circle')
      .attr('cx', (d, i) => 30 + i * 78)
      .attr('cy', 10)
      .attr('r', 5)
      .style('fill', (d) => circleColorScale(d))
    // 添加图例标签
    legendsvg
      .selectAll('.legend-label')
      .data(['集中针对型', '广泛多样型', '探索尝试型'])
      .enter()
      .append('text')
      .attr('class', 'legend-label')
      .attr('x', (d, i) => 38 + i * 78)
      .attr('y', 14)
      .text((d) => d)
      .style('font-size', '11px') // 修改字体大小
      .style('font-family', 'sans-serif')
      .style('opacity', 0.8)

    // 添加颜色比例尺图例
    const legendGradient = legendsvg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'color-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%')
    legendGradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#e0f5ff')
    legendGradient
      .append('stop')
      .attr('offset', '50%')
      .attr('stop-color', '#86c6f0')
    legendGradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#679fc9')
    legendsvg
      .append('rect')
      .attr('x', 435)
      .attr('y', 5)
      .attr('width', 100)
      .attr('height', 10)
      .style('fill', 'url(#color-gradient)')
    // 添加左侧文本标签
    legendsvg
      .append('text')
      .attr('x', 430) // 调整位置
      .attr('y', 14) // 调整位置
      .attr('text-anchor', 'end') // 设置文本锚点为右对齐
      .text('少/低') // 添加文本内容
      .style('font-size', '11px') // 修改字体大小
      .style('opacity', 0.8)

    // 添加右侧文本标签
    legendsvg
      .append('text')
      .attr('x', 540) // 调整位置
      .attr('y', 14) // 调整位置
      .attr('text-anchor', 'start') // 设置文本锚点为左对齐
      .text('多/高') // 添加文本内容
      .style('font-size', '11px') // 修改字体大小
      .style('opacity', 0.8)
  }, [brushData, studentIDlist, selectedRowKeys])
  return (
    <MonthFeatureWrapper>
      <div className="title">
        <div className="title-icon">
          {/* <IconFont type="icon-dati" /> */}
          <img src={Answer} alt="答题图标" style={{ width: 20, height: 20 }} />
        </div>
        学生月答题数据统计图
      </div>
      <div className="content">
        <div className="leftview">
          <div className="leftbar">
            <div style={{ width: 15 }}></div>
            <h3 className="info">正确率</h3>
            <h3 className="info">提交次数</h3>
            <h3 className="info">活跃天数</h3>
            <h3 className="info">答题数</h3>
            <div style={{ width: 12 }}></div>
          </div>
          <div className="monthlegend">
            <svg ref={legendRef} width="100%" />
          </div>
          <div className="underview">
            <div className="echartview">
              <div style={{ width: 15 }}></div>
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
              <div style={{ width: 12 }}></div>
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
