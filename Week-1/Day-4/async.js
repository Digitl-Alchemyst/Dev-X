// TODO: Refactor the above function to use async/await
const getUserData = async (userId) => {
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
      const user = await users.find((user) => user.id === userId);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
};

// A function to demonstrate using our async function
const displayUserData = async (userId) => {
try {
    const user = await getUserData(userId);
    console.log(`User ID: ${user.id}`);
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
    console.log(`Role: ${user.role}`);
} catch (error) {
    console.error(error.message);
}
};

displayUserData(6);