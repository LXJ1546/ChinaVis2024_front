import React, { memo } from 'react'
// import * as echarts from 'echarts'
// import ReactEcharts from 'echarts-for-react'
import { CotrollerWrapper } from './style'
// import * as d3 from 'd3';
import { Input, Button, Select } from 'antd'
const Cotroller = (props) => {
  const { handleClassNum } = props
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
          defaultValue="所有学生"
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
      </div>
    </CotrollerWrapper>
  )
}
export default memo(Cotroller)
