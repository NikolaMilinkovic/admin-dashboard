/* 
    Admin Dashboard
    Written by Nikola Milinkovic
    As part of The Odin Project curriculum
 */

import { submitSearchBtn } from './js-modules/search.js';
import { main } from './js-modules/chartConstructors.js';
import { addNewYear,
        suggestLatestYear,
        changeDataSet,
        addMonthValue,
        nextYear,
        previousYear,
        nextMonth,
        previousMonth
        } from './js-modules/dashboard-pg-methods.js';



// Search icon button event listener
document.getElementById("submit-btn").addEventListener("click", submitSearchBtn);
document.getElementById('addYearValue').addEventListener('click', addNewYear);
document.getElementById('dm-year-picker').addEventListener("change", changeDataSet);
document.getElementById('addMonthValue').addEventListener('click', addMonthValue);


// Innitializes the default value of the chart
document.addEventListener('DOMContentLoaded', function() {
    main(changeDataSet("option1"));

});

// Inputs the year suggestion into the year input field
suggestLatestYear();

document.getElementById('btnNextYear').addEventListener('click', function(){
    nextYear();
    // setTimeout(() => {
    //     changeDataSet();
    // }, 100);
});
document.getElementById('btnPreviousYear').addEventListener('click', function(){
    previousYear();
    // setTimeout(() => {
    //     changeDataSet();
    // }, 100);
});

// Logic btnNextMonth & btnPreviousMonth
document.getElementById('btnNextMonth').addEventListener('click', nextMonth);
document.getElementById('btnPreviousMonth').addEventListener('click', previousMonth);


// ===============================[START OF COPY ON CLICK LOGIC]===============================

// Code that handles copy upon click on Q1,Q2,Q3,Q4 total data box
const statBoxes = Array.from(document.getElementsByClassName('stat-box'));
// Limits function to one running function at a time
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