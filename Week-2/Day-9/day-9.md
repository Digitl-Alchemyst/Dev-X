# Dev X - Day [9]

## Today's Accomplishments

### 1. 🌅 Morning Productivity

🍳 Healthy Breakfast: Turkey Egg & Toast

- [x] Morning Routine: Clean Office, Rhythm Ready for School, Emails, Make Bed
- Blood pressure still to high spent morning taking it easy and watching educational videos

### 2. ✅ To-Dos & Completed Tasks

- [X] [Update To-Dos]
- [X] [Clear Complete Task]
- Daily To-Do Report: 2 Done

### 3. 📚 Learning

- 🔗 [Did someone send me MALWARE to Code Review??](https://www.youtube.com/watch?v=clKiW01SVgQ)
- 🔗 [this code runs in both JS and Python.](https://www.youtube.com/watch?v=dbf9e7okjm8)
- 🔗 [40 APIs Every Developer Should Use (in 12 minutes)](https://www.youtube.com/watch?v=YHxj3LvZoLQ)
- 🔗 [Node.js vs Java | Which technology to choose in 2025?](https://www.youtube.com/watch?v=if3Dv1fxtcM)
- 🔗 [8 Design Patterns | Prime Reacts](https://www.youtube.com/watch?v=ZfG8BSTX0Lw)

### 4. 💻 Coding Progress

- 🧠 Warm-up Exercise: Callback Hell
- 🦺 Project: [Daily Cup of Ai](https://dailycupofai.com) - Oversee Automations, Access Vault - Set up with emsricpten to support Kyber & Delerium
- 📝 Code Snippet: Welcome to Hell

```javascript
getUserData("user123", (error, user) => {
  if (error) {
    console.error("Error fetching user:", error);
    return;
  }

  getUserPosts(user.id, (error, posts) => {
    if (error) {
      console.error("Error fetching posts:", error);
      return;
    }

    getCommentsForLatestPost(posts[0].id, (error, comments) => {
      if (error) {
        console.error("Error fetching comments:", error);
        return;
      }

      saveUserActivity(user.id, "read_comments", (error, activityLog) => {
        if (error) {
          console.error("Error saving activity:", error);
          return;
        }

        notifyUser(
          user.id,
          "New comments on your post",
          (error, notification) => {
            if (error) {
              console.error("Error sending notification:", error);
              return;
            }

            console.log("Process completed successfully!");
            console.log("User:", user.name);
            console.log("Latest post:", posts[0].title);
            console.log("Comments:", comments.length);
            console.log("Activity logged:", activityLog.timestamp);
            console.log("Notification sent:", notification.sent);
          }
        );
      });
    });
  });
});
```

### 5. 🔄 Daily Reset

- 🏋️‍♂️ 4x[25] Push-Ups 4x[15] Sit-ups  4x Planks Set
- 🧘 News

### 6. 🌤️ Afternoon Productivity

- 🍱 Healthy Lunch: Chicken Tortilla Soup
- Son to Doctor

### 7. 🤝 Community Support

Not Engaged today =()

### 8. 📊 Progress Tracking

- 🏫 [Day-8](https://www.skool.com/universityofcode/dev-x-day-8)
- 📦 [GitHub Repo](https://github.com/Digitl-Alchemyst/Dev-X/tree/main/Week-2/Day-8)
- 📄 [Notion Page](https://liberating-galley-48d.notion.site/Dev-X-Developer-Lifestyle-Challenge-1c0cf2b3a53980298450e1f07d6d9892?pvs=4)

