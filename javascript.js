/* 
    Admin Dashboard
    Written by Nikola Milinkovic
    As part of The Odin Project curriculum
 */

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
// This code is responsible for creating the diagram inside the analytics-container

const { csv, select, scaleLinear, extent, axisLeft, axisBottom } = d3;
const container = select('.diagram-container');
const width = container.node().clientWidth;
const height = container.node().clientHeight;

// Data sets for each year
const chartData = [[
    { Month: "Jan", Sales: 26 },
    { Month: "Feb", Sales: 43 },
    { Month: "Mar", Sales: 33 },
    { Month: "Apr", Sales: 18 },
    { Month: "May", Sales: 22 },
    { Month: "Jun", Sales: 53 },
    { Month: "Jul", Sales: 45 },
    { Month: "Aug", Sales: 65 },
    { Month: "Sep", Sales: 51 },
    { Month: "Oct", Sales: 48 },
    { Month: "Nov", Sales: 76 },
    { Month: "Dec", Sales: 98 }
],[
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
],[
    { Month: "Jan", Sales: 145 },
    { Month: "Feb", Sales: 134 },
    { Month: "Mar", Sales: 110 },
    { Month: "Apr", Sales: 128 },
    { Month: "May", Sales: 46 },
    { Month: "Jun", Sales: 156 },
    { Month: "Jul", Sales: 190 },
    { Month: "Aug", Sales: 128 },
    { Month: "Sep", Sales: 93 },
    { Month: "Oct", Sales: 142 },
    { Month: "Nov", Sales: 102 },
    { Month: "Dec", Sales: 170 }
],[
    { Month: "Jan", Sales: 145 },
    { Month: "Feb", Sales: 134 },
    { Month: "Mar", Sales: 0 },
    { Month: "Apr", Sales: 0 },
    { Month: "May", Sales: 0 },
    { Month: "Jun", Sales: 0 },
    { Month: "Jul", Sales: 0 },
    { Month: "Aug", Sales: 0 },
    { Month: "Sep", Sales: 0 },
    { Month: "Oct", Sales: 0 },
    { Month: "Nov", Sales: 0 },
    { Month: "Dec", Sales: 0 }
]
];

function createNewDataSet(){
    chartData.push([
        { Month: "Jan", Sales: 0 },
        { Month: "Feb", Sales: 0 },
        { Month: "Mar", Sales: 0 },
        { Month: "Apr", Sales: 0 },
        { Month: "May", Sales: 0 },
        { Month: "Jun", Sales: 0 },
        { Month: "Jul", Sales: 0 },
        { Month: "Aug", Sales: 0 },
        { Month: "Sep", Sales: 0 },
        { Month: "Oct", Sales: 0 },
        { Month: "Nov", Sales: 0 },
        { Month: "Dec", Sales: 0 }
    ])
}

// ===============================[START OF CREATE NEW YEAR LOGIC]===============================

// Logic for adding new year to the data set
document.getElementById('addYearValue').addEventListener('click', addNewYear);

function addNewYear(){
    createNewDataSet();
    const dropdown = document.getElementById('dm-year-picker');
    const newOption = document.createElement('option');
    newOption.value = chartData.length-1;
    newOption.text = document.getElementById('valueInputYear').value;
    dropdown.appendChild(newOption);
    clearYearInput();
    suggestLatestYear();
    console.log(newOption.value)
}

// Clears the year input field
function clearYearInput(){
    const inputField = document.getElementById('valueInputYear');
    inputField.value = '';
    inputField.focus();
}

// Suggests the latest year in the add year input field
suggestLatestYear();
function suggestLatestYear(){
    const dropdown = document.getElementById('dm-year-picker');
    const suggestedYear = dropdown.lastElementChild.text;
    document.getElementById('valueInputYear').value = parseInt(suggestedYear) + 1;
}
// ===============================[END OF CREATE NEW YEAR LOGIC]===============================




// Logic for changing chart data sets
document.getElementById('dm-year-picker').addEventListener("change", changeDataSet);

