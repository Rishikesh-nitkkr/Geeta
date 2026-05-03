# 🧠 KRISHNA AI - Divine Life Guidance System

A premium AI-powered spiritual guidance platform that combines the timeless wisdom of the Bhagavad Gita with modern technology to provide personalized, meaningful life advice powered by advanced AI and voice interactions.

---

## 🚀 Project Overview

**KRISHNA AI** is an interactive web application that acts as your personal spiritual advisor. When you face life challenges—whether it's stress from work, fear of failure, or confusion about your path—you can ask questions and receive guided wisdom directly from the Bhagavad Gita, an ancient Indian spiritual text.

Think of it as having a wise mentor available 24/7 who:
- Listens to your concerns
- Finds the perfect verse from the Bhagavad Gita that applies to your situation
- Explains the wisdom in modern, practical language
- Provides actionable advice for your daily life
- Offers voice narration and meditation guidance to deepen your understanding

The application is beautifully designed with smooth animations, dark theme aesthetics, and an intuitive interface that makes spiritual guidance accessible to everyone, regardless of their technical background.

---

## 🎯 Purpose of the Project

### The Problem It Solves:

In today's fast-paced world, people often feel:
- **Overwhelmed** by life's challenges without a clear direction
- **Anxious** about decisions and outcomes
- **Disconnected** from deeper meaning and purpose
- **Alone** with their struggles, lacking wise guidance

### Why This Project Was Built:

This project bridges ancient wisdom and modern life. The Bhagavad Gita, written thousands of years ago, contains timeless truths about overcoming challenges, finding purpose, and living a meaningful life. However, many people find it difficult to:
1. Understand the Sanskrit verses
2. Know which verses apply to their specific situation
3. Connect ancient philosophy to modern problems

**KRISHNA AI solves this** by using artificial intelligence to:
- Match your specific problem to the most relevant Gita verses
- Provide personalized guidance through Krishna's perspective
- Offer practical, actionable advice you can apply today
- Present wisdom through multiple formats (text, voice, meditation, reading)

---

## 🛠️ Tech Stack

### **Frontend:**
- **Next.js 16.2.4** - Modern React framework for building fast, scalable web applications
- **React 19.1.1** - UI library for creating interactive user interfaces
- **TypeScript 5.9.3** - Typed JavaScript for safer, more maintainable code
- **Tailwind CSS 3.4.17** - Utility-first CSS framework for responsive, beautiful styling
- **Framer Motion 12.23.24** - Animation library for smooth, delightful user interactions

### **UI & Icons:**
- **Lucide React 0.468.0** - Beautiful, consistent icon library with 500+ icons

### **Backend/API:**
- **Next.js API Routes** - Serverless backend functions for AI guidance, avatar, and text-to-speech
- **Node.js 20.11.0+** - JavaScript runtime environment

### **Testing & Quality:**
- **Vitest 3.2.4** - Modern testing framework
- **@testing-library/react** - Tools for testing React components
- **ESLint 9.36.0** - Code quality and style consistency

### **Build & Development:**
- **PostCSS 8.5.10** - CSS processing
- **Autoprefixer 10.4.21** - Adds browser prefixes automatically
- **Package Manager:** npm (defined in package.json)

---

## ⚙️ Features

### 💬 **Ask Krishna - AI Guidance System**
- Ask any life question and receive personalized guidance based on Bhagavad Gita verses
- AI intelligently matches your question to the most relevant spiritual teaching
- Includes confidence scoring to show how well the verse matches your concern
- Supports 5 main life situations: Stress, Fear, Overthinking, Failure, and Discipline

### 🎤 **Voice & Audio Features**
- **Text-to-Speech (TTS):** Listen to Krishna's guidance in a warm, meditative voice
- **Audio Script Generation:** Specialized audio format of the guidance for better listening experience
- **Customizable Voice Preferences:** Set meditation speed and ambience preferences in your profile

### 🧘 **Meditation & Daily Guidance**
- **Daily Verse:** Receive an inspiring verse each day suited to your current needs
- **Guided Meditation:** Structured meditation sessions to deepen wisdom
- **Reflection Prompts:** Thoughtful questions to help you internalize the teachings

