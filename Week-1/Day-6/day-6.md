# Dev X - Day [6]

## Today's Accomplishments

### 1. 🌅 Morning Productivity

🍳 Healthy Breakfast: Muffins

- [x] Morning Routine: Clean Office, Emails
- Errands
- Hang out with kids.

### 2. ✅ To-Dos & Completed Tasks

- [X] [Update To-Dos]
- [X] [Clear Complete Task]
- Daily To-Do Report: 2 Done

### 3. 📚 Learning

- 🔗 [Magic Link With Next Auth Tutorial](https://www.youtube.com/watch?v=h9Lv_Sk-L_U)
- 🔗 [Next.js + NextAuth - Email Magic Link Login | Local Testing with Mailhog](https://www.youtube.com/watch?v=75AVkg85aOQ&t=45s&pp=0gcJCb8Ag7Wk3p_U)
- 🔗 [Next-Auth V5 Magic Links Tutorial with Next.js/React](https://www.youtube.com/watch?v=HPcygKlYEzU)

### 4. 💻 Coding Progress

- 🧠 Warm-up Exercise: Not today, claude pro ran out need to make payment 
- 🦺 Project: RFD: - Fixed Magic Link Errors
- 📝 Code Snippet:

```javascript
  try {
    // First, return a success indicator
    const result = await signIn('http-email', {
      email,
      redirect: false, // Prevent automatic redirect
      redirectTo: '/user', // Redirect to the user page after successful login
    });

    // Check if sign-in was successful
    if (result?.error) {
      throw new Error(result.error);
    }

    // Return success indicator
    return { success: true };
  } catch (error) {
    // Throw a specific error for client-side handling
    throw new Error(error instanceof Error ? error.message : 'Failed to send magic link');
  }
```

### 5. 🔄 Daily Reset

- 🏋️‍♂️ Walk through neighborhood
- 🧘 Nap not feeling well

### 6. 🌤️ Afternoon Productivity

- 🍱 Healthy Lunch: Chicken Nuggets
- Lunch for the Kids
- Clean Kitchen

### 7. 🤝 Community Support

Not really active online today

### 8. 📊 Progress Tracking

- 🏫 [Day-5](https://www.skool.com/universityofcode/dev-x-day-5)
- 📦 [GitHub Repo](https://github.com/Digitl-Alchemyst/Dev-X/tree/main/Week-1/Day-5)
- 📄 [Notion Page](https://liberating-galley-48d.notion.site/Dev-X-Developer-Lifestyle-Challenge-1c0cf2b3a53980298450e1f07d6d9892?pvs=4)

## Reflections and Notes

Breathing crap today, not feeling well, Blood pressure kinda high too. Taking it easy as possible today.
