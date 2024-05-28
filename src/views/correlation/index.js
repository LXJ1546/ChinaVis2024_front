import React, { memo, useState, useEffect } from 'react'
import { Table, Tag, Button } from 'antd'
const { Column } = Table
import ReactEcharts from 'echarts-for-react'
import { CorrelationWrapper } from './style'
import { getCorrelationData } from '../../api'
const Correlation = (props) => {
  // 拿到父组件传递的模式状态
  const {
    amode,
    month,
    brushData,
    handleRowKeys,
    selectedRowKeys,
    handleCalendarFlag,
    calendarFlag,
    changeParallelList
  } = props
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

  // 表格勾选了多少人
  const [tableNum, setTableNum] = useState(0)
  // 表格勾选函数
  const onSelectChange = (newSelectedRowKeys) => {
    // 更新勾选人数
    setTableNum(newSelectedRowKeys.length)
    // 更新勾选数组
    // setSelectedRowKeys(newSelectedRowKeys)
    handleRowKeys(newSelectedRowKeys)
  }
  // 表格取消按钮
  const handleCancel = () => {
    // 更新勾选人数
    setTableNum(0)
    // 更新勾选数组
    // setSelectedRowKeys([])
    handleRowKeys([])
  }
  // 勾选功能以及触发事件函数
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  // 点击确认按钮
  const changeFlag = () => {
    handleCalendarFlag(!calendarFlag)
    // console.log(selectedRowKeys)
    // 根据选中的表格id来匹配数据，并更新平行坐标系的展示数据
    let paraList = [[], [], []]
    selectedRowKeys.forEach((id) => {
      brushData.forEach((item) => {
        if (item['key'] == id) {
          let tmp = []
          tmp.push(item['submit'])
          tmp.push(item['active'])
          tmp.push(item['question'])
          tmp.push(item['correct'])
          tmp.push(item['label'])
          if (item['label'] == '针对型') {
            paraList[0].push(tmp)
          } else if (item['label'] == '多样型') {
            paraList[1].push(tmp)
          } else {
            paraList[2].push(tmp)
          }
        }
      })
    })
    // 父组件传来的props
    changeParallelList(paraList)
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
              <h3 className="info">已刷选：{brushData.length}人</h3>
              <h3 className="info">表格勾选：{tableNum}人</h3>
            </div>
            <div className="littlebtn">
              <Button
                size="small"
                style={{ marginRight: 8 }}
                onClick={handleCancel}
              >
                取消
              </Button>
              <Button type="primary" size="small" onClick={changeFlag}>
                确认
              </Button>
            </div>
          </div>
          <div className="atable">
            <Table
              dataSource={brushData}
              pagination={false}
              size="small"
              rowSelection={rowSelection}
            >
              <Column
                title="学生ID"
                dataIndex="key"
                key="key"
                width={130}
                ellipsis={true}
                fixed
              />
              <Column
                title="掌握度"
                dataIndex="master"
                key="master"
                width={70}
                ellipsis={true}
                sorter={(a, b) => a.master - b.master}
                defaultsortOrder={'descend'}
              />
              <Column
                title="模式"
                dataIndex="label"
                key="label"
                width={60}
                style={{ height: 30 }}
                render={(_, record) => (
                  <Tag color="#37a354">{record.label}</Tag>
                )}
              />
              <Column title="年龄" dataIndex="age" key="age" width={40} />
              <Column title="性别" dataIndex="sex" key="sex" width={50} />
              <Column title="专业" dataIndex="major" key="major" width={50} />
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