### 📖 **Gita Reader**
- Browse all chapters of the Bhagavad Gita
- Read individual verses with English translations and transliterations
- Understand Sanskrit meanings explained in modern language
- Access complete chapter summaries and context

### 📊 **Growth Tracking**
- Log your daily mood before and after meditation (scale: 1-5)
- Track meditation duration
- Record personal reflections and lessons learned
- Monitor your spiritual growth progress over time
- Visual dashboard showing your journey

### 🎯 **Situation-Based Guidance**
- **Stress**: Learn how to act without obsessing over results
- **Fear**: Discover your immortal self beyond physical concerns
- **Overthinking**: Master your restless mind through practice
- **Failure**: Transform setbacks into stepping stones
- **Discipline**: Build unshakeable habits and self-mastery

### 🎓 **Quiz Mode**
- Test your understanding of Gita teachings
- Learn through interactive questions
- Receive explanations for each answer
- Track your knowledge progress

### 📸 **Spiritual Gallery**
- Browse curated images of spiritual symbols, nature, and Krishna
- Find inspiration in visual form
- Share meaningful images with your community

### 👤 **User Profile & Customization**
- Personalize your guidance preferences
- Choose your communication style (calm, practical, devotional)
- Set notification preferences
- Save your profile settings locally in your browser

### 🔖 **Save & Share**
- Bookmark favorite verses and guidance responses
- Download guidance for offline reading
- Share insights with friends and family
- Create a personal collection of wisdom

### 🎨 **Beautiful User Interface**
- Dark theme with soothing colors for meditation
- Smooth animations and transitions using Framer Motion
- Responsive design works perfectly on desktop, tablet, and mobile
- Accessibility features for all users

---

## 🧱 Project Structure

```
geeta-ai/
├── app/                          # Next.js application directory (main app logic)
│   ├── page.tsx                  # Home page (entry point of the application)
│   ├── layout.tsx                # Root layout wrapper (HTML structure, metadata)
│   ├── globals.css               # Global CSS styles for entire application
│   └── api/                      # Backend API routes (serverless functions)
│       ├── guidance/
│       │   └── route.ts          # AI guidance engine - matches questions to verses
│       ├── avatar/
│       │   └── route.ts          # Avatar image/response generation
│       └── tts/
│           └── route.ts          # Text-to-Speech - converts text to audio
│
├── components/                   # React components (reusable UI pieces)
│   ├── KrishnaAiApp.tsx          # Main application component (orchestrates all features)
│   ├── KrishnaAiApp.test.tsx     # Tests for the main component
│   └── _emotion_tags.txt         # Internal styling metadata
│
├── lib/                          # Utility functions and data
│   ├── gita-data.ts              # Bhagavad Gita verses, situations, quotes, chapters
│   ├── guidance.ts               # Logic for generating personalized guidance
│   ├── guidance.test.ts          # Tests for guidance logic
│   └── types.ts                  # TypeScript type definitions (interfaces, data structures)
│
├── public/                       # Static assets (images, icons, files)
│   └── assets/
│       └── user-media/           # User-uploaded media storage
│
├── Configuration Files:
│   ├── package.json              # Project dependencies and scripts
│   ├── tsconfig.json             # TypeScript configuration
│   ├── next.config.mjs           # Next.js configuration
│   ├── tailwind.config.ts        # Tailwind CSS customization
│   ├── postcss.config.mjs        # CSS post-processing
│   ├── vitest.config.ts          # Testing framework configuration
│   ├── eslint.config.mjs         # Code quality rules
│   ├── next-env.d.ts             # Next.js type definitions
│   └── README.md                 # This file!
```

### **How Each Part Works Together:**

1. **User opens the app** → `page.tsx` loads `KrishnaAiApp.tsx` component
2. **User enters a question** → Component sends data to `/api/guidance`
3. **Backend processes request** → `guidance.ts` searches `gita-data.ts` for matching verses
4. **AI returns response** → Component displays guidance with optional voice
5. **User can listen** → TTS API generates and plays audio
6. **Progress saved** → Local storage tracks meditation, mood, and growth

