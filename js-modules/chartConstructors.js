
/* 
    Admin Dashboard
    Written by Nikola Milinkovic
    As part of The Odin Project curriculum
 */

import { calcQStats } from './dashboard-pg-methods.js';
import { getChartData } from './chartData.js';


// Analytics-container
// This code is responsible for creating the diagram inside the analytics-container
const { select } = d3;
const container = select('.diagram-container');
const width = container.node().clientWidth;
const height = container.node().clientHeight;

// Kreiranje SVG-a
export const svg = select('.diagram-container')
.append('svg')
.attr('height', height)
.attr('width', width);


// ===============================[START OF DIAGRAM GENERATION LOGIC]===============================
// Varijabla koja se koristi prilikom izrade diagrama
var salesChartData = [];
const xValue = (data)=> data.Month;
const yValue = (data)=> data.Sales;
const margin = {
    top: 40, 
    right: 40, 
    bottom: 40, 
    left: 40,
};


export const main = (salesChartData) => {
    const data = salesChartData;
    // Use an ordinal scale for the x-axis
    const x = d3.scaleBand()
        .domain(data.map(xValue))
        .range([margin.left, width - margin.right])
        .padding(0.1); // Adjust padding as needed

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, yValue)])
        .range([height - margin.bottom, margin.top]);

    const mark = data.map(d => ({
        x: x(xValue(d)) + x.bandwidth() / 2, // Adjust x position
        y: y(yValue(d)),
        p_x: xValue(d),
        p_y: yValue(d),
    }));

    svg.selectAll('.tick line').remove();

    // Append circles
    svg.selectAll('circle')
        .data(mark)
        .join('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 5)
        .attr('fill', '#695BD1')
        .append('title')
        .text(d => `(${d.p_x}, ${d.p_y})`);

    // Append labels
    svg.selectAll('text')
        .data(mark)
        .join('text')
        .text(d => d.p_y)
        .attr('x', d => x(d.p_x) + x.bandwidth() / 2)
        .attr('y', d => d.y - 15) // Adjust the vertical position as needed
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('fill', 'white');

    // Postavlja linije izmedju tacaka
    const lineGenerator = d3.line()
        .x(d => d.x)
        .y(d => d.y);

    svg.selectAll('path').remove();

    svg.append('path')
        .datum(mark)
        .attr('d', lineGenerator)
        .attr('fill', 'none')
        .attr('stroke', '#695BD1')
        .attr('stroke-width', 2);

    // Postavljanje x i y axis-a
    const xAxis = svg.append('g')
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

    const yAxis = svg.append('g')
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

    // Call the updateQSales function with your data after the chart is drawn
    updateQSales(salesChartData);
    calcQStats();
};


let formater;
function getFormater(dataType){
    switch(dataType){
        case "Sales":
            formater = "";
        break;
        case "Earnings":
            formater = "$";
        break
    }
}

export function updateQSales(salesChartData){
    const q1 = document.getElementById('q1-total-sales');
    const q2 = document.getElementById('q2-total-sales');
    const q3 = document.getElementById('q3-total-sales');
    const q4 = document.getElementById('q4-total-sales');

    const salesByMonth = salesChartData.reduce((acc, curr) => {
        const month = curr.Month;
        const quarter = getQuarter(month);
        const dataType = Object.keys(salesChartData[0])[1];
        switch(dataType){
            case "Sales":
                getFormater(dataType);
                // Accumulate sales for each quarter
                acc[quarter] = (acc[quarter] || 0) + curr.Sales;
                return acc;
            break;
            case "Earnings":
                getFormater(dataType);
                // Accumulate sales for each quarter
                acc[quarter] = (acc[quarter] || 0) + curr.Earnings;
                return acc;
            break
        }
        
    }, {});


    // Update the content of your HTML elements
    q1.textContent = `${salesByMonth['Q1']?.toLocaleString() + formater || 0}`;
    q2.textContent = `${salesByMonth['Q2']?.toLocaleString() + formater || 0}`;
    q3.textContent = `${salesByMonth['Q3']?.toLocaleString() + formater || 0}`;
    q4.textContent = `${salesByMonth['Q4']?.toLocaleString() + formater || 0}`;
};


// Function to get the quarter from the month
export function getQuarter(month) {
    const quarterMap = {
        'Jan': 'Q1',
        'Feb': 'Q1',
        'Mar': 'Q1',
        'Apr': 'Q2',
        'May': 'Q2',
        'Jun': 'Q2',
        'Jul': 'Q3',
        'Aug': 'Q3',
        'Sep': 'Q3',
        'Oct': 'Q4',
        'Nov': 'Q4',
        'Dec': 'Q4',
    };
    return quarterMap[month] || 'Unknown';
}

// Function that clears the svg of the screen
export function removeAllAttributes() {
    svg.selectAll('.tick line').remove();
    svg.selectAll('circle').remove();
    svg.selectAll('text').remove();
    svg.selectAll('path').remove();
    svg.selectAll('rect').remove();
}
// ===============================[END OF DIAGRAM GENERATION LOGIC]===============================