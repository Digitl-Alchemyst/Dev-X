# Code Challenge: Callback Array Utilities

## Problem Statement

Callbacks are a foundational concept in JavaScript, acting as functions passed as arguments to other functions. This enables more flexible, reusable code patterns where the receiving function can execute the callback at specific points during its execution. Mastering callbacks is essential as they form the backbone of many JavaScript patterns including array manipulation, event handling, and asynchronous programming.

This challenge focuses on creating a utility library with array transformation functions that leverage callbacks. By implementing custom versions of common array utilities, you'll gain deeper insight into how JavaScript's built-in methods like `map()`, `filter()`, and `forEach()` work under the hood, strengthening your understanding of both callbacks and array manipulation.

## Function Signature

```javascript
const arrayUtils = {
  customForEach: (array, callback) => {
    // TODO: Implement a function that calls the callback for each element in the array
    // The callback should receive the current element, index, and the original array as parameters
  },
  
  customMap: (array, callback) => {
    // TODO: Implement a function that creates a new array with the results of calling the callback on each element
    // The callback should receive the current element, index, and the original array as parameters
  },
  
  customFilter: (array, callback) => {
    // TODO: Implement a function that creates a new array with elements that pass the callback test
    // The callback should receive the current element, index, and the original array as parameters
  },
  
  customReduce: (array, callback, initialValue) => {
    // TODO: Implement a function that applies the callback against an accumulator and each element to reduce to a single value
    // The callback should receive the accumulator, current element, index, and the original array as parameters
  }
};
```

## Input

- `array`: An array of elements (can be any type)
- `callback`: A function to execute on each element
- `initialValue` (for customReduce): Starting value for the accumulator (optional for reduce)

## Output

