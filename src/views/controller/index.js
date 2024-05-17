import React, { memo } from 'react'
// import * as echarts from 'echarts'
// import ReactEcharts from 'echarts-for-react'
import { CotrollerWrapper } from './style'
// import * as d3 from 'd3';
import { useEffect } from 'react'
import { Input, Button } from 'antd'
const Cotroller = () => {
  useEffect(() => {}, [])

  return (
    <CotrollerWrapper>
      <div className="title">控制面板</div>
      <div className="Controllerview">
        {/* 初始化内存的各自占比 */}
        <Input
          placeholder="权重"
          className="weightInput"
          addonBefore="得分率"
          style={{ left: '0.5%' }}
        />
        <Input
          placeholder="权重"
          className="weightInput"
          addonBefore="正确比"
          style={{ left: '1.5%' }}
        />
        <Input
          placeholder="权重"
          className="weightInput"
          addonBefore="用时"
          style={{ left: '2.5%' }}
        />
        <Input
          placeholder="权重"
          className="weightInput"
          addonBefore="内存"
          style={{ left: '3.5%' }}
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
