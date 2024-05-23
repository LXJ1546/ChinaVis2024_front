import React, { memo } from 'react'
import { Table } from 'antd'
import { MonthFeatureWrapper } from './style'
const MonthFeature = () => {
  // 列表字段
  const columns = [
    {
      title: '学生ID',
      dataIndex: 'id'
    },
    {
      title: '年龄',
      dataIndex: 'age'
    },
    {
      title: '性别',
      dataIndex: 'sex'
    },
    {
      title: '专业',
      dataIndex: 'major'
    },
    {
      title: '掌握程度',
      dataIndex: 'master'
    }
  ]
  const tableData = [
    {
      id: '1',
      age: 18,
      sex: '男',
      major: '软件工程'
    },
    {
      id: '2',
      age: 18,
      sex: '男',
      major: '软件工程'
    },
    {
      id: '3',
      age: 18,
      sex: '男',
      major: '软件工程'
    }
  ]
  return (
    <MonthFeatureWrapper>
      <div className="title">学生月答题数据视图</div>
      <div className="content">
        <div className="view"></div>
        <div className="table">
          <Table columns={columns} dataSource={tableData} size="small" />
        </div>
      </div>
    </MonthFeatureWrapper>
  )
}
export default memo(MonthFeature)
