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
        children: [
          {
            name: 'b3C9s_j0v1yls8',
            children: [{ name: 'Question_FNg8X9v5zcbB1tQrxHR3', value: 4 }]
          },
          {
            name: 'b3C9s_l4z6od7y',
            children: [
              { name: 'Question_bumGRTJ0c8p4v5D6eHZa', value: 3 },
              { name: 'Question_hZ5wXofebmTlzKB1jNcP', value: 3 }
            ]
          }
        ]
      },
      {
        name: 'g7R2j',
        children: [
          {
            name: 'g7R2j_e0v1yls8',
            children: [
              { name: 'Question_oCjnFLbIs4Uxwek9rBpu', value: 3 },
              { name: 'Question_5fgqjSBwTPG7KUV3it6O', value: 3 },
              { name: 'Question_X3wF8QlTyi4mZkDp9Kae', value: 3 },
              { name: 'Question_xqlJkmRaP0otZcX4fK3W', value: 3 }
            ]
          },
          {
            name: 'g7R2j_j1g8gd3v',
            children: [{ name: 'Question_YWXHr4G6Cl7bEm9iF2kQ', value: 3 }]
          }
        ]
      },
      {
        name: 'k4W1c',
        children: [
          {
            name: 'k4W1c_h5r6nux7',
            children: [{ name: 'Question_lU2wvHSZq7m43xiVroBc', value: 3 }]
          }
        ]
      },
      {
        name: 'm3D1v',
        children: [
          {
            name: 'm3D1v_r1d7fr3l',
            children: [
              { name: 'Question_h7pXNg80nJbw1C4kAPRm', value: 3 },
              { name: 'Question_6RQj2gF3OeK5AmDvThUV', value: 3 },
              { name: 'Question_4nHcauCQ0Y6Pm8DgKlLo', value: 3 },
              { name: 'Question_TmKaGvfNoXYq4FZ2JrBu', value: 3 },
              { name: 'Question_NixCn84GdK2tySa5rB1V', value: 3 },
              { name: 'Question_n2BTxIGw1Mc3Zo6RLdUe', value: 3 },
              { name: 'Question_QRm48lXxzdP7Tn1WgNOf', value: 3 },
              { name: 'Question_pVKXjZn0BkSwYcsa7C31', value: 3 },
              { name: 'Question_oCjnFLbIs4Uxwek9rBpu', value: 3 }
            ]
          },
          {
            name: 'm3D1v_t0v5ts9h',
            children: [{ name: 'Question_Jr4Wz5jLqmN01KUwHa7g', value: 3 }]
          },
          {
            name: 'm3D1v_v3d9is1x',
            children: [
              { name: 'Question_7NJzCXUPcvQF4Mkfh9Wr', value: 3 },
              { name: 'Question_ZTbD7mxr2OUp8Fz6iNjy', value: 3 }
            ]
          }
        ]
      },
      {
        name: 'r8S3g',
        children: [
          {
            name: 'r8S3g_l0p5viby',
            children: [
              { name: 'Question_VgKw8PjY1FR6cm2QI9XW', value: 1 },
              { name: 'Question_q7OpB2zCMmW9wS8uNt3H', value: 1 }
            ]
          },
          {
            name: 'r8S3g_n0m9rsw4',
            children: [
              { name: 'Question_q7OpB2zCMmW9wS8uNt3H', value: 1 },
              { name: 'Question_fZrP3FJ4ebUogW9V7taS', value: 1 },
              { name: 'Question_BW0ItEaymH3TkD6S15JF', value: 1 },
              { name: 'Question_rvB9mVE6Kbd8jAY4NwPx', value: 1 }
            ]
          }
        ]
      },
      {
        name: 's8Y2f',
        children: [
          {
            name: 's8Y2f_v4x8by9j',
            children: [{ name: 'Question_x2Fy7rZ3SwYl9jMQkpOD', value: 3 }]
          }
        ]
      },
      {
        name: 't5V9e',
        children: [
          {
            name: 't5V9e_e1k6cixp',
            children: [
              { name: 'Question_3oPyUzDmQtcMfLpGZ0jW', value: 2 },
              { name: 'Question_3MwAFlmNO8EKrpY5zjUd', value: 2 },
              { name: 'Question_x2L7AqbMuTjCwPFy6vNr', value: 2 },
              { name: 'Question_tgOjrpZLw4RdVzQx85h6', value: 2 },
              { name: 'Question_s6VmP1G4UbEQWRYHK9Fd', value: 2 }
            ]
          }
        ]
      },
      {
        name: 'y9W5d',
        children: [
          {
            name: 'y9W5d_c0w4mj5h',
            children: [
              { name: 'Question_QRm48lXxzdP7Tn1WgNOf', value: 3 },
              { name: 'Question_pVKXjZn0BkSwYcsa7C31', value: 3 },
              { name: 'Question_Ej5mBw9rsOUKkFycGvz2', value: 3 },
              { name: 'Question_lU2wvHSZq7m43xiVroBc', value: 3 },
              { name: 'Question_Mh4CZIsrEfxkP1wXtOYV', value: 3 },
              { name: 'Question_62XbhBvJ8NUSnApgDL94', value: 3 },
              { name: 'Question_x2Fy7rZ3SwYl9jMQkpOD', value: 3 },
              { name: 'Question_UXqN1F7G3Sbldz02vZne', value: 3 }
            ]
          },
          {
            name: 'y9W5d_e2j7p95s',
            children: [{ name: 'Question_EhVPdmlB31M8WKGqL0wc', value: 3 }]
          },
          {
            name: 'y9W5d_p8g6dgtv',
            children: [
              { name: 'Question_Ou3f2Wt9BqExm5DpN7Zk', value: 3 },
              { name: 'Question_Az73sM0rHfWVKuc4X2kL', value: 3 }
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
    const format = d3.format(',d')

    // Create a color scale (a color for each child of the root node and their descendants).
    const color = d3.scaleOrdinal(
      d3.quantize(d3.interpolateRainbow, data.children.length + 1)
    )

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

    cell.append('title').text(
      (d) =>
        `${d
          .ancestors()
          .map((d) => d.data.name)
          .reverse()
          .join('/')}\n${format(d.value)}`
    )

    // Color the cell with respect to which child of root it belongs to.
    cell
      .append('rect')
      .attr('width', (d) => (5 / 4) * (d.y1 - d.y0))
      .attr('height', (d) => d.x1 - d.x0)
      .attr('fill-opacity', 0.6)
      .attr('fill', (d) => {
        if (!d.depth) return '#ccc'
        while (d.depth > 1) d = d.parent
        return color(d.data.name)
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
