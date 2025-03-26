const getUserData = (userId, callback) => {
  // TODO: Simulate an API call delay using setTimeout
  setTimeout(() => {
    // TODO: Create a mock user database (an array of user objects)
    const users = [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
      { id: 3, name: "Bob Johnson", email: "bob@example.com" },
      { id: 4, name: "Alice Brown", email: "alice@example.com" },
      { id: 5, name: "Charlie Davis", email: "charlie@example.com" },
    ];
    // TODO: Find the user with the matching userId
    const userById = users.find((user) => user.id === userId);
    // TODO: If user is found, invoke the callback with user data
    if (userById) {
      callback(null, userById);
    } else {
      // TODO: If user is not found, invoke the callback with an error
      callback(new Error("User not found"));
    }
  }, 5000);
};

const ID = 1 ;
getUserData(ID, (error, user) => {
  if (error) {
    console.error("Error:", error.message);
  } else {
    console.log("User Data:", user);
  }
});
