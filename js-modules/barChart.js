import { getChartData } from './chartData.js';
import { getQuarter, updateQSales } from './chartConstructors.js';
import { calcQStats } from './dashboard-pg-methods.js';

 
const {
    scaleLinear,
    extent,
    select,
    scaleBand
} = d3;
const formatCurrency = d3.format(',.0f');
// Analytics-container
// This code is responsible for creating the diagram inside the analytics-container
const container = select('.diagram-container');
const chartData = getChartData();

var salesChartData = [];


export const generateBarChart = () => {
    let width = container.node().clientWidth;
    let height = container.node().clientHeight;
    let data;
    let xValue;
    let yValue;
    let margin;


    // Glavna funkcija za kreiranje bar charta na osvnou poslatih vrednosti
    const barChart = (selection) => {  
    // Code responsible for generating the bar chart    
        const x = scaleBand()
        .domain(data.map(xValue))
        .range([margin.left, width - margin.right])
        .padding(0.1); // Adjust padding as needed
      
        const y = scaleLinear()
          .domain(extent(data, yValue))
          .range([height - margin.bottom, margin.top]);
      
        const marks = data.map((d) => ({
          x: x(xValue(d)),
          y: y(yValue(d)),
          p_x: xValue(d),
          p_y: yValue(d),
        }));
      
        selection
            .append('g')
            .attr('fill', 'royalblue')
            .selectAll('rect')
            .data(marks)
            .join('rect')
            .attr('x', (d) => d.x)
            .attr('y', (d) => d.y)
            .attr('height',(d) => height - margin.bottom - d.y)
            .attr('width', x.bandwidth());

        // Append labels
            selection.selectAll('text')
            .data(marks)
            .join('text')
            .text(d => `${formatCurrency(d.p_y)} $`)
            .attr('x', d => x(d.p_x) + x.bandwidth()/2)
            .attr('y', d => d.y - 10) // Adjust the vertical position as needed
            .attr('text-anchor', 'middle')
            .attr('font-size', '12px')
            .attr('fill', 'white');


            // Postavljanje x i y axis-a
            const xAxis = selection.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x));

            // Style x-axis path and ticks
            xAxis.select('path')
            .style('stroke', 'white'); // Change x-axis line color

            xAxis.selectAll('.tick line')
                .style('stroke', 'white'); // Change x-axis tick color

            xAxis.selectAll('text')
                .attr('transform', 'rotate(-45)')
                .style('text-anchor', 'end')
                .style('font-size', '12px')
                .style('fill', 'white');

            const yAxis = selection.append('g')
                .attr('transform', `translate(${margin.left},0)`)
                .call(d3.axisLeft(y));

            // Style y-axis path and ticks
            yAxis.select('path')
                .style('stroke', 'white'); // Change y-axis line color

            yAxis.selectAll('.tick line')
                .style('stroke', 'white'); // Change y-axis tick color

            yAxis.selectAll('text')
                .style('font-size', '12px')
                .style('fill', 'white');

            // Remove y-axis line
            yAxis.select('.domain').remove();

        updateQSales(data);
        calcQStats();
    };

    

    // Width setter
    barChart.width = function(value){
        return arguments.length ? ((width = +value), barChart) : width;
    };
    // Height setter
    barChart.height = function(value){
        return arguments.length ? ((height = +value), barChart) : height;
    }
    // Data setter
    barChart.data = function(value){
        return arguments.length ? ((data = value), barChart) : data;
    }
    // xValue setter
    barChart.xValue = function(value){
        return arguments.length ? ((xValue = value), barChart) : xValue;
    }
    // yValue setter
    barChart.yValue = function(value){
        return arguments.length ? ((yValue = value), barChart) : yValue;
    }
    // margin setter
    barChart.margin = function(value){
        return arguments.length ? ((margin = value), barChart) : margin;
    }


    return barChart;
};