---

## 🔄 How It Works (Flow Explanation)

### **User Journey - Asking for Guidance:**

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. USER OPENS APP                                               │
│    ↓                                                             │
│    Browser loads → next.js renders HTML → React loads component │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 2. USER FILLS FORM & ASKS QUESTION                              │
│    "I'm stressed about my job and don't know if I'm doing right"│
│    ↓                                                             │
│    Component validates question (2-1200 characters)             │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 3. REQUEST SENT TO BACKEND                                      │
│    POST /api/guidance                                           │
│    {                                                            │
│      "query": "I'm stressed about my job...",                   │
│      "situation": "stress"  // optional                         │
│    }                                                            │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 4. BACKEND PROCESSES REQUEST (guidance/route.ts)                │
│    ↓                                                             │
│    • Receives and validates JSON                                │
│    • Checks for greetings ("Hi", "Hello", etc.)                │
│    • Analyzes keywords in question                              │
│    • Searches gita-data.ts database                             │
│    • Matches to 5 situation types                               │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 5. AI MATCHES TO BEST VERSE                                     │
│    Example: Question about job stress                           │
│    ↓                                                             │
│    Verse 2:47 - "Focus on action, not results" ← MATCHED!       │
│    Confidence Score: 0.92 (92%)                                 │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 6. BACKEND GENERATES RESPONSE                                   │
│    {                                                            │
│      "verse": { /* Full Gita verse data */ },                   │
│      "krishnaGuidance": "My child, you worry too much...",      │
│      "practicalAdvice": ["Focus on these 3 tasks..."],          │
│      "reflectionPrompt": "What outcome am I obsessing over?",   │
│      "audioScript": "..." /* optimized for voice */             │
│      "confidence": 0.92                                         │
│    }                                                            │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 7. FRONTEND DISPLAYS RESPONSE                                   │
│    • Shows matched verse (Sanskrit, transliteration, meaning)   │
│    • Displays Krishna's personalized guidance                   │
│    • Lists practical advice for immediate use                   │
│    • Shows reflection prompt for deeper thinking                │
│    • Offers to read more or listen to audio                     │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 8. USER OPTIONS                                                 │
│    ┌─────────┐  ┌──────────┐  ┌─────────┐  ┌────────────┐      │
│    │ LISTEN  │  │ BOOKMARK │  │ SHARE   │  │ DOWNLOAD   │      │
│    │ (TTS)   │  │ (SAVE)   │  │(SOCIAL) │  │ (PDF/TEXT) │      │
│    └─────────┘  └──────────┘  └─────────┘  └────────────┘      │
│                                                                  │
│    ↓ If user clicks LISTEN:                                    │
│    • Call /api/tts with audioScript                             │
│    • Backend generates audio file                               │
│    • Audio plays with meditation music                          │
│    • User can pause/resume/control volume                       │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 9. USER TRACKS GROWTH                                           │
│    • Log meditation session                                     │
│    • Track mood before (e.g., Heavy 😟)                        │
│    • Track mood after (e.g., Steady 😐)                        │
│    • Add personal reflection                                    │
│    ↓                                                             │
│    Data saved to browser's localStorage                         │
│    Dashboard shows progress graphs                              │
└─────────────────────────────────────────────────────────────────┘
```

### **Data Flow Summary:**
- **Input**: User question → **Processing**: Verse matching & AI generation → **Output**: Personalized guidance + audio → **Tracking**: Growth metrics stored locally

---

## 🧪 Installation & Setup

### **Step 1: Prerequisites**

Before you start, ensure you have these installed on your computer:

- **Git** ([Download](https://git-scm.com/)) - Version control to clone the project
- **Node.js 20.11.0 or higher** ([Download](https://nodejs.org/)) - JavaScript runtime
- **npm** (comes with Node.js) - Package manager for dependencies

**Verify Installation:**
```bash
node --version      # Should show v20.11.0 or higher
npm --version       # Should show 10.0.0 or higher
git --version       # Should show git version 2.x or higher
```

### **Step 2: Clone the Repository**

Open your terminal/command prompt and run:

```bash
# Navigate to where you want the project
cd your-projects-folder

