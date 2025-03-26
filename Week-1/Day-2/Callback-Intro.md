# Code Challenge: Introduction to Callbacks

## Problem Statement

Callbacks are functions passed as arguments to other functions, which are then invoked during the execution of the outer function. In JavaScript, callbacks are fundamental to handling asynchronous operations, allowing code to run after a time-consuming task completes rather than blocking execution.

This challenge introduces you to the callback pattern, one of the earliest approaches to managing asynchronous operations in JavaScript. Callbacks provide a way to handle the "what happens next" aspect of code execution, making them essential for operations like data fetching, file processing, and event handling. Understanding callbacks sets the foundation for more advanced patterns like Promises and async/await that we'll explore in upcoming challenges.

## Function Signature

```javascript
const getUserData = (userId, callback) => {
  // TODO: Simulate an API call delay using setTimeout
  
  // TODO: Create a mock user database (an array of user objects)
  
  // TODO: Find the user with the matching userId
  
  // TODO: If user is found, invoke the callback with user data
  // TODO: If user is not found, invoke the callback with an error
};
```

## Input

- `userId` (number): The ID of the user to retrieve
- `callback` (function): A function that will process the user data or handle any errors

## Output

No direct return value. The function should invoke the callback with either:
- The user data object if found
- An error object if the user is not found

## Example

### Input:

```javascript
getUserData(2, (error, user) => {
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('User data:', user);
  }
});
```

### Output:

```
User data: { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'developer' }
```

## Constraints

- The function must use setTimeout to simulate an asynchronous API call (with a delay of 1-2 seconds)
- Follow the Node.js error-first callback pattern (error as first argument, data as second)
- Include at least 5 user objects in your mock database
- The function should not use Promises or async/await

## Testing the Script

```javascript
// Test with existing user
getUserData(1, (error, user) => {
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('User data:', user);
  }
});

// Test with non-existent user
getUserData(99, (error, user) => {
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('User data:', user);
  }
});

// Expected output for first call (after delay):
// User data: { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'admin' }

// Expected output for second call (after delay):
// Error: User with ID 99 not found
```

## Bonus Challenge

Extend your solution to include a `processUserData` function that takes a user object and a transformation callback. The transformation callback should modify the user data in some way (e.g., format the name, calculate years of membership, etc.). This demonstrates callback composition - using callbacks that themselves accept callbacks.

## Detailed Explanation & Expanded Instructions

### **Spoilers Ahead**

### Step 1: Understanding the Problem

Callbacks are a key pattern in JavaScript for handling asynchronous operations. They work by passing a function (the callback) to another function, which will then call your function when the task completes. This allows your code to continue running without waiting for the operation to finish.

The error-first callback pattern (also known as the "Node.js callback style") is a widely-used convention where:
- The first parameter of the callback is reserved for an error object
- If no error occurred, the first parameter will be null or undefined
- Additional parameters contain successful result data

In this challenge, we're simulating an API call to retrieve user data. In a real application, this might be a fetch to a server or a database query, both of which take time to complete.

### Step 2: Implementing the Functions

**Approach 1: Basic Implementation**

```javascript
const getUserData = (userId, callback) => {
  // Simulate API call delay
  setTimeout(() => {
    // Mock user database
    const users = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'admin' },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'developer' },
      { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'designer' },
      { id: 4, name: 'Alice Williams', email: 'alice.williams@example.com', role: 'developer' },
      { id: 5, name: 'Charlie Brown', email: 'charlie.brown@example.com', role: 'manager' }
    ];
    
    // Find user with matching ID
    const user = users.find(user => user.id === userId);
    
    // Invoke callback with user data or error
    if (user) {
      callback(null, user); // Success case: no error, return user
    } else {
      callback({ message: `User with ID ${userId} not found` }, null); // Error case
    }
  }, 1500); // 1.5 second delay
};
```

**Approach 2: With Data Validation and Extended Error Handling**

