# Code Challenge: Introduction to Async/Await

## Problem Statement

Async/await is a syntactic feature introduced in ES2017 (ES8) that builds on top of Promises to make asynchronous code even more readable and maintainable. It allows you to write asynchronous code that looks and behaves more like synchronous code, eliminating the need for explicit Promise chains and callback functions.

This challenge introduces you to the async/await pattern, which represents the most modern approach to handling asynchronous operations in JavaScript. By refactoring Promise-based code to use async/await, you'll experience how this syntax can further simplify your asynchronous code. Async/await provides a cleaner way to handle errors through try/catch blocks and makes asynchronous code flow more intuitively. As you progress through this challenge, you'll learn how async/await works under the hood and how it relates to the Promise pattern we explored yesterday.

## Function Signature

```javascript
// Original Promise-based function from Day 3 for reference
const getUserDataWithPromise = (userId) => {
  return new Promise((resolve, reject) => {
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
        resolve(user);
      } else {
        reject({ message: `User with ID ${userId} not found` });
      }
    }, 1500);
  });
};

// TODO: Refactor the above function to use async/await
const getUserData = async (userId) => {
  // TODO: Remember that async functions always return a Promise
  
  // TODO: Create a helper function that returns a Promise (or use the original function)
  
  // TODO: Use await to wait for the Promise to resolve
  
  // TODO: Use try/catch for error handling
};

// A function to demonstrate using our async function
const displayUserData = async (userId) => {
  // TODO: Use try/catch with await to handle errors in a synchronous-looking way
  
  // TODO: Log the user data if found, or the error message if not
};
```

## Input

- `userId` (number): The ID of the user to retrieve

## Output

`getUserData` returns a Promise that:
- Resolves with the user data object if the user is found
- Rejects with an error object if the user is not found

`displayUserData` doesn't return a value, but logs:
- The user data if found
- An error message if the user is not found

## Example

### Input:

```javascript
// Using the async function directly
const main = async () => {
  try {
    const user = await getUserData(2);
    console.log('User data:', user);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

main();

// OR using the display function
displayUserData(2);
```

### Output:

```
User data: { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'developer' }
```

## Constraints

- The `getUserData` function must be declared with the `async` keyword
- Use `await` to wait for asynchronous operations
- Implement error handling using try/catch blocks
- Include at least 5 user objects in your mock database
- Keep the setTimeout delay to simulate an asynchronous API call

## Testing the Script

```javascript
// Test with existing user
displayUserData(1);

// Test with non-existent user
displayUserData(99);

// Expected output for first call (after delay):
// User data: { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'admin' }

// Expected output for second call (after delay):
// Error: User with ID 99 not found
```

## Bonus Challenge

Create an `async` function called `fetchUserAndPosts` that fetches a user and their posts in parallel using `Promise.all` with the `await` keyword. This demonstrates how async/await can be combined with Promise methods for concurrent operations. The function should return an object containing both the user information and their posts.

## Detailed Explanation & Expanded Instructions

### **Spoilers Ahead**

### Step 1: Understanding the Problem

Async/await is a syntactic sugar built on top of Promises that makes asynchronous code look and behave more like synchronous code. Here's what you need to know:

- The `async` keyword is used to declare a function that will work with asynchronous operations
- An `async` function always returns a Promise, even if you don't explicitly create one
- The `await` keyword can only be used inside an `async` function
- `await` pauses the execution of the function until the Promise is resolved or rejected
- Error handling is done using try/catch blocks, similar to synchronous code

The key benefit of async/await is that it allows you to write asynchronous code in a way that reads like synchronous code, making it easier to understand and maintain.

### Step 2: Implementing the Functions

**Approach 1: Using a Promise Helper Function**

```javascript
// Helper function that returns a Promise
const findUserById = (userId) => {
  return new Promise((resolve, reject) => {
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
        resolve(user);
      } else {
        reject({ message: `User with ID ${userId} not found` });
      }
    }, 1500);
  });
};

// Async function that uses the helper
const getUserData = async (userId) => {
  try {
    // Await the Promise returned by findUserById
    const user = await findUserById(userId);
    return user; // This will be automatically wrapped in a resolved Promise
  } catch (error) {
    // Any errors from findUserById will be caught here
    throw error; // Re-throwing will create a rejected Promise
  }
};

// Function to demonstrate using async/await with error handling
const displayUserData = async (userId) => {
  try {
    const user = await getUserData(userId);
    console.log('User data:', user);
  } catch (error) {
    console.error('Error:', error.message);
  }
};
```

