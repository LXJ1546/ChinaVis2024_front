import React, {
  memo,
  useEffect,
  useRef,
  useLayoutEffect,
  useState
} from 'react'
import * as d3 from 'd3'
import {
  getClassKnowledgeInfo,
  getPersonalKnowledgeInfo
} from '../../api/index'
// import { createFromIconfontCN } from '@ant-design/icons'
import './knowledgeStyle.css'
import Image0 from '../../pic/0.svg' // 导入SVG图片
import Know from '../../assets/images/know.svg'

// const IconFont = createFromIconfontCN({
//   scriptUrl: '//at.alicdn.com/t/c/font_4565164_ivno85eyhk.js'
// })

const title_knowledge = {
  // Question_6RQj2gF3OeK5AmDvThUV: ['m3D1v', 'b3C9s'],
  Question_q7OpB2zCMmW9wS8uNt3H: ['r8S3g'],
  Question_QRm48lXxzdP7Tn1WgNOf: ['y9W5d', 'm3D1v'],
  Question_pVKXjZn0BkSwYcsa7C31: ['y9W5d', 'm3D1v'],
  Question_lU2wvHSZq7m43xiVroBc: ['y9W5d', 'k4W1c'],
  Question_x2Fy7rZ3SwYl9jMQkpOD: ['y9W5d', 's8Y2f'],
  Question_oCjnFLbIs4Uxwek9rBpu: ['g7R2j', 'm3D1v']
}

