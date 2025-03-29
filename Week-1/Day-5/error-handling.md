# Code Challenge: Error Handling Across Different Patterns

## Problem Statement

Error handling is a critical aspect of writing robust asynchronous JavaScript code. As we've explored different patterns for managing asynchronous operations (callbacks, Promises, and async/await), each offers unique approaches to handling errors. Understanding these differences is essential for writing reliable applications that gracefully handle failures.

This challenge focuses on implementing error handling for the same functionality using all three asynchronous patterns we've covered so far. By comparing these approaches side by side, you'll gain a deeper understanding of how error handling has evolved in JavaScript and the strengths and weaknesses of each pattern. This knowledge will help you choose the most appropriate approach for different scenarios and enable you to write more resilient code that properly addresses potential errors.

## Function Signature

```javascript
// Part 1: Implement error handling with callbacks
const fetchUserDataCallback = (userId, callback) => {
  // TODO: Implement function that fetches user data with proper error handling
  // Should handle: network errors, invalid input, user not found
};

// Part 2: Implement error handling with Promises
const fetchUserDataPromise = (userId) => {
  // TODO: Implement function that fetches user data using Promises with proper error handling
  // Should handle the same error cases as the callback version
};

// Part 3: Implement error handling with async/await
const fetchUserDataAsync = async (userId) => {
  // TODO: Implement function that fetches user data using async/await with proper error handling
  // Should handle the same error cases as the other versions
};

// Demonstration function to show all three approaches
const demonstrateErrorHandling = (userId) => {
  // TODO: Call all three implementations for the given userId
  // TODO: Log the results or errors in a consistent format
};
```

## Input

- `userId` (number or any other type): The ID of the user to retrieve

## Output

Each function should handle these error scenarios and the success case:
1. Invalid input (userId is not a positive number)
2. Network error (simulated)
3. User not found
4. Success (user data retrieved)

The output for each function should be appropriately communicated through their respective error handling mechanisms.

## Example

### Input:

```javascript
demonstrateErrorHandling(2);   // Valid user ID
demonstrateErrorHandling(-1);  // Invalid user ID
demonstrateErrorHandling(99);  // User not found
demonstrateErrorHandling('network-error');  // Trigger simulated network error
```

### Output:

```
=== Callback Implementation ===
Success: { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'developer' }

=== Promise Implementation ===
Success: { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'developer' }

=== Async/Await Implementation ===
Success: { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'developer' }

-----

=== Callback Implementation ===
Error: Invalid user ID. Must be a positive number.

=== Promise Implementation ===
Error: Invalid user ID. Must be a positive number.

=== Async/Await Implementation ===
Error: Invalid user ID. Must be a positive number.

// ... similarly for other test cases
```

## Constraints

- Implement all three versions (callbacks, Promises, async/await)
- Handle at least three types of errors in each implementation
- Use setTimeout to simulate asynchronous API calls
- Include appropriate error handling for each pattern:
  - Error-first callbacks for the callback implementation
  - .catch() method for the Promise implementation
  - try/catch blocks for the async/await implementation

## Testing the Script

```javascript
// Test with valid user ID
demonstrateErrorHandling(2);

// Test with invalid input
demonstrateErrorHandling(-1);
demonstrateErrorHandling('abc');

// Test with non-existent user
demonstrateErrorHandling(99);

// Test with simulated network error
demonstrateErrorHandling('network-error');
```

## Bonus Challenge

Extend your solution to include recovery strategies for each type of error:
1. For invalid input, attempt to sanitize the input and retry if possible
2. For network errors, implement a retry mechanism with exponential backoff
3. For user not found, try to fetch a default user instead

## Detailed Explanation & Expanded Instructions

### **Spoilers Ahead**

### Step 1: Understanding the Problem

Error handling is essential for robust applications, especially when dealing with asynchronous operations that might fail. Each asynchronous pattern in JavaScript has its own approach to error handling:

1. **Callbacks**: Traditionally use the error-first pattern where the first argument to the callback is reserved for an error object, which is null if no error occurred.

2. **Promises**: Use the `.catch()` method to handle rejected Promises, or the second argument of `.then()` as an error handler.

3. **Async/Await**: Use traditional `try/catch` blocks, which makes error handling look similar to synchronous code.

In this challenge, you'll implement the same functionality with error handling using all three patterns, allowing you to compare them directly.

### Step 2: Implementing the Functions

**Part 1: Callback Implementation**