```javascript
const getUserData = (userId, callback) => {
  // Input validation
  if (typeof userId !== 'number' || userId <= 0) {
    // Invoke callback immediately with validation error
    return callback({ message: 'Invalid user ID. Must be a positive number.' }, null);
  }
  
  // Simulate API call with delay
  setTimeout(() => {
    try {
      // Mock user database
      const users = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'admin' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'developer' },
        { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'designer' },
        { id: 4, name: 'Alice Williams', email: 'alice.williams@example.com', role: 'developer' },
        { id: 5, name: 'Charlie Brown', email: 'charlie.brown@example.com', role: 'manager' }
      ];
      
      // Find user with matching ID
      const user = users.find(user => user.id === userId);
      
      // Invoke callback with user data or error
      if (user) {
        callback(null, user); // Success case
      } else {
        callback({ message: `User with ID ${userId} not found`, code: 'USER_NOT_FOUND' }, null); // Error case with code
      }
    } catch (error) {
      // Handle any unexpected errors during processing
      callback({ message: 'Internal error while retrieving user data', originalError: error }, null);
    }
  }, 1500); // 1.5 second delay
};
```

**Bonus Challenge Implementation:**

```javascript
const processUserData = (user, transformationCallback) => {
  if (!user) {
    return null;
  }
  
  // Create a copy to avoid modifying the original
  const userCopy = {...user};
  
  // Apply the transformation
  return transformationCallback(userCopy);
};

// Example usage:
getUserData(1, (error, user) => {
  if (error) {
    console.error('Error:', error.message);
  } else {
    const processedUser = processUserData(user, (userData) => {
      // Transform the user data
      userData.formattedName = `${userData.name.toUpperCase()} (${userData.role})`;
      userData.emailDomain = userData.email.split('@')[1];
      return userData;
    });
    
    console.log('Processed user data:', processedUser);
  }
});
```

### Step 3: Testing the Functions

To test the implementation, call the `getUserData` function with different user IDs and a callback function:

**Test Cases**

1. Test Case 1: Retrieving an existing user
   - Input: `getUserData(2, callbackFunction)`
   - Expected Output: User object with ID 2

2. Test Case 2: Retrieving a non-existent user
   - Input: `getUserData(99, callbackFunction)`
   - Expected Output: Error object with appropriate message

3. Test Case 3: Invalid user ID (for approach 2)
   - Input: `getUserData(-1, callbackFunction)`
   - Expected Output: Error object with validation message

4. Test Case 4: Testing with the bonus challenge
   - Input: Combined getUserData and processUserData calls
   - Expected Output: Transformed user object with additional properties

## Time and Space Complexity

- Time Complexity: O(n) where n is the number of users in the database, as we need to search through all users in the worst case.
- Space Complexity: O(1) for the basic function as we're only storing references and not creating new data structures that scale with input size.

For the bonus challenge with processUserData, the space complexity becomes O(m) where m is the size of the user object, as we create a copy of the user data.

## References

- [MDN Web Docs: Callbacks](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
- [MDN Web Docs: setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
- [Node.js Callback Pattern](https://nodejs.org/en/knowledge/getting-started/control-flow/what-are-callbacks/)
- [JavaScript.info: Callbacks](https://javascript.info/callbacks)

## Related Problems

- Event Handlers: DOM event listeners use callbacks to respond to user interactions
- Array Methods: map(), filter(), forEach() all use callbacks to process array elements
- jQuery AJAX: Traditional jQuery AJAX calls use success and error callbacks
- Node.js File System: fs.readFile() and similar functions use callbacks to handle file operations

## Key Takeaways

- Callbacks are fundamental to asynchronous programming in JavaScript
- The error-first callback pattern is a standard convention for handling errors in asynchronous operations
- Callbacks allow code to continue running while waiting for time-consuming operations
- Callbacks can lead to nested structures (which we'll address in upcoming challenges)
- Understanding callbacks builds the foundation for comprehending more advanced patterns

## Notes

While callbacks are powerful, they have limitations. When multiple asynchronous operations need to be chained or coordinated, callbacks can lead to deeply nested code (known as "callback hell" or the "pyramid of doom"). In tomorrow's challenge, we'll experience this problem directly and then move on to more modern solutions like Promises and async/await in subsequent challenges.

Callbacks remain important to understand because many JavaScript APIs and libraries still use them, and they form the foundation upon which other asynchronous patterns are built. Modern JavaScript often uses Promises and async/await, but these are built on the same underlying concepts introduced by callbacks.
