
/* 
    Admin Dashboard
    Written by Nikola Milinkovic
    As part of The Odin Project curriculum
 */

import { main, removeAllAttributes, svg } from './chartConstructors.js';
import { createNewDataSet, getChartData } from './chartData.js';
import { generateBarChart  } from './barChart.js';
const { select } = d3;

// On click methods that return the id of the button
let activeCardId = 'option1';
document.getElementById('option1').addEventListener("click", getActiveCardId =>{
    activeCardId = 'option1';
});
document.getElementById('option2').addEventListener("click", getActiveCardId =>{
    activeCardId = 'option2';
});
document.getElementById('option3').addEventListener("click", getActiveCardId =>{
    activeCardId = 'option3';
});
document.getElementById('option4').addEventListener("click", getActiveCardId =>{
    activeCardId = 'option4';
});

let chartData = getChartData(activeCardId);
var salesChartData = [];

// Logic for adding new year to the data set
export function addNewYear(){
    createNewDataSet();
    const dropdown = document.getElementById('dm-year-picker');
    const newOption = document.createElement('option');
    newOption.value = chartData.length-1;
    newOption.text = document.getElementById('valueInputYear').value;
    dropdown.appendChild(newOption);
    clearYearInput();
    suggestLatestYear();
    
}

// Clears the year input field
export function clearYearInput(){
    const inputField = document.getElementById('valueInputYear');
    inputField.value = '';
    inputField.focus();
}

// Suggests the latest year in the add year input field
export function suggestLatestYear(){
    const dropdown = document.getElementById('dm-year-picker');
    const suggestedYear = dropdown.lastElementChild.text;
    document.getElementById('valueInputYear').value = parseInt(suggestedYear) + 1;
}

// Logic for changing chart data sets
// Funkcija za promenu data seta i ispis main funkcije sa tim vrednostima
export function changeDataSet(optionId){
    const selectedYear = document.getElementById('dm-year-picker').value;
    
    switch(optionId){
        case "option1":
            chartData = getChartData(activeCardId);
            salesChartData = chartData[parseInt(selectedYear)];
            return salesChartData;
        break;
        case "option2":
            chartData = getChartData(activeCardId);
            salesChartData = chartData[parseInt(selectedYear)];
            return salesChartData;
        break;
        case "option3":
            chartData = getChartData(activeCardId);
            salesChartData = chartData[parseInt(selectedYear)];
            return salesChartData;
        break;
        case "option4":
            chartData = getChartData(activeCardId);
            salesChartData = chartData[parseInt(selectedYear)];
            return salesChartData;
        break;
    }
}

// Function for generating charts => Used for buttons next & previous year       
function plotChart(activeCardId){
    switch(activeCardId){
        case "option1":
            removeAllAttributes();
            main(changeDataSet(activeCardId));
        break;
        case "option2":
            removeAllAttributes();
            barChart(changeDataSet(activeCardId));
            // calcQStats();
        break;
        case "option3":
            removeAllAttributes();
            // generatePieChart();
            // calcQStats();
        break;
        case "option4":
            removeAllAttributes();
            
            // calcQStats();
        break;
    }
}

// ===============================[BTNS NEXT YEAR / PREVIOUS YEAR]===============================
// Logic btnNextYear & btnPreviousYear
let yearPicker = document.getElementById('dm-year-picker');

let selectedYearIndex;
export function nextYear(){
    selectedYearIndex = yearPicker.selectedIndex;
    // Calculate the next index (looping back to the first if at the end)
    let nextIndex = (selectedYearIndex + 1) % 12;
    yearPicker.value = yearPicker.options[nextIndex].value;
    removeAllAttributes();
    plotChart(activeCardId);
    calcQStats();
}
export function previousYear(){
    selectedYearIndex = yearPicker.selectedIndex;
    // Calculate the next index (looping back to the first if at the end)
    let previousIndex = (selectedYearIndex - 1 + 12) % 12;
    yearPicker.value = yearPicker.options[previousIndex].value;
    removeAllAttributes();
    plotChart(activeCardId);
    calcQStats();
}
// ===============================[END OF BTNS NEXT YEAR / PREVIOUS YEAR]===============================





