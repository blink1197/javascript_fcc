let price = 3.26;

let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];


// Declaration of HTML Elements
const totalPriceDisplay = document.getElementById('price');
totalPriceDisplay.textContent = `${price}`;

const cash = document.getElementById('cash');
const changeDue = document.getElementById('change-due');
const purchaseButton = document.getElementById('purchase-btn');


// Functions
const calculateChangeCountInDrawer = (array) => {
    for (const denomination of array) {

        switch (denomination[0]) {
            case "PENNY":
                denomination.push(Number((denomination[1] / 0.01).toFixed(0)));
                denomination.push(0.01);
                break;
            case "NICKEL":
                denomination.push(Number((denomination[1] / 0.05).toFixed(0)));
                denomination.push(0.05);
                break;
            case "DIME":
                denomination.push(Number((denomination[1] / 0.1).toFixed(0)));
                denomination.push(0.1);
                break;
            case "QUARTER":
                denomination.push(Number((denomination[1] / 0.25).toFixed(0)));
                denomination.push(0.25);
                break;
            case "ONE":
                denomination.push(Number((denomination[1] / 1).toFixed(0)));
                denomination.push(1);
                break;
            case "FIVE":
                denomination.push(Number((denomination[1] / 5).toFixed(0)));
                denomination.push(5);
                break;
            case "TEN":
                denomination.push(Number((denomination[1] / 10).toFixed(0)));
                denomination.push(10);
                break;
            case "TWENTY":
                denomination.push(Number((denomination[1] / 20).toFixed(0)));
                denomination.push(20);
                break;
            case "ONE HUNDRED":
                denomination.push(Number((denomination[1] / 100).toFixed(0)));
                denomination.push(100);
                break;
            default:
                break;
        }

    }
}

const calculateChange  = (cash) => {
    const changeStr = (cash - price).toFixed(2);
    let changeFloat = parseFloat(changeStr);
    let cidTemp = JSON.parse(JSON.stringify(cid));
    cid = cid.reverse();
    calculateChangeCountInDrawer(cid);
    let changeArray = [];

    for (const denomination of cid) {
        const j = denomination[2];
        for (let i = 0; i < j; i++) {
            if (changeFloat - denomination[3] >= 0) {
                changeFloat = Number((changeFloat - denomination[3]).toFixed(2));
                changeArray.push([denomination[0], denomination[3]]);
                denomination[2] -= 1;
                denomination[1] = Number((denomination[2] * denomination[3]).toFixed(2));
            } else {
                break;
            }
        }
        
    }
    
    let summarizedChangeArray = [];
    let summaryObject = {};

    for (let [currency, amount] of changeArray) {
        if (summaryObject.hasOwnProperty(currency)) {
            summaryObject[currency] = Number((summaryObject[currency] + amount).toFixed(2));
        } else {
            summaryObject[currency] = amount;
        }
    }

    for (let currency in summaryObject) {
        summarizedChangeArray.push([currency, summaryObject[currency]]);
    }

    cid.reverse();
    
    if (changeFloat === 0) {
        return summarizedChangeArray;
    } else {
        cid = cidTemp;
        console.log(cid);
        return false;
    }
    
}


const updateChangeCount = () => {
    const pennyCount = document.getElementById('pennyCount');
    pennyCount.textContent = `Penny: $ ${cid[0][1]}`;
    const nickelCount = document.getElementById('nickelCount');
    nickelCount.textContent = `Nickel: $ ${cid[1][1]}`;
    const dimeCount = document.getElementById('dimeCount');
    dimeCount.textContent = `Dime: $ ${cid[2][1]}`;
    const quarterCount = document.getElementById('quarterCount');
    quarterCount.textContent = `Quarter: $ ${cid[3][1]}`;
    const dollarCount = document.getElementById('dollarCount');
    dollarCount.textContent = `Dollar: $ ${cid[4][1]}`;
    const fiveDollarCount = document.getElementById('fiveDollarCount');
    fiveDollarCount.textContent = `Five Dollars: $ ${cid[5][1]}`;
    const tenDollarCount = document.getElementById('tenDollarCount');
    tenDollarCount.textContent = `Ten Dollars: $ ${cid[6][1]}`;
    const twentyDollarCount = document.getElementById('twentyDollarCount');
    twentyDollarCount.textContent = `Twenty Dollars: $ ${cid[7][1]}`;
    const hundredDollarCount = document.getElementById('hundredDollarCount');
    hundredDollarCount.textContent = `One Hundred Dollars: $ ${cid[8][1]}`;
}


const countRemainingChangeinDrawer = (array) => {
    let total = 0;
    for (const cash of array) {
        total += cash[1];
    }
    return total;
}


const mainFunction = () => {
    changeDue.style.display = 'none';

    if (Number(cash.value < price)) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    if (Number(cash.value == price)) {
        changeDue.style.display = 'block';
        changeDue.innerHTML = `
            <p>No change due - customer paid with exact cash</p>
        `;
        return;
    } 
    
    const changeForDisplay = calculateChange(cash.value);
    if (changeForDisplay) {
        changeDue.style.display = 'block';
        let htmlString = '';
        changeForDisplay.forEach(item => {
            let currency = item[0];
            let amount = item[1];
            htmlString += `<p>${currency}: $${amount}</p>`;
        });

        changeDue.innerHTML = countRemainingChangeinDrawer(cid) === 0
            ? `<p>"Status: CLOSED"</p>`
            : `<p>"Status: OPEN"</p>`;
        
        changeDue.innerHTML += htmlString;

    } else {
        changeDue.style.display = 'block';
        changeDue.innerHTML = `
            <p>Status: INSUFFICIENT_FUNDS</p>
        `;
        return;
        
    }
    
    updateChangeCount();
}

// Event Listeners

purchaseButton.addEventListener('click', () => {
    mainFunction();
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        mainFunction();
    }
});

// Initial values of CID
updateChangeCount();
