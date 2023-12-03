

// Search input field animation
const searchField = document.getElementById("search-input");
const submitBtn = document.getElementById("submit-btn").addEventListener("click", function() {

    searchField.classList.toggle("active-search-field");
    if(searchField.classList.contains("active-search-field")){
        searchField.classList.remove("inactive-search-field");
    }else{
        searchField.classList.add("inactive-search-field");
    }
});

// Analytics-container
const { csv, select, scaleLinear, extent, axisLeft, axisBottom } = d3;
const container = select('.diagram-container');
const width = container.node().clientWidth;
const height = container.node().clientHeight;

// Data set
const salesChartData = [
    { Month: "Jan", Sales: 126 },
    { Month: "Feb", Sales: 143 },
    { Month: "Mar", Sales: 110 },
    { Month: "Apr", Sales: 98 },
    { Month: "May", Sales: 164 },
    { Month: "Jun", Sales: 156 },
    { Month: "Jul", Sales: 190 },
    { Month: "Aug", Sales: 118 },
    { Month: "Sep", Sales: 123 },
    { Month: "Oct", Sales: 142 },
    { Month: "Nov", Sales: 122 },
    { Month: "Dec", Sales: 110 }
];
const xValue = (data)=> data.Month;
const yValue = (data)=> data.Sales;
const margin = {
    top: 40, 
    right: 40, 
    bottom: 40, 
    left: 40,
};
const svg = select('.diagram-container')
            .append('svg')
            .attr('height', height)
            .attr('width', width);

const main = () => {
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
};

main();