const KnowledgeTree = (props) => {
  const {
    classNum,
    isChangeWeight,
    highlightedXAxisName,
    handleHighLightedXaix,
    handleClickTitleFlag,
    studentIDlist,
    handleIsKnowClick
  } = props
  const ref = useRef() //用于获取d3绘图使用div的宽高
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [allData, setAllDataState] = useState(undefined)
  const [knowledgeState, setknowledgeState] = useState([]) //只展示当前知识点
  const [viewState, setViewState] = useState(true) //true表示全局视图，false表示只展示当前知识点
  const [questionIconState, setquestionIconState] = useState(10) //只展示当前知识点
  const [questionState, setQuestionState] = useState(false) //true表示点击了某个知识点
  const [averageData, setAverageDataState] = useState(undefined) //保存全年级平均水平，用于比较高于或低于平均

  //根据学生id获取数据
  useEffect(() => {
    if (studentIDlist && studentIDlist.length > 0) {
      // console.log('获取xtug数据', studentIDlist.slice(-1)[0])
      getPersonalKnowledgeInfo(studentIDlist.slice(-1)[0], 'score').then(
        (res) => {
          // console.log('从后端获取xtug数据', res)
          setAllDataState(res.info)
          // setValueInfo(res.valueInfo)
        }
      )
    }
  }, [studentIDlist])

  //获取班级或全年级数据
  useEffect(() => {
    getClassKnowledgeInfo(classNum, 'score').then((res) => {
      setAllDataState(res.info)
      if (classNum == 'all') {
        setAverageDataState(getAverageData(res.info))
        // console.log('从后端获取数据', getAverageData(res.info))
      }
    })
  }, [classNum, isChangeWeight])

  //接受题目掌握程度里传入的题目
  useEffect(() => {
    d3.selectAll('g.questionRect text')
      .style('fill', 'black')
      .style('font-weight', 'normal')
    // console.log('选择题', highlightedXAxisName)
    // 假设您希望选择 text 值为 "特定字符串" 的元素
    d3.selectAll('g.questionRect text') // 替换 'your-selector' 为您的选择器
      .filter(function () {
        if (d3.select(this).text() === highlightedXAxisName) {
          d3.select(this).style('fill', 'red').style('font-weight', 'bold')
        }
        return d3.select(this).text() === highlightedXAxisName // 选择 text 值为 "特定字符串" 的元素
      })
    //  // 例如，将其文本颜色设置为红色
    // console.log(tt, typeof tt)
  }, [highlightedXAxisName])

  //获取元素宽高
  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth)
    setHeight(ref.current.offsetHeight)
    // console.log('设置高度', ref.current.offsetHeight)
  }, [])

  useEffect(() => {
    //有data时才画图，防止出错
    if (allData != undefined) {
      const divContainer = document.getElementById('knowledgeChart')
      //图存在时先移除
      while (divContainer.hasChildNodes()) {
        divContainer.removeChild(divContainer.firstChild)
      }
      let drawData
      //所有知识点
      if (knowledgeState.length == 0) {
        drawData = allData
      }
      //一个知识点
      else if (knowledgeState.length == 1) {
        let childrenData
        // console.log('lemgth', knowledgeState.length)
        for (let i = 0, len = allData.children.length; i < len; i++) {
          if (allData.children[i].name == knowledgeState[0]) {
            childrenData = allData.children[i]
            break
          }
        }
        drawData = { name: 'q1', children: [childrenData] }
      } else if (knowledgeState.length == 2) {
        // console.log('lemgth', knowledgeState.length)
        let childrenData0
        let childrenData1

        for (let i = 0, len = allData.children.length; i < len; i++) {
          if (allData.children[i].name == knowledgeState[0]) {
            childrenData0 = allData.children[i]
          }
          if (allData.children[i].name == knowledgeState[1]) {
            childrenData1 = allData.children[i]
          }
        }
        // console.log('test', [childrenData0, childrenData1])
        drawData = { name: 'q1', children: [childrenData0, childrenData1] }
      }

      drawChart(drawData)
    }
  }, [width, height, knowledgeState, viewState, allData]) // 空数组作为第二个参数，表示仅在组件首次渲染时运行

  //提取知识点名称到掌握程度的映射
  const getAverageData = (data) => {
    let result = {}
    data.children.forEach((knowledge) => {
      result[knowledge.name] = knowledge.score
      knowledge.children.forEach((sub_k) => {
        result[sub_k.name] = sub_k.score
      })
    })
    return result
  }
  const drawChart = (data) => {
    const formatTip = d3.format('.4f')

    const root = d3
      .hierarchy(data)
      .sum((d) => d.value)
      // .sort((a, b) => {
      //   console.log('ceui', a, b)
      //   return b.height - a.height || b.value - a.value
      // })
      .sort((a, b) => b.data.score - a.data.score)

    const color = d3
      .scaleLinear()
      .domain([0.25, 0.6]) // 输入数据范围
      // .range(['#ffccd5', '#E0464E']) // 输出颜色范围
      // .range(['#dce6d8', '#8fcc7e', '#4c993f']) // 输出颜色范围
      // .range(['#b5d9a9', '#6abf57']) // 输出颜色范围
      .range(['#f5fff0', '#6abf57']) // 输出颜色范围

    const color1 = d3
      .scaleLinear()
      .domain([0, 0.81]) // 输入数据范围
      // .range(['#ffccd5', '#E0464E']) // 输出颜色范围
      // .range(['#f1f5ef', '#8fcc7e', '#4c993f']) // 输出颜色范围
      .range(['#f1f5ef', '#4c993f']) // 输出颜色范围

    //对于知识点，掌握程度低于0.25的颜色映射
    const color3 = d3
      .scaleLinear()
      .domain([0, 0.25]) // 输入数据范围
      .range(['#f1f5ef', '#f5fff0'])

    //小三角形颜色
    const colorTriangle = d3
      .scaleLinear()
      .domain([0, 0.5]) // 输入数据范围
      .range(['#f6db6f', '#D4AC0D']) // 输出颜色范围

    // 初始化计数器
    let count_deep3 = 0

    // 遍历节点并计算深度为3的节点总数
    root.each(function (d) {
      if (d.depth === 3) {
        count_deep3++
      }
    })
    // console.log('节点上', count_deep3)
    // console.log('高度', height)//642

    // const dx = viewState ? 11 : height / count_deep3 / 1.5
    let dx
    if (knowledgeState.length == 0) {
      dx = 11
    } else {
      dx = height / count_deep3 / 2
    }
    const dy = width / root.height
    // Create a tree layout.
    const tree = d3.tree().size([width, height]).nodeSize([dx, dy])

    tree(root)

    // Compute the extent of the tree. Note that x and y are swapped here
    // because in the tree layout, x is the breadth, but when displayed, the
    // tree extends right rather than down.
    let x0 = Infinity
    let x1 = -x0
    root.each((d) => {
      if (d.x > x1) x1 = d.x
      if (d.x < x0) x0 = d.x
    })

    // Compute the adjusted height of the tree.
    // const height = x1 - x0 + dx * 2
    // const baseH=-325

    const svg = d3
      .select('#knowledgeChart')
      .append('svg')
      .attr('width', width)
      .attr('height', height + 15)
      .attr('viewBox', [120, -325, width, height + 15])
      .attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif;')

    const rectType = svg.append('g')
    rectType
      .append('text')
      .text('主知识点')
      .attr('transform', `translate(188, -315)`)
      .style('opacity', 0.8)
      .style('font-size', '12px')
    rectType
      .append('text')
      .text('子知识点')
      .attr('transform', `translate(400, -315)`)
      .style('opacity', 0.8)
      .style('font-size', '12px')
    rectType
      .append('text')
      .text('题目')
      .attr('transform', `translate(623, -315)`)
      .style('opacity', 0.8)
      .style('font-size', '12px')
    rectType
      .append('svg:image')
      .attr('xlink:href', function () {
        return Image0 // 根据索引 i 更新 x 位置，并固定 y 位置
      })
      .attr('x', 25)
      .attr('y', -11)
      .attr('width', 14)
      .attr('height', 14)
      .attr('transform', `translate(640, -315)`)

    rectType
      .append('text')
      .text('多知识点题目')
      .attr('transform', `translate(680, -315)`)
      .style('opacity', 0.8)
      .style('font-size', '12px')

    // 删除第一个元素，这里第一个是总的，实际上这里并不需要
    let temp = root.descendants()
    temp.shift()

    // 删除第一个元素，这里第一个是总的，实际上这里并不需要
    let templ = root.links()
    //全局视图时，去除连接到假祖先点的8条线
    if (knowledgeState.length == 0) {
      templ.shift()
      templ.shift()
      templ.shift()
      templ.shift()
      templ.shift()
      templ.shift()
      templ.shift()
      templ.shift()
    } else if (knowledgeState.length == 1) {
      templ.shift()
    } else if (knowledgeState.length == 2) {
      templ.shift()
      templ.shift()
    }

    //线条
    svg
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', '#555')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5)
      .selectAll()
      .data(templ)
      .join('path')
      .attr(
        'd',
        d3
          .linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x)
      )

    //节点
    const node = svg
      .append('g')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 3)
      .selectAll()
      .data(temp)
      .join('g')
      .attr('class', (d) => {
        // console.log('ceui', d)
        if (d.depth == 1) return 'mainKNowledge'
        if (d.depth == 3) {
          // console.log(Object.prototype.hasOwnProperty.call(d.data, 'icon'))
          if (Object.prototype.hasOwnProperty.call(d.data, 'icon')) {
            // console.log('icon', d.data.icon)
            return `questionRect addIcon _${d.data.icon}`
          } else return `questionRect`
        }
      })
      .attr('transform', (d) => `translate(${d.y},${d.x})`)

    //tooltip
    node.append('title').text((d) => {
      // let nodes = d.ancestors()
      // nodes.reverse().shift() //删除祖先点
      //   console.log('数据', nodes)
      if (d.depth == 3) {
        return `题目：Q_${d.data.name.slice(9, 12)}\n正确率：${formatTip(d.data.score)}\n总分值：${d.value}`
      } else if (d.depth == 2) {
        return `子知识点：${d.data.name.slice(6)}\n掌握程度：${formatTip(d.data.score)}\n总分值：${d.value}`
      } else
        return `主知识点：${d.data.name}\n掌握程度：${formatTip(d.data.score)}\n总分值：${d.value}`
    })

    const circles = node
      .append('circle')
      .attr('fill', (d) => {
        if (!d.depth) return '#ccc'
        else if (d.depth == 3) return color1(d.data.score)
        else {
          if (d.data.score < 0.25) return color3(d.data.score)
          else return color(d.data.score)
        }
      })
      .attr('class', (d) => {
        if (d.depth == 3) return 'questionRect'
      })
      .attr('r', 0)

    // 选择要设置动画的矩形元素
    circles
      // 应用动画效果
      .transition()
      // 设置动画持续时间（以毫秒为单位）
      .duration(1000)
      // 设置要动画化的属性
      .attr('r', (d) => {
        if (knowledgeState.length == 0) {
          if (d.value >= 3) return d.value * 1.7
          else return d.value * 2.3
        } else if (knowledgeState.length == 1) {
          if (d.value >= 10) return d.value * 2
          else if (d.value >= 3) return d.value * 4
          else if (d.value >= 2) return d.value * 6
          else return d.value * 8
        } else {
          if (d.value >= 2) return d.value * 2
          else return d.value * 4
        }
      })

    // 根据条件决定是否添加三角形
    node.each(function (d) {
      let node = d3.select(this)

      // 在此处添加条件判断
      let shouldAddTriangle =
        d.depth < 3 &&
        d.data.score !=
          averageData[d.data.name] /* 根据您的条件来决定是否添加三角形 */

      // console.log('三角形', shouldAddTriangle)
      if (shouldAddTriangle) {
        // 计算三角形的位置
        let triangleHeight = 5 // 三角形的高度
        let triangleBase = 7 // 三角形的底边长度
        let radius
        if (knowledgeState.length == 0) {
          if (d.value >= 3) radius = d.value * 1.7
          else radius = d.value * 2.3
        } else if (knowledgeState.length == 1) {
          if (d.value >= 10) radius = d.value * 2
          else if (d.value >= 3) radius = d.value * 4
          else if (d.value >= 2) radius = d.value * 6
          else radius = d.value * 8
        } else {
          if (d.value >= 2) radius = d.value * 2
          else radius = d.value * 4
        }
        let cx = 0 // 节点的x坐标
        let cy = radius

        // 计算三角形的顶点坐标
        let triangleTopX = cx
        let triangleTopY =
          d.data.score > averageData[d.data.name]
            ? -cy - triangleHeight
            : cy + triangleHeight
        let triangleLeftX = cx - triangleBase / 2
        let triangleLeftY = d.data.score > averageData[d.data.name] ? -cy : cy
        let triangleRightX = cx + triangleBase / 2
        let triangleRightY = triangleLeftY

        // 添加三角形到节点
        node
          .append('polygon')
          .attr(
            'points',
            triangleTopX +
              ',' +
              triangleTopY +
              ' ' +
              triangleLeftX +
              ',' +
              triangleLeftY +
              ' ' +
              triangleRightX +
              ',' +
              triangleRightY
          )
          .style('fill', (d) =>
            colorTriangle(Math.abs(d.data.score - averageData[d.data.name]))
          )
          .attr('class', 'triangle_knowledge')
      }
    })

    // 添加鼠标滑过事件监听器
    circles.on('mouseover', function () {
      // 在回调函数中修改样式
      let radius = +d3.select(this).attr('r')
      // console.log('滑入', radius, this, typeof this)
      d3.select(this)
        .style('stroke', 'RGB(22, 106, 100)')
        .style('stroke-width', 1)
        .attr('r', radius + 6)
    })

    // 添加鼠标移出事件监听器
    circles.on('mouseout', function () {
      // 还原样式
      let radius = +d3.select(this).attr('r')
      // console.log('滑出', radius)

      d3.select(this)
        .style('stroke', 'none')
        .attr('r', radius - 6)
    })

    node
      .append('text')
      .attr('dy', '0.31em')
      .attr('x', (d) => {
        if (d.depth == 1) {
          return 10
        } else if (d.depth == 2) {
          return 10
        } else return 8
      })
      .attr('text-anchor', (d) => (d.children ? 'start' : 'start'))
      .text((d) => {
        if (d.depth == 3) {
          return `Q_${d.data.name.slice(9, 12)}`
        } else if (d.depth == 2) {
          return `${d.data.name.slice(6)}`
        } else {
          return d.data.name
        }
      })
      .attr('class', (d) => {
        if (d.depth == 3) {
          if (Object.prototype.hasOwnProperty.call(d.data, 'icon')) {
            // console.log('icon', d.data.icon)
            return `addIcon _${d.data.icon}`
          }
        }
      })
      .attr('stroke', 'white')
      .attr('paint-order', 'stroke')
      .style('opacity', 0.8)

    //题目添加点击事件,题目圆
    const myQuestions = d3.selectAll('circle.questionRect')
    myQuestions.on('click', function (e) {
      // 在这里编写点击事件的处理逻辑
      let question = e.target.__data__.data.name
      let Q_name = 'Q_' + question.substring(9, 12)
      // console.log('点击了 <g> 元素', Q_name)
      handleIsKnowClick(true)
      handleHighLightedXaix(Q_name)
      handleClickTitleFlag(1)
    })

    // 为主知识点添加点击事件
    const myGroups = d3.selectAll('g.mainKNowledge')

    // 为选中的元素添加点击事件
    myGroups.on('click', function (e) {
      // 在这里编写点击事件的处理逻辑
      let Knowledge = e.target.__data__.data.name
      setViewState(() => !viewState)
      if (viewState) {
        setknowledgeState([Knowledge])
      } else {
        setknowledgeState([])
      }
      console.log('点击了 <g> 元素', Knowledge)
    })

    //图标
    let icons

    //不是问题模式绘制所有图标
    if (!questionState) {
      icons = d3.selectAll('g.addIcon')
    } else {
      icons = d3.selectAll(`g.addIcon.${questionIconState}`)
      // console.log('点击图标', `g.addIcon.${questionIconState}`, icons)
    }
    // icons = d3.selectAll('g.addIcon')

    // console.log('icon', icons)
    icons
      .append('svg:image')
      .attr('class', function (d) {
        return `iconImage _${d.data.icon}`
      })
      .attr('xlink:href', function () {
        return Image0 // 根据索引 i 更新 x 位置，并固定 y 位置
      })
      .attr('x', 138)
      .attr('y', function () {
        return 0
      })
      .attr('width', 15)
      .attr('height', 15)
      .attr('transform', function () {
        // 使用 transform 属性来根据数据更新图像位置
        return 'translate(-90, -8)' // 根据索引 i 更新 x 位置，并固定 y 位置
      })

    //为iconImage添加点击事件
    const iconsImage = d3.selectAll('text.addIcon')
    // 为选中的元素添加点击事件
    iconsImage.on('click', function (e) {
      // 获取被点击元素的主知识点
      let Knowledge = title_knowledge[e.target.__data__.data.name]
      console.log('点击图标', e.target, Knowledge)
      let clickedRect = this
      // 获取第二个类名
      let secondClassName = clickedRect.classList[1]
      // 在控制台中打印第二个类名
      console.log(secondClassName)
      setquestionIconState(secondClassName)
      setQuestionState(() => !questionState)
      //不知道为什么要!
      if (!questionState) {
        setknowledgeState(() => Knowledge)
      } else {
        setknowledgeState([])
      }
    })
  }

  return (
    <>
      <div
        className="containerGroup"
        style={{
          height: '100%',
          width: '100%'
        }}
      >
        <div className="atitle">
          <div className="title-icon">
            {/* <IconFont type="icon-a-zhishidian1" /> */}
            <img
              src={Know}
              alt="知识点图标"
              style={{ width: 21, height: 21 }}
            />
          </div>
          知识点掌握程度气泡树图
        </div>
        <div
          id="knowledgeChart"
          ref={ref}
          style={{ height: 'calc(100% - 35px)', width: '100%' }}
        ></div>
      </div>
    </>
  )
}
export default memo(KnowledgeTree)
