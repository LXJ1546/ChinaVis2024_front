import React, { memo, useState, useEffect } from 'react'
import { Table, Tag, Button } from 'antd'
const { Column } = Table
import ReactEcharts from 'echarts-for-react'
import { CorrelationWrapper } from './style'
import { getCorrelationData } from '../../api'
const Correlation = (props) => {
  // 拿到父组件传递的模式状态
  const { amode, month } = props
  // 保存相关性矩阵数据
  const [correlationData, setCorrelationData] = useState([])
  // 相关性数据的下标
  const [correlationIndex, setCorrelationIndex] = useState(1)
  const correlationOption = {
    tooltip: {
      position: 'top'
    },
    grid: {
      top: '2%',
      bottom: '12%',
      right: '3%',
      left: '13%'
    },
    xAxis: {
      type: 'category',
      data: ['提交次数', '活跃天数', '答题数', '正确占比'],
      splitArea: {
        show: true
      },
      axisLabel: {
        fontSize: 11
      }
    },
    yAxis: {
      type: 'category',
      data: ['针对型', '多样型', '尝试型'],
      splitArea: {
        show: true
      },
      axisLabel: {
        fontSize: 11,
        margin: 2
        // rotate: -45
      }
    },
    visualMap: {
      show: false,
      min: -1,
      max: 1,
      calculable: true,
      orient: 'vertical',
      right: '1%',
      bottom: '10%',
      itemWidth: 10,
      itemHeight: 80
    },
    series: [
      {
        name: '特征相关性',
        type: 'heatmap',
        data: correlationData[correlationIndex],
        label: {
          show: true
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
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
  useEffect(() => {
    getCorrelationData().then((res) => {
      setCorrelationData(res)
    })
  }, [])
  useEffect(() => {
    if (amode == 0) {
      if (month == 9) {
        setCorrelationIndex(0)
      } else if (month == 10) {
        setCorrelationIndex(1)
      } else if (month == 11) {
        setCorrelationIndex(2)
      } else if (month == 12) {
        setCorrelationIndex(3)
      } else if (month == 1) {
        setCorrelationIndex(4)
      }
    }
  }, [amode, month])
  return (
    <CorrelationWrapper>
      <div className="title">表格与相关性矩阵视图</div>
      <div className="content">
        <div className="table">
          <div className="rightbar">
            <div className="num">
              <h3 className="info">已刷选：{brushNum}人</h3>
              <h3 className="info">表格勾选：{tableNum}人</h3>
            </div>
            <div className="littlebtn">
              <Button size="small" style={{ marginRight: 8 }}>
                取消
              </Button>
              <Button type="primary" size="small">
                确认
              </Button>
            </div>
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
              <Column title="年龄" dataIndex="age" key="age" width={40} />
              <Column title="性别" dataIndex="sex" key="sex" width={40} />
              <Column title="专业" dataIndex="major" key="major" width={70} />
            </Table>
          </div>
        </div>
        <div className="correlation">
          <ReactEcharts
            option={correlationOption}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </CorrelationWrapper>
  )
}
export default memo(Correlation)