**Approach 2: Creating a Promise Inside the Async Function**

```javascript
const getUserData = async (userId) => {
  // Input validation
  if (typeof userId !== 'number' || userId <= 0) {
    throw { message: 'Invalid user ID. Must be a positive number.' };
  }
  
  // Return a new Promise explicitly
  return new Promise((resolve, reject) => {
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
        resolve(user);
      } else {
        reject({ message: `User with ID ${userId} not found` });
      }
    }, 1500);
  });
};

const displayUserData = async (userId) => {
  try {
    const user = await getUserData(userId);
    console.log('User data:', user);
  } catch (error) {
    console.error('Error:', error.message);
  }
};
```

**Bonus Challenge Implementation:**

```javascript
const getUserPosts = async (userId) => {
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

const fetchUserAndPosts = async (userId) => {
  try {
    // Run both Promises concurrently with Promise.all and await the result
    const [user, posts] = await Promise.all([
      getUserData(userId),
      getUserPosts(userId)
    ]);
    
    // Combine the results into a single object
    return {
      user,
      posts
    };
  } catch (error) {
    // If either Promise rejects, this catch block will run
    throw error;
  }
};

// Example usage
const displayUserAndPosts = async (userId) => {
  try {
    const data = await fetchUserAndPosts(userId);
    console.log('User:', data.user);
    console.log('Posts:', data.posts);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

displayUserAndPosts(2);
```

### Step 3: Testing the Functions

To test the implementation, call the `displayUserData` or other async functions:

**Test Cases**

1. Test Case 1: Retrieving an existing user
   - Input: `displayUserData(2)`
   - Expected Output: User object with ID 2 logged to console

2. Test Case 2: Retrieving a non-existent user
   - Input: `displayUserData(99)`
   - Expected Output: Error message logged to console

3. Test Case 3: Invalid user ID (for the validation approach)
   - Input: `displayUserData(-1)`
   - Expected Output: Validation error message logged to console

4. Test Case 4: Testing concurrent fetching (for bonus challenge)
   - Input: `displayUserAndPosts(2)`
   - Expected Output: Both user data and posts logged to console

## Time and Space Complexity

- Time Complexity: O(n) where n is the number of users in the database, as we need to search through all users in the worst case.
- Space Complexity: O(1) for the basic function as we're only storing references and not creating new data structures that scale with input size.

For the bonus challenge with Promise.all, the time complexity is determined by the slower of the two operations, but they run concurrently, improving performance compared to sequential execution.

## References

- [MDN Web Docs: async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN Web Docs: await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
- [JavaScript.info: Async/await](https://javascript.info/async-await)
- [MDN Web Docs: Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

## Related Problems

- Error Handling: Implementing robust try/catch patterns with async/await
- Parallel Execution: Using Promise.all with async/await for concurrent operations
- Sequential vs Parallel: Deciding when to use await sequentially vs concurrently
- Async Iteration: Using for-await-of loops with asynchronous iterators

## Key Takeaways

- Async/await is syntactic sugar built on top of Promises
- Async functions always return Promises
- Await can only be used inside async functions
- Async/await makes asynchronous code look and behave more like synchronous code
- Error handling with try/catch blocks is more intuitive than Promise catch methods
- Async/await can be combined with Promise methods like Promise.all for concurrent operations
- Understanding the relationship between async/await and Promises is crucial for effective JavaScript development

## Notes

Async/await was introduced in ES2017 (ES8) and is now widely supported in modern browsers and Node.js. It represents the most convenient way to work with asynchronous code in JavaScript, but it's important to remember that it's built on top of Promises and ultimately relies on the same underlying mechanisms.

While async/await makes code look synchronous, it's still asynchronous under the hood. This means that the function continues to run non-blocking, but the syntax allows for a more straightforward expression of the sequence of operations.

One common mistake is to forget that an async function always returns a Promise, even if you return a simple value. This means that to access the actual return value, you need to either use await or .then().
