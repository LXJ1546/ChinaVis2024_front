import React, { memo } from 'react'
import { PictureWrapper } from './style'
import * as d3 from 'd3'
import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
const Picture = () => {
  const svgRef = useRef(null)
  const majorRef = useRef(null)
  const ageRef = useRef(null)
  const genderRef = useRef(null)
  //画像视图
  function drawPicture() {
    //画专业分布图
    const majorChart = echarts.init(majorRef.current)
    const majorOption = {
      title: {
        text: '专业分布',
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        }
      },
      grid: {
        left: '15%', // 距离左边框的距离
        right: '2%', // 距离右边框的距离
        top: '20%', // 距离上边框的距离
        bottom: '20%' // 距离下边框的距离
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'value',
        axisLine: {
          // x 轴线配置
          show: true // 显示 x 轴线
        },
        axisTick: {
          // x 轴刻度线配置
          show: true // 显示 x 轴刻度线
        },
        axisLabel: {
          // x 轴标签配置
          show: true, // 显示 x 轴标签
          textStyle: {
            fontSize: 10
          }
        }
      },
      yAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5'],
        axisLabel: {
          textStyle: {
            fontSize: 10
          },
          interval: 0
        }
      },
      series: [
        {
          data: [13, 46, 44, 16, 7],
          type: 'bar'
        }
      ]
    }
    majorChart.setOption(majorOption)
    window.onresize = majorChart.resize

    //年龄分布
    const ageChart = echarts.init(ageRef.current)
    const ageOption = {
      title: {
        text: '年龄分布',
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        }
      },
      grid: {
        left: '15%', // 距离左边框的距离
        right: '2%', // 距离右边框的距离
        top: '15%', // 距离上边框的距离
        bottom: '20%' // 距离下边框的距离
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'value',
        axisLine: {
          // x 轴线配置
          show: true // 显示 x 轴线
        },
        axisTick: {
          // x 轴刻度线配置
          show: true // 显示 x 轴刻度线
        },
        axisLabel: {
          // x 轴标签配置
          show: true, // 显示 x 轴标签
          textStyle: {
            fontSize: 10
          }
        }
      },
      yAxis: {
        type: 'category',
        data: ['18', '19', '20', '21', '22', '23', '24'],
        axisLabel: {
          textStyle: {
            fontSize: 10
          },
          interval: 0
        }
      },
      series: [
        {
          data: [13, 46, 44, 16, 7, 20, 36],
          type: 'bar'
        }
      ]
    }
    ageChart.setOption(ageOption)
    window.onresize = ageChart.resize
    //性别分布
    const genderChart = echarts.init(genderRef.current)
    const genderOption = {
      title: {
        text: '性别分布',
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal'
        }
      },
      grid: {
        left: '15%', // 距离左边框的距离
        right: '2%', // 距离右边框的距离
        top: '20%', // 距离上边框的距离
        bottom: '50%' // 距离下边框的距离
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'value',
        axisLine: {
          // x 轴线配置
          show: true // 显示 x 轴线
        },
        axisTick: {
          // x 轴刻度线配置
          show: true // 显示 x 轴刻度线
        },
        axisLabel: {
          // x 轴标签配置
          show: true, // 显示 x 轴标签
          textStyle: {
            fontSize: 10
          }
        }
      },
      yAxis: {
        type: 'category',
        data: ['男', '女'],
        axisLabel: {
          textStyle: {
            fontSize: 10
          },
          interval: 0
        }
      },
      series: [
        {
          data: [50, 45],
          type: 'bar'
        }
      ]
    }
    genderChart.setOption(genderOption)
    window.onresize = genderChart.resize
  }

  // 排名视图
  function drawRank() {
    const array = Array.from({ length: 90 }, () => Math.random())
    array.sort((a, b) => b - a)
    const rectDistance = 100 //用于扩大方块之间的差异
    var rectY = 0 //第一个方块的起始值
    // var svgtranX = d3
    //   .select('.Pictureview')
    //   .node()
    //   .getBoundingClientRect().width
    if (!svgRef.current) {
      // 创建svg画布
      const svg = d3
        .select('.Rankview')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
      //创建班级排名视图,为该视图创建一个group
      const ranking = svg.append('g')
      ranking
        .selectAll('rect')
        .data(array)
        .enter()
        .append('rect')
        .attr('width', '80px')
        .attr('height', '1px')
        .attr('fill', '#72B9F0')
        .attr('x', '10px')
        .attr('y', function (d, i) {
          if (i == 0) {
            rectY = rectY + 3.5
            return '0px'
          } else {
            rectY = rectY + 3.5 + rectDistance * (array[i] - array[i - 1])
            return rectY + rectDistance * (array[i] - array[i - 1]) + 'px'
          }
        })

      //班级排名视图标签
      const ranklable = svg.append('g').attr('class', 'ranklable')
      ranklable.append('text').text('Class 1').attr('x', '30%').attr('y', '90%')
      ranklable
        .append('text')
        .text('排名情况')
        .attr('x', '25%')
        .attr('y', '96%')

      svgRef.current = svg
    }
  }

  useEffect(() => {
    drawPicture()
    drawRank()
  }, [])

  return (
    <PictureWrapper>
      <div className="title">整体画像</div>
      <div className="Pictureview">
        <div className="wholePictureview">
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
