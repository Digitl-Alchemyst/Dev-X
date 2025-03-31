// Simulate an asynchronous task that takes a specified amount of time
const simulateTask = (taskId, duration) => {
  // TODO: Return a Promise that resolves after the specified duration
  // The Promise should resolve with an object containing taskId and duration
  return new Promise((resolve) => {
    console.log(`Task ${taskId} started - will take ${duration}ms`);
    setTimeout(() => {
      console.log(`Task ${taskId} completed after ${duration}ms`);
      resolve({ taskId, duration });
    }, duration);
  });
};

// Execute tasks sequentially (one after another)
const executeSequentially = async (tasks) => {
  // TODO: Execute each task one after the other
  // Return a Promise that resolves with an array of results and the total time taken
  const results = [];
  const startTime = Date.now();
  for (const task of tasks) {
    const result = await simulateTask(task.id, task.duration);
    results.push(result);
  }
  const endTime = Date.now();
  const totalTime = endTime - startTime;
  return { results, totalTime };
};

// Execute tasks in parallel (all at once)
const executeInParallel = async (tasks) => {
  // TODO: Execute all tasks simultaneously
  // Return a Promise that resolves with an array of results and the total time taken

  const startTime = Date.now();
  const promises = tasks.map((task) => simulateTask(task.id, task.duration));

  const results = await Promise.all(promises);
  const endTime = Date.now();
  const totalTime = endTime - startTime;
  return { results, totalTime };
};
// Function to compare both approaches
const compareBothApproaches = async (tasks) => {
  // TODO: Run tasks both sequentially and in parallel
  // TODO: Log the results and time differences
  // Return a Promise that resolves when both executions are complete
    console.log("Starting sequential execution...");
    const sequentialResult = await executeSequentially(tasks);
    console.log("\nSequential execution completed:");
    console.log(`- Total time: ${sequentialResult.totalTime}ms`);
    console.log("- Results:", sequentialResult.results);

    console.log("\nStarting parallel execution...");
    const parallelResult = await executeInParallel(tasks);
    console.log("\nParallel execution completed:");
    console.log(`- Total time: ${parallelResult.totalTime}ms`);
    console.log("- Results:", parallelResult.results);

    const timeDifference =
      sequentialResult.totalTime - parallelResult.totalTime;
    console.log(
      `\nTime difference: Parallel execution was ${timeDifference}ms faster`
    );

    return { sequentialResult, parallelResult, timeDifference };
};

const tasks = [
  { id: "task-1", duration: 1000 }, // 1 second
  { id: "task-2", duration: 500 }, // 0.5 seconds
  { id: "task-3", duration: 1500 }, // 1.5 seconds
];

compareBothApproaches(tasks);

const testTasks = [
  { id: "task-1", duration: 1000 }, // 1 second
  { id: "task-2", duration: 2000 }, // 2 seconds
  { id: "task-3", duration: 1500 }, // 1.5 seconds
  { id: "task-4", duration: 800 }, // 0.8 seconds
  { id: "task-5", duration: 1200 }, // 1.2 seconds
];

// Compare both approaches
compareBothApproaches(testTasks)
  .then(() => console.log("Comparison completed"))
  .catch((error) => console.error("Error during comparison:", error));
