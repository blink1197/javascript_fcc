const userInput = document.getElementById("user-input");
const checkButton = document.getElementById("check-btn");
const clearButton = document.getElementById("clear-btn");
const results = document.getElementById("results-div");


const format1 = /^1 \d{3}-\d{3}-\d{4}$/;
const format2 = /^1 \(\d{3}\) \d{3}-\d{4}$/;
const format3 = /^1\(\d{3}\)\d{3}-\d{4}$/;
const format4 = /^1 \d{3} \d{3} \d{4}$/;
const format5 = /^\d{10}$/i;
const format6 = /^\d{3}-\d{3}-\d{4}$/;
const format7 = /^\(\d{3}\)\d{3}-\d{4}$/;

const allowList = [format1, format2, format3, format4, format5, format6, format7];

const isValid = (number) => allowList.some((regex) => regex.test(number));

const inputValidator = () => {

  if (userInput.value === '') {
    alert("Please provide a phone number");
    return;
  }
  
  if (isValid(userInput.value)) {
    const validResult = `Valid US number: ${userInput.value}`;
    const newDiv = document.createElement('div');
    newDiv.textContent = validResult;
    results.appendChild(newDiv);
  } else {
    const invalidResult = `Invalid US number: ${userInput.value}`;
    const newDiv = document.createElement('div');
    newDiv.textContent = invalidResult;
    results.appendChild(newDiv);
  }
    
  
};


const clearInput = () => {
  userInput.value = '';
  results.textContent = '';
};


checkButton.addEventListener("click", inputValidator);
clearButton.addEventListener("click", clearInput);
