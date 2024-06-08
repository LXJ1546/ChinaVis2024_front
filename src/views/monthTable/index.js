import React, { memo, useState, useEffect } from 'react'
import { Table, Tag } from 'antd'
const { Column } = Table
import ReactEcharts from 'echarts-for-react'
import { MonthTableWrapper } from './style'
import { getCorrelationData, getClusterData } from '../../api'
import { createFromIconfontCN } from '@ant-design/icons'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4565164_juvpif6y83m.js'
})

const MonthTable = () => {
  // 保存相关性矩阵数据
  const [correlationData, setCorrelationData] = useState([])
  // 保存时间特征表格的数据
  const [timeTable, setTimeTable] = useState([])
  const correlationOption = {
    tooltip: {
      position: 'left'
    },
    grid: {
      top: '3%',
      bottom: '9%',
      right: '3%',
      left: '11%'
    },
    xAxis: {
      type: 'category',
      data: ['提交次数', '活跃天数', '答题数'],
      splitArea: {
        show: true
      },
      axisLabel: {
        fontSize: 11
      }
    },
    yAxis: {
      type: 'category',
      data: ['凌晨', '上午', '下午', '晚上'],
      splitArea: {
        show: true
      },
      axisLabel: {
        fontSize: 11,
        margin: 4
      }
    },
    visualMap: {
      show: false,
      min: -1,
      max: 0,
      calculable: true,
      orient: 'vertical',
      right: '1%',
      bottom: '10%',
      itemWidth: 10,
      itemHeight: 80,
      color: ['#DCDCDC', '#8DD2E1', '#71B0D1']
    },
    series: [
      {
        name: '特征相关性',
        type: 'heatmap',
        data: correlationData[5],
        label: {
          show: true,
          textBorderColor: '#fff',
          textBorderWidth: 0.5
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
      <div className="title">
        <div className="title-icon">
          <IconFont type="icon-biaoge" />
        </div>
        表格与相关性矩阵
      </div>
      <div className="content">
        <div className="table">
          <div className="atable">
            <Table
              dataSource={timeTable}
              pagination={false}
              size="small"
              // sticky
            >
              <Column
                title="时间段"
                dataIndex="key"
                key="key"
                width={120}
                ellipsis={true}
              />
              <Column
                title="模式"
                dataIndex="label"
                key="label"
                width={70}
                style={{ height: 30 }}
                render={(_, record) => (
                  <Tag
                    color={
                      record.label === '高峰型'
                        ? '#86C6F0'
                        : record.label === '低峰型'
                          ? '#EB8277'
                          : '#6ABF57'
                    }
                  >
                    {record.label}
                  </Tag>
                )}
              />
              <Column
                title="提交率"
                dataIndex="submit"
                key="submit"
                width={75}
                sorter={(a, b) => a.submit - b.submit}
                defaultsortOrder={'descend'}
                render={(text) => {
                  // 使用toFixed(3)方法将数字格式化为保留三位小数
                  return parseFloat(text).toFixed(3)
                }}
              />
              <Column
                title="活跃度"
                dataIndex="active"
                key="active"
                width={75}
                sorter={(a, b) => a.active - b.active}
                defaultsortOrder={'descend'}
                render={(text) => {
                  // 使用toFixed(3)方法将数字格式化为保留三位小数
                  return parseFloat(text).toFixed(3)
                }}
              />
              <Column
                title="答题多样性"
                dataIndex="title"
                key="title"
                width={100}
                sorter={(a, b) => a.title - b.title}
                defaultsortOrder={'descend'}
                render={(text) => {
                  // 使用toFixed(3)方法将数字格式化为保留三位小数
                  return parseFloat(text).toFixed(3)
                }}
              />
              <Column
                title="正确率"
                dataIndex="correct"
                key="correct"
                width={75}
                sorter={(a, b) => a.correct - b.correct}
                defaultsortOrder={'descend'}
                render={(text) => {
                  // 使用toFixed(3)方法将数字格式化为保留三位小数
                  return parseFloat(text).toFixed(3)
                }}
              />
              <Column
                title="人数"
                width={65}
                sorter={(a, b) => a.students_num - b.students_num}
                defaultsortOrder={'descend'}
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