# Clone the repository
git clone https://github.com/yourusername/geeta-ai.git

# Enter the project directory
cd geeta-ai
```

### **Step 3: Install Dependencies**

Install all required packages:

```bash
npm install
```

This creates a `node_modules` folder with all necessary libraries. **This may take 2-5 minutes.**

### **Step 4: Setup Environment Variables (Optional)**

Some features may require configuration. Create a `.env.local` file in the project root:

```bash
# Example: .env.local file
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Add other variables as needed
```

### **Step 5: Run the Development Server**

Start the application in development mode:

```bash
npm run dev
```

You'll see output like:
```
▲ Next.js 16.2.4
  - Local:        http://127.0.0.1:3000
```

### **Step 6: Open in Browser**

Open your web browser and go to:
```
http://localhost:3000
```

🎉 **The application is now running!** You should see the beautiful KRISHNA AI interface with the Ask, Situations, Gita Reader, and other sections.

### **Step 7: Stop the Server**

To stop the application, press `Ctrl+C` in your terminal.

---

## ▶️ Usage

### **After Installation, Here's How to Use the App:**

### **🎤 Ask for Guidance**

1. **Navigate to the "Ask" section** (top navigation)
2. **Type your question or concern** (minimum 2 characters, maximum 1200 characters)
   - Example: *"I'm scared of public speaking and have a presentation next week"*
3. **Optionally select a situation** from the dropdown:
   - Stress, Fear, Overthinking, Failure, or Discipline
4. **Click "Ask Krishna"**
5. **Receive your guidance** with:
   - Relevant Gita verse
   - Personalized Krishna guidance
   - Practical advice for your situation
   - Reflection questions for deeper thinking

### **🎧 Listen to Guidance**

1. After receiving guidance, **click the Volume icon** (🔊)
2. Listen to the wisdom narrated in a calm, meditative voice
3. **Controls available:**
   - ▶️ Play/Pause
   - ⏭️ Next/Previous
   - 🔊 Volume control
   - Download for offline listening

### **📖 Read the Gita**

1. **Click "Gita" in the navigation**
2. **Browse chapters** (18 total in the Bhagavad Gita)
3. **Select a chapter** to see all verses
4. **Read each verse** with:
   - Original Sanskrit text
   - Transliteration (English pronunciation)
   - English meaning
   - Practical guidance
   - Tags for quick reference

### **🧘 Practice Meditation**

1. **Click "Meditation" section**
2. **Choose meditation duration** (5, 10, 15, or 30 minutes)
3. **Follow guided meditation** with voice narration
4. **Track your session** - duration, mood before/after

### **📊 Track Growth**

1. **Go to "Growth" section**
2. **Log daily entry:**
   - Select your mood before meditation (scale 1-5)
   - Enter meditation duration in minutes
   - Write your reflection or lesson learned
   - Select mood after meditation
3. **View your progress:**
   - Graph showing mood improvements
   - Statistics on meditation consistency
   - Personal journey insights

### **🎯 Explore Situations**

1. **Click "Situations"**
2. **Choose your life challenge:**
   - Stress (work, exams, pressure)
   - Fear (uncertainty, loss, change)
   - Overthinking (confusion, doubt)
   - Failure (setbacks, comparison)
   - Discipline (habits, consistency)
3. **Get pre-selected guidance** for that situation type
4. **Deep dive into related verses**

### **👤 Customize Profile**

1. **Click "Profile"**
2. **Set your preferences:**
   - Preferred guidance style (calm, practical, devotional)
   - Voice preferences (speed, tone)
   - Ambience (with or without meditation music)
   - Notification settings
3. **Save preferences** - stored in your browser

### **❓ Take the Quiz**

1. **Click "Quiz"**
2. **Answer questions** about Gita teachings
3. **Get instant feedback** on each answer
4. **Track your learning** progress over time

### **📱 Basic Navigation Tips**

- **Mobile**: Tap the menu icon (☰) for navigation
- **Desktop**: Use the top navigation bar
- **Bookmarks**: Click ⭐ to save favorite verses
- **Share**: Use the share icon to send guidance to friends
- **Search**: Use Ctrl+F to find verses by keyword

---

## 📸 Screenshots / Demo

### **Expected Screenshots and Features:**

*While specific screenshots aren't included in this installation, here's what you'll see:*

#### **1. Home / Ask Section**
- Input field for asking questions
- Dropdown to select life situations
- Beautiful hero section with Krishna imagery
- Response display with verse and guidance

#### **2. Gita Reader**
- Chapter list on left sidebar
- Verse content in center
- Sanskrit text, transliteration, translation
- Bookmarking options

#### **3. Growth Tracking Dashboard**
- Mood mood graph (before/after)
- Meditation statistics
- Personal growth insights
- Daily reflection log

#### **4. Meditation Interface**
- Timer display
- Guided meditation audio player
- Ambient sounds toggle
- Session controls

---

## ⚠️ Common Errors & Fixes

### **Error 1: "command not found: node" or "Node is not installed"**

**Problem**: Node.js is not installed on your computer.

**Solution:**
1. Download Node.js from https://nodejs.org/
2. Install using the default settings
3. Restart your terminal
4. Run `node --version` to verify

---

### **Error 2: "npm ERR! code ENOENT" during installation**

**Problem**: You're not in the correct project directory.

**Solution:**
```bash
# Make sure you're in the geeta-ai folder
cd geeta-ai
npm install
```

---

### **Error 3: "Port 3000 is already in use"**

**Problem**: Another application is using port 3000.

**Solution (Option 1 - Kill the process):**
```bash
# Windows PowerShell
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

