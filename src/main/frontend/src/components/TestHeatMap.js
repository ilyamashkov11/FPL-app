import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import './css/TestHeatMap.css'

function TestHeatMap({data}) {
    const svgRef = useRef(null);

    useEffect(() => {
      const svg = d3.select(svgRef.current);
      const radius = 3; // Adjust the circle radius as needed
  
      // Create a group for the circles and apply the filter to that group
      const maxValue = d3.max(data, (d) => d.count);
      const circleGroup = svg.append('g').attr('filter', 'url(#gaussian-blur)');
      const colorScale = d3.scaleSequential(d3.interpolateCool).domain([0, maxValue]);
      const opacityScale = d3.scaleLinear().domain([0, maxValue]).range([0.00, 1.0]); // Adjust the range as needed

      circleGroup
          .selectAll('circle')
          .data(data)
          .enter()
          .append('circle')
          .attr('cx', (d) => d.x)
          .attr('cy', (d) => d.y)
          .attr('r', radius) // Circle radius
          .style('fill', (d) => colorScale(d.count))
          .style('fill-opacity', (d) => opacityScale(d.count));

      // Create the Gaussian blur filter
      svg
          .select('defs')
          .append('filter')
          .attr('id', 'gaussian-blur')
          .append('feGaussianBlur')
          .attr('in', 'SourceAlpha')
          .attr('stdDeviation', 3); // Adjust the standard deviation as needed

      // Determine the maximum "count" value in the dataset for the color scale domain

      // Create a color scale using a custom interpolation function

  }, [data]);

  return (
    <div>
      <svg ref={svgRef} width={500} height={500}>
        <defs>
          {/* The Gaussian blur filter will be defined here */}
        </defs>
      </svg>
    </div>
  );
}

export default TestHeatMap