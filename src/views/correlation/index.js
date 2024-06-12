import React, { memo, useState, useEffect } from 'react'
import { Table, Tag, Button } from 'antd'
const { Column } = Table
import ReactEcharts from 'echarts-for-react'
import { CorrelationWrapper } from './style'
import { getCorrelationData } from '../../api'
import { createFromIconfontCN } from '@ant-design/icons'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4565164_juvpif6y83m.js'
})

const Correlation = (props) => {
  // 拿到父组件传递的模式状态
  const {
    amode,
    month,
    brushData,
    handleRowKeys,
    selectedRowKeys,
    // handleCalendarFlag,
    // calendarFlag,
    changeParallelList,
    isChangeWeight,
    transferLinksData,
    handleTranferParallelList
  } = props

  // 保存相关性矩阵数据
  const [correlationData, setCorrelationData] = useState([])
  // 相关性数据的下标
  const [correlationIndex, setCorrelationIndex] = useState(1)
  // 保存演化数据的数组
  const [linksData, setLinksData] = useState([])
  // 创建一个标签映射对象
  const labelMap = {
    针对型: '集中针对型',
    多样型: '广泛多样型',
    尝试型: '探索尝试型'
  }
  const correlationOption = {
    tooltip: {
      position: 'left'
    },
    grid: {
      top: '2%',
      bottom: '10%',
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
      data: ['集中针\n对型 ', '广泛多\n样型 ', '探索尝\n试型 '],
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
      itemHeight: 80,
      color: ['#679fc9', '#86c6f0', '#e0f5ff', '#DCDCDC']
      // color: ['#6abf57', '#8fcc7e', '#dce6d8', '#DCDCDC']
    },
    series: [
      {
        name: '特征相关性',
        type: 'heatmap',
        data: correlationData[correlationIndex],
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

  // 表格勾选了多少人
  const [tableNum, setTableNum] = useState(0)
  // 表格勾选函数
  const onSelectChange = (newSelectedKeys) => {
    // 更新勾选人数
    setTableNum(newSelectedKeys.length)
    // 更新勾选数组
    // setSelectedRowKeys(newSelectedRowKeys)
    handleRowKeys(newSelectedKeys)
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
  // 点击确认按钮
  // const changeFlag = () => {
  //   let paraList1 = [[], [], []]
  //   let paraList2 = [[], []] // 根据选中的表格id来匹配数据，并更新平行坐标系的展示数据
  //   selectedRowKeys.forEach((id) => {
  //     // 按模式来更新平行坐标系
  //     if (amode == 0) {
  //       brushData.forEach((item) => {
  //         if (item['key'] == id) {
  //           let tmp = []
  //           tmp.push(item['submit'])
  //           tmp.push(item['active'])
  //           tmp.push(item['question'])
  //           tmp.push(item['correct'])
  //           tmp.push(item['label'])
  //           if (item['label'] == '针对型') {
  //             paraList1[0].push(tmp)
  //           } else if (item['label'] == '多样型') {
  //             paraList1[1].push(tmp)
  //           } else {
  //             paraList1[2].push(tmp)
  //           }
  //         }
  //       }) // 父组件传来的props
  //       changeParallelList(paraList1)
  //     } else if (amode == 2) {
  //       transferLinksData[0].forEach((item) => {
  //         if (item['key'] == id) {
  //           let tmp = []
  //           tmp.push(item['submit'])
  //           tmp.push(item['active'])
  //           tmp.push(item['question'])
  //           tmp.push(item['correct'])
  //           tmp.push(item['label'])
  //           paraList2[0].push(tmp)
  //         }
  //       })
  //       transferLinksData[1].forEach((item) => {
  //         if (item['key'] == id) {
  //           let tmp = []
  //           tmp.push(item['submit'])
  //           tmp.push(item['active'])
  //           tmp.push(item['question'])
  //           tmp.push(item['correct'])
  //           tmp.push(item['label'])
  //           paraList2[1].push(tmp)
  //         }
  //       })
  //       handleTranferParallelList(paraList2)
  //     }
  //   })
  // }
  // 表格勾选人数的更新
  useEffect(() => {
    setTableNum(selectedRowKeys.length)
    let paraList1 = [[], [], []]
    let paraList2 = [[], []] // 根据选中的表格id来匹配数据，并更新平行坐标系的展示数据
    selectedRowKeys.forEach((id) => {
      // 按模式来更新平行坐标系
      if (amode == 0) {
        brushData.forEach((item) => {
          if (item['key'] == id) {
            let tmp = []
            tmp.push(item['submit'])
            tmp.push(item['active'])
            tmp.push(item['question'])
            tmp.push(item['correct'])
            tmp.push(item['label'])
            if (item['label'] == '针对型') {
              paraList1[0].push(tmp)
            } else if (item['label'] == '多样型') {
              paraList1[1].push(tmp)
            } else {
              paraList1[2].push(tmp)
            }
          }
        }) // 父组件传来的props
        changeParallelList(paraList1)
      } else if (amode == 2) {
        transferLinksData[0].forEach((item) => {
          if (item['key'] == id) {
            let tmp = []
            tmp.push(item['submit'])
            tmp.push(item['active'])
            tmp.push(item['question'])
            tmp.push(item['correct'])
            tmp.push(item['label'])
            paraList2[0].push(tmp)
          }
        })
        transferLinksData[1].forEach((item) => {
          if (item['key'] == id) {
            let tmp = []
            tmp.push(item['submit'])
            tmp.push(item['active'])
            tmp.push(item['question'])
            tmp.push(item['correct'])
            tmp.push(item['label'])
            paraList2[1].push(tmp)
          }
        })
        handleTranferParallelList(paraList2)
      }
    })
  }, [selectedRowKeys])
  // 数据清空
  useEffect(() => {
    // 清空勾选
    handleRowKeys([])
    // 清空演变数据
    setLinksData([])
  }, [amode])
  // 拿到相关性数据
  useEffect(() => {
    getCorrelationData().then((res) => {
      setCorrelationData(res)
    })
    // 初始化系统时更新数据
  }, [isChangeWeight])
  // 演变视图的表格数据
  useEffect(() => {
    if (transferLinksData[0].length != 0 && transferLinksData[1].length != 0) {
      let linksData1 = transferLinksData[0]
      let linksData2 = transferLinksData[1]
      // 按照字典的age属性进行排序
      linksData1.sort(function (a, b) {
        return a.key.localeCompare(b.key)
      })
      linksData2.sort(function (a, b) {
        return a.key.localeCompare(b.key)
      })
      linksData1.forEach((value, index) => {
        value.label1 = linksData2[index].label
      })
      setLinksData(linksData1)
      // console.log(linksData1)
    }
  }, [transferLinksData])
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
      <div className="title">
        <div className="title-icon">
          <IconFont type="icon-biaoge" />
        </div>
        详细列表与相关性矩阵热力图
      </div>
      <div className="content">
        <div className="table">
          <div className="rightbar">
            <div className="num">
              {amode == 0 && (
                <h3 className="info">已刷选：{brushData.length}人</h3>
              )}
              <h3 className="info">表格勾选：{tableNum}人</h3>
            </div>
            <div className="littlebtn">
              <Button size="small" onClick={handleCancel}>
                取消
              </Button>
              {/* <Button type="primary" size="small" onClick={changeFlag}>
                确认
              </Button> */}
            </div>
          </div>
          <div className="atable">
            <Table
              dataSource={amode == 0 ? brushData : linksData}
              pagination={false}
              size="small"
              rowSelection={rowSelection}
            >
              <Column
                title="学生ID"
                dataIndex="key"
                key="key"
                width={160}
                ellipsis={true}
              />
              {amode == 0 && (
                <Column
                  title="模式"
                  dataIndex="label"
                  key="label"
                  width={90}
                  render={(_, record) => (
                    <Tag
                      color={
                        record.label === '针对型'
                          ? '#86C6F0'
                          : record.label === '多样型'
                            ? '#EB8277'
                            : '#6ABF57'
                      }
                    >
                      {labelMap[record.label]}
                    </Tag>
                  )}
                />
              )}
              {amode == 0 && (
                <Column
                  title="月掌握度"
                  dataIndex="master"
                  key="master"
                  width={90}
                  ellipsis={true}
                  sorter={(a, b) => a.master - b.master}
                  defaultsortOrder={'descend'}
                  render={(text) => {
                    // 使用toFixed(4)方法将数字格式化为保留三位小数
                    return parseFloat(text).toFixed(4)
                  }}
                />
              )}
              {amode == 2 && (
                <Column
                  title="模式1"
                  dataIndex="label"
                  key="label"
                  width={90}
                  render={(_, record) => (
                    <Tag
                      color={
                        record.label === '针对型'
                          ? '#86C6F0'
                          : record.label === '多样型'
                            ? '#EB8277'
                            : '#6ABF57'
                      }
                    >
                      {labelMap[record.label]}
                    </Tag>
                  )}
                />
              )}
              {amode == 2 && (
                <Column
                  title="模式2"
                  dataIndex="label1"
                  key="label1"
                  width={90}
                  render={(_, record) => (
                    <Tag
                      color={
                        record.label1 === '针对型'
                          ? '#86C6F0'
                          : record.label1 === '多样型'
                            ? '#EB8277'
                            : '#6ABF57'
                      }
                    >
                      {labelMap[record.label1]}
                    </Tag>
                  )}
                />
              )}
              <Column
                title="排名等级"
                dataIndex="rank"
                key="rank"
                width={85}
                sorter={(a, b) => {
                  const priority = { top: 3, mid: 2, low: 1 }
                  return priority[a.rank] - priority[b.rank]
                }}
                render={(text) => {
                  const rankMap = { top: 'A级', mid: 'B级', low: 'C级' }
                  return rankMap[text]
                }}
              />
              <Column title="年龄" dataIndex="age" key="age" width={50} />
              <Column title="性别" dataIndex="sex" key="sex" width={60} />
              <Column title="专业" dataIndex="major" key="major" width={60} />
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
