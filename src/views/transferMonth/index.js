import React, { memo, useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'
import ReactEcharts from 'echarts-for-react'
import { TransferMonthWrapper } from './style'
import { getMonthQuestionSubmit } from '../../api'
// import { createFromIconfontCN } from '@ant-design/icons'
// const IconFont = createFromIconfontCN({
//   scriptUrl: '//at.alicdn.com/t/c/font_4565164_ivno85eyhk.js'
// })
import d3Tip from 'd3-tip'
import TitleCompare from '../titleCompare'
import Answer from '../../assets/images/answer.svg'

const TransferMonth = (props) => {
  const {
    transferLinksData,
    transferFirstMonth,
    transferSecondMonth,
    transferParallelList,
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
  // 问题的提交数据,第一个月
  const [submitData1, setSubmitData1] = useState([])
  // 问题的正确率,第一个月
  const [correctRate1, setCorrectRate1] = useState([])
  // 问题的提交数据，第二个月
  const [submitData2, setSubmitData2] = useState([])
  // 问题的正确率，第二个月
  const [correctRate2, setCorrectRate2] = useState([])
  // 是否展示个人视图
  const [isIndividual, setIsIndividual] = useState(false)
  // 是否展示平行坐标系
  const [isParallel, setIsParallel] = useState(false)
  // 四个框框的横坐标
  const student = transferLinksData[0].map((item) => item.key)
  // 正确率的数据
  const correct1 = transferLinksData[0].map((item) => item.correct)
  // 提交的数据
  const submit1 = transferLinksData[0].map((item) => item.submit)
  // 活跃的数据
  const active1 = transferLinksData[0].map((item) => item.active)
  // 答题的数据
  const question1 = transferLinksData[0].map((item) => item.question)
  // 正确率的数据,第二个月
  const correct2 = transferLinksData[1].map((item) => item.correct)
  // 提交的数据,第二个月
  const submit2 = transferLinksData[1].map((item) => item.submit)
  // 活跃的数据,第二个月
  const active2 = transferLinksData[1].map((item) => item.active)
  // 答题的数据,第二个月
  const question2 = transferLinksData[1].map((item) => item.question)
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
  const extractedArrays1 = transferLinksData[0].map((item) => {
    return fieldsToExtract.map((field) => item[field])
  })
  const extractedArrays2 = transferLinksData[1].map((item) => {
    return fieldsToExtract.map((field) => item[field])
  })
  // 将两个月的数据进行合并
  let combinedArray = []
  extractedArrays1.forEach((sublist, index1) => {
    let tmp = []
    sublist.forEach((value, index2) => {
      tmp.push([value, extractedArrays2[index1][index2]])
    })
    combinedArray.push(tmp)
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
        data: correct1,
        type: 'line',
        color: '#EB8277',
        // color:
        //   transferLinksData[0][0].label == '针对型'
        //     ? '#86C6F0'
        //     : transferLinksData[0][0].label === '多样型'
        //       ? '#EB8277'
        //       : '#6ABF57',
        areaStyle: {}
      },
      {
        data: correct2,
        type: 'line',
        color: '#86C6F0',
        // color:
        //   transferLinksData[1][0].label == '针对型'
        //     ? '#86C6F0'
        //     : transferLinksData[1][0].label === '多样型'
        //       ? '#EB8277'
        //       : '#6ABF57',
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
        data: submit1,
        type: 'line',
        color: '#EB8277',
        // color:
        //   transferLinksData[0][0].label == '针对型'
        //     ? '#86C6F0'
        //     : transferLinksData[0][0].label === '多样型'
        //       ? '#EB8277'
        //       : '#6ABF57',
        areaStyle: {}
      },
      {
        data: submit2,
        type: 'line',
        color: '#86C6F0',
        // color:
        //   transferLinksData[1][0].label == '针对型'
        //     ? '#86C6F0'
        //     : transferLinksData[1][0].label === '多样型'
        //       ? '#EB8277'
        //       : '#6ABF57',
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
        data: active1,
        type: 'line',
        color: '#EB8277',
        // color:
        //   transferLinksData[0][0].label == '针对型'
        //     ? '#86C6F0'
        //     : transferLinksData[0][0].label === '多样型'
        //       ? '#EB8277'
        //       : '#6ABF57',
        areaStyle: {}
      },
      {
        data: active2,
        type: 'line',
        color: '#86C6F0',
        // color:
        //   transferLinksData[1][0].label == '针对型'
        //     ? '#86C6F0'
        //     : transferLinksData[1][0].label === '多样型'
        //       ? '#EB8277'
        //       : '#6ABF57',
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
        data: question1,
        type: 'line',
        color: '#EB8277',
        // color:
        //   transferLinksData[0][0].label == '针对型'
        //     ? '#86C6F0'
        //     : transferLinksData[0][0].label === '多样型'
        //       ? '#EB8277'
        //       : '#6ABF57',
        areaStyle: {}
      },
      {
        data: question2,
        type: 'line',
        color: '#86C6F0',
        // color:
        //   transferLinksData[1][0].label == '针对型'
        //     ? '#86C6F0'
        //     : transferLinksData[1][0].label === '多样型'
        //       ? '#EB8277'
        //       : '#6ABF57',
        areaStyle: {}
      }
    ]
  }
  const parallelOption = {
    title: {
      text: '群体对比平行坐标系',
      left: '2%',
      top: '4%',
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
      left: '45%',
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
        areaSelectStyle: { width: 15 },
        axisLabel: {
          formatter: function (value) {
            // 将值映射为需要展示的标签
            if (value === '针对型') return '  集中\n针对型'
            if (value === '多样型') return '  广泛\n多样型'
            if (value === '尝试型') return '  探索\n尝试型'
            return value // 如果没有对应的映射，返回原始值
          }
        }
      }
    ],
    series: [
      {
        name: transferFirstMonth,
        type: 'parallel',
        lineStyle: {
          color: '#86C6F0',
          width: 1.4
        },
        smooth: true,
        data: transferParallelList[0]
      },
      {
        name: transferSecondMonth,
        type: 'parallel',
        lineStyle: {
          width: 1.4,
          color: '#EB8277'
        },
        smooth: true,
        data: transferParallelList[1]
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
    if (transferLinksData[0].length != 0) {
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
      .data(combinedArray)
      .enter()
      .append('g')
      .attr('transform', (_, i) => `translate(5, ${i * 30})`) // 每个学生之间间隔30像素
      /* eslint-disable no-unused-vars */
      .each(function (d, i) {
        // 在每个 g 元素添加点击事件
        d3.select(this).on('click', function (event, d) {
          // 处理点击事件
          // 给表格选中数据传入新的选择
          handleClickRowKeys(d[0][0])
          // 等两个请求都成功获取之后才会执行后面的内容
          Promise.all([
            getMonthQuestionSubmit(d[0][0], transferFirstMonth),
            getMonthQuestionSubmit(d[0][0], transferSecondMonth)
          ]).then(([res1, res2]) => {
            // 先拿到第一个月做的题
            const qList1 = res1[0]
            // 个人图数据
            const submit1 = res1[1]
            const correct1 = res1[2]
            // 拿到第二个月做的题
            const qList2 = res2[0]
            // 个人图数据
            const submit2 = res2[1]
            const correct2 = res2[2]
            // 合并问题列表
            let aset = new Set([...qList1, ...qList2]) // 将两个列表合并到一个 Set 中
            let mergedList = Array.from(aset)
            // console.log(mergedList)
            // 保存匹配后的数据
            let new_submit1 = []
            let new_correct1 = []
            let new_submit2 = []
            let new_correct2 = []
            // 根据合并的问题列表来对应提交次数和正确率
            mergedList.forEach((id) => {
              let findindex = qList1.indexOf(id)
              if (findindex !== -1) {
                new_submit1.push(submit1[findindex])
                new_correct1.push(correct1[findindex])
              } else {
                // 没有该问题就加0
                new_submit1.push(0)
                new_correct1.push(0)
              }
            })
            // 匹配第二个月的
            mergedList.forEach((id) => {
              let findindex = qList2.indexOf(id)
              if (findindex !== -1) {
                new_submit2.push(submit2[findindex])
                new_correct2.push(correct2[findindex])
              } else {
                new_submit2.push(0)
                new_correct2.push(0)
              }
            })
            // 更新两个月份的状态
            setSubmitData1(new_submit1)
            setSubmitData2(new_submit2)
            setCorrectRate1(new_correct1)
            setCorrectRate2(new_correct2)
            // 更新问题列表
            setQuestionList(mergedList)
            // 可以展示比较视图
            setIsIndividual(true)
          })
          // 把tip消掉
          tip.hide()
        })
        // 在每个g元素中添加圆，又两个圆
        d3.select(this)
          .selectAll('circle')
          .data(d[1]) // 绑定 d[1] 中的两个元素
          .enter()
          .append('circle')
          .attr('cx', (_, i) => 2 + i * 12) // 调整 x 坐标，使圆形水平排列
          .attr('cy', 10) // 圆形的 y 坐标为矩形的高度的一半，使其垂直居中
          .attr('r', 5) // 圆形的半径为 5 像素
          .attr('fill', (data) => circleColorScale(data))
          .style('stroke', '#FFA500')
          .style('stroke-width', function (data) {
            if (
              studentIDlist.indexOf(d[0][0]) == -1 &&
              selectedRowKeys.indexOf(d[0][0]) == -1
            ) {
              return 0
            } else {
              return 2
            }
          })
          .on('mouseover', function (e, data) {
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
              text-align: center;">学生ID: ${d[0][0]}</p><p>答题模式: ${data}</p><div>`)
            tip.show(d, this)
          })
          .on('mouseout', function (e, data) {
            tip.hide()
            if (studentIDlist.indexOf(d[0][0]) == -1) {
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
          .append('g') // 添加一个 g 容器来包含两个分开的矩形部分
          .attr('transform', (_, i) => `translate(${22 + i * 137}, 0)`) // 矩形的 x 坐标，留出空间给圆形和间隔
          .each(function (d, i) {
            // 在每个 g 容器中添加两个小矩形
            d3.select(this)
              .append('rect')
              .attr('x', 0)
              .attr('y', 0)
              .attr('width', 64) // 矩形的第一部分宽度为64的一半
              .attr('height', 20)
              .attr('fill', colorScales[i](d[0])) // 使用颜色比例尺编码第一个小矩形的颜色

            d3.select(this)
              .append('rect')
              .attr('x', 64) // 第二个小矩形紧接在第一个后面
              .attr('y', 0)
              .attr('width', 64) // 矩形的第二部分宽度为64的一半
              .attr('height', 20)
              .attr('fill', colorScales[i](d[1])) // 使用颜色比例尺编码第二个小矩形的颜色
          })
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
                  text-align: center;"><p> ${d[0].toFixed(2) + ',' + d[1].toFixed(2)}</p><div>`)
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
  }, [transferLinksData, studentIDlist, selectedRowKeys])
  return (
    <TransferMonthWrapper>
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
                height={combinedArray.length * 30}
              />
            </div>
          </div>
        </div>
        <div className="rightview">
          <div className="individual">
            <TitleCompare
              isIndividual={isIndividual}
              questionList={questionList}
              submitData1={submitData1}
              correctRate1={correctRate1}
              submitData2={submitData2}
              correctRate2={correctRate2}
              transferFirstMonth={transferFirstMonth}
              transferSecondMonth={transferSecondMonth}
            />
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
    </TransferMonthWrapper>
  )
}
export default memo(TransferMonth)