```javascript
const fetchUserDataCallback = (userId, callback) => {
  // Input validation
  if (typeof userId !== 'number' || userId <= 0) {
    return callback({ 
      type: 'INVALID_INPUT',
      message: 'Invalid user ID. Must be a positive number.' 
    }, null);
  }
  
  // Simulate API call with delay
  setTimeout(() => {
    try {
      // Simulate network error for special case
      if (userId === 'network-error') {
        throw new Error('Network error: Failed to connect to the server');
      }
      
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
      
      if (user) {
        callback(null, user); // Success case
      } else {
        callback({ 
          type: 'NOT_FOUND',
          message: `User with ID ${userId} not found` 
        }, null);
      }
    } catch (error) {
      // Handle any unexpected errors
      callback({ 
        type: 'NETWORK_ERROR',
        message: error.message,
        originalError: error
      }, null);
    }
  }, 1000);
};
```

**Part 2: Promise Implementation**

```javascript
const fetchUserDataPromise = (userId) => {
  // Input validation
  if (typeof userId !== 'number' || userId <= 0) {
    return Promise.reject({ 
      type: 'INVALID_INPUT',
      message: 'Invalid user ID. Must be a positive number.' 
    });
  }
  
  return new Promise((resolve, reject) => {
    // Simulate API call with delay
    setTimeout(() => {
      try {
        // Simulate network error for special case
        if (userId === 'network-error') {
          throw new Error('Network error: Failed to connect to the server');
        }
        
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
        
        if (user) {
          resolve(user); // Success case
        } else {
          reject({ 
            type: 'NOT_FOUND',
            message: `User with ID ${userId} not found` 
          });
        }
      } catch (error) {
        // Handle any unexpected errors
        reject({ 
          type: 'NETWORK_ERROR',
          message: error.message,
          originalError: error
        });
      }
    }, 1000);
  });
};
```

**Part 3: Async/Await Implementation**

```javascript
const fetchUserDataAsync = async (userId) => {
  // Input validation
  if (typeof userId !== 'number' || userId <= 0) {
    throw { 
      type: 'INVALID_INPUT',
      message: 'Invalid user ID. Must be a positive number.' 
    };
  }
  
  // Helper function to simulate the async API call
  const fetchUser = (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate network error for special case
        if (id === 'network-error') {
          reject(new Error('Network error: Failed to connect to the server'));
          return;
        }
        
        // Mock user database
        const users = [
          { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'admin' },
          { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'developer' },
          { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'designer' },
          { id: 4, name: 'Alice Williams', email: 'alice.williams@example.com', role: 'developer' },
          { id: 5, name: 'Charlie Brown', email: 'charlie.brown@example.com', role: 'manager' }
        ];
        
        // Find user with matching ID
        const user = users.find(user => user.id === id);
        
        if (user) {
          resolve(user); // Success case
        } else {
          reject({ 
            type: 'NOT_FOUND',
            message: `User with ID ${id} not found` 
          });
        }
      }, 1000);
    });
  };
  
  // Use try/catch with await
  try {
    const user = await fetchUser(userId);
    return user;
  } catch (error) {
    // Standardize error format
    if (error instanceof Error) {
      throw { 
        type: 'NETWORK_ERROR',
        message: error.message,
        originalError: error
      };
    } else {
      throw error; // Re-throw structured errors from fetchUser
    }
  }
};
```

**Demonstration Function**

```javascript
const demonstrateErrorHandling = (userId) => {
  console.log(`\nTesting with userId: ${userId}\n`);
  
  // Test callback implementation
  console.log('=== Callback Implementation ===');
  fetchUserDataCallback(userId, (error, user) => {
    if (error) {
      console.log(`Error: ${error.message}`);
    } else {
      console.log(`Success: ${JSON.stringify(user)}`);
    }
  });
  
  // Test Promise implementation
  console.log('\n=== Promise Implementation ===');
  fetchUserDataPromise(userId)
    .then(user => {
      console.log(`Success: ${JSON.stringify(user)}`);
    })
    .catch(error => {
      console.log(`Error: ${error.message}`);
    });
  
  // Test async/await implementation
  console.log('\n=== Async/Await Implementation ===');
  (async () => {
    try {
      const user = await fetchUserDataAsync(userId);
      console.log(`Success: ${JSON.stringify(user)}`);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  })();
};
```

**Bonus Challenge Implementation (Recovery Strategies)**