**Solution (Option 2 - Use different port):**
```bash
PORT=3001 npm run dev
# App will run on http://localhost:3001
```

---

### **Error 4: "Cannot find module '@/components/...'"**

**Problem**: Dependency paths are broken.

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

### **Error 5: "Unexpected token '<' in JSON at position 0"**

**Problem**: API is returning HTML error page instead of JSON.

**Solution:**
1. Check your `.env.local` file for correct settings
2. Verify all API routes are created properly
3. Check browser console (F12) for detailed errors

---

### **Error 6: Blank white screen or no content showing**

**Problem**: Browser cache or JavaScript not loading.

**Solution:**
```bash
# Hard refresh your browser
Ctrl+Shift+R (Windows)
Cmd+Shift+R (Mac)

# If still blank, check browser console (F12) for errors
# You may need to npm install again
npm install
npm run dev
```

---

### **Error 7: "Cannot POST /api/guidance"**

**Problem**: Backend API is not running correctly.

**Solution:**
1. Make sure the dev server is running (`npm run dev`)
2. Wait 10-15 seconds for Next.js to compile
3. Check if the API file exists at `app/api/guidance/route.ts`
4. Restart the server: Stop (Ctrl+C) and run `npm run dev` again

---

### **Error 8: Styles look broken (no colors/layout)**

**Problem**: Tailwind CSS not compiling.

**Solution:**
```bash
# Stop the server (Ctrl+C)
# Delete cache
rm -rf .next
# Reinstall and rebuild
npm install
npm run build
npm run dev
```

---

## 🔐 Environment Variables

Environment variables are configuration settings that control how the app behaves. They should be stored in a `.env.local` file in your project root.

### **Create `.env.local` file:**

```bash
# Create file in project root
touch .env.local  # Mac/Linux
# or manually create .env.local file in Windows
```

### **Essential Variables:**

```env
# Application URL (for CORS and external API calls)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: API Keys for external services
# NEXT_PUBLIC_OPENAI_API_KEY=your_key_here
# NEXT_PUBLIC_GOOGLE_TTS_API_KEY=your_key_here

# Optional: Database connection
# DATABASE_URL=your_database_url

# Optional: Admin notifications
# ADMIN_EMAIL=admin@example.com
```

### **Variable Descriptions:**

| Variable | Required | Purpose | Example |
|----------|----------|---------|---------|
| `NEXT_PUBLIC_APP_URL` | No | Application base URL (visible to frontend) | `http://localhost:3000` |
| `NEXT_PUBLIC_*` | Varies | Prefix makes variable visible to browser | `NEXT_PUBLIC_` |
| `NODE_ENV` | Auto-set | Environment mode | `development` or `production` |

