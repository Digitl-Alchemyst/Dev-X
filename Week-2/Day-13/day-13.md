# Dev X - Day [13]

## Today's Accomplishments

### 1. 🌅 Morning Productivity

🍳 Healthy Breakfast: Sausage & Potatoes

- [x] Morning Routine: Clean Office, Rhythm Ready for School, Emails, Make Bed
- Deep Cleaning Office
- Breakfst for family
- Lunch for family

### 2. ✅ To-Dos & Completed Tasks

- [X] [Update To-Dos]
- [X] [Clear Complete Task]
- Daily To-Do Report: 3 Done

### 3. 📚 Learning

- 🔗 [This is my current coding process](https://www.youtube.com/watch?v=Ju_9DsUNYtI)
- 🔗 [How to add Stripe payments to ANY Next.js 14 App! (Easy Tutorial for Beginners)](https://www.youtube.com/watch?v=fgbEwVWlpsI)
- 🔗 [How far can $5 of Cursor credits get you?](https://www.youtube.com/watch?v=zcw2EmsPRbk)

### 4. 💻 Coding Progress

- 🦺 Project: Bot Forge - Stripe Intergration 
- 📝 Code Snippet: I think this is where my issue is. 

```javascript
try {
    // Get the raw body for webhook signature verification
    const rawBody = await req.arrayBuffer();
    const payload = Buffer.from(rawBody).toString('utf-8');

    // Get the Stripe signature from headers
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
      console.error('Missing Stripe signature or webhook secret');
      return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 });
    }

    // Verify the webhook event
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

```

### 5. 🔄 Daily Reset


- 🧘 Spend time with wife

### 6. 🌤️ Afternoon Productivity

- 🍱 Healthy Lunch: Burger & Fries
- House Cleaning

### 7. 🤝 Community Support

- Spent free time with family

### 8. 📊 Progress Tracking

- 🏫 [Day-12](https://www.skool.com/universityofcode/dev-x-day-12)
- 📦 [GitHub Repo](https://github.com/Digitl-Alchemyst/Dev-X/tree/main/Week-2/Day-12)
- 📄 [Notion Page](https://liberating-galley-48d.notion.site/Dev-X-Developer-Lifestyle-Challenge-1c0cf2b3a53980298450e1f07d6d9892?pvs=4)

## Reflections and Notes

Was suppose to be a nice relaxing day, ended up getting a lot done. Got to have some video game time too. Huge gains on my project. I have one little error to solve and then its ready for release. 