// Funkcija za promenu data seta i ispis main funkcije sa tim vrednostima
function changeDataSet (){
    const selectedYear = document.getElementById('dm-year-picker').value;
    salesChartData = chartData[parseInt(selectedYear)];
    console.log(parseInt(selectedYear));
    console.log(chartData[parseInt(selectedYear)]);
    if (salesChartData) {
        main();
    }
    else
        console.log("salesChartDat not found");
}

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
// Kreiranje SVG-a
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

    const updateQSales = (salesChartData) => {
        const q1 = document.getElementById('q1-total-sales');
        const q2 = document.getElementById('q2-total-sales');
        const q3 = document.getElementById('q3-total-sales');
        const q4 = document.getElementById('q4-total-sales');

        // Assuming your data has a structure like:
        // { Month: "Jan", Sales: 126 }
        const salesByMonth = salesChartData.reduce((acc, curr) => {
            const month = curr.Month;
            const quarter = getQuarter(month); // You need to implement getQuarter function

            // Accumulate sales for each quarter
            acc[quarter] = (acc[quarter] || 0) + curr.Sales;

            return acc;
        }, {});

        // Update the content of your HTML elements
        q1.textContent = `${salesByMonth['Q1'] || 0}`;
        q2.textContent = `${salesByMonth['Q2'] || 0}`;
        q3.textContent = `${salesByMonth['Q3'] || 0}`;
        q4.textContent = `${salesByMonth['Q4'] || 0}`;
    };

    // Call the updateQSales function with your data after the chart is drawn
    updateQSales(salesChartData);
    calcQStats();
};

main();