// ===============================[BTNS NEXT MONTH / PREVIOUS MONTH]===============================
// Logic btnNextMonth & btnPreviousMonth
let monthPicker = document.getElementById('dm-month-picker');
let selectedMonthIndex;

export function nextMonth(){
    selectedMonthIndex = monthPicker.selectedIndex;
    // Calculate the next index (looping back to the first if at the end)
    let nextIndex = (selectedMonthIndex + 1) % 12;
    monthPicker.value = monthPicker.options[nextIndex].value;
}
export function previousMonth(){
    selectedMonthIndex = monthPicker.selectedIndex;
    let previousIndex = (selectedMonthIndex - 1) % 12;
    monthPicker.value = monthPicker.options[previousIndex].value;
}
// ===============================[END OF BTNS NEXT MONTH / PREVIOUS MONTH]===============================






// ===============================[START OF ADD MONTH VALUE LOGIC]===============================
// Logic for adding new values to diagram
export function addMonthValue(){
    let selectedYear = document.getElementById('dm-year-picker').value;
    let selectedMonth = document.getElementById('dm-month-picker').value;
    let userInput = document.getElementById('valueInput').value;
    let monthIndex;
    const dataType = Object.keys(chartData[0][0])[1];
    switch(dataType){
        case "Sales":
            monthIndex = chartData[parseInt(selectedYear)].findIndex(entry => entry.Month === selectedMonth);
            if(monthIndex !== -1){
            chartData[parseInt(selectedYear)][monthIndex].Sales = Math.abs(parseInt(userInput)) || 0;
            }
        break;
        case "Earnings":
            monthIndex = chartData[parseInt(selectedYear)].findIndex(entry => entry.Month === selectedMonth);
            if(monthIndex !== -1){
            chartData[parseInt(selectedYear)][monthIndex].Earnings = Math.abs(parseInt(userInput)) || 0;
            }
        break
    }

    plotChart(activeCardId);
    clearMonthInput();
};

// Clears the month input field
export function clearMonthInput(){
    const inputField = document.getElementById('valueInput');
    inputField.value = '';
    inputField.focus();
}
// ===============================[END OF ADD MONTH VALUE LOGIC]===============================


// Logic for calculating Q-statistics
export function calcQStats(){
    const dataType = Object.keys(chartData[0][0])[1];
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

// Logic for calculating percentage difference between the quarters
export function calculatePercentageDifference(firstValue, secondValue) {
    firstValue = parseFloat(firstValue.replace(/[^0-9.-]+/g, ''));
    secondValue = parseFloat(secondValue.replace(/[^0-9.-]+/g, ''));
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

    removeAllAttributes();


    let selectedYear = document.getElementById('dm-year-picker').value;
    function handleClick(optionId) {
        switch(optionId){
            case "option1":
                removeAllAttributes();
                main(changeDataSet(optionId));
                calcQStats();
            break;
            case "option2":
                removeAllAttributes();
                barChart(changeDataSet(optionId));
                // calcQStats();
            break;
            case "option3":
                removeAllAttributes();
                // generatePieChart();
                // calcQStats();
            break;
            case "option4":
                removeAllAttributes();
                
                // calcQStats();
            break;
        }

    }
});
// ===============================[END OF CARDS LOGIC AND ANALYTICS DISPLAY]===============================



// ===============================[START OF BAR CHART GENERATION DATA & LOGIC]===============================

const container = select('.diagram-container');
const width = container.node().clientWidth;
const height = container.node().clientHeight;
function barChart(data) {
    svg.call(generateBarChart()
            .width(width)
            .height(height)
            .data(data)
            .xValue ((data)=> data.Month)
            .yValue ((data)=> data.Earnings)
            .margin({
                top: 20,
                right: 20,
                bottom: 40,
                left: 50,
            })
        );  
}
// ===============================[END OF BAR CHART GENERATION DATA & LOGIC]===============================
