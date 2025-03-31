# Code Challenge: Parallel vs Sequential Execution

## Problem Statement

When dealing with multiple asynchronous tasks, you can execute them either sequentially (one after another) or in parallel (all at once). Both approaches have their place in modern JavaScript applications, and understanding when to use each is crucial for optimizing performance and maintaining proper control flow.

This challenge focuses on demonstrating the key differences between parallel and sequential execution of asynchronous operations. You'll implement functions that perform the same set of tasks in both ways, measuring performance differences and understanding the implications of each approach. This knowledge is essential for scenarios like API requests, file operations, and database queries where choosing the right execution strategy can significantly impact your application's efficiency and user experience.

## Function Signature

```javascript
// Simulate an asynchronous task that takes a specified amount of time
const simulateTask = (taskId, duration) => {
  // TODO: Return a Promise that resolves after the specified duration
  // The Promise should resolve with an object containing taskId and duration
};

// Execute tasks sequentially (one after another)
const executeSequentially = (tasks) => {
  // TODO: Execute each task one after the other
  // Return a Promise that resolves with an array of results and the total time taken
};

// Execute tasks in parallel (all at once)
const executeInParallel = (tasks) => {
  // TODO: Execute all tasks simultaneously
  // Return a Promise that resolves with an array of results and the total time taken
};

// Function to compare both approaches
const compareBothApproaches = (tasks) => {
  // TODO: Run tasks both sequentially and in parallel
  // TODO: Log the results and time differences
  // Return a Promise that resolves when both executions are complete
};
```

## Input

- `tasks`: An array of objects, each with:
  - `id` (string or number): A unique identifier for the task
  - `duration` (number): Time in milliseconds the task will take to complete

## Output

Both `executeSequentially` and `executeInParallel` should return a Promise that resolves with an object containing:
- `results`: An array of task results (each with taskId and duration)
- `totalTime`: The total time taken to complete all tasks in milliseconds

## Example

### Input:

```javascript
const tasks = [
  { id: 'task-1', duration: 1000 }, // 1 second
  { id: 'task-2', duration: 500 },  // 0.5 seconds
  { id: 'task-3', duration: 1500 }, // 1.5 seconds
];

compareBothApproaches(tasks);
```

### Output:

```
Sequential execution:
- Total time: ~3000ms (sum of all durations)
- Results: [
    { taskId: 'task-1', duration: 1000 },
    { taskId: 'task-2', duration: 500 },
    { taskId: 'task-3', duration: 1500 }
  ]

Parallel execution:
- Total time: ~1500ms (duration of the longest task)
- Results: [
    { taskId: 'task-1', duration: 1000 },
    { taskId: 'task-2', duration: 500 },
    { taskId: 'task-3', duration: 1500 }
  ]

Time difference: Parallel execution was ~1500ms faster
```

## Constraints

- Use Promises for implementing the asynchronous tasks
- You may use async/await in your implementation
- Tasks should have varying durations to clearly demonstrate the difference
- Measure and report the actual execution time, not just the sum of durations

## Testing the Script

```javascript
// Define some test tasks
const testTasks = [
  { id: 'task-1', duration: 1000 }, // 1 second
  { id: 'task-2', duration: 2000 }, // 2 seconds
  { id: 'task-3', duration: 1500 }, // 1.5 seconds
  { id: 'task-4', duration: 800 },  // 0.8 seconds
  { id: 'task-5', duration: 1200 }, // 1.2 seconds
];

// Compare both approaches
compareBothApproaches(testTasks)
  .then(() => console.log('Comparison completed'))
  .catch(error => console.error('Error during comparison:', error));

// Expected output: A comparison between sequential execution (~6500ms) 
// and parallel execution (~2000ms) with detailed results
```

## Bonus Challenge

Implement a third execution strategy called `executeWithConcurrencyLimit` that limits the number of tasks running concurrently. This mimics real-world scenarios where you might want to limit the number of simultaneous connections or operations to prevent overloading resources.

## Detailed Explanation & Expanded Instructions

### **Spoilers Ahead**

### Step 1: Understanding the Problem

When dealing with multiple asynchronous operations, you have two primary execution strategies:

1. **Sequential Execution**: Tasks are executed one after another. Each task starts only after the previous one has completed. The total execution time is the sum of all individual task durations.

2. **Parallel Execution**: All tasks are started simultaneously and run concurrently. The total execution time is approximately equal to the duration of the longest task.

Each approach has its pros and cons:

- **Sequential Execution**:
  - Guarantees order of execution
  - Prevents race conditions
  - Useful when tasks depend on each other
  - Simpler to implement and reason about
  - Takes longer when tasks are independent

- **Parallel Execution**:
  - Significantly faster for independent tasks
  - Better utilization of resources
  - Ideal for tasks that don't depend on each other
  - More complex error handling
  - No guaranteed order of completion

