import React, { memo } from 'react'
// import * as echarts from 'echarts'
// import ReactEcharts from 'echarts-for-react'
import { RankingWrapper } from './style'
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
// import { Card } from 'antd'
const Ranking = () => {
  const svgRef = useRef(null);
  const array = Array.from({ length: 90 }, () => Math.random());
  array.sort((a, b) => b - a);
  const rectDistance = 100;
  var rectY = 0
  useEffect(() => {
    if (!svgRef.current) {
      const svg = d3.select('.Rankview')
                    .append('svg')
                    .attr('width','100%')
                    .attr('height','100%');
      svg.selectAll('rect')
          .data(array)
          .enter()
          .append('rect')
          .attr('width','80px')
          .attr('height','1px')
          .attr('fill','red')
          .attr('x','10px')
          .attr('y',function(d,i){
            if (i == 0) {
              rectY = rectY + 3;
              return '0px';
            }
            else{
              rectY = rectY + 3 + rectDistance*(array[i]-array[i-1]);
              return rectY + rectDistance*(array[i]-array[i-1]) + 'px';
            }
          });
      svgRef.current = svg;
      }

  }, []);

  return (
    <RankingWrapper>

      <div className="title">排名</div>
      <div className="Rankview" ></div>
    </RankingWrapper>
  )
}
export default memo(Ranking)
