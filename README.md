# QuoraZ - Gen Z Q&A Platform 🚀

A futuristic, Gen Z-inspired question and answer platform built with React. This project is a frontend-focused application, currently using mock data to simulate a full Q&A experience, complete with AI-powered assistance.

## ✨ Core Features

- **Question & Answer Feed**: Create, view, upvote, and downvote questions.
- **User Profiles**: Simple user profiles with customizable avatars and bios.
- **Trending Topics**: A sidebar showing hot topics and categories.
- **Clean UI/UX**: Cyberpunk-inspired design with a clean, professional feel. Uses glass morphism and subtle animations via Framer Motion.

## 🤖 AI-Powered Assistance (Simulated)

This app uses a local, rule-based service (`aiService.js`) to simulate AI features instantly and for free:

- **Smart Tag Suggestions**: As you type a question, the app analyzes your title and description to suggest relevant tags (e.g., "pizza" suggests `#food`).
- **Hinglish Support**: The tag generator understands common Hinglish keywords (like "naukri", "padhai", "kaise banaye").
- **Writing Assistant**: Provides real-time feedback on grammar and style (e.g., "capitalize 'i'", "remove extra spaces").
- **Content Inspiration**: Suggests example questions in the "Ask Question" modal if you're stuck.

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Notifications

### Backend (Mock)

- The app currently runs on **mock data** simulated in `App.js` and `aiService.js`.
- A minimal `server.js` (Express) is included for future backend development.

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd quora-genz
    ```

2.  **Run the startup script (Windows)**

    ```powershell
    ./start.ps1
    ```

3.  **Manual installation**

    ```bash
    # Install server dependencies (for future use)
    npm install

    # Install client dependencies
    cd client
    npm install
    cd ..
    ```

### Running the Application

#### Option 1: Run both servers simultaneously

```bash
npm run dev
```

#### Option 2: Run servers separately

# Terminal 1 - Backend server

npm run server

# Terminal 2 - Frontend client

npm run client

#### 🌐 Access

Frontend: http://localhost:3000

Backend API: http://localhost:5000

quora-genz/
├── client/ # React frontend
│ ├── public/
│ ├── src/
│ │ ├── components/ # React components
│ │ │ ├── Header.js
│ │ │ ├── Header.css
│ │ │ ├── Sidebar.js
│ │ │ ├── Sidebar.css
│ │ │ ├── QuestionFeed.js
│ │ │ ├── QuestionFeed.css
│ │ │ ├── QuestionCard.js
│ │ │ ├── QuestionCard.css
│ │ │ ├── QuestionModal.js
│ │ │ ├── QuestionModal.css
│ │ │ ├── UserProfile.js
│ │ │ └── UserProfile.css
│ │ ├── services/
│ │ │ └── aiService.js # Mock AI logic
│ │ ├── App.js # Main app component
│ │ ├── App.css
│ │ ├── index.js
│ │ └── index.css
│ └── package.json
├── server.js # Express server
├── package.json # Server dependencies
└── .env # Environment variables

Made with ❤️ and lots of ☕