### **Important Security Notes:**

⚠️ **DO NOT commit `.env.local` to GitHub!**

1. Add `.env.local` to `.gitignore` (already done)
2. Never share API keys in code
3. Use strong, unique API keys
4. Rotate keys regularly in production
5. Store sensitive data on backend only (remove `NEXT_PUBLIC_` prefix)

---

## 📈 Future Improvements

Here are exciting features that could be added to make KRISHNA AI even better:

### **🎯 High Priority (Next 3 months)**
1. **User Authentication**
   - Sign up / Login with email or social accounts
   - Save guidance history per user
   - Sync growth tracking across devices

2. **Advanced Search**
   - Search verses by keywords, chapter, or tags
   - Filter by difficulty level
   - Save search preferences

3. **Community Features**
   - Share guidance with friends (link generation)
   - Comment on verses
   - See what others are asking about

4. **Personalization Engine**
   - ML-based verse recommendations
   - Learning style preferences (visual, audio, reading)
   - Language support (Hindi, Sanskrit, Spanish, etc.)

5. **Mobile App**
   - iOS & Android native apps
   - Offline mode with downloaded verses
   - Push notifications for daily verses

### **🔮 Medium Priority (3-6 months)**
6. **Enhanced Audio**
   - Multiple voice options (different narrators)
   - Background ambience library
   - Audio lessons (curated 10-15 min sessions)

7. **Gamification**
   - Achievement badges for consistency
   - Streak counter for daily practice
   - Leaderboards (if community enabled)

8. **Integration with Calendar**
   - Schedule meditation reminders
   - Calendar view of growth entries
   - Habit tracking calendar

9. **Video Content**
   - Animated verse explanations
   - Krishna stories and teachings
   - Expert commentary videos

10. **Analytics Dashboard**
    - Detailed mood trend analysis
    - Most helpful verses for you
    - Time of day recommendations

### **✨ Low Priority (6+ months)**
11. **AI Conversation**
    - Multi-turn conversations (follow-up questions)
    - Context awareness across sessions
    - Debate/discussion with Krishna AI

12. **Expanded Content**
    - Other sacred texts (Vedas, Upanishads, Yoga Sutras)
    - Comparative wisdom (Buddhism, Stoicism, etc.)
    - Modern interpretations and examples

13. **Advanced Meditation**
    - Brainwave frequency matching
    - Biofeedback integration
    - Guided breathwork

14. **Backend Optimization**
    - Database for persistent storage
    - Caching for faster responses
    - Admin panel for content management

---

## 👨‍💻 Author

**Project**: KRISHNA AI - Divine Life Guidance System

**Current Maintainers**: Development Team

**Contributing**: Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes with clear commit messages
4. Submit a pull request
5. Follow the project's code style (ESLint rules)

**Support**: 
- For bugs, please open an issue on GitHub
- For questions, check existing documentation
- Join our community for discussions

**License**: Check LICENSE file in the repository

---

## 🙏 Acknowledgments

This project draws from:
- **The Bhagavad Gita** - Ancient Indian scripture
- **Next.js & React Community** - Open source framework
- **Tailwind CSS** - Beautiful styling framework
- **All Contributors** - Who make this project possible

---

## 📚 Additional Resources

### **Learning Resources:**

- **Next.js Documentation**: https://nextjs.org/docs
- **React Documentation**: https://react.dev
- **Tailwind CSS Guide**: https://tailwindcss.com/docs
- **TypeScript Handbook**: https://www.typescriptlang.org/docs
- **Bhagavad Gita**: Multiple free interpretations available online

### **Getting Help:**

1. **Check Error Solutions**: Read "Common Errors & Fixes" above
2. **GitHub Issues**: Open an issue if you find bugs
3. **Community Forums**: Ask questions in relevant communities
4. **Documentation**: Review code comments in the project

---

**Last Updated**: May 2026

**Version**: 1.0.0

🙏 May this wisdom guide you on your path to a meaningful life.
