//assumptions: sequence is n+1, no dupplicates, only one number is missing

function getMissingNumber(arr, n) {
  arr.sort();
  console.log("sequence is :" + arr.sort());
  const firstNumber = arr[0];
  for (let i = 0; i < n; i++) {
    if (arr[i + 1] - arr[i] != 1) {
      return firstNumber + (i + 2 - 1);
    }
  }
}
const arr = [21, 25, 29, 28, 22, 24, 27, 26, 30];
//const arr = [1, 4, 3, 5, 6, 2, 8, 9];
let missingNumber = getMissingNumber(arr, arr.length + 1);
console.log("Missing number is: " + missingNumber);
