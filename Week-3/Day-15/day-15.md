# Dev X - Day [15]

## Today's Accomplishments

### 1. 🌅 Morning Productivity

🍳 Healthy Breakfast: Breakfast Bowl

- [x] Morning Routine: Clean Office, Kids Ready for School, Emails, Make Bed
- Kitchen Cleaning Catchup
- Office Deep Clean

### 2. ✅ To-Dos & Completed Tasks

- [x] Update To-Dos
- [x] Clear Complete Task
- Daily To-Do Report: 0 Done Todos aall clear for today

### 3. 📚 Learning

- 🔗 [Build an Agent with LangGraph and Convex](https://www.youtube.com/watch?v=jNthqM1PtD8) Live with Shruti Kapoor
- 🔗 [Stripe Webhooks - The Ultimate Guide](https://www.youtube.com/watch?v=1l4NMj-NTUE)
- 🔗 [Stripe Webhooks Tutorial](https://www.youtube.com/watch?v=x9cGa3oMJPc&pp=0gcJCX4JAYcqIYzv)

### 4. 💻 Coding Progress

- 🦺 Project: Bot Forge - Billing system set up, just need to add in some messaging limits.
- 📝 Code Snippet:

```javascript
try {
    // Verify user authentication
    const { userId } = await auth();
    if (!userId) {
      console.log('❌ No userId found in auth');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log(`✅ User authenticated: ${userId}`);

    // Get user's subscription info
    try {
      const { data } = await serverClient.query<GetUserSubscriptionResponse>({
        query: GET_USER_SUBSCRIPTION,
        variables: { clerkUserId: userId },
      });

      console.log('✅ GraphQL query completed');
```

### 5. 🔄 Daily Reset

- 🏋️‍♂️ 4x[25] Push-ups 4x[15] Sit-ups
- 🧘  Shower & 420 time 🌲

### 6. 🌤️ Afternoon Productivity

- 🍱 Healthy Lunch: Turkey Sandwich
- Laundry
- Hang out with kids

### 7. 🤝 Community Support

- Shurti Kapoor live stream on YouTube
- Papafam Community Interation


### 8. 📊 Progress Tracking

- 🏫 [Day-15](https://www.skool.com/universityofcode/dev-x-day-15)
- 📦 [GitHub Repo](https://github.com/Digitl-Alchemyst/Dev-X/tree/main/Week-3/Day-15)
- 📄 [Notion Page](https://liberating-galley-48d.notion.site/Dev-X-Developer-Lifestyle-Challenge-1c0cf2b3a53980298450e1f07d6d9892?pvs=4)

## Reflections and Notes

Bot forge is almost totally ready to launch, now im just in the clean up stages and adding in some more features to spice it up. Will be launching it in the next few days officially, and doing a product hunt launch to get some early traction.