This challenge requires you to implement both approaches and compare their performance.

### Step 2: Implementing the Functions

**Approach 1: Using Promises and Promise.all()**

```javascript
// Simulate an asynchronous task
const simulateTask = (taskId, duration) => {
  return new Promise((resolve) => {
    console.log(`Task ${taskId} started - will take ${duration}ms`);
    setTimeout(() => {
      console.log(`Task ${taskId} completed after ${duration}ms`);
      resolve({ taskId, duration });
    }, duration);
  });
};

// Execute tasks sequentially
const executeSequentially = async (tasks) => {
  const startTime = Date.now();
  const results = [];
  
  for (const task of tasks) {
    // Await each task to complete before starting the next one
    const result = await simulateTask(task.id, task.duration);
    results.push(result);
  }
  
  const endTime = Date.now();
  const totalTime = endTime - startTime;
  
  return { results, totalTime };
};

// Execute tasks in parallel
const executeInParallel = async (tasks) => {
  const startTime = Date.now();
  
  // Create an array of Promises
  const promises = tasks.map(task => simulateTask(task.id, task.duration));
  
  // Wait for all Promises to resolve
  const results = await Promise.all(promises);
  
  const endTime = Date.now();
  const totalTime = endTime - startTime;
  
  return { results, totalTime };
};

// Compare both approaches
const compareBothApproaches = async (tasks) => {
  console.log('Starting sequential execution...');
  const sequentialResult = await executeSequentially(tasks);
  console.log('\nSequential execution completed:');
  console.log(`- Total time: ${sequentialResult.totalTime}ms`);
  console.log('- Results:', sequentialResult.results);
  
  console.log('\nStarting parallel execution...');
  const parallelResult = await executeInParallel(tasks);
  console.log('\nParallel execution completed:');
  console.log(`- Total time: ${parallelResult.totalTime}ms`);
  console.log('- Results:', parallelResult.results);
  
  const timeDifference = sequentialResult.totalTime - parallelResult.totalTime;
  console.log(`\nTime difference: Parallel execution was ${timeDifference}ms faster`);
  
  return { sequentialResult, parallelResult, timeDifference };
};
```

**Approach 2: Using Pure Promises (without async/await)**

```javascript
// Simulate an asynchronous task
const simulateTask = (taskId, duration) => {
  return new Promise((resolve) => {
    console.log(`Task ${taskId} started - will take ${duration}ms`);
    setTimeout(() => {
      console.log(`Task ${taskId} completed after ${duration}ms`);
      resolve({ taskId, duration });
    }, duration);
  });
};

// Execute tasks sequentially
const executeSequentially = (tasks) => {
  const startTime = Date.now();
  let promise = Promise.resolve([]);
  
  // Chain Promises sequentially
  tasks.forEach(task => {
    promise = promise.then(results => {
      return simulateTask(task.id, task.duration)
        .then(result => [...results, result]);
    });
  });
  
  return promise.then(results => {
    const totalTime = Date.now() - startTime;
    return { results, totalTime };
  });
};

// Execute tasks in parallel
const executeInParallel = (tasks) => {
  const startTime = Date.now();
  
  return Promise.all(
    tasks.map(task => simulateTask(task.id, task.duration))
  ).then(results => {
    const totalTime = Date.now() - startTime;
    return { results, totalTime };
  });
};

// Compare both approaches
const compareBothApproaches = (tasks) => {
  console.log('Starting sequential execution...');
  
  return executeSequentially(tasks)
    .then(sequentialResult => {
      console.log('\nSequential execution completed:');
      console.log(`- Total time: ${sequentialResult.totalTime}ms`);
      console.log('- Results:', sequentialResult.results);
      
      console.log('\nStarting parallel execution...');
      return executeInParallel(tasks).then(parallelResult => {
        console.log('\nParallel execution completed:');
        console.log(`- Total time: ${parallelResult.totalTime}ms`);
        console.log('- Results:', parallelResult.results);
        
        const timeDifference = sequentialResult.totalTime - parallelResult.totalTime;
        console.log(`\nTime difference: Parallel execution was ${timeDifference}ms faster`);
        
        return { sequentialResult, parallelResult, timeDifference };
      });
    });
};
```

**Bonus Challenge Implementation:**

