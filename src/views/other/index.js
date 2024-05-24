import React, { memo, useState, useRef, useEffect } from 'react'
import * as d3 from 'd3'
import { Table, Tag, Button } from 'antd'
const { Column } = Table
import { MonthFeature1Wrapper } from './style'
const MonthFeature1 = () => {
  // 拿到svg的引用
  const svgRef = useRef(null)
  // 表格选择数据的数组
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  // 刷选了多少人
  const [brushNum, setBrushNum] = useState(0)
  // 表格勾选了多少人
  const [tableNum, setTableNum] = useState(0)
  const tableData = [
    {
      key: '1',
      id: 'vzdurh8f0rfus5h4bde2',
      age: 19,
      sex: '男',
      major: '软件工程',
      master: '挺好',
      tag: '稳定'
    },
    {
      key: '2',
      id: 'w0u7vzowm7eimiupvmm3',
      age: 22,
      sex: '男',
      major: '软件工程',
      master: '一般',
      tag: '普通'
    },
    {
      key: '3',
      id: '3',
      age: 20,
      sex: '男',
      major: '软件工程',
      master: '不行',
      tag: '笨蛋'
    },
    {
      key: '4',
      id: '4',
      age: 20,
      sex: '男',
      major: '软件工程',
      master: '不行',
      tag: '笨蛋'
    },
    {
      key: '5',
      id: '5',
      age: 20,
      sex: '男',
      major: '软件工程',
      master: '不行',
      tag: '笨蛋'
    },
    {
      key: '6',
      id: '6',
      age: 20,
      sex: '男',
      major: '软件工程',
      master: '不行',
      tag: '笨蛋'
    },
    {
      key: '7',
      id: '7',
      age: 20,
      sex: '男',
      major: '软件工程',
      master: '不行',
      tag: '笨蛋'
    },
    {
      key: '8',
      id: '8',
      age: 20,
      sex: '男',
      major: '软件工程',
      master: '不行',
      tag: '笨蛋'
    },
    {
      key: '9',
      id: '9',
      age: 20,
      sex: '男',
      major: '软件工程',
      master: '不行',
      tag: '笨蛋'
    },
    {
      key: '10',
      id: '10',
      age: 20,
      sex: '男',
      major: '软件工程',
      master: '不行',
      tag: '笨蛋'
    }
  ]
  const onSelectChange = (newSelectedRowKeys) => {
    setTableNum(newSelectedRowKeys.length)
    setBrushNum(0)
    setSelectedRowKeys(newSelectedRowKeys)
  }
  // 勾选功能以及触发事件函数
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  const virtualData = [
    [65, 23, 77, 34],
    [25, 44, 89, 56],
    [45, 23, 67, 30],
    [32, 30, 50, 64],
    [32, 30, 50, 64],
    [32, 30, 50, 64],
    [32, 30, 50, 64],
    [32, 30, 50, 64],
    [32, 30, 50, 64],
    [32, 30, 50, 64],
    [32, 30, 50, 64],
    [32, 30, 50, 64],
    [32, 30, 50, 64],
    [32, 30, 50, 64]
  ]
  useEffect(() => {
    const svg = d3.select(svgRef.current)

    // 清空之前的绘制
    svg.selectAll('*').remove()

    // 创建颜色比例尺
    const colorScale = d3
      .scaleSequential(d3.interpolateViridis)
      .domain([0, 100]) // 假设数据范围为0到100

    // 渲染矩形
    svg
      .selectAll('g')
      .data(virtualData)
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(5, ${i * 30})`) // 每个学生之间间隔30像素
      .selectAll('rect')
      .data((d) => d)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 100) // 每个矩形之间间隔100像素
      .attr('y', 0)
      .attr('width', 100) // 假设每个矩形的固定宽度为100像素
      .attr('height', 20) // 假设每个矩形的固定高度为20像素
      .attr('fill', (d) => colorScale(d)) // 使用颜色比例尺编码元素的大小
  }, [virtualData])
  return (
    <MonthFeature1Wrapper>
      <div className="title">表格</div>
      <div className="content">
        <div className="view">
          <div className="leftbar">
            {/* <h3 className="info">正确率</h3>
            <h3 className="info">提交次数</h3>
            <h3 className="info">活跃天数</h3>
            <h3 className="info">答题数</h3> */}
          </div>
          <div className="asvg">
            {/* <svg ref={svgRef} width="400" height={virtualData.length * 30} /> */}
          </div>
        </div>
        <div className="table">
          <div className="rightbar">
            <div className="num">
              <h3 className="info">已刷选：{brushNum}人</h3>
              <h3 className="info">表格勾选：{tableNum}人</h3>
            </div>
            <Button type="primary" size="small">
              确认
            </Button>
          </div>
          <div className="atable">
            <Table
              dataSource={tableData}
              pagination={false}
              size="small"
              rowSelection={rowSelection}
            >
              <Column
                title="学生ID"
                dataIndex="id"
                key="id"
                width={140}
                ellipsis={true}
                fixed
              />
              <Column title="年龄" dataIndex="age" key="age" width={40} />
              <Column title="性别" dataIndex="sex" key="sex" width={40} />
              <Column title="专业" dataIndex="major" key="major" width={70} />
              <Column
                title="掌握度"
                dataIndex="master"
                key="master"
                width={60}
              />
              <Column
                title="模式"
                dataIndex="tag"
                key="tag"
                width={50}
                style={{ height: 30 }}
                render={(_, record) => <Tag color="#37a354">{record.tag}</Tag>}
              />
            </Table>
          </div>
        </div>
      </div>
    </MonthFeature1Wrapper>
  )
}
export default memo(MonthFeature1)
