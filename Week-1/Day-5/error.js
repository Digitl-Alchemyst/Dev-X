// Part 1: Implement error handling with callbacks
const fetchUserDataCallback = (userId, callback) => {
  setTimeout(() => {
    const users = [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
      { id: 3, name: "Bob Johnson", email: "bob@example.com" },
      { id: 4, name: "Alice Brown", email: "alice@example.com" },
      { id: 5, name: "Charlie Davis", email: "charlie@example.com" },
    ];

    if (!userId || typeof userId !== "number") {
      callback(new Error("Invalid user ID. Must provide a valid number."));
      return;
    }

    // Simulate network error (random)
    if (Math.random() < 0.2) {
      callback(new Error("Network error: Failed to fetch user data"));
      return;
    }

    const userById = users.find((user) => user.id === userId);
    if (userById) {
      callback(null, userById);
    } else {
      callback(new Error("User not found"));
    }
  }, 1000); // Reduced timeout for testing purposes
};

// Part 2: Implement error handling with Promises
const fetchUserDataPromise = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com" },
        { id: 4, name: "Alice Brown", email: "alice@example.com" },
        { id: 5, name: "Charlie Davis", email: "charlie@example.com" },
      ];

      if (!userId || typeof userId !== "number") {
        reject(new Error("Invalid user ID. Must provide a valid number."));
        return;
      }

      // Simulate network error (random)
      if (Math.random() < 0.2) {
        reject(new Error("Network error: Failed to fetch user data"));
        return;
      }

      const userById = users.find((user) => user.id === userId);
      if (userById) {
        resolve(userById);
      } else {
        reject(new Error("User not found"));
      }
    }, 1000); // Reduced timeout for testing purposes
  });
};

// Part 3: Implement error handling with async/await
const fetchUserDataAsync = async (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const users = [
          { id: 1, name: "John Doe", email: "john@example.com" },
          { id: 2, name: "Jane Smith", email: "jane@example.com" },
          { id: 3, name: "Bob Johnson", email: "bob@example.com" },
          { id: 4, name: "Alice Brown", email: "alice@example.com" },
          { id: 5, name: "Charlie Davis", email: "charlie@example.com" },
        ];

        if (!userId || typeof userId !== "number") {
          throw new Error("Invalid user ID. Must provide a valid number.");
        }

        // Simulate network error (random)
        if (Math.random() < 0.2) {
          throw new Error("Network error: Failed to fetch user data");
        }

        const userById = users.find((user) => user.id === userId);
        if (userById) {
          resolve(userById);
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        reject(error);
      }
    }, 1000); // Reduced timeout for testing purposes
  });
};

// Demonstration function to show all three approaches
const demonstrateErrorHandling = (userId) => {
  console.log(`\nTesting with userId: ${userId}\n`);

  // Test callback implementation
  console.log("=== Callback Implementation ===");
  fetchUserDataCallback(userId, (error, user) => {
    if (error) {
      console.error("Error:", error.message);
    } else {
      console.log("User data:", user);
    }
    console.log("Fetch operation completed.");
  });

  // Test Promise implementation
  console.log("\n=== Promise Implementation ===");
  fetchUserDataPromise(userId)
    .then((user) => {
      console.log("User data:", user);
    })
    .catch((error) => {
      console.error("Error:", error.message);
    })
    .finally(() => {
      console.log("Fetch operation completed.");
    });

  // Test async/await implementation
  console.log("\n=== Async/Await Implementation ===");
  (async () => {
    try {
      const user = await fetchUserDataAsync(userId);
      console.log("User data:", user);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      console.log("Fetch operation completed.");
    }
  })();
};

// Run tests with different scenarios
demonstrateErrorHandling(2); // Valid user ID
demonstrateErrorHandling(-1); // Invalid user ID
demonstrateErrorHandling(99); // User not found
demonstrateErrorHandling("test"); // Invalid user ID (string)