```javascript
// Execute tasks with concurrency limit
const executeWithConcurrencyLimit = async (tasks, concurrencyLimit) => {
  const startTime = Date.now();
  const results = [];
  const inProgress = new Set();
  const taskQueue = [...tasks];
  
  // Helper function to run a task
  const runTask = async (task) => {
    inProgress.add(task.id);
    try {
      const result = await simulateTask(task.id, task.duration);
      results.push(result);
    } finally {
      inProgress.delete(task.id);
    }
  };
  
  // Process the queue
  while (taskQueue.length > 0 || inProgress.size > 0) {
    // Fill up to the concurrency limit
    while (inProgress.size < concurrencyLimit && taskQueue.length > 0) {
      const task = taskQueue.shift();
      // Don't await here - we want to start tasks without waiting for them
      runTask(task);
    }
    
    // Wait a bit before checking again
    if (inProgress.size > 0 || taskQueue.length > 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  const endTime = Date.now();
  const totalTime = endTime - startTime;
  
  return { results, totalTime };
};

// Add to the comparison function
const compareAllApproaches = async (tasks, concurrencyLimit = 2) => {
  // ... [same as compareBothApproaches] ...
  
  console.log('\nStarting execution with concurrency limit of', concurrencyLimit);
  const limitedResult = await executeWithConcurrencyLimit(tasks, concurrencyLimit);
  console.log('\nLimited concurrency execution completed:');
  console.log(`- Total time: ${limitedResult.totalTime}ms`);
  console.log('- Results:', limitedResult.results);
  
  // ... [add comparisons with other approaches] ...
  
  return { sequentialResult, parallelResult, limitedResult };
};
```

### Step 3: Testing the Functions

To test these implementations, create a set of tasks with varying durations:

**Test Cases**

1. Test Case 1: Few tasks with similar durations
   - Input: `[{id: 'A', duration: 1000}, {id: 'B', duration: 1000}, {id: 'C', duration: 1000}]`
   - Expected Output: 
     - Sequential: ~3000ms 
     - Parallel: ~1000ms

2. Test Case 2: Tasks with varying durations
   - Input: `[{id: 'A', duration: 500}, {id: 'B', duration: 2000}, {id: 'C', duration: 1000}]`
   - Expected Output: 
     - Sequential: ~3500ms 
     - Parallel: ~2000ms

3. Test Case 3: Many tasks (stress test)
   - Input: `[10 tasks with random durations between 500ms and 2000ms]`
   - Expected Output: 
     - Sequential: Sum of all durations 
     - Parallel: Duration of longest task
     - Limited (with limit=3): Between sequential and parallel time

4. Test Case 4: Single task
   - Input: `[{id: 'A', duration: 1000}]`
   - Expected Output: Both sequential and parallel should take ~1000ms

## Time and Space Complexity

- **Sequential Execution**:
  - Time Complexity: O(n) where n is the total duration of all tasks
  - Space Complexity: O(n) for storing the results

- **Parallel Execution**:
  - Time Complexity: O(max) where max is the duration of the longest task
  - Space Complexity: O(n) for storing the promises and results

- **Limited Concurrency Execution**:
  - Time Complexity: Between O(n) and O(max), depending on the concurrency limit
  - Space Complexity: O(n + c) where c is the concurrency limit

## References

- [MDN Web Docs: Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [MDN Web Docs: async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [JavaScript.info: Promise API](https://javascript.info/promise-api)
- [MDN Web Docs: Performance measurement](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now)
- [Concurrency vs Parallelism](https://medium.com/@itIsMadhavan/concurrency-vs-parallelism-a-brief-review-b337c8dac350)

## Related Problems

- API Rate Limiting: Managing multiple API requests with limits on concurrent calls
- Web Scraping: Fetching and processing multiple web pages efficiently
- Database Operations: Optimizing multiple read/write operations
- File Processing: Reading and transforming multiple files
- Image Processing: Applying transformations to multiple images

## Key Takeaways

- Sequential execution guarantees order but is slower for independent tasks
- Parallel execution is significantly faster for independent tasks but offers no order guarantees
- The time advantage of parallel execution increases with the number of tasks
- Parallel execution is limited by the longest-running task
- Limited concurrency offers a balance between resource usage and performance
- Different execution strategies are appropriate for different scenarios
- Performance testing should use actual time measurements, not theoretical calculations
- Modern JavaScript provides multiple tools for managing asynchronous task execution

## Notes

In real-world applications, the choice between sequential and parallel execution often depends on:

1. **Dependencies**: If tasks depend on each other's results, sequential execution may be necessary
2. **Resource Constraints**: API rate limits, memory usage, or CPU limitations may restrict parallel execution
3. **Error Handling**: How failures in one task should affect other tasks
4. **Order Requirements**: Whether results need to be processed in a specific order

Browser environments typically limit the number of concurrent connections to the same domain (usually 6-8), making the limited concurrency approach particularly relevant for web applications making multiple API calls.

Node.js applications might face different constraints, such as I/O bottlenecks or memory limitations, which could influence the choice of execution strategy.

The patterns demonstrated in this challenge form the foundation for more complex asynchronous workflows, such as those managed by libraries like RxJS or advanced Promise utilities.
