import React, { memo, useState, useEffect } from 'react'
import { Table, Tag } from 'antd'
const { Column } = Table
import ReactEcharts from 'echarts-for-react'
import { MonthTableWrapper } from './style'
import { getCorrelationData, getClusterData } from '../../api'
const MonthTable = () => {
  // 保存相关性矩阵数据
  const [correlationData, setCorrelationData] = useState([])
  // 保存时间特征表格的数据
  const [timeTable, setTimeTable] = useState([])
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
        data: correlationData[0],
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
  useEffect(() => {
    getCorrelationData().then((res) => {
      setCorrelationData(res)
    })
    // 拿到时间模式的数据
    getClusterData().then((res) => {
      setTimeTable(res[5].flat())
    })
  }, [])
  return (
    <MonthTableWrapper>
      <div className="title">表格与相关性矩阵</div>
      <div className="content">
        <div className="table">
          <div className="atable">
            <Table dataSource={timeTable} pagination={false} size="small">
              <Column
                title="时间段"
                dataIndex="key"
                key="key"
                width={120}
                ellipsis={true}
                fixed
              />
              <Column
                title="模式"
                dataIndex="label"
                key="label"
                width={70}
                style={{ height: 30 }}
                render={(_, record) => (
                  <Tag color="#37a354">{record.label}</Tag>
                )}
              />
              <Column
                title="提交率"
                dataIndex="submit"
                key="submit"
                width={60}
                render={(text) => {
                  // 使用toFixed(3)方法将数字格式化为保留三位小数
                  return parseFloat(text).toFixed(3)
                }}
              />
              <Column
                title="活跃度"
                dataIndex="active"
                key="active"
                width={60}
                render={(text) => {
                  // 使用toFixed(3)方法将数字格式化为保留三位小数
                  return parseFloat(text).toFixed(3)
                }}
              />
              <Column
                title="答题多样性"
                dataIndex="title"
                key="title"
                width={85}
                render={(text) => {
                  // 使用toFixed(3)方法将数字格式化为保留三位小数
                  return parseFloat(text).toFixed(3)
                }}
              />
              <Column
                title="正确率"
                dataIndex="correct"
                key="correct"
                width={60}
                render={(text) => {
                  // 使用toFixed(3)方法将数字格式化为保留三位小数
                  return parseFloat(text).toFixed(3)
                }}
              />
              <Column
                title="人数"
                dataIndex="students_num"
                key="students_num"
              />
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
    </MonthTableWrapper>
  )
}
export default memo(MonthTable)
