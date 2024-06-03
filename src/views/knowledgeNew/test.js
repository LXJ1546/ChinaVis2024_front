import React, {
  memo,
  useEffect,
  useRef,
  useLayoutEffect,
  useState
} from 'react'
import * as d3 from 'd3'
import { getClassKnowledgeInfo } from '../../api/index'
import { createFromIconfontCN } from '@ant-design/icons'
import './knowledgeStyle.css'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4565164_juvpif6y83m.js'
})

const KnowledgeTree = (props) => {
  const {
    classNum,
    isChangeWeight,
    handleHighLightedXaix,
    handleClickTitleFlag
  } = props
  const ref = useRef() //用于获取d3绘图使用div的宽高
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [data, setDataState] = useState(undefined)

  // const data = {
  //   children: [
  //     {
  //       children: [
  //         {
  //           children: [
  //             {
  //               name: 'Question_FNg8X9v5zcbB1tQrxHR3',
  //               score: 0.4797,
  //               value: 4
  //             }
  //           ],
  //           name: 'b3C9s_j0v1yls8',
  //           score: 0.4705
  //         },
  //         {
  //           children: [
  //             {
  //               name: 'Question_bumGRTJ0c8p4v5D6eHZa',
  //               score: 0.6516,
  //               value: 3
  //             },
  //             {
  //               name: 'Question_hZ5wXofebmTlzKB1jNcP',
  //               score: 0.5007,
  //               value: 3
  //             }
  //           ],
  //           name: 'b3C9s_l4z6od7y',
  //           score: 0.4938
  //         }
  //       ],
  //       name: 'b3C9s',
  //       score: 0.4845
  //     },
  //     {
  //       children: [
  //         {
  //           children: [
  //             {
  //               icon: 5,
  //               name: 'Question_oCjnFLbIs4Uxwek9rBpu',
  //               score: 0.6251,
  //               value: 3
  //             },
  //             {
  //               name: 'Question_5fgqjSBwTPG7KUV3it6O',
  //               score: 0.6179,
  //               value: 3
  //             },
  //             {
  //               name: 'Question_X3wF8QlTyi4mZkDp9Kae',
  //               score: 0.5936,
  //               value: 3
  //             },
  //             {
  //               name: 'Question_xqlJkmRaP0otZcX4fK3W',
  //               score: 0.3717,
  //               value: 3
  //             }
  //           ],
  //           name: 'g7R2j_e0v1yls8',
  //           score: 0.4826
  //         },
  //         {
  //           children: [
  //             {
  //               name: 'Question_YWXHr4G6Cl7bEm9iF2kQ',
  //               score: 0.5266,
  //               value: 3
  //             }
  //           ],
  //           name: 'g7R2j_j1g8gd3v',
  //           score: 0.499
  //         }
  //       ],
  //       name: 'g7R2j',
  //       score: 0.4848
  //     },
  //     {
  //       children: [
  //         {
  //           children: [
  //             {
  //               icon: 3,
  //               name: 'Question_lU2wvHSZq7m43xiVroBc',
  //               score: 0.578,
  //               value: 3
  //             }
  //           ],
  //           name: 'k4W1c_h5r6nux7',
  //           score: 0.5303
  //         }
  //       ],
  //       name: 'k4W1c',
  //       score: 0.5303
  //     },
  //     {
  //       children: [
  //         {
  //           children: [
  //             {
  //               name: 'Question_h7pXNg80nJbw1C4kAPRm',
  //               score: 0.4223,
  //               value: 3
  //             },
  //             {
  //               name: 'Question_6RQj2gF3OeK5AmDvThUV',
  //               score: 0.6002,
  //               value: 3
  //             },
  //             {
  //               name: 'Question_4nHcauCQ0Y6Pm8DgKlLo',
  //               score: 0.6666,
  //               value: 3
  //             },
  //             {
  //               name: 'Question_TmKaGvfNoXYq4FZ2JrBu',
  //               score: 0.585,
  //               value: 3
  //             },
  //             {
  //               name: 'Question_NixCn84GdK2tySa5rB1V',
  //               score: 0.633,
  //               value: 3
  //             },
  //             {
  //               name: 'Question_n2BTxIGw1Mc3Zo6RLdUe',
  //               score: 0.3168,
  //               value: 3
  //             },
  //             {
  //               icon: 1,
  //               name: 'Question_QRm48lXxzdP7Tn1WgNOf',
  //               score: 0.6544,
  //               value: 3
  //             },
  //             {
  //               icon: 2,
  //               name: 'Question_pVKXjZn0BkSwYcsa7C31',
  //               score: 0.4997,
  //               value: 3
  //             },
  //             {
  //               icon: 5,
  //               name: 'Question_oCjnFLbIs4Uxwek9rBpu',
  //               score: 0.6251,
  //               value: 3
  //             }
  //           ],
  //           name: 'm3D1v_r1d7fr3l',
  //           score: 0.4864
  //         },
  //         {
  //           children: [
  //             {
  //               name: 'Question_Jr4Wz5jLqmN01KUwHa7g',
  //               score: 0.5186,
  //               value: 3
  //             }
  //           ],
  //           name: 'm3D1v_t0v5ts9h',
  //           score: 0.5106
  //         },
  //         {
  //           children: [
  //             {
  //               name: 'Question_7NJzCXUPcvQF4Mkfh9Wr',
  //               score: 0.5764,
  //               value: 3
  //             },
  //             {
  //               name: 'Question_ZTbD7mxr2OUp8Fz6iNjy',
  //               score: 0.5413,
  //               value: 3
  //             }
  //           ],
  //           name: 'm3D1v_v3d9is1x',
  //           score: 0.4935
  //         }
  //       ],
  //       name: 'm3D1v',
  //       score: 0.4896
  //     },
  //     {
  //       children: [
  //         {
  //           children: [
  //             {
  //               name: 'Question_VgKw8PjY1FR6cm2QI9XW',
  //               score: 0.4075,
  //               value: 1
  //             },
  //             {
  //               icon: 0,
  //               name: 'Question_q7OpB2zCMmW9wS8uNt3H',
  //               score: 0.2538,
  //               value: 1
  //             }
  //           ],
  //           name: 'r8S3g_l0p5viby',
  //           score: 0.3613
  //         },
  //         {
  //           children: [
  //             {
  //               icon: 0,
  //               name: 'Question_q7OpB2zCMmW9wS8uNt3H',
  //               score: 0.2538,
  //               value: 1
  //             },
  //             {
  //               name: 'Question_fZrP3FJ4ebUogW9V7taS',
  //               score: 0.2974,
  //               value: 1
  //             },
  //             {
  //               name: 'Question_BW0ItEaymH3TkD6S15JF',
  //               score: 0.344,
  //               value: 1
  //             },
  //             {
  //               name: 'Question_rvB9mVE6Kbd8jAY4NwPx',
  //               score: 0.5996,
  //               value: 1
  //             }
  //           ],
  //           name: 'r8S3g_n0m9rsw4',
  //           score: 0.3747
  //         }
  //       ],
  //       name: 'r8S3g',
  //       score: 0.3778
  //     },
  //     {
  //       children: [
  //         {
  //           children: [
  //             {
  //               icon: 4,
  //               name: 'Question_x2Fy7rZ3SwYl9jMQkpOD',
  //               score: 0.5297,
  //               value: 3
  //             }
  //           ],
  //           name: 's8Y2f_v4x8by9j',
  //           score: 0.4802
  //         }
  //       ],
  //       name: 's8Y2f',
  //       score: 0.4802
  //     },
  //     {
  //       children: [
  //         {
  //           children: [
  //             {
  //               name: 'Question_3oPyUzDmQtcMfLpGZ0jW',
  //               score: 0.334,
  //               value: 2
  //             },
  //             {
  //               name: 'Question_3MwAFlmNO8EKrpY5zjUd',
  //               score: 0.6482,
  //               value: 2
  //             },
  //             {
  //               name: 'Question_x2L7AqbMuTjCwPFy6vNr',
  //               score: 0.6637,
  //               value: 2
  //             },
  //             {
  //               name: 'Question_tgOjrpZLw4RdVzQx85h6',
  //               score: 0.6251,
  //               value: 2
  //             },
  //             {
  //               name: 'Question_s6VmP1G4UbEQWRYHK9Fd',
  //               score: 0.4729,
  //               value: 2
  //             }
  //           ],
  //           name: 't5V9e_e1k6cixp',
  //           score: 0.4692
  //         }
  //       ],
  //       name: 't5V9e',
  //       score: 0.4692
  //     },
  //     {
  //       children: [
  //         {
  //           children: [
  //             {
  //               icon: 1,
  //               name: 'Question_QRm48lXxzdP7Tn1WgNOf',
  //               score: 0.6544,
  //               value: 3
  //             },
  //             {
  //               icon: 2,
  //               name: 'Question_pVKXjZn0BkSwYcsa7C31',
  //               score: 0.4997,
  //               value: 3
  //             },
  //             {
  //               name: 'Question_Ej5mBw9rsOUKkFycGvz2',
  //               score: 0.5051,
  //               value: 3
  //             },
  //             {
  //               icon: 3,
  //               name: 'Question_lU2wvHSZq7m43xiVroBc',
  //               score: 0.578,
  //               value: 3
  //             },
  //             {
  //               name: 'Question_Mh4CZIsrEfxkP1wXtOYV',
  //               score: 0.4925,
  //               value: 3
  //             },
  //             {
  //               name: 'Question_62XbhBvJ8NUSnApgDL94',
  //               score: 0.5294,
  //               value: 3
  //             },
  //             {
  //               icon: 4,
  //               name: 'Question_x2Fy7rZ3SwYl9jMQkpOD',
  //               score: 0.5297,
  //               value: 3
  //             },
  //             {
  //               name: 'Question_UXqN1F7G3Sbldz02vZne',
  //               score: 0.7461,
  //               value: 3
  //             }
  //           ],
  //           name: 'y9W5d_c0w4mj5h',
  //           score: 0.5019
  //         },
  //         {
  //           children: [
  //             {
  //               name: 'Question_EhVPdmlB31M8WKGqL0wc',
  //               score: 0.6722,
  //               value: 3
  //             }
  //           ],
  //           name: 'y9W5d_e2j7p95s',
  //           score: 0.5659
  //         },
  //         {
  //           children: [
  //             {
  //               name: 'Question_Ou3f2Wt9BqExm5DpN7Zk',
  //               score: 0.5896,
  //               value: 3
  //             },
  //             {
  //               name: 'Question_Az73sM0rHfWVKuc4X2kL',
  //               score: 0.6038,
  //               value: 3
  //             }
  //           ],
  //           name: 'y9W5d_p8g6dgtv',
  //           score: 0.5256
  //         }
  //       ],
  //       name: 'y9W5d',
  //       score: 0.511
  //     }
  //   ],
  //   name: 'Q1'
  // }

  useEffect(() => {
    getClassKnowledgeInfo(classNum, 'score').then((res) => {
      // console.log('从后端获取数据', res)
      setDataState(res.info)
      // setValueInfo(res.valueInfo)
    })
  }, [classNum, isChangeWeight])

  //获取元素宽高
  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth)
    setHeight(ref.current.offsetHeight)
    console.log('设置宽度', ref.current.offsetWidth)
  }, [])

  useEffect(() => {
    if (data != undefined) {
      const divContainer = document.getElementById('knowledgeChart')

      //
      while (divContainer.hasChildNodes()) {
        divContainer.removeChild(divContainer.firstChild)
      }

      drawChart()
    }
  }, [width, height, data]) // 空数组作为第二个参数，表示仅在组件首次渲染时运行

  const drawChart = () => {
    const formatTip = d3.format('.4f')

    const root = d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.height - a.height || b.value - a.value)

    const color = d3
      .scaleLinear()
      .domain([0.3778, 0.5303]) // 输入数据范围
      .range(['#ffccd5', '#c81d25']) // 输出颜色范围

    const color1 = d3
      .scaleLinear()
      .domain([0.2538, 0.7461]) // 输入数据范围
      .range(['#ffccd5', '#c81d25']) // 输出颜色范围

    const dx = 11
    const dy = width / root.height

    // Create a tree layout.
    const tree = d3.tree().nodeSize([dx, dy])

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

    const svg = d3
      .select('#knowledgeChart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-dy / 3 + 200, x0 - dx - 20, width, height])
      .attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif;')

    const rectType = svg.append('g')
    rectType
      .append('text')
      .text('主知识点')
      .attr('transform', `translate(190, -380)`)
    rectType
      .append('text')
      .text('子知识点')
      .attr('transform', `translate(400, -380)`)
    rectType
      .append('text')
      .text('题目')
      .attr('transform', `translate(630, -380)`)

    // 删除第一个元素，这里第一个是总的，实际上这里并不需要
    let temp = root.descendants()
    temp.shift()

    // 删除第一个元素，这里第一个是总的，实际上这里并不需要
    let templ = root.links()
    templ.shift()
    templ.shift()
    templ.shift()
    templ.shift()
    templ.shift()
    templ.shift()
    templ.shift()
    templ.shift()

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
      let nodes = d.ancestors()
      nodes.reverse().shift() //删除祖先点
      //   console.log('数据', nodes)
      return `${nodes
        .map((d) => d.data.name)
        .join('/')}\n掌握程度：${formatTip(d.data.score)}\n总分值：${d.value}`
    })

    const circles = node
      .append('circle')
      .attr('fill', (d) => {
        if (!d.depth) return '#ccc'
        else if (d.depth == 3) return color1(d.data.score)
        else return color(d.data.score)
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
        return d.value * 1.7
      })

    // 添加鼠标滑过事件监听器
    circles.on('mouseover', function () {
      // 在回调函数中修改样式
      // d3.select(this).style('opacity', 1)
      d3.select(this)
        .style('stroke', 'RGB(22, 106, 100)')
        .style('stroke-width', 2)
    })

    // 添加鼠标移出事件监听器
    circles.on('mouseout', function () {
      // 还原样式
      // d3.select(this).style('opacity', 0.9)
      d3.select(this).style('stroke', 'none')
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
      .attr('stroke', 'white')
      .attr('paint-order', 'stroke')

    //题目添加点击事件
    const myQuestions = d3.selectAll('g.questionRect')
    myQuestions.on('click', function (e) {
      // 在这里编写点击事件的处理逻辑
      let question = e.target.__data__.data.name
      let Q_name = 'Q_' + question.substring(9, 12)
      console.log('点击了 <g> 元素', Q_name)

      handleHighLightedXaix(Q_name)
      handleClickTitleFlag(1)
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
            <IconFont type="icon-zhishidian" />
          </div>
          知识点掌握程度
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
