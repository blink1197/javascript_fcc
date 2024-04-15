const sortButton = document.getElementById("sort");

const sortInputArray = (event) => {
  event.preventDefault();

  const inputValues = [
    ...document.getElementsByClassName("values-dropdown")
  ].map((dropdown) => Number(dropdown.value));

  // Bubble Sort
  //const sortedValues = bubbleSort(inputValues);

  // Selection Sort
  //const sortedValues = selectionSort(inputValues);

  // Insertion Sort
  //const sortedValues = selectionSort(inputValues);

  // Sort Method
  const sortedValues = inputValues.sort((a, b) => {
    return a - b; // Ascending Order
  });
  

  updateUI(sortedValues);
}

const updateUI = (array = []) => {
  array.forEach((num, i) => {
    const outputValueNode = document.getElementById(`output-value-${i}`);
    outputValueNode.innerText = num;
  })
}



/* Bubble Sort Algorithm
Bubble sort is a basic algorithm for arranging a string of numbers or other elements in the correct order. The method works by examining each set of adjacent elements in the string, from left to right, switching their positions if they are out of order.*/ 
const bubbleSort = (array) => {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - 1; j++) {
        if (array[j] > array[j + 1]) {
          const temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }
    }
    return array;
}

/* Selection Sort Algorithm
Selection sort is a simple and efficient sorting algorithm that works by repeatedly selecting the smallest (or largest) element from the unsorted portion of the list and moving it to the sorted portion of the list. */
const selectionSort = (array) => {
    for (let i = 0; i < array.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }
      const temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
    }
    return array;
}


/* Insertion Sort Algorithm
Insertion sort is a simple sorting algorithm that works similarly to the way you sort playing cards in your hands. The array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed in the correct position in the sorted part.*/
const insertionSort = (array) => {
    for (let i = 1; i < array.length; i++) {
      const currValue = array[i];
      let j = i - 1;
  
      while (j >= 0 && array[j] > currValue) {
        array[j + 1] = array[j];
        j--;
      }
      array[j + 1] = currValue;
    }
    return array;
}





sortButton.addEventListener("click", sortInputArray);