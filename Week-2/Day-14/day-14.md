# Dev X - Day [14]

## Today's Accomplishments

### 1. 🌅 Morning Productivity

🍳 Healthy Breakfast: Chicken & Waffles

- [x] Morning Routine: Clean Office, Emails
- Big nap after getting up early, stayed up to late coding lol. 
- Kitchen Clean up


### 2. ✅ To-Dos & Completed Tasks

- [X] [Update To-Dos]
- [X] [Clear Complete Task]
- Daily To-Do Report: 2 Done

### 3. 📚 Learning

- 🦸‍♂️ **Zero to Full Stack Hero**: [Topic or skill learned]
- 🔗 [How to add Stripe payments to ANY Next.js 14 App! (Easy Tutorial for Beginners)](https://www.youtube.com/watch?v=fgbEwVWlpsI) Watched again did not prove helpful for where I got stuck =/


### 4. 💻 Coding Progress


- 🦺 Project: Bot Forge - Stripe Intergration Complete. WEBHOOK WORKS!!!
- 📝 Code Snippet:

```javascript
  try {
    if (!signature) {
      console.error('⚠️ Webhook error: No stripe-signature header found.');
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    console.log(`✅ [Webhook] Received event: ${event.type} - ID: ${event.id}`);
  } catch (err: any) {
    console.error(`❌ [Webhook] Webhook signature verification failed:`, err.message);
    return NextResponse.json(
      { error: `Invalid signature: ${err.message}` },
      {
        status: 400,
      }
    );
  }
```

### 5. 🔄 Daily Reset

- 🏋️‍♂️ Streeches & Play with kids
- 🧘 Video game time

### 6. 🌤️ Afternoon Productivity

- 🍱 Healthy Lunch: Turkey Sandwich
- Grinding away on project
- Late night business meeting

### 7. 🤝 Community Support

- Quite day online today, several communities are very loow activity 

### 8. 📊 Progress Tracking

- 🏫 [Day-13](https://www.skool.com/universityofcode/dev-x-day-13)
- 📦 [GitHub Repo](https://github.com/Digitl-Alchemyst/Dev-X/tree/main/Week-2/Day-13)
- 📄 [Notion Page](https://liberating-galley-48d.notion.site/Dev-X-Developer-Lifestyle-Challenge-1c0cf2b3a53980298450e1f07d6d9892?pvs=4)

## Reflections and Notes

Just kept grinding away, trying my own solutions, claude, chat gpt, perplexity, gemini and youtube. finally cracked it right before dinner
