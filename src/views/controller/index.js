import React, { memo } from 'react'
import { useRef, useEffect } from 'react'
import * as echarts from 'echarts'
// import ReactEcharts from 'echarts-for-react'
import { CotrollerWrapper } from './style'
// import * as d3 from 'd3';
import { Input, Button, Select } from 'antd'
import { getClassBasicInfo } from '../../api/index'
const Cotroller = (props) => {
  const { handleClassNum } = props
  const distributionRef = useRef(null)
  const majorRef1 = useRef(null)
  const ageRef1 = useRef(null)
  const genderRef1 = useRef(null)
  function drawPicture(classBasicInfo) {
    // 检查是否已有图表实例存在，并销毁它
    const existingInstance = echarts.getInstanceByDom(majorRef1.current)
    if (existingInstance) {
      existingInstance.dispose()
    }
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
          center: ['50%', '70%'],
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
    const existingInstance1 = echarts.getInstanceByDom(ageRef1.current)
    if (existingInstance1) {
      existingInstance1.dispose()
    }
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
          center: ['50%', '70%'],
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
    const existingInstance2 = echarts.getInstanceByDom(genderRef1.current)
    if (existingInstance2) {
      existingInstance2.dispose()
    }
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
          center: ['50%', '70%'],
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

  useEffect(() => {
    var classBasicInfo = []
    getClassBasicInfo().then((res) => {
      classBasicInfo = res[0]
      drawPicture(classBasicInfo)
    })
  }, [])

  //数据集选择函数
  const handleChange = (value) => {
    handleClassNum(value)
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
                  value: '1'
                },
                {
                  label: <span>Class 2</span>,
                  value: '2'
                },
                {
                  label: <span>Class 3</span>,
                  value: '3'
                },
                {
                  label: <span>Class 4</span>,
                  value: '4'
                },
                {
                  label: <span>Class 5</span>,
                  value: '5'
                },
                {
                  label: <span>Class 6</span>,
                  value: '6'
                },
                {
                  label: <span>Class 7</span>,
                  value: '7'
                },
                {
                  label: <span>Class 8</span>,
                  value: '8'
                },
                {
                  label: <span>Class 9</span>,
                  value: '9'
                },
                {
                  label: <span>Class 10</span>,
                  value: '10'
                },
                {
                  label: <span>Class 11</span>,
                  value: '11'
                },
                {
                  label: <span>Class 12</span>,
                  value: '12'
                },
                {
                  label: <span>Class 13</span>,
                  value: '13'
                },

                {
                  label: <span>Class 14</span>,
                  value: '14'
                },
                {
                  label: <span>Class 15</span>,
                  value: '15'
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
