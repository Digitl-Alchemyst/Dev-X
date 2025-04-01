const arrayUtils = {
  customForEach: (array, callback) => {
    // TODO: Implement a function that calls the callback for each element in the array
    // The callback should receive the current element, index, and the original array as parameters
    for (let i = 0; i < array.length; i++) {
      callback(array[i], i, array);
    }
    return array;
  },

  customMap: (array, callback) => {
    // TODO: Implement a function that creates a new array with the results of calling the callback on each element
    // The callback should receive the current element, index, and the original array as parameters
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
      newArray.push(callback(array[i], i, array));
    }
    return newArray;
  },

  customFilter: (array, callback) => {
    // TODO: Implement a function that creates a new array with elements that pass the callback test
    // The callback should receive the current element, index, and the original array as parameters
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
      if (callback(array[i], i, array)) {
        newArray.push(array[i]);
      }
    }
    return newArray;
  },

  customReduce: (array, callback, initialValue) => {
    // TODO: Implement a function that applies the callback against an accumulator and each element to reduce to a single value
    // The callback should receive the accumulator, current element, index, and the original array as parameters
    let accumulator = initialValue;
    for (let i = 0; i < array.length; i++) {
      accumulator = callback(accumulator, array[i], i, array);
    }
    return accumulator;
  },
};


// Test cases for your arrayUtils library
const numbers = [1, 2, 3, 4, 5];

console.log("Testing customForEach:");
arrayUtils.customForEach(numbers, (num, index) => {
  console.log(`Element at index ${index}: ${num}`);
});

console.log("\nTesting customMap:");
const doubled = arrayUtils.customMap(numbers, num => num * 2);
console.log(doubled); // Should output: [2, 4, 6, 8, 10]

console.log("\nTesting customFilter:");
const evens = arrayUtils.customFilter(numbers, num => num % 2 === 0);
console.log(evens); // Should output: [2, 4]

console.log("\nTesting customReduce:");
const sum = arrayUtils.customReduce(numbers, (acc, num) => acc + num, 0);
console.log(sum); // Should output: 15

// Edge case tests
console.log("\nTesting with empty array:");
const emptyArray = [];
console.log(arrayUtils.customMap(emptyArray, num => num * 2)); // Should output: []
console.log(arrayUtils.customFilter(emptyArray, num => num % 2 === 0)); // Should output: []
console.log(arrayUtils.customReduce(emptyArray, (acc, num) => acc + num, 0)); // Should output: 0