# Code Challenge: Introduction to Promises

## Problem Statement

Promises represent a significant evolution in handling asynchronous operations in JavaScript. They provide a more structured way to deal with asynchronous code compared to callbacks, making the code more readable and maintainable. A Promise is an object representing the eventual completion or failure of an asynchronous operation, allowing you to attach handlers for success and failure scenarios.

This challenge introduces you to the Promise pattern, a modern approach that helps address the limitations of callbacks. Promises provide better error handling, chaining of operations, and overall flow control for asynchronous tasks. Understanding Promises is crucial for modern JavaScript development, as they form the foundation for the async/await syntax we'll explore later in this series. By converting callback-based code to use Promises, you'll experience firsthand how Promises can simplify asynchronous code.

## Function Signature

```javascript
// Original callback-based function for reference
const getUserDataWithCallback = (userId, callback) => {
  setTimeout(() => {
    const users = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'admin' },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'developer' },
      { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'designer' },
      { id: 4, name: 'Alice Williams', email: 'alice.williams@example.com', role: 'developer' },
      { id: 5, name: 'Charlie Brown', email: 'charlie.brown@example.com', role: 'manager' }
    ];
    
    const user = users.find(user => user.id === userId);
    
    if (user) {
      callback(null, user);
    } else {
      callback({ message: `User with ID ${userId} not found` }, null);
    }
  }, 1500);
};

// TODO: Convert the above function to use Promises
const getUserData = (userId) => {
  // TODO: Return a new Promise
  
  // TODO: Inside the Promise executor function, simulate an API call with setTimeout
  
  // TODO: Create a mock user database (same as the callback version)
  
  // TODO: Find the user with the matching userId
  
  // TODO: If user is found, resolve the Promise with the user data
  // TODO: If user is not found, reject the Promise with an error
};
```

## Input

- `userId` (number): The ID of the user to retrieve

## Output

Returns a Promise that:
- Resolves with the user data object if the user is found
- Rejects with an error object if the user is not found

## Example

### Input:

```javascript
getUserData(2)
  .then(user => {
    console.log('User data:', user);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
```

### Output:

```
User data: { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'developer' }
```

## Constraints

