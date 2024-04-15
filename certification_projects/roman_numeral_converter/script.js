const inputNumber = document.getElementById('number');
const convertButton = document.getElementById('convert-btn');
const output = document.getElementById('output');

const convertNumber = () => {
  output.innerText = "";
  const input = parseInt(inputNumber.value);
  let outputString = ''

  if (!input) {
    output.innerText = "Please enter a valid number";
    return;
  } else if (input < 0) {
    output.innerText = "Please enter a number greater than or equal to 1";
    return;
  } else if (input >= 4000) {
    output.innerText = "Please enter a number less than or equal to 3999";
    return;
  } else {
    const thousands = Math.floor(input / 1000);
    outputString += "M".repeat(thousands);
    outputString += romanLogic("hundreds", input);
    outputString += romanLogic("tens", input);
    outputString += romanLogic("ones", input);
    output.innerText = outputString;
  }
};

const romanLogic = (place, number) => {
  let outputStr = '';
  let high = "";
  let mid = "";
  let low = "";
  let num;

  switch (place) {
    case "hundreds":
      high = "M";
      mid = "D";
      low = "C";
      num = Math.floor((number / 100) % 10);
      break;
    case "tens":
      high = "C";
      mid = "L";
      low = "X";
      num = Math.floor((number / 10) % 10);
      break;
    case "ones":
      high = "X";
      mid = "V";
      low = "I";
      num = number % 10;
      break;
  }

  if (num == 9) {
    outputStr += low + high;
  } else if (num <= 8 && num >= 5) {
    outputStr += mid + low.repeat(num - 5);
  } else if (num == 4) {
    outputStr += low + mid;
  } else {
    outputStr += low.repeat(num);
  }
  return outputStr;
};

convertButton.addEventListener('click', convertNumber);
inputNumber.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    convertNumber();
  }
});