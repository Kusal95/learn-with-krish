//assumptions:
//sequence is n+1, no dupplicates, only one number is missing

function getMissingNumber(arr, range, firstNumber) {
  arr.sort();
  console.log("Sequence is :" + arr.sort());
  for (let i = 0; i < range; i++) {
    //check if first number is missing
    if (arr[0] != firstNumber) {
      return firstNumber;
    }

    //check if middle number missing
    if (arr[i + 1] - arr[i] != 1) {
      return arr[i] + 1;
    }
  }
}

//const arr = [21, 25, 29, 28, 22, 24, 27, 26, 30]; //missing first number
//const arr = [21, 25, 29, 28, 22, 24, 23, 27, 26, 20]; //missing last number
const arr = [21, 25, 29, 28, 22, 24, 30, 27, 26, 20]; // missing number
let range = arr.length + 1;
let firstNumber = 20;
let missingNumber = getMissingNumber(arr, range, firstNumber);
console.log("Missing number is: " + missingNumber);
