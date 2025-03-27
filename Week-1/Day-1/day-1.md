# Dev X - Day [1]

## Today's Accomplishments

### 1. 🌅 Morning Productivity

🍳 Healthy Breakfast: X
- [x] Morning Routine: Clean Office, Rhythm Ready for School, Emails, Make Bed
- Review[Content Pilot](https://content-pilot.ai/) Product Hunt Launch Results
- Monitor [Daily Cup of AI](https://www.dailycupofai.com/) new Automations

### 2. ✅ To-Dos & Completed Tasks


- [X] [Update To-Dos]
- [X] [Clear Complete Task]
- Daily To-Do Report: 1 Done (All)

### 3. 📚 Learning
- 🔗 [My honest thoughts on using AI to code](https://www.youtube.com/watch?v=yCUru4vcGdY&t=114s)
- 🔗 [AI Raspberry Pi Robo Sapien - The PySapien](https://www.youtube.com/watch?v=FOl8-dDiKfg&t=23s)
- 🔗 [My failed Product Hunt launch](https://www.youtube.com/watch?v=JPvHrWkyMug)
- 🔗 [Next.js rocked by critical 9.1 level exploit...](https://www.youtube.com/watch?v=AaCnBOqyvIM)


### 4. 💻 Coding Progress

- 🧠 Warm-up Exercise: Async vs Sync Challenge
- 🦺 Project: Set up Schematic for [Access Vault](https://accessvault.app/) & build feature flags
- 📝 Code Snippet:

```javascript
static async decrypt(
    encryptedData: Uint8Array,
    kyberCiphertext: Uint8Array,
    privateKey: Uint8Array,
    iv: Uint8Array
  ): Promise<Uint8Array> {
    // Recover shared secret using Kyber
    const sharedSecret = await Kyber.decapsulate(privateKey, kyberCiphertext);
    
    // Derive AES key from shared secret
    const aesKey = await this.deriveAESKey(sharedSecret);
    
    // Decrypt data with AES-GCM
    const decryptedData = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      aesKey,
      encryptedData
    );
    
    return new Uint8Array(decryptedData);
  }
```

### 5. 🔄 Daily Reset

- 🏋️‍♂️ 4x[25] push-ups, 4x[15] sit-ups
- 🧘 Youtube & Chill

### 6. 🌤️ Afternoon Productivity

- 🍱 Healthy Lunch: Chicken Sandwich & Chips
- First day of Dev-X prep work: Templates & Coding Challenges

### 7. 🤝 Community Support

- Helping Brother with Docker Setup
- 🔗 [Updating Feature Usage Count in Real Time](https://www.skool.com/universityofcode/updating-feature-usage-count-in-real-time) Having same problem will look at this tomorrow

### 8. 📊 Progress Tracking

- 📦 [GitHub Repo](https://github.com/Digitl-Alchemyst/Dev-X/tree/main/Week-1/Day-1)
- 📄 [Notion Page](https://liberating-galley-48d.notion.site/Dev-X-Developer-Lifestyle-Challenge-1c0cf2b3a53980298450e1f07d6d9892?pvs=4)

## Reflections and Notes

Well I already did Dev-100 so here we are u pping the ante again. Dev-X not sure how im going to structure this fully. but it will be on going for some time. right now starting with a 30 day spring with a single focus broken into stages week by week maybe try a different focus the next month. We shall see. But we will see how many days I get out of this before I hit burn out. 