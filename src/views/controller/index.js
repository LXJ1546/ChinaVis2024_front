import React, { memo } from 'react'
import { useRef, useEffect } from 'react'
import * as echarts from 'echarts'
// import ReactEcharts from 'echarts-for-react'
import { CotrollerWrapper } from './style'
// import * as d3 from 'd3';
import { Input, Button, Select } from 'antd'
// import { getClassBasicInfo } from '../../API/api'
const Cotroller = () => {
  const distributionRef = useRef(null)
  const majorRef1 = useRef(null)
  const ageRef1 = useRef(null)
  const genderRef1 = useRef(null)
  function drawPicture() {
    //画专业分布图
    const majorChart = echarts.init(majorRef1.current)
    const majorOption = {
      title: {
        text: '专业分布',
        left: 'center',
        top: '60%',
        textStyle: {
          fontSize: 12,
          fontWeight: 'normal'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['70%', '110%'],
          center: ['50%', '70%'],
          label: {
            show: false // 不显示标识
          },
          // adjust the start and end angle
          startAngle: 180,
          endAngle: 360,
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    }
    majorChart.setOption(majorOption)
    window.onresize = majorChart.resize

    //年龄分布
    const ageChart = echarts.init(ageRef1.current)
    const ageOption = {
      title: {
        text: '年龄分布',
        left: 'center',
        top: '60%',
        textStyle: {
          fontSize: 12,
          fontWeight: 'normal'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['70%', '110%'],
          center: ['50%', '70%'],
          label: {
            show: false // 不显示标识
          },
          // adjust the start and end angle
          startAngle: 180,
          endAngle: 360,
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    }
    ageChart.setOption(ageOption)
    window.onresize = ageChart.resize
    //性别分布
    const genderChart = echarts.init(genderRef1.current)
    const genderOption = {
      title: {
        text: '性别分布',
        left: 'center',
        top: '60%',
        textStyle: {
          fontSize: 12,
          fontWeight: 'normal'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['70%', '110%'],
          center: ['50%', '70%'],
          label: {
            show: false // 不显示标识
          },
          // adjust the start and end angle
          startAngle: 180,
          endAngle: 360,
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    }
    genderChart.setOption(genderOption)
    window.onresize = genderChart.resize
  }

  useEffect(() => {
    // var classBasicInfo = []
    // getClassBasicInfo().then((res) => {
    //   classBasicInfo = res[0]
    //   drawPicture(classBasicInfo)
    // })
    drawPicture()
  }, [])

  //数据集选择函数
  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  return (
    <CotrollerWrapper>
      <div className="title">控制面板</div>
      <div className="Controllerview">
        {/* 数据集选择 */}
        <Select
          className="selectData"
          defaultValue="Class 1"
          onChange={handleChange}
          options={[
            {
              label: <span>全部</span>,
              title: '全部',
              options: [
                {
                  label: <span>所有学生</span>,
                  value: 'all'
                }
              ]
            },
            {
              label: <span>班级</span>,
              title: '班级',
              options: [
                {
                  label: <span>Class 1</span>,
                  value: 'Class 1'
                },
                {
                  label: <span>Class 2</span>,
                  value: 'Class 2'
                },
                {
                  label: <span>Class 3</span>,
                  value: 'Class 3'
                },
                {
                  label: <span>Class 4</span>,
                  value: 'Class 4'
                },
                {
                  label: <span>Class 5</span>,
                  value: 'Class 5'
                },
                {
                  label: <span>Class 6</span>,
                  value: 'Class 6'
                },
                {
                  label: <span>Class 7</span>,
                  value: 'Class 7'
                },
                {
                  label: <span>Class 8</span>,
                  value: 'Class 8'
                },
                {
                  label: <span>Class 9</span>,
                  value: 'Class 9'
                },
                {
                  label: <span>Class 10</span>,
                  value: 'Class 10'
                },
                {
                  label: <span>Class 11</span>,
                  value: 'Class 11'
                },
                {
                  label: <span>Class 12</span>,
                  value: 'Class 12'
                },
                {
                  label: <span>Class 13</span>,
                  value: 'Class 13'
                },

                {
                  label: <span>Class 14</span>,
                  value: 'Class 14'
                },
                {
                  label: <span>Class 15</span>,
                  value: 'Class 15'
                }
              ]
            }
          ]}
        />
        {/* 初始化内存的各自占比 */}
        <Input
          placeholder="权重"
          className="weightInput"
          addonBefore="得分率"
          style={{ left: '1.5%' }}
        />
        <Input
          placeholder="权重"
          className="weightInput"
          addonBefore="正确比"
          style={{ left: '26%' }}
        />
        <Input
          placeholder="权重"
          className="weightInput"
          addonBefore="用时"
          style={{ left: '50.5%' }}
        />
        <Input
          placeholder="权重"
          className="weightInput"
          addonBefore="内存"
          style={{ left: '75%' }}
        />
        {/*系统初始化按钮  */}
        <Button type="primary" className="initialize">
          初始化系统
        </Button>
        <div className="distribution" ref={distributionRef}>
          <div className="major1" ref={majorRef1}></div>
          <div className="age1" ref={ageRef1}></div>
          <div className="gender1" ref={genderRef1}></div>
        </div>
      </div>
    </CotrollerWrapper>
  )
}
export default memo(Cotroller)
