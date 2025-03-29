// Original callback-based function for reference
const getUserDataWithCallback = (userId, callback) => {
  setTimeout(() => {
    const users = [
      { id: 1, name: "John Doe", email: "john.doe@example.com", role: "admin" },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "developer",
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        role: "designer",
      },
      {
        id: 4,
        name: "Alice Williams",
        email: "alice.williams@example.com",
        role: "developer",
      },
      {
        id: 5,
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
        role: "manager",
      },
    ];

    const user = users.find((user) => user.id === userId);

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
  return new Promise((resolve, reject) => {
    // TODO: Inside the Promise executor function, simulate an API call with setTimeout
    setTimeout(() => {
      // TODO: Create a mock user database (same as the callback version)
      const users = [
        {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          role: "admin",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane.smith@example.com",
          role: "developer",
        },
        {
          id: 3,
          name: "Bob Johnson",
          email: "bob.johnson@example.com",
          role: "designer",
        },
        {
          id: 4,
          name: "Alice Williams",
          email: "alice.williams@example.com",
          role: "developer",
        },
        {
          id: 5,
          name: "Charlie Brown",
          email: "charlie.brown@example.com",
          role: "manager",
        },
      ];
      // TODO: Find the user with the matching userId
      const user = users.find((user) => user.id === userId);
      // TODO: If user is found, resolve the Promise with the user data
      if (user) {
        resolve(user);
      } else {
        // TODO: If user is not found, reject the Promise with an error
        reject({ message: `User with ID ${userId} not found` });
      }
    }, 1500);
  });
};

getUserData(6)
  .then((user) => {
    console.log("User Data:", user);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });

const apiCall = (productId) => {
  return fetch(`https://dummyjson.com/products/${productId}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response;
    }
  );
};

apiCall(69)
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("API call completed");
  });
