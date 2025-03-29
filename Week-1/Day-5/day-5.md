# Dev X - Day [5]

## Today's Accomplishments

### 1. 🌅 Morning Productivity

🍳 Healthy Breakfast: Turkey Sausage, Egg & Cheese Wrap

- [x] Morning Routine: Clean Office, Rhythm Ready for School, Emails, Make Bed
- review influencer offers

### 2. ✅ To-Dos & Completed Tasks

- [X] [Update To-Dos]
- [X] [Clear Complete Task]
- Daily To-Do Report: 2 Done
- Clean Kitchen

### 3. 📚 Learning

- 🔗 [try, catch, finally, throw - error handling in JavaScript](https://www.youtube.com/watch?v=cFTFtuEQ-10)
- 🔗 [JavaScript Error handling in 9 minutes! ⚠](https://www.youtube.com/watch?v=NwoAZF66_Go)
- 🔗 [How to Handle Errors - Basics of Error Handling in JavaScript - Tutorial](https://www.youtube.com/watch?v=G8Jux_bsIXUURL)

### 4. 💻 Coding Progress

- 🧠 Warm-up Exercise: async error handling
- 🏫 **Zero to Full Stack Hero Homework**:
- 🦺 Project: RFD - Added password reset
- 📝 Code Snippet:

```javascript
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
```

### 5. 🔄 Daily Reset

- 🏋️‍♂️ Walk around the neighborhood
- 🧘 TV & 420 after Doctor

### 6. 🌤️ Afternoon Productivity

- 🍱 Healthy Lunch: Turkey Sandwich
- fixed git on laptop

### 7. 🤝 Community Support

not active today

### 8. 📊 Progress Tracking

- 🏫 [Day-4](https://www.skool.com/universityofcode/dev-x-day-4)
- 📦 [GitHub Repo](https://github.com/Digitl-Alchemyst/Dev-X/tree/main/Week-1/Day-4)
- 📄 [Notion Page](https://liberating-galley-48d.notion.site/Dev-X-Developer-Lifestyle-Challenge-1c0cf2b3a53980298450e1f07d6d9892?pvs=4)

## Reflections and Notes

[Add any additional thoughts, challenges, or achievements from the day]
