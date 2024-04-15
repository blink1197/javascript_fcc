const checkButton = document.getElementById('check-btn');
const textInput = document.getElementById('text-input');
const result = document.getElementById('result');



function checkInputString() {
    const inputString = textInput.value;
    if (!inputString) {
        alert("Please input a value");
    }
    if (isPalindrome(inputString)) {
        result.innerText = `${inputString} is a palindrome`;
    } else {
        result.innerText = `${inputString} is not a palindrome`;
    }
}




function isPalindrome(string) {
    const cleanInputString = string.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const reversedString = cleanInputString.split('').reverse().join('');
    // Check if the original and reversed strings are the same
    return cleanInputString === reversedString;
}


checkButton.addEventListener("click", checkInputString);