// Function to get the quarter from the month
function getQuarter(month) {
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
// Innitializes the default value of the chart
changeDataSet();
// ===============================[END OF DIAGRAM GENERATION LOGIC]===============================


// ===============================[START OF ADD MONTH VALUE LOGIC]===============================
// Logic for adding new values to diagram
document.getElementById('addMonthValue').addEventListener('click', addMonthValue);
function addMonthValue(){
    let selectedYear = document.getElementById('dm-year-picker').value;
    let selectedMonth = document.getElementById('dm-month-picker').value;
    let userInput = document.getElementById('valueInput').value;
    let monthIndex;
    console.log(selectedMonth)

    monthIndex = chartData[parseInt(selectedYear)].findIndex(entry => entry.Month === selectedMonth);
    console.log(chartData[parseInt(selectedYear)]);
    if(monthIndex !== -1){
        chartData[parseInt(selectedYear)][monthIndex].Sales = Math.abs(parseInt(userInput)) || 0;
    }
    main();
    clearMonthInput();
    calcQStats();
    
};

// Clears the month input field
function clearMonthInput(){
    const inputField = document.getElementById('valueInput');
    inputField.value = '';
    inputField.focus();
}
// ===============================[END OF ADD MONTH VALUE LOGIC]===============================


// Logic btnNextYear & btnPreviousYear
document.getElementById('btnNextYear').addEventListener('click', function(){
    nextYear();
    setTimeout(() => {
        main();
    }, 100);
});
document.getElementById('btnPreviousYear').addEventListener('click', function(){
    previousYear();
    setTimeout(() => {
        main();
    }, 100);
});
let yearPicker = document.getElementById('dm-year-picker');
let selectedYearIndex;

function nextYear(){
    selectedYearIndex = yearPicker.selectedIndex;
    // Calculate the next index (looping back to the first if at the end)
    let nextIndex = (selectedYearIndex + 1) % 12;
    yearPicker.value = yearPicker.options[nextIndex].value;
    changeDataSet();
    calcQStats();
}
function previousYear(){
    selectedYearIndex = yearPicker.selectedIndex;
    // Calculate the next index (looping back to the first if at the end)
    let previousIndex = (selectedYearIndex - 1 + 12) % 12;
    yearPicker.value = yearPicker.options[previousIndex].value;
    changeDataSet();
    calcQStats();
}

// Logic btnNextMonth & btnPreviousMonth
document.getElementById('btnNextMonth').addEventListener('click', nextMonth);
document.getElementById('btnPreviousMonth').addEventListener('click', previousMonth);
let monthPicker = document.getElementById('dm-month-picker');
let selectedMonthIndex;

function nextMonth(){
    selectedMonthIndex = monthPicker.selectedIndex;
    // Calculate the next index (looping back to the first if at the end)
    let nextIndex = (selectedMonthIndex + 1) % 12;
    monthPicker.value = monthPicker.options[nextIndex].value;
}
function previousMonth(){
    selectedMonthIndex = monthPicker.selectedIndex;
    // Calculate the next index (looping back to the first if at the end)
    let previousIndex = (selectedMonthIndex - 1) % 12;
    monthPicker.value = monthPicker.options[previousIndex].value;
}

// Logic for calculating Q-statistics
function calcQStats(){
    let Q1 = document.getElementById('q1-total-sales').textContent;
    let Q2 = document.getElementById('q2-total-sales').textContent;
    let Q3 = document.getElementById('q3-total-sales').textContent;
    let Q4 = document.getElementById('q4-total-sales').textContent;
    const q1q2 = document.getElementById('q-comparison-1');
    const q2q3 = document.getElementById('q-comparison-2');
    const q3q4 = document.getElementById('q-comparison-3');
    if(calculatePercentageDifference(Q1, Q2)>= 0){
        q1q2.textContent = `Sales increased ${calculatePercentageDifference(Q1, Q2)}%`;
        q1q2.style.color = 'forestgreen';
    }
    else if(isNaN(calculatePercentageDifference(Q1, Q2))){
        q1q2.textContent = `Data not available`;
        q1q2.style.color = '#728197';
    }
    else{
        q1q2.textContent = `Sales decreased ${calculatePercentageDifference(Q1, Q2)}%`;
        q1q2.style.color = 'crimson';
    }

    if(calculatePercentageDifference(Q2, Q3)>= 0){
        q2q3.textContent = `Sales increased ${calculatePercentageDifference(Q2, Q3)}%`;
        q2q3.style.color = 'forestgreen';
    }
    else if(isNaN(calculatePercentageDifference(Q2, Q3))){
        q2q3.textContent = `Data not available`;
        q2q3.style.color = '#728197';
    }
    else{
        q2q3.textContent = `Sales decreased ${calculatePercentageDifference(Q2, Q3)}%`;
        q2q3.style.color = 'crimson';
    }

    if(calculatePercentageDifference(Q3, Q4)>= 0){
        q3q4.textContent = `Sales increased ${calculatePercentageDifference(Q3, Q4)}%`;
        q3q4.style.color = 'forestgreen';
    }
    else if(isNaN(calculatePercentageDifference(Q3, Q4))){
        q3q4.textContent = `Data not available`;
        q3q4.style.color = '#728197';
    }
    else{
        q3q4.textContent = `Sales decreased ${calculatePercentageDifference(Q3, Q4)}%`;
        q3q4.style.color = 'crimson';
    }
}

function calculatePercentageDifference(firstValue, secondValue) {
    if (firstValue === 0) {
        // Handle the case where the old value is zero to avoid division by zero
        return secondValue === 0 ? 0 : Infinity;
    }

    const percentageDifference = (secondValue - firstValue) / firstValue * 100;
    if (percentageDifference < 0){
        return `${parseFloat(percentageDifference.toFixed(2))}`;
    }
    else{
        return `${parseFloat(percentageDifference.toFixed(2))}`;
    }
}

// ===============================[START OF COPY ON CLICK LOGIC]===============================

// Code that handles copy upon click on Q1,Q2,Q3,Q4 total data box
const statBoxes = Array.from(document.getElementsByClassName('stat-box'));

let isFunctionRunning = false;

// Adds event listener for each box
statBoxes.forEach(statBox =>{
    statBox.addEventListener('click', function() {

        // Copies the isntance of text
        let copyText = `${this.querySelector('.stat-box-header').innerText} ${this.querySelector('.stat-box-header-2').innerText}: ${this.querySelector('.copyOnClick').innerText}`;
        const copyContent = async () => {
            try{
                if (isFunctionRunning === true)
                    return;
                    await navigator.clipboard.writeText(copyText);
                    isFunctionRunning = true;

                copyText = this.querySelector('.copyOnClick').innerText;
                // Color change & text display
                this.style.transition = 'background-color 0.2s ease-in-out, color 0.2s ease-in-out';
                this.querySelector('.copyOnClick').innerText = 'Value copied!';
                this.querySelector('.copyOnClick').style.fontSize = '18px';
                this.style.backgroundColor = '#695BD1';
                this.style.color = '#d4d4d4';
                setTimeout(() => {
                    this.style.backgroundColor = '';
                    this.style.color = '';
                    this.querySelector('.copyOnClick').innerText = copyText;
                    this.querySelector('.copyOnClick').style.fontSize = '';
                    isFunctionRunning = false;
                }, 500);
            }
            catch(err){
                console.error('Copy to clipboard failed: ', err);
            }
        }
        copyContent();
    });
})

// Code that handles copy upon click on Q comparison boxes
const QCompBoxes = Array.from(document.getElementsByClassName('q-comparison-container'));

// Adds event listener for each box
QCompBoxes.forEach(qBox =>{
    qBox.addEventListener('click', function() {

        // Copies the isntance of text
        let copyText = `${this.querySelector('.q-comparison-label').innerText} ${this.querySelector('.q-comparison').innerText}`;
        const copyContent = async () => {
            try{
                if (isFunctionRunning === true)
                    return;
                await navigator.clipboard.writeText(copyText);
                isFunctionRunning = true;
                copyText = this.querySelector('.q-comparison').innerText;

                // Color change & text display
                this.style.transition = 'background-color 0.2s ease-in-out, color 0.2s ease-in-out';
                this.querySelector('.q-comparison').innerText = 'Value copied!';
                this.querySelector('.q-comparison').style.fontSize = '18px';
                let getColor = this.querySelector('.q-comparison').style.color;
                let getLabelColor = this.querySelector('.q-comparison-label').style.color;
                this.querySelector('.q-comparison').style.color = '#d4d4d4';
                this.querySelector('.q-comparison-label').style.color = '#d4d4d4';
                this.style.backgroundColor = '#695BD1';
                this.style.color = '#d4d4d4';
                setTimeout(() => {
                    this.style.backgroundColor = '';
                    this.style.color = '';
                    this.querySelector('.q-comparison').innerText = copyText;
                    this.querySelector('.q-comparison').style.fontSize = '';
                    this.querySelector('.q-comparison').style.color = getColor;
                    this.querySelector('.q-comparison-label').style.color = getLabelColor;
                    isFunctionRunning = false;

                }, 500);
            }
            catch(err){
                console.error('Copy to clipboard failed: ', err);
            }
        }
        copyContent();
    });
})
// ===============================[END OF COPY ON CLICK LOGIC]===============================




// ===============================[START OF CARDS LOGIC AND ANALYTICS DISPLAY]===============================
document.getElementById('option1').classList.add('active');
document.getElementById('default-svg').style.filter = 'invert(35%) sepia(66%) saturate(506%) hue-rotate(207deg) brightness(105%) contrast(112%)';

// Chart select cards logic & analytics container display
document.addEventListener('DOMContentLoaded', function () {

const cards = document.querySelectorAll('.card');

    cards.forEach(function (button){
        button.addEventListener('click', function(){

            handleClick(button.id);

            cards.forEach(function (btn){
                btn.classList.remove('active');
                
            })

            cards.forEach(function (card){
                const svg = card.querySelector('.card-svg');
                if (svg)
                    svg.style.filter = '';
            })

            button.classList.add('active');
            const svg = button.querySelector('.card-svg');
            if (svg){
                const isActive = button.classList.contains('active');
                svg.style.filter = isActive ? 'invert(35%) sepia(66%) saturate(506%) hue-rotate(207deg) brightness(105%) contrast(112%)' : '';
            }
        });
    });

    function removeAllAttributes() {
        svg.selectAll('.tick line').remove();
        svg.selectAll('circle').remove();
        svg.selectAll('text').remove();
        svg.selectAll('path').remove();
    }


    let selectedYear = document.getElementById('dm-year-picker').value;
    function handleClick(optionId) {
        switch(optionId){
            case "option1":
                removeAllAttributes();
                main();
                changeDataSet();
                calcQStats();
            break;
            case "option2":
                removeAllAttributes();
            break;
            case "option3":
                removeAllAttributes();
            break;
            case "option4":
                removeAllAttributes();
            break;
        }

    }
});
// ===============================[END OF CARDS LOGIC AND ANALYTICS DISPLAY]===============================