- `customForEach`: undefined (the function performs an action but doesn't return a value)
- `customMap`: A new array with each element being the result of the callback function
- `customFilter`: A new array with elements that pass the test implemented by the callback
- `customReduce`: A single value that results from reducing the array

## Example

### Input:

```javascript
const numbers = [1, 2, 3, 4, 5];

// Using customForEach
arrayUtils.customForEach(numbers, num => console.log(num * 2));

// Using customMap
const doubled = arrayUtils.customMap(numbers, num => num * 2);

// Using customFilter
const evens = arrayUtils.customFilter(numbers, num => num % 2 === 0);

// Using customReduce
const sum = arrayUtils.customReduce(numbers, (acc, num) => acc + num, 0);
```

### Output:

```
// customForEach logs:
2
4
6
8
10

// doubled array:
[2, 4, 6, 8, 10]

// evens array:
[2, 4]

// sum value:
15
```

## Constraints

- You must implement these functions from scratch without using the built-in array methods (map, filter, forEach, reduce)
- The callback should receive parameters as specified in the function signature
- Your functions should handle edge cases including:
  - Empty arrays
  - Undefined or null inputs
  - Missing initial value for reduce

## Testing the Script

```javascript
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
```

## Bonus Challenge

Implement additional utility functions that use callbacks:
1. `customSome`: Returns true if at least one element passes the callback test
2. `customEvery`: Returns true if all elements pass the callback test
3. `customFind`: Returns the first element that passes the callback test, or undefined if none is found
4. `customFindIndex`: Returns the index of the first element that passes the callback test, or -1 if none is found

## Detailed Explanation & Expanded Instructions

### **Spoilers Ahead**

### Step 1: Understanding the Problem

Callbacks are functions passed as arguments to other functions, which are then invoked during the execution of the outer function. This pattern is fundamental to JavaScript and allows for highly flexible code. 

In this challenge, we're recreating simplified versions of JavaScript's built-in array methods that use callbacks:

- `forEach`: Executes a provided function once for each array element
- `map`: Creates a new array populated with the results of calling a provided function on every element
- `filter`: Creates a new array with elements that pass a test
- `reduce`: Applies a function against an accumulator and each element to reduce to a single value

Understanding these functions is crucial because they form the foundation of functional programming in JavaScript and are used extensively in modern codebases.

### Step 2: Implementing the Functions

#### Method 1: Using Basic Loops

1. `customForEach`:
```javascript
customForEach: (array, callback) => {
  if (!Array.isArray(array) || typeof callback !== 'function') {
    throw new Error('Invalid arguments');
  }
  
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}
```

2. `customMap`:
```javascript
customMap: (array, callback) => {
  if (!Array.isArray(array) || typeof callback !== 'function') {
    throw new Error('Invalid arguments');
  }
  
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}
```

3. `customFilter`:
```javascript
customFilter: (array, callback) => {
  if (!Array.isArray(array) || typeof callback !== 'function') {
    throw new Error('Invalid arguments');
  }
  
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}
```

4. `customReduce`:
```javascript
customReduce: (array, callback, initialValue) => {
  if (!Array.isArray(array) || typeof callback !== 'function') {
    throw new Error('Invalid arguments');
  }
  
  if (array.length === 0 && initialValue === undefined) {
    throw new Error('Reduce of empty array with no initial value');
  }
  
  let accumulator = initialValue !== undefined ? initialValue : array[0];
  const startIndex = initialValue !== undefined ? 0 : 1;
  
  for (let i = startIndex; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }
  
  return accumulator;
}
```

#### Method 2: Using Recursion

As an alternative approach, we can implement these functions using recursion:

1. `customForEach` with recursion:
```javascript
customForEach: (array, callback, index = 0) => {
  if (!Array.isArray(array) || typeof callback !== 'function') {
    throw new Error('Invalid arguments');
  }
  
  if (index >= array.length) return;
  
  callback(array[index], index, array);
  return arrayUtils.customForEach(array, callback, index + 1);
}
```

2. `customMap` with recursion:
```javascript
customMap: (array, callback, index = 0, result = []) => {
  if (!Array.isArray(array) || typeof callback !== 'function') {
    throw new Error('Invalid arguments');
  }
  
  if (index >= array.length) return result;
  
  result.push(callback(array[index], index, array));
  return arrayUtils.customMap(array, callback, index + 1, result);
}
```

### Step 3: Testing the Functions

**Test Cases**

1. Test Case 1 - Basic Functionality:
   - Input: `[1, 2, 3, 4, 5]` with various callbacks
   - Expected Output: 
     - customForEach: logs values
     - customMap: `[2, 4, 6, 8, 10]` (when doubling)
     - customFilter: `[2, 4]` (when filtering for even numbers)
     - customReduce: `15` (when summing)

2. Test Case 2 - Edge Cases:
   - Input: Empty array `[]`
   - Expected Output:
     - customForEach: no logs
     - customMap: `[]`
     - customFilter: `[]`
     - customReduce with initialValue: initialValue
     - customReduce without initialValue: Error

3. Test Case 3 - Complex Data:
   - Input: Array of objects
   ```javascript
   const users = [
     { id: 1, name: 'Alice', age: 25 },
     { id: 2, name: 'Bob', age: 30 },
     { id: 3, name: 'Charlie', age: 22 }
   ];
   ```
   - Example test:
   ```javascript
   const names = arrayUtils.customMap(users, user => user.name);
   console.log(names); // Should output: ['Alice', 'Bob', 'Charlie']
   
   const adults = arrayUtils.customFilter(users, user => user.age >= 25);
   console.log(adults); // Should output: [{ id: 1, name: 'Alice', age: 25 }, { id: 2, name: 'Bob', age: 30 }]
   
   const totalAge = arrayUtils.customReduce(users, (acc, user) => acc + user.age, 0);
   console.log(totalAge); // Should output: 77
   ```

## Time and Space Complexity

- Time Complexity: O(n) for all functions, where n is the length of the input array, as each function processes each element exactly once.
- Space Complexity: 
  - O(1) for customForEach - no extra space needed that scales with input
  - O(n) for customMap and customFilter - creates a new array that can be up to the size of the input
  - O(1) for customReduce - only needs space for the accumulator

The iterative implementations have constant space complexity (excluding the result arrays), while recursive implementations have O(n) space complexity due to the call stack.

## References

- [Mozilla Developer Network - Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Understanding Callbacks in JavaScript](https://www.freecodecamp.org/news/javascript-callback-functions-what-are-callbacks-in-js-and-how-to-use-them/)
- [Functional Programming in JavaScript](https://eloquentjavascript.net/05_higher_order.html)

## Related Problems

- Implementing Promise.all() using callbacks
- Creating an event emitter system with callbacks
- Building a throttle/debounce utility using callbacks
- Implementing asynchronous control flow libraries

## Key Takeaways

- Callbacks are a fundamental concept in JavaScript that allows for flexible and reusable code
- Understanding how to implement common array methods helps grasp their inner workings
- Proper error handling is crucial when designing functions that take callbacks
- The pattern of passing (element, index, array) to callbacks is a common convention in JavaScript
- Functional programming concepts like map, filter, and reduce are powerful tools for data transformation

## Notes

These implementations are simplified versions of the native array methods. The actual implementations in JavaScript engines include optimizations and additional edge case handling. For example, native array methods handle sparse arrays differently than these implementations.

When implementing recursive versions of these functions, be aware of potential stack overflow errors for very large arrays. In production code, the iterative approach is generally preferred for these particular functions.
