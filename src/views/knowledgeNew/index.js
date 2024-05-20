import React, {
  memo,
  useEffect,
  useRef,
  useLayoutEffect,
  useState
} from 'react'
import * as d3 from 'd3'
import './index.css'

const KnowledgeIcicle = () => {
  const ref = useRef() //用于获取d3绘图使用div的宽高
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  //   const width = 200
  //   const height = 400
  const data = {
    name: 'Q1',
    children: [
      {
        name: 'b3C9s',
        score: 0.4977,
        children: [
          {
            name: 'b3C9s_j0v1yls8',
            score: 0.5052,
            children: [
              { name: 'Question_FNg8X9v5zcbB1tQrxHR3', score: 0.5052, value: 4 }
            ]
          },
          {
            name: 'b3C9s_l4z6od7y',
            score: 0.5019,
            children: [
              {
                name: 'Question_bumGRTJ0c8p4v5D6eHZa',
                score: 0.5351,
                value: 3
              },
              { name: 'Question_hZ5wXofebmTlzKB1jNcP', score: 0.4961, value: 3 }
            ]
          }
        ]
      },
      {
        name: 'g7R2j',
        score: 0.4608,
        children: [
          {
            name: 'g7R2j_e0v1yls8',
            score: 0.4659,
            children: [
              {
                name: 'Question_oCjnFLbIs4Uxwek9rBpu',
                score: 0.5062,
                value: 3
              },
              {
                name: 'Question_5fgqjSBwTPG7KUV3it6O',
                score: 0.5117,
                value: 3
              },
              { name: 'Question_X3wF8QlTyi4mZkDp9Kae', score: 0.498, value: 3 },
              { name: 'Question_xqlJkmRaP0otZcX4fK3W', score: 0.3857, value: 3 }
            ]
          },
          {
            name: 'g7R2j_j1g8gd3v',
            score: 0.4511,
            children: [
              { name: 'Question_YWXHr4G6Cl7bEm9iF2kQ', score: 0.4511, value: 3 }
            ]
          }
        ]
      },
      {
        name: 'k4W1c',
        score: 0.4991,
        children: [
          {
            name: 'k4W1c_h5r6nux7',
            score: 0.4991,
            children: [
              { name: 'Question_lU2wvHSZq7m43xiVroBc', score: 0.4991, value: 3 }
            ]
          }
        ]
      },
      {
        name: 'm3D1v',
        score: 0.4688,
        children: [
          {
            name: 'm3D1v_r1d7fr3l',
            score: 0.4625,
            children: [
              {
                name: 'Question_h7pXNg80nJbw1C4kAPRm',
                score: 0.4472,
                value: 3
              },
              {
                name: 'Question_6RQj2gF3OeK5AmDvThUV',
                score: 0.4998,
                value: 3
              },
              { name: 'Question_4nHcauCQ0Y6Pm8DgKlLo', score: 0.504, value: 3 },
              {
                name: 'Question_TmKaGvfNoXYq4FZ2JrBu',
                score: 0.4545,
                value: 3
              },
              {
                name: 'Question_NixCn84GdK2tySa5rB1V',
                score: 0.5133,
                value: 3
              },
              {
                name: 'Question_n2BTxIGw1Mc3Zo6RLdUe',
                score: 0.3787,
                value: 3
              },
              {
                name: 'Question_QRm48lXxzdP7Tn1WgNOf',
                score: 0.5197,
                value: 3
              },
              {
                name: 'Question_pVKXjZn0BkSwYcsa7C31',
                score: 0.4284,
                value: 3
              },
              { name: 'Question_oCjnFLbIs4Uxwek9rBpu', score: 0.5062, value: 3 }
            ]
          },
          {
            name: 'm3D1v_t0v5ts9h',
            score: 0.4772,
            children: [
              { name: 'Question_Jr4Wz5jLqmN01KUwHa7g', score: 0.4772, value: 3 }
            ]
          },
          {
            name: 'm3D1v_v3d9is1x',
            score: 0.5008,
            children: [
              {
                name: 'Question_7NJzCXUPcvQF4Mkfh9Wr',
                score: 0.5145,
                value: 3
              },
              { name: 'Question_ZTbD7mxr2OUp8Fz6iNjy', score: 0.5307, value: 3 }
            ]
          }
        ]
      },
      {
        name: 'r8S3g',
        score: 0.3912,
        children: [
          {
            name: 'r8S3g_l0p5viby',
            score: 0.365,
            children: [
              {
                name: 'Question_VgKw8PjY1FR6cm2QI9XW',
                score: 0.4139,
                value: 1
              },
              { name: 'Question_q7OpB2zCMmW9wS8uNt3H', score: 0.3226, value: 1 }
            ]
          },
          {
            name: 'r8S3g_n0m9rsw4',
            score: 0.3877,
            children: [
              {
                name: 'Question_q7OpB2zCMmW9wS8uNt3H',
                score: 0.3226,
                value: 1
              },
              {
                name: 'Question_fZrP3FJ4ebUogW9V7taS',
                score: 0.3498,
                value: 1
              },
              {
                name: 'Question_BW0ItEaymH3TkD6S15JF',
                score: 0.3939,
                value: 1
              },
              { name: 'Question_rvB9mVE6Kbd8jAY4NwPx', score: 0.5233, value: 1 }
            ]
          }
        ]
      },
      {
        name: 's8Y2f',
        score: 0.4412,
        children: [
          {
            name: 's8Y2f_v4x8by9j',
            score: 0.4412,
            children: [
              { name: 'Question_x2Fy7rZ3SwYl9jMQkpOD', score: 0.4412, value: 3 }
            ]
          }
        ]
      },
      {
        name: 't5V9e',
        score: 0.4584,
        children: [
          {
            name: 't5V9e_e1k6cixp',
            score: 0.4584,
            children: [
              {
                name: 'Question_3oPyUzDmQtcMfLpGZ0jW',
                score: 0.3786,
                value: 2
              },
              {
                name: 'Question_3MwAFlmNO8EKrpY5zjUd',
                score: 0.4977,
                value: 2
              },
              {
                name: 'Question_x2L7AqbMuTjCwPFy6vNr',
                score: 0.5136,
                value: 2
              },
              {
                name: 'Question_tgOjrpZLw4RdVzQx85h6',
                score: 0.4887,
                value: 2
              },
              { name: 'Question_s6VmP1G4UbEQWRYHK9Fd', score: 0.4501, value: 2 }
            ]
          }
        ]
      },
      {
        name: 'y9W5d',
        score: 0.4822,
        children: [
          {
            name: 'y9W5d_c0w4mj5h',
            score: 0.4709,
            children: [
              {
                name: 'Question_QRm48lXxzdP7Tn1WgNOf',
                score: 0.5197,
                value: 3
              },
              {
                name: 'Question_pVKXjZn0BkSwYcsa7C31',
                score: 0.4284,
                value: 3
              },
              {
                name: 'Question_Ej5mBw9rsOUKkFycGvz2',
                score: 0.4775,
                value: 3
              },
              {
                name: 'Question_lU2wvHSZq7m43xiVroBc',
                score: 0.4991,
                value: 3
              },
              {
                name: 'Question_Mh4CZIsrEfxkP1wXtOYV',
                score: 0.4474,
                value: 3
              },
              {
                name: 'Question_62XbhBvJ8NUSnApgDL94',
                score: 0.4634,
                value: 3
              },
              {
                name: 'Question_x2Fy7rZ3SwYl9jMQkpOD',
                score: 0.4412,
                value: 3
              },
              { name: 'Question_UXqN1F7G3Sbldz02vZne', score: 0.5619, value: 3 }
            ]
          },
          {
            name: 'y9W5d_e2j7p95s',
            score: 0.5187,
            children: [
              { name: 'Question_EhVPdmlB31M8WKGqL0wc', score: 0.5187, value: 3 }
            ]
          },
          {
            name: 'y9W5d_p8g6dgtv',
            score: 0.515,
            children: [
              {
                name: 'Question_Ou3f2Wt9BqExm5DpN7Zk',
                score: 0.5316,
                value: 3
              },
              { name: 'Question_Az73sM0rHfWVKuc4X2kL', score: 0.5306, value: 3 }
            ]
          }
        ]
      }
    ]
  }

  //获取元素宽高
  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth)
    setHeight(ref.current.offsetHeight)
    console.log('设置宽度', ref.current.offsetWidth)
  }, [])

  useEffect(() => {
    const divContainer = document.getElementById('knowledgeChart')

    //
    while (divContainer.hasChildNodes()) {
      divContainer.removeChild(divContainer.firstChild)
    }
    // Create the SVG container.
    const svg = d3
      .select('#knowledgeChart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif')

    drawChart(svg)
  }, [width, height]) // 空数组作为第二个参数，表示仅在组件首次渲染时运行

  const drawChart = (svg) => {
    const format = d3.format('.4f')

    // Create a color scale (a color for each child of the root node and their descendants).
    const color = d3
      .scaleLinear()
      .domain([0, 0.6]) // 输入数据范围
      .range(['white', 'red']) // 输出颜色范围

    // Create a partition layout.
    const partition = d3.partition().size([height, width]).padding(1)

    // Apply the partition layout.
    const root = partition(
      d3
        .hierarchy(data)
        .sum((d) => d.value)
        .sort((a, b) => b.height - a.height || b.value - a.value)
    )

    // 删除第一个元素，这里第一个是总的，实际上这里并不需要
    let temp = root.descendants()
    temp.shift()
    console.log(temp)

    // Add a cell for each node of the hierarchy.
    const cell = svg
      .selectAll()
      .data(temp)
      .join('g')
      .attr('transform', (d) => {
        if (d.depth == 1) return `translate(${d.y0 - (d.y1 - d.y0)},${d.x0})`
        else if (d.depth == 2)
          return `translate(${d.y0 - (d.y1 - d.y0) + (d.y1 - d.y0) / 4},${d.x0})`
        else if (d.depth == 3)
          return `translate(${d.y0 - (d.y1 - d.y0) + (d.y1 - d.y0) / 2},${d.x0})`
      })

    cell.append('title').text((d) => {
      let nodes = d.ancestors()
      nodes.reverse().shift() //删除祖先点
      //   console.log('数据', nodes)

      return `${nodes
        .map((d) => d.data.name)

        .join('/')}\n${format(d.data.score)}`
    })

    // Color the cell with respect to which child of root it belongs to.
    cell
      .append('rect')
      .attr('width', (d) => (5 / 4) * (d.y1 - d.y0))
      .attr('height', (d) => d.x1 - d.x0)
      .attr('fill-opacity', 0.6)
      .attr('fill', (d) => {
        if (!d.depth) return '#ccc'
        return color(d.data.score)
      })

    // Add labels and a title.
    const text = cell
      .filter((d) => d.x1 - d.x0 > 16)
      .append('text')
      .attr('x', 4)
      .attr('y', 13)

    text.append('tspan').text((d) => d.data.name)

    text
      .append('tspan')
      .attr('fill-opacity', 0.7)
      .text((d) => ` ${format(d.value)}`)
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
        <div className="title">知识点掌握程度</div>
        <div
          id="knowledgeChart"
          ref={ref}
          style={{ height: 'calc(100% - 35px)', width: '100%' }}
        ></div>
      </div>
    </>
  )
}
export default memo(KnowledgeIcicle)