```javascript
// Enhanced version of fetchUserDataAsync with recovery strategies
const fetchUserDataWithRecovery = async (userId) => {
  // Sanitize input if possible
  let sanitizedId = userId;
  
  // Try to convert string numbers to actual numbers
  if (typeof userId === 'string' && /^\d+$/.test(userId)) {
    sanitizedId = parseInt(userId, 10);
  }
  
  // Input validation with recovery
  if (typeof sanitizedId !== 'number' || sanitizedId <= 0) {
    console.log('Attempting to recover from invalid input...');
    if (typeof sanitizedId === 'number' && sanitizedId <= 0) {
      // If negative number, use absolute value
      sanitizedId = Math.abs(sanitizedId);
      console.log(`Sanitized ID to positive number: ${sanitizedId}`);
    } else {
      // If still invalid, use default ID
      sanitizedId = 1; // Default to first user
      console.log(`Could not sanitize input, using default ID: ${sanitizedId}`);
    }
  }
  
  // Retry strategy for network errors
  const fetchWithRetry = async (id, maxRetries = 3, delay = 1000) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fetchUserDataAsync(id);
      } catch (error) {
        if (error.type === 'NETWORK_ERROR' && attempt < maxRetries) {
          console.log(`Network error, retrying (${attempt}/${maxRetries})...`);
          // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt - 1)));
          continue;
        }
        throw error; // Re-throw if max retries reached or other error
      }
    }
  };
  
  try {
    return await fetchWithRetry(sanitizedId);
  } catch (error) {
    if (error.type === 'NOT_FOUND') {
      console.log('User not found, fetching default user...');
      // Fallback to default user if not found
      return await fetchUserDataAsync(1); // Default to first user
    }
    throw error; // Re-throw other errors
  }
};
```

### Step 3: Testing the Functions

To thoroughly test the implementation, call the `demonstrateErrorHandling` function with various inputs:

**Test Cases**

1. Test Case 1: Valid user ID
   - Input: `demonstrateErrorHandling(2)`
   - Expected Output: Success message with user data for all three implementations

2. Test Case 2: Invalid user ID (negative number)
   - Input: `demonstrateErrorHandling(-1)`
   - Expected Output: Error message about invalid input for all three implementations

3. Test Case 3: Invalid user ID (non-number)
   - Input: `demonstrateErrorHandling('abc')`
   - Expected Output: Error message about invalid input for all three implementations

4. Test Case 4: Non-existent user
   - Input: `demonstrateErrorHandling(99)`
   - Expected Output: Error message about user not found for all three implementations

5. Test Case 5: Simulated network error
   - Input: `demonstrateErrorHandling('network-error')`
   - Expected Output: Error message about network failure for all three implementations

6. Test Case 6 (Bonus): Testing recovery strategies
   - Input: Various test cases with the enhanced recovery function
   - Expected Output: Successful recovery or appropriate error messages

## Time and Space Complexity

- Time Complexity: O(n) for all implementations, where n is the number of users in the database, as we need to search through them to find a match.
- Space Complexity: O(1) for all implementations as we're only storing a fixed amount of data regardless of input size.

## References

- [MDN Web Docs: Error handling in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- [Error Handling Patterns in Node.js](https://nodejs.org/en/docs/guides/error-handling)
- [MDN Web Docs: Promise error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#error_handling)
- [JavaScript.info: Error handling with Promises](https://javascript.info/promise-error-handling)
- [MDN Web Docs: try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)

## Related Problems

- API Error Handling: Implementing robust error handling for RESTful API calls
- Form Validation: Client-side validation with appropriate error messages
- Error Boundaries in React: Component-level error handling
- Retry Mechanisms: Implementing exponential backoff for failed network requests

## Key Takeaways

- Error handling approaches differ significantly between callbacks, Promises, and async/await
- The error-first callback pattern is conventional in Node.js but can lead to nested error handling
- Promises centralize error handling with .catch() and make error propagation more straightforward
- Async/await combines the best of both worlds with familiar try/catch syntax for asynchronous code
- Structured error objects with type information help distinguish between different error cases
- Recovery strategies should be tailored to the specific type of error encountered
- Robust error handling includes input validation, error categorization, and graceful fallbacks

## Notes

As your applications grow in complexity, error handling becomes increasingly important. Consider creating a centralized error handling system that can:

1. Log errors appropriately (to console, file, or monitoring service)
2. Format error messages consistently for user feedback
3. Implement different recovery strategies based on error types
4. Track error frequency and patterns

While this challenge focuses on client-side error handling, similar principles apply to server-side JavaScript in Node.js applications. In production environments, you might integrate with error monitoring services like Sentry, Rollbar, or LogRocket to track and analyze errors at scale.

The evolution from callbacks to Promises to async/await reflects JavaScript's ongoing effort to make asynchronous code more maintainable, and error handling has improved significantly with each new pattern. Understanding all three approaches gives you the flexibility to work with different codebases and APIs regardless of which pattern they use.
