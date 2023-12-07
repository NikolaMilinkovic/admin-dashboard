
/* 
    Admin Dashboard
    Written by Nikola Milinkovic
    As part of The Odin Project curriculum
 */

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

const earningsPerMonth = [
    [
        { Month: "Jan", Earnings: 2600 },
        { Month: "Feb", Earnings: 8690 },
        { Month: "Mar", Earnings: 14850 },
        { Month: "Apr", Earnings: 5682 },
        { Month: "May", Earnings: 9951 },
        { Month: "Jun", Earnings: 12204 },
        { Month: "Jul", Earnings: 33771 },
        { Month: "Aug", Earnings: 45403 },
        { Month: "Sep", Earnings: 36561 },
        { Month: "Oct", Earnings: 42148 },
        { Month: "Nov", Earnings: 30826 },
        { Month: "Dec", Earnings: 46834 }
    ],
    [
        { Month: "Jan", Earnings: 4765 },
        { Month: "Feb", Earnings: 5862 },
        { Month: "Mar", Earnings: 4282 },
        { Month: "Apr", Earnings: 6763 },
        { Month: "May", Earnings: 10469 },
        { Month: "Jun", Earnings: 9038 },
        { Month: "Jul", Earnings: 13497 },
        { Month: "Aug", Earnings: 9895 },
        { Month: "Sep", Earnings: 15042 },
        { Month: "Oct", Earnings: 8501 },
        { Month: "Nov", Earnings: 6874 },
        { Month: "Dec", Earnings: 8937 }
    ],
    [
        { Month: "Jan", Earnings: 9881 },
        { Month: "Feb", Earnings: 9126 },
        { Month: "Mar", Earnings: 7936 },
        { Month: "Apr", Earnings: 10151 },
        { Month: "May", Earnings: 2047 },
        { Month: "Jun", Earnings: 10401 },
        { Month: "Jul", Earnings: 24208 },
        { Month: "Aug", Earnings: 10447 },
        { Month: "Sep", Earnings: 3426 },
        { Month: "Oct", Earnings: 19371 },
        { Month: "Nov", Earnings: 5519 },
        { Month: "Dec", Earnings: 14561 }
    ],
    [
        { Month: "Jan", Earnings: 14193 },
        { Month: "Feb", Earnings: 13102 },
        { Month: "Mar", Earnings: 0 },
        { Month: "Apr", Earnings: 0 },
        { Month: "May", Earnings: 0 },
        { Month: "Jun", Earnings: 0 },
        { Month: "Jul", Earnings: 0 },
        { Month: "Aug", Earnings: 0 },
        { Month: "Sep", Earnings: 0 },
        { Month: "Oct", Earnings: 0 },
        { Month: "Nov", Earnings: 0 },
        { Month: "Dec", Earnings: 0 }
    ]
];



export function createNewDataSet(activeCardId){
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

export function getChartData(activeCardId){

    switch(activeCardId){
        case "option1":
            return chartData;
        break;
        case "option2":
            return earningsPerMonth;
        break;
        case "option3":
            return chartData;
        break;
        case "option4":
            return chartData;
        break;
    }
}