- The function must return a Promise object
- Use setTimeout to simulate an asynchronous API call (with a delay of 1-2 seconds)
- Include at least 5 user objects in your mock database
- Do not use async/await syntax yet (we'll cover that in a future challenge)

## Testing the Script

```javascript
// Test with existing user
getUserData(1)
  .then(user => {
    console.log('User data:', user);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

// Test with non-existent user
getUserData(99)
  .then(user => {
    console.log('User data:', user);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

// Expected output for first call (after delay):
// User data: { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'admin' }

// Expected output for second call (after delay):
// Error: User with ID 99 not found
```

## Bonus Challenge

Extend your solution by creating a `getUserPosts` function that returns a Promise which resolves with a list of posts for a given user ID. Then, use Promise chaining to first get a user and then get their posts. This demonstrates how Promises can be chained to handle sequential asynchronous operations more elegantly than nested callbacks.

## Detailed Explanation & Expanded Instructions

### **Spoilers Ahead**

### Step 1: Understanding the Problem

Promises are objects that represent the eventual completion or failure of an asynchronous operation. They provide a more structured and flexible way to handle asynchronous code compared to callbacks.

A Promise can be in one of three states:
- **Pending**: Initial state, the operation has not completed yet
- **Fulfilled**: The operation completed successfully
- **Rejected**: The operation failed

Promises help address several limitations of callbacks:
1. **Callback Hell**: Deeply nested callbacks become hard to read and maintain
2. **Inversion of Control**: With callbacks, you hand control over to the function you're calling
3. **Error Handling**: Error propagation in callback chains is cumbersome

Your task is to convert a callback-based function to use Promises, which will demonstrate how Promises can improve code readability and error handling.

### Step 2: Implementing the Functions

**Approach 1: Basic Promise Implementation**

```javascript
const getUserData = (userId) => {
  return new Promise((resolve, reject) => {
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
      
      // Resolve or reject the Promise based on whether user is found
      if (user) {
        resolve(user); // Success case: resolve with user
      } else {
        reject({ message: `User with ID ${userId} not found` }); // Error case: reject with error
      }
    }, 1500); // 1.5 second delay
  });
};
```

**Approach 2: With Data Validation and Extended Error Handling**

```javascript
const getUserData = (userId) => {
  // Input validation
  if (typeof userId !== 'number' || userId <= 0) {
    return Promise.reject({
      message: 'Invalid user ID. Must be a positive number.',
      code: 'INVALID_ID'
    });
  }
  
  return new Promise((resolve, reject) => {
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
        
        // Resolve or reject the Promise
        if (user) {
          resolve(user); // Success case
        } else {
          reject({
            message: `User with ID ${userId} not found`,
            code: 'USER_NOT_FOUND'
          }); // Error case with code
        }
      } catch (error) {
        // Handle any unexpected errors during processing
        reject({
          message: 'Internal error while retrieving user data',
          originalError: error,
          code: 'INTERNAL_ERROR'
        });
      }
    }, 1500); // 1.5 second delay
  });
};
```

**Bonus Challenge Implementation:**

```javascript
const getUserPosts = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const posts = [
        { id: 101, userId: 1, title: 'Introduction to Promises', content: 'Promises make async code cleaner...' },
        { id: 102, userId: 1, title: 'Advanced JavaScript Patterns', content: 'Learn about modules and closures...' },
        { id: 201, userId: 2, title: 'CSS Grid Layout', content: 'A new way to design web layouts...' },
        { id: 202, userId: 2, title: 'Responsive Design Tips', content: 'Make your website look great on any device...' },
        { id: 301, userId: 3, title: 'UI Design Principles', content: 'Creating intuitive user interfaces...' },
        { id: 401, userId: 4, title: 'Testing React Applications', content: 'Best practices for testing React...' },
        { id: 501, userId: 5, title: 'Project Management for Developers', content: 'How to lead technical teams...' }
      ];
      
      const userPosts = posts.filter(post => post.userId === userId);
      
      if (userPosts.length > 0) {
        resolve(userPosts);
      } else {
        reject({ message: `No posts found for user with ID ${userId}` });
      }
    }, 1000); // 1 second delay
  });
};

// Example of Promise chaining
getUserData(2)
  .then(user => {
    console.log('User found:', user);
    return getUserPosts(user.id); // Return a new Promise
  })
  .then(posts => {
    console.log('User posts:', posts);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
```

### Step 3: Testing the Functions

To test the implementation, use the `getUserData` function with different user IDs and handle the Promise with `.then()` and `.catch()`:

**Test Cases**

1. Test Case 1: Retrieving an existing user
   - Input: `getUserData(2).then(...).catch(...)`
   - Expected Output: User object with ID 2 in the then handler

2. Test Case 2: Retrieving a non-existent user
   - Input: `getUserData(99).then(...).catch(...)`
   - Expected Output: Error object in the catch handler

3. Test Case 3: Invalid user ID (for approach 2)
   - Input: `getUserData(-1).then(...).catch(...)`
   - Expected Output: Error object in the catch handler with validation message

4. Test Case 4: Testing Promise chaining (for bonus challenge)
   - Input: `getUserData(2).then(user => getUserPosts(user.id)).then(...).catch(...)`
   - Expected Output: User posts in the second then handler

## Time and Space Complexity

- Time Complexity: O(n) where n is the number of users in the database, as we need to search through all users in the worst case.
- Space Complexity: O(1) for the basic function as we're only storing references and not creating new data structures that scale with input size.

For the bonus challenge with getUserPosts, the time complexity for filtering posts is O(m) where m is the number of posts in the database.

## References

- [MDN Web Docs: Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN Web Docs: Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [JavaScript.info: Promises](https://javascript.info/promise-basics)
- [Promises/A+ Specification](https://promisesaplus.com/)

## Related Problems

- Fetch API: Modern web API for network requests that returns Promises
- Promise.all(): Handling multiple Promises concurrently
- Promise Chaining: Executing asynchronous operations in sequence
- Error Handling in Promise Chains: Implementing proper error recovery strategies

## Key Takeaways

- Promises provide a more structured approach to asynchronous operations than callbacks
- They have three states: pending, fulfilled (resolved), and rejected
- Promises can be chained, making sequential asynchronous operations more readable
- Error handling is simplified with the .catch() method
- Promises solve the "callback hell" problem by enabling a more linear code structure
- Understanding Promises is essential for modern JavaScript, as they form the foundation for async/await

## Notes

While Promises significantly improve upon callbacks, they still have some verbosity that can be reduced further. In upcoming challenges, we'll explore how async/await syntax (built on top of Promises) can make asynchronous code look even more like synchronous code, further improving readability.

It's important to note that Promises were introduced in ES6 (2015) and are now widely supported across browsers and environments. They represent a major step forward in JavaScript's asynchronous programming model and are the foundation for many modern JavaScript APIs and patterns.
