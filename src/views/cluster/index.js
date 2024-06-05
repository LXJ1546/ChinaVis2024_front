import React, { memo, useEffect, useState, useCallback, useRef } from 'react'
import ReactEcharts from 'echarts-for-react'
// import * as echarts from 'echarts'
import { ScatterWrapper } from './style'
import {
  getClusterData,
  getTransferData,
  getMonthStatisticInfo
} from '../../api'
import { Radio, Select, Switch, Slider } from 'antd'
import { createFromIconfontCN } from '@ant-design/icons'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4565164_juvpif6y83m.js'
})
import StatisticFeature from '../statistic/index'
import TimeStatisticFeature from '../timeStatistic/index'
import Radar from '../radar/index'
const Scatter = (props) => {
  // 父组件传递的设置模式函数
  const {
    changeMode,
    changeMonth,
    changeBrushSelectedData,
    brushData,
    amode,
    isChangeWeight,
    classNum,
    month,
    studentIDlist,
    handleStudentList1,
    studentSelectMastery,
    handleStudentSelectMastery1,
    handleTransferLinksData,
    handleTransferFirstMonth,
    handleTransferSecondMonth
  } = props
  const clusterRef = useRef(null)
  const [clusterData, setClusterData] = useState([])
  const colorAll = ['#86C6F0', '#EB8277', '#6ABF57']
  // 切换标签
  const [clusterName, setClusterName] = useState(['高峰型', '低峰型', '平均型'])
  // 当前使用的聚类数据
  const [nowClusterData, setNowClusterData] = useState([])
  // 设置坐标轴大小
  const [xmax, setXmax] = useState(-7)
  const [ymax, setYmax] = useState(-7)
  // const [xmin, setXmin] = useState(-10)
  // const [ymin, setYmin] = useState(-12)
  // 设置点的大小
  const [symbolSize, setSymbolSize] = useState(25)
  // 定义一个状态来控制组件的显示和隐藏
  const [visible, setVisible] = useState(false)
  // 转移状态的变换
  const [isTransfer, setIsTransfer] = useState(false)
  // 用来画状态转换的圆
  const [transferCircleData, setTransferCircleData] = useState([])
  // 用来画状态转换的连接
  const [transferLinksData, setTransferLinksData] = useState([])
  // 用来拿到状态转换的学生id
  const [transferStudentData, setTransferStudentData] = useState([])
  // 状态转移的第一月份
  const [firstMonth, setFirstMonth] = useState(9)
  // 状态转移的第二月份
  const [secondMonth, setSecondMonth] = useState(10)
  // 是否可以选择第二个月份
  const [canChoose, setCanChoose] = useState(false)
  // 是否展示统计特征箱线图
  const [showStats, setShowStats] = useState(false)
  // 开关是否不可操作
  const [disabledStats, setDisabledStats] = useState(true)
  // 特征统计值
  const [statsFeature, setStatsFeature] = useState([])
  // 时间特征统计值
  const [timeStatsFeature, setTimeStatsFeature] = useState([])
  // 切换到时间模式时就不需要刷选功能
  const [brushEnabled, setBrushEnabled] = useState(false)
  // 展示高中低不同的形状
  const [showShape, setShowShape] = useState(false)
  // 展示高亮数据
  const [showHighlight, setShowHighlight] = useState(false)
  // 开关是否不可操作
  const [disabledShape, setDisabledShape] = useState(false)
  // 节点开关大小滑动条是否可用
  const [sliderDisabled, setSliderDisabled] = useState(false)
  // 高亮数据开关是否可用
  const [disabledHighlight, setDisabledHighlight] = useState(false)
  // 高亮数据的信息
  const [highlightInfo, setHighlightInfo] = useState([])
  // 演变视图的雷达图数据
  const [transferRadarData, setTransferRadarData] = useState([])
  const monthsChoice = [
    { value: 9, label: '2023-09' },
    { value: 10, label: '2023-10' },
    { value: 11, label: '2023-11' },
    { value: 12, label: '2023-12' },
    { value: 1, label: '2024-01' }
  ]
  // 定义一个对象，存储每个值对应的月份
  const monthMap = {
    0: '9',
    1: '10',
    2: '11',
    3: '12',
    4: '1'
  }
  // 定义一个对象，存储每个值对应的月份
  const monthMap1 = {
    9: 0,
    10: 1,
    11: 2,
    12: 3,
    1: 4
  }
  // 生成散点图系列
  const series = Object.keys(nowClusterData).map((cluster) => ({
    name: clusterName[cluster],
    type: 'scatter',
    data: nowClusterData[cluster],
    color: colorAll[cluster],
    symbol: showShape
      ? function (value, params) {
          // 根据rank来选择不同形状来展示
          const rank = params.data.rank
          if (rank == 'top') {
            return 'diamond'
          } else if (rank == 'mid') {
            return 'circle'
          } else if (rank == 'low') {
            return 'triangle'
          } else {
            // 时间模式
            return 'circle'
          }
        }
      : null,
    symbolSize: symbolSize,
    itemStyle: {
      borderColor: '#555',
      opacity: 1
    },
    emphasis: {
      scale: 1.8,
      itemStyle: {
        borderWidth: 2,
        borderColor: '#FFA500',
        shadowColor: '#D3D3D3'
      }
    }
  }))
  const clusterOption = {
    tooltip: {
      formatter: function (params) {
        var data = params.data
        // 在这里自定义数据提示框的展示内容
        var tooltipContent = params.seriesName
        // 不同的模式对应不同的tooltip
        if (amode == 0) {
          tooltipContent += '<br>学生id：' + data.key
          if (data.rank == 'top') {
            tooltipContent += '<br>排名：前30%'
          } else if (data.rank == 'mid') {
            tooltipContent += '<br>排名：30%~70%'
          } else {
            tooltipContent += '<br>排名：后30%'
          }
        } else {
          // 时间模式下又有不同的tooltip展示
          tooltipContent += '<br>时间段：' + data.key
        }
        return tooltipContent
      }
    },
    brush: brushEnabled
      ? {
          toolbox: ['rect', 'polygon', 'clear'],
          brushType: 'polygon',
          xAxisIndex: 'all',
          yAxisIndex: 'all',
          brushMode: 'single',
          throttleType: 'debounce',
          throttleDelay: 1000
        }
      : null,
    grid: {
      left: '1%', // 设置左边距
      right: '2%', // 设置右边距
      bottom: '3%', // 设置底边距
      top: '4%',
      containLabel: true
    },
    legend: {
      itemWidth: 16,
      itemHeight: 16,
      left: '5%',
      top: '0.5%',
      textStyle: {
        fontSize: 14
      }
    },
    xAxis: {
      max: xmax
      // min: xmin
    },
    yAxis: {
      max: ymax
      // min: ymin
    },
    dataZoom: [
      {
        type: 'inside', // 使用鼠标滚轮的缩放
        xAxisIndex: 0
      },
      {
        type: 'inside', // 使用鼠标滚轮的缩放
        yAxisIndex: 0
      }
    ],
    series: series
  }
  let allColor = ['#86C6F0', '#EB8277', '#6ABF57', '#d3d3d3']
  let minValue = Number.MAX_VALUE
  let maxValue = Number.MIN_VALUE
  let mappedData = []
  let links = []

  // 找到数据中的最小值和最大值（除0外）
  for (let i = 0; i < transferLinksData.length; i++) {
    for (let j = 0; j < transferLinksData[i].length; j++) {
      if (transferLinksData[i][j] !== 0) {
        minValue = Math.min(minValue, transferLinksData[i][j])
        maxValue = Math.max(maxValue, transferLinksData[i][j])
      }
    }
  }
  // 将数据映射到 [4, 12] 范围内
  for (let i = 0; i < transferLinksData.length; i++) {
    let row = []
    for (let j = 0; j < transferLinksData[i].length; j++) {
      if (transferLinksData[i][j] === 0) {
        row.push(0)
      } else {
        let mappedValue =
          ((transferLinksData[i][j] - minValue) / (maxValue - minValue)) *
            (12 - 4) +
          4
        row.push(mappedValue)
      }
    }
    mappedData.push(row)
  }
  // 动态生成links
  for (let i = 0; i < mappedData.length; i++) {
    for (let j = 0; j < mappedData[i].length; j++) {
      if (mappedData[i][j] != 0) {
        let link = {
          source: i,
          target: j,
          value: transferLinksData[i][j],
          label: {
            show: true,
            formatter: '{c}'
          },
          lineStyle: {
            width: mappedData[i][j],
            color: allColor[i]
          }
        }
        links.push(link)
      }
    }
  }
  // 计算字体大小范围的映射函数
  const mapFontSize = (value) => {
    const minFontSize = 14
    const maxFontSize = 20
    // 将节点的值映射到[15, 20]范围内
    return (
      minFontSize +
      ((value - Math.min(...transferCircleData)) /
        (Math.max(...transferCircleData) - Math.min(...transferCircleData))) *
        (maxFontSize - minFontSize)
    )
  }
  const transferOption = {
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',

    visualMap: [
      {
        type: 'continuous',
        show: false,
        min: 0, // 数量的最小值
        max: 600, // 数量的最大值
        calculable: true,
        seriesIndex: 0,
        inRange: {
          symbolSize: [40, 100] // 圆的最小和最大大小
        }
      }
    ],
    series: [
      {
        type: 'graph',
        layout: 'none',
        symbolSize: 50,
        draggable: true,
        label: {
          show: true,
          formatter: '{b}'
        },
        tooltip: {
          valueFormatter: (value) => value + '人'
        },
        edgeLabel: {
          fontSize: 15
        },
        data: [
          {
            name: '针对型',
            x: 600,
            y: 290,
            value: transferCircleData[0],
            itemStyle: {
              color: allColor[0],
              borderColor: '#A9A9A9',
              borderWidth: 3
            },
            label: {
              fontSize: mapFontSize(transferCircleData[0]),
              color: 'white'
            }
          },
          {
            name: '多样型',
            x: 650,
            y: 200,
            value: transferCircleData[1],
            itemStyle: {
              color: allColor[1],
              borderColor: '#A9A9A9',
              borderWidth: 3
            },
            label: {
              fontSize: mapFontSize(transferCircleData[1]),
              color: 'white'
            }
          },
          {
            name: '尝试型',
            x: 680,
            y: 380,
            value: transferCircleData[2],
            itemStyle: {
              color: allColor[2],
              borderColor: '#A9A9A9',
              borderWidth: 3
            },
            label: {
              fontSize: mapFontSize(transferCircleData[2]),
              color: 'white'
            }
          },
          {
            name: '无提交',
            x: 500,
            y: 300,
            value: transferCircleData[3],
            itemStyle: {
              color: allColor[3],
              borderColor: '#A9A9A9',
              borderWidth: 3
            },
            label: {
              fontSize: mapFontSize(transferCircleData[3]),
              color: 'white'
            }
          }
        ],
        // links: [],
        links: links,
        lineStyle: {
          opacity: 0.9,
          curveness: 0.3
        }
      }
    ]
  }
  // 点击初始化系统时重新拿数据
  useEffect(() => {
    // 根据班级来那聚类数据
    getClusterData(classNum).then((res) => {
      setClusterData(res)
      // 模式为1时展示时间聚类
      if (amode == 1) {
        setNowClusterData(res[5])
      } else {
        // 重置答题模式节点大小
        if (classNum == 'all') {
          setSymbolSize(10)
        }
        // 按月也能分班级
        if (month == 9) {
          setNowClusterData(res[0])
        } else if (month == 10) {
          setNowClusterData(res[1])
        } else if (month == 11) {
          setNowClusterData(res[2])
        } else if (month == 12) {
          setNowClusterData(res[3])
        } else if (month == 1) {
          setNowClusterData(res[4])
        }
      }
    })
  }, [isChangeWeight, classNum])
  // 分布特征的高亮情况
  useEffect(() => {
    // 根据id列表高亮学生
    highlightPointById(studentIDlist)
  }, [studentIDlist, nowClusterData])
  // 组件初始化渲染的时候
  useEffect(() => {
    getTransferData().then((res) => {
      setTransferCircleData(res[0])
      setTransferLinksData(res[1])
      setTransferStudentData(res[2])
    })
    getMonthStatisticInfo(2).then((res) => {
      setTimeStatsFeature(res)
    })
  }, [])
  const handleChangeMode = (e) => {
    const value = e.target.value
    if (value == 1) {
      setNowClusterData(clusterData[5])
      setXmax(-7)
      setYmax(-7)
      // setXmin(-10)
      // setYmin(-12)
      setSymbolSize(25)
      setClusterName(['高峰型', '低峰型', '平均型'])
      // 月份是否可见
      setVisible(false)
      // 改变模式
      changeMode(1)
      // 是否显示演变视图
      setIsTransfer(false)
      // 设置为无法刷选
      setBrushEnabled(false)
      // 等级编码开关不可操作
      setDisabledShape(false)
      // 特征统计开关可以操作
      setDisabledStats(true)
      // 滑动条可用
      setSliderDisabled(false)
      // 高亮开关可用
      setDisabledHighlight(false)
    } else if (value == 0) {
      setNowClusterData(clusterData[1])
      setXmax(60)
      setYmax(40)
      // setXmin(-60)
      // setYmin(-40)
      setSymbolSize(10)
      setClusterName(['针对型', '多样型', '尝试型'])
      setVisible(true)
      changeMode(0)
      // 默认状态为10
      changeMonth(10)
      // 是否显示演变视图
      setIsTransfer(false)
      setDisabledStats(true)
      // 等级编码开关可操作
      setDisabledShape(true)
      // 设置为可刷选
      setBrushEnabled(true)
      // 获取时间特征统计值数据
      getMonthStatisticInfo(10).then((res) => {
        setStatsFeature(res)
      })
      // 滑动条可用
      setSliderDisabled(false)
      // 高亮开关可用
      setDisabledHighlight(true)
    } else if (value == 2) {
      // 改变成演变模式
      changeMode(2)
      // 是否显示演变视图
      setIsTransfer(true)
      // 统计值开关不可操作
      setDisabledStats(false)
      // 等级编码开关不可操作
      setDisabledShape(false)
      // 是否展示箱线图
      setShowStats(false)
      // 滑动条不可用
      setSliderDisabled(true)
      // 高亮开关可用
      setDisabledHighlight(false)
    }
  }
  const handleChangeMonth = (value) => {
    // 获取特征统计值数据
    getMonthStatisticInfo(value).then((res) => {
      setStatsFeature(res)
    })
    if (value == 9) {
      setNowClusterData(clusterData[0])
      setXmax(60)
      setYmax(40)
      // setXmax(-40)
      // setYmin(-60)
      // 更改父组件的月份状态
      changeMonth(9)
      // 更改相关性数据的索引
    } else if (value == 10) {
      setNowClusterData(clusterData[1])
      setXmax(60)
      setYmax(40)
      changeMonth(10)
    } else if (value == 11) {
      setNowClusterData(clusterData[2])
      setXmax(60)
      setYmax(40)
      // setXmax(-60)
      // setYmin(-40)
      changeMonth(11)
    } else if (value == 12) {
      setNowClusterData(clusterData[3])
      setXmax(40)
      setYmax(60)
      // setXmax(-60)
      // setYmin(-60)
      changeMonth(12)
    } else if (value == 1) {
      setNowClusterData(clusterData[4])
      setXmax(20)
      setYmax(25)
      // setXmax(-40)
      // setYmin(-30)
      changeMonth(1)
    }
  }
  // 处理第一个演变视图中选择器的变化
  const handleFirstMonthChange = (value) => {
    setFirstMonth(value)
    setSecondMonth(null) // 重置第二个选择器
    setCanChoose(true)
  }
  // 处理第一个演变视图中选择器的变化
  const handleSecondMonthChange = (value) => {
    setSecondMonth(value)
    setCanChoose(false)
    getTransferData(firstMonth, value).then((res) => {
      setTransferCircleData(res[0])
      setTransferLinksData(res[1])
    })
  }
  // 获取第二个选择器的可选项
  const getSecondMonthOptions = () => {
    if (!firstMonth) {
      return monthsChoice
    }
    const firstMonthIndex = monthsChoice.findIndex(
      (monthsChoice) => monthsChoice.value === firstMonth
    )
    return monthsChoice.slice(firstMonthIndex + 1)
  }
  // 演变视图的连接线的点击事件
  const handleTranferLinks = (params) => {
    if (params.dataType === 'edge') {
      // 拿到起始点和去向
      const asource = params.data.source
      const atarget = params.data.target
      // 拿到演变的月份
      let month1 = monthMap1[firstMonth]
      let month2 = monthMap1[secondMonth]
      // 拿到该links的学生id数据
      const student_ids = transferStudentData[asource][atarget]
      // 假设 clusterData 是一个包含三个子列表的大列表，student_ids 是要匹配的学生id数组
      let matched_dicts1 = []
      let matched_dicts2 = []
      for (let i = 0; i < clusterData[month1].length; i++) {
        // 遍历大列表中的每个子列表
        let matched_dicts_in_sublist = clusterData[month1][i].filter(
          (student_dict) => student_ids.includes(student_dict.key)
        )
        matched_dicts1 = matched_dicts1.concat(matched_dicts_in_sublist)
      }
      for (let i = 0; i < clusterData[month2].length; i++) {
        // 遍历大列表中的每个子列表
        let matched_dicts_in_sublist = clusterData[month2][i].filter(
          (student_dict) => student_ids.includes(student_dict.key)
        )
        matched_dicts2 = matched_dicts2.concat(matched_dicts_in_sublist)
      }
      // console.log(clusterData[month1])
      // 更新状态
      handleTransferLinksData([matched_dicts1, matched_dicts2])
      // 更新雷达图数据
      setTransferRadarData([matched_dicts1, matched_dicts2])
      // console.log('转移数据', [matched_dicts1, matched_dicts2])
      handleTransferFirstMonth(firstMonth)
      handleTransferSecondMonth(secondMonth)
    }
  }
  // 切换开关事件
  const onSwitchChange1 = (checked) => {
    setShowShape(checked)
  }
  // 切换开关事件
  const onSwitchChange2 = (checked) => {
    setShowStats(checked)
  }
  // 高亮数据的切换开关事件
  const onSwitchChange3 = (checked) => {
    setShowHighlight(checked)
    if (checked) {
      let nothinglist = []
      // 遍历大列表
      studentIDlist.forEach((id) => {
        let nothingDict = {}
        let nothingmonth = []
        clusterData.forEach((subList, i) => {
          subList.forEach((sub) => {
            // 在每个小列表中查找指定的 key 是否存在，并且对应的值等于目标值
            const foundIndex = sub.findIndex((item) => item['key'] === id)
            if (foundIndex !== -1) {
              nothingmonth.push(i)
            }
          })
        })
        nothingDict[id] = nothingmonth
        nothinglist.push(nothingDict)
      })
      // 更新高亮数据
      setHighlightInfo(nothinglist)
    } else {
      // 清除高亮
      downplayPointById(studentIDlist)
      // 清除数据
      handleStudentList1([])
      handleStudentSelectMastery1([])
      setHighlightInfo([])
    }
  }
  // 刷选选择事件处理逻辑
  const onBrushSelected = useCallback(
    (params) => {
      // console.log(params.batch[0].selected)
      const selectedItems = params.batch[0].selected // 获取选中的数据
      const selectedData = []
      // 遍历每个选中的项
      selectedItems.forEach((item, itemIndex) => {
        const selectedIndices = item.dataIndex
        // 获取选中的数据点的具体数据
        if (selectedIndices.length != 0) {
          selectedIndices.forEach((index) => {
            selectedData.push(nowClusterData[itemIndex][index])
          })
        }
      })
      if (selectedData.length != 0) {
        // 比较新数据和旧数据，只有当数据真正变化时才更新状态
        if (JSON.stringify(selectedData) !== JSON.stringify(brushData)) {
          changeBrushSelectedData(selectedData)
        }
      }
    },
    [nowClusterData]
  )
  // 滑动条的事件
  const handleSlider = (value) => {
    setSymbolSize(value)
  }
  // 找到某个学生id对应的模式，那边分布特征要用到
  const findModeIndex = (ids) => {
    let newList = [[], [], []]
    // 遍历大列表
    ids.forEach((id) => {
      // 找到每个id对应的series索引
      nowClusterData.forEach((subList, i) => {
        // 在每个小列表中查找指定的 key 是否存在，并且对应的值等于目标值
        const foundIndex = subList.findIndex((item) => item['key'] === id)
        if (foundIndex !== -1) {
          newList[i].push(id)
        }
      })
    })
    return newList
  }
  // 根据id找到对应点并高亮
  const highlightPointById = (ids) => {
    const idList = findModeIndex(ids)
    // 使用条件语句检查 clusterRef 是否存在
    if (clusterRef && clusterRef.current) {
      const echartsInstance = clusterRef.current.getEchartsInstance()
      // 针对每个series高亮点
      idList.forEach((sublist, index) => {
        // 找到高亮点的索引
        const dataIndexArray = sublist
          .map((id) => {
            const dataIndex = nowClusterData[index].findIndex(
              (item) => item.key === id
            )
            return dataIndex !== -1 ? dataIndex : null
          })
          .filter((index) => index !== null)
        if (dataIndexArray.length > 0) {
          echartsInstance.dispatchAction({
            type: 'highlight',
            seriesIndex: index,
            dataIndex: dataIndexArray
          })
        }
      })
    }
  }
  // 根据id找到对应点并高亮
  const downplayPointById = (ids) => {
    const idList = findModeIndex(ids)
    // 使用条件语句检查 clusterRef 是否存在
    if (clusterRef && clusterRef.current) {
      const echartsInstance = clusterRef.current.getEchartsInstance()
      // 针对每个series高亮点
      idList.forEach((sublist, index) => {
        // 找到高亮点的索引
        const dataIndexArray = sublist
          .map((id) => {
            const dataIndex = nowClusterData[index].findIndex(
              (item) => item.key === id
            )
            return dataIndex !== -1 ? dataIndex : null
          })
          .filter((index) => index !== null)
        if (dataIndexArray.length > 0) {
          echartsInstance.dispatchAction({
            type: 'downplay',
            seriesIndex: index,
            dataIndex: dataIndexArray
          })
        }
      })
    }
  }
  return (
    <ScatterWrapper>
      <div className="title">
        <div className="title-icon">
          <IconFont type="icon-scatter" />
        </div>
        学习模式聚类视图
      </div>
      <div className="content">
        <div className="left">
          {amode == 0 && !isTransfer && showShape && (
            <div className="shapelegend">
              <div className="legend-item">
                <div className="diamond"></div>
                Top
              </div>
              <div className="legend-item">
                <div className="circle"></div>
                Middle
              </div>
              <div className="legend-item">
                <div className="triangle"></div>
                Low
              </div>
            </div>
          )}
          {showStats && amode == 0 && (
            <StatisticFeature statsFeature={statsFeature} />
          )}
          {showStats && amode == 1 && (
            <TimeStatisticFeature statsFeature={timeStatsFeature} />
          )}
          {amode == 2 && <Radar transferRadarData={transferRadarData} />}
          {/* 高亮数据展示 */}
          {showHighlight && amode == 0 && (
            <div className="highlight">
              <div className="highlightContainer">
                <div className="ahead">
                  <div style={{ width: '45%', textAlign: 'center' }}>
                    学生ID
                  </div>
                  <div style={{ width: '30%', textAlign: 'center' }}>
                    答题月份
                  </div>
                  <div style={{ width: '20%', textAlign: 'center' }}>
                    掌握程度
                  </div>
                </div>
                {highlightInfo.map((subList, index) => (
                  <div key={index} className="highlightItem">
                    {/* 直接使用 subList 的唯一键作为月份显示 */}
                    <div className="aid">{Object.keys(subList)[0]}</div>
                    {/* 渲染对应月份的值数组 */}
                    <div className="amonth">
                      {subList[Object.keys(subList)[0]].map(
                        (value, subIndex) => {
                          const month = monthMap[value]
                          return (
                            <span key={`month-${subIndex}`}>{month}&nbsp;</span>
                          )
                        }
                      )}
                    </div>
                    <div className="amaster">
                      {studentSelectMastery[index].toFixed(4)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="btn">
            <div className="leftbtn">
              <h3 className="label">视图类别</h3>
              <Radio.Group
                onChange={handleChangeMode}
                defaultValue="1"
                style={{ marginLeft: '10px' }}
              >
                <Radio.Button value="1">时间模式</Radio.Button>
                <Radio.Button value="0">答题模式</Radio.Button>
                <Radio.Button value="2">演变视图</Radio.Button>
              </Radio.Group>

              {visible && !isTransfer && (
                <div className="answerbtn">
                  <h3 className="label">月份</h3>
                  <Select
                    defaultValue="2023-10"
                    style={{ width: 100, marginLeft: '10px' }}
                    onChange={handleChangeMonth}
                    options={monthsChoice}
                  />
                </div>
              )}
              {isTransfer && (
                <div className="monthbtn">
                  <h3 className="label">月份</h3>
                  <Select
                    defaultValue="2023-09"
                    style={{ width: 100, marginLeft: '10px' }}
                    options={monthsChoice}
                    onChange={handleFirstMonthChange}
                    value={firstMonth}
                  />
                  <div className="to">to</div>
                  <Select
                    defaultValue="2023-10"
                    style={{ width: 100, marginLeft: '5px' }}
                    options={getSecondMonthOptions()}
                    onChange={handleSecondMonthChange}
                    value={secondMonth}
                    disabled={!canChoose}
                  />
                </div>
              )}
            </div>
            <div className="rightbtn">
              <div className="two-switch">
                <div className="btn-item">
                  <h3 className="label">节点大小</h3>
                  <div className="aslider">
                    <Slider
                      defaultValue={25}
                      min={5}
                      max={30}
                      style={{ marginLeft: '10px' }}
                      value={symbolSize}
                      onChange={handleSlider}
                      disabled={sliderDisabled}
                    />
                  </div>
                </div>
                <div className="btn-item">
                  <h3 className="label">高亮数据</h3>
                  <Switch
                    onChange={onSwitchChange3}
                    value={showHighlight}
                    size={'small'}
                    style={{ marginLeft: '10px' }}
                    disabled={!disabledHighlight}
                  />
                </div>
              </div>
              <div className="two-switch">
                <div className="btn-item">
                  <h3 className="label">等级编码</h3>
                  <Switch
                    onChange={onSwitchChange1}
                    value={showShape}
                    size={'small'}
                    style={{ marginLeft: '10px' }}
                    disabled={!disabledShape}
                  />
                </div>
                <div className="btn-item">
                  <h3 className="label">特征统计</h3>
                  <Switch
                    onChange={onSwitchChange2}
                    value={showStats}
                    size={'small'}
                    style={{ marginLeft: '10px' }}
                    disabled={!disabledStats}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="clusterView">
            {!isTransfer && (
              <ReactEcharts
                ref={clusterRef}
                option={clusterOption}
                style={{ width: '100%', height: '100%' }}
                onEvents={
                  amode == 0 && !isTransfer
                    ? {
                        brushSelected: onBrushSelected
                      }
                    : null
                }
              />
            )}
            {isTransfer && (
              <ReactEcharts
                option={transferOption}
                style={{ width: '100%', height: '100%' }}
                onEvents={{
                  click: handleTranferLinks
                }}
              />
            )}
          </div>
        </div>
      </div>
    </ScatterWrapper>
  )
}
export default memo(Scatter)
