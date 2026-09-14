# 🤖 Privacy-Preserving Lightweight Browser Agent

> **On-device Visual Perception for Lightweight Browser Agents**
> *A prototype inspired by the ISRO Smart India Hackathon 2026 problem statement.*

[![Python](https://img.shields.io/badge/Python-3.x-blue?logo=python)](https://www.python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-ES2020-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green?logo=googlechrome)](https://developer.chrome.com/docs/extensions/)
[![YOLO](https://img.shields.io/badge/YOLO-Ultralytics-purple)](https://github.com/ultralytics/ultralytics)
[![License](https://img.shields.io/badge/License-MIT-yellow)](#-license)

---

## 🌟 What is this?

**Browser Agent** is a prototype of a lightweight, privacy-focused AI agent that can **perceive elements of a browser interface and perform user-requested actions** while keeping sensitive information protected locally.

Instead of continuously sending a user's webpage data to a cloud AI service, the proposed architecture focuses on **local visual perception and local processing**.

### 💡 In simple words

Imagine you have this form open:

```text
┌──────────────────────────────────┐
│          Login Form              │
│                                  │
│  Username: [____________]        │
│  Password: [••••••••••••]        │
│                                  │
│          [ LOGIN ]               │
└──────────────────────────────────┘
```

You tell the agent:

> **"Click Login."**

The agent should be able to:

**See → Understand → Protect → Act**

```text
User Instruction
       ↓
Browser Interface
       ↓
UI / Visual Perception
       ↓
Sensitive Data Detection
       ↓
Privacy Protection Layer
       ↓
AI Decision
       ↓
Browser Action
       ↓
       ✅ Login clicked
```

---

# 🎯 Problem

Modern browser agents can automate tasks such as:

* clicking buttons
* filling forms
* navigating websites
* interacting with web applications

However, browser interaction can involve **highly sensitive information**, such as:

* passwords
* usernames
* financial information
* personal details
* authentication fields

Sending complete webpage information or screenshots to remote AI models can create unnecessary **privacy and data-exposure concerns**.

At the same time, many powerful AI systems depend on:

* large models
* cloud inference
* high computational resources
* continuous network connectivity

### The challenge

> **Can we build a lightweight browser agent that can perceive a webpage, understand its UI, protect sensitive information, and perform actions with as much processing as possible happening locally?**

---

# 🚀 Our Approach

This prototype explores a **privacy-first browser agent architecture**.

Instead of treating the webpage as unrestricted data, the system introduces a **Privacy Layer** between UI perception and AI processing.

### Core idea

```text
                 ┌─────────────────────┐
                 │   Browser / Web UI  │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │   UI Perception     │
                 │                     │
                 │ Detect UI Elements  │
                 │ Buttons / Inputs    │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │   Privacy Layer 🔒  │
                 │                     │
                 │ Sensitive Elements  │
                 │     Detection       │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Lightweight AI      │
                 │ Perception / Agent  │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Browser Action      │
                 │ Click / Interact    │
                 └─────────────────────┘
```

---

# ✨ Key Features

### 🔍 1. Browser UI Perception

The browser extension detects visible UI elements such as:

* buttons
* text inputs
* password inputs
* interactive elements

The prototype logs detected elements and their approximate positions.

---

### 🔐 2. Privacy Layer

Sensitive UI elements are identified separately.

For example:

```text
Username       → Normal Input
Password       → 🔒 Sensitive Input
Login          → Button
Transfer Money → Button
```

This creates a separation between **what the agent needs to understand** and **what should remain protected**.

---

### 🤖 3. Lightweight AI Pipeline

The prototype also experiments with a local computer-vision pipeline using **YOLO**.

The current prototype uses:

```text
Browser Screenshot
       ↓
Local Python Backend
       ↓
YOLO Model
       ↓
UI/Object Detection
```

The goal is to explore whether lightweight models can provide useful visual perception without depending entirely on large cloud-based models.

---

### ⚡ 4. Local Processing

The prototype is designed around a local architecture:

```text
Chrome Extension
       │
       │ HTTP
       ▼
Local Python Server
       │
       ▼
Local AI Model
```

This allows experimentation without requiring every perception step to be sent to a remote AI API.

---

### 🧩 5. Browser Automation

Once the agent identifies the required UI element, the browser extension can interact with it.

Example:

```text
Instruction:
"Click Login"

        ↓

Agent identifies:
LOGIN BUTTON

        ↓

Browser:
CLICK LOGIN
```

---

# 🛠️ Tech Stack

| Technology                | Purpose                      |
| ------------------------- | ---------------------------- |
| **TypeScript**            | Browser extension logic      |
| **Chrome Extension APIs** | Browser interaction          |
| **Python**                | Local AI backend             |
| **Ultralytics YOLO**      | Visual/object detection      |
| **JavaScript / DOM APIs** | UI element perception        |
| **HTTP / Localhost**      | Extension ↔ AI communication |
| **VS Code**               | Development environment      |

---

# 🏗️ Project Architecture

```text
Browser-Agent/
│
├── 📁 src/
│   ├── content.ts
│   ├── background.ts
│   └── ...
│
├── 📁 ai/
│   └── detect.py
│
├── 📁 demo/
│   └── screenshot.png
│
├── 📁 dist/
│   └── compiled extension files
│
├── 📄 manifest.json
├── 📄 package.json
├── 📄 tsconfig.json
└── 📄 README.md
```

> File names may vary slightly depending on the current prototype version.

---

# 🔄 How the Prototype Works

### Step 1 — User opens a webpage

The Chrome extension loads its content script.

```text
Browser Page
     ↓
Content Script
```

---

### Step 2 — UI elements are detected

The extension scans the page and identifies interactive elements.

Example prototype output:

```text
UI Elements Found: 6

INPUT
INPUT → Sensitive
BUTTON → Login
BUTTON → Transfer Money
...
```

---

### Step 3 — Privacy layer identifies sensitive elements

Sensitive fields such as password inputs are classified separately.

```text
Password Input
      ↓
Sensitive Element Detected 🔒
```

---

### Step 4 — Screenshot / visual information enters AI pipeline

The prototype can pass screenshot information to the local AI pipeline.

```text
Screenshot
    ↓
Local Python Server
    ↓
YOLO
    ↓
Detection
```

---

### Step 5 — Agent identifies the target

For example:

```text
User:
"Click Login"

        ↓

Agent:
Login button found
```

---

### Step 6 — Browser performs the action

```text
Agent
  ↓
Chrome Extension
  ↓
Login Button
  ↓
🖱️ Click
```

---

# 🔒 Privacy-by-Design

Privacy is not treated as an afterthought.

It is incorporated directly into the agent pipeline.

### Instead of:

```text
Webpage
   ↓
Screenshot
   ↓
Cloud AI
   ↓
Decision
```

### The proposed approach is:

```text
Webpage
   ↓
Local Perception
   ↓
🔒 Privacy Layer
   ↓
Only necessary information
   ↓
Lightweight Agent
   ↓
Browser Action
```

This reduces unnecessary exposure of sensitive UI information.

> **Important:** This repository contains a prototype demonstrating the architecture and core concepts. It should not be considered a production-grade security system or a guarantee that sensitive data can never be exposed.

---

# 🧪 Current Prototype Status

| Component                           | Status         |
| ----------------------------------- | -------------- |
| Chrome Extension                    | ✅ Working      |
| UI Element Detection                | ✅ Working      |
| Sensitive Input Identification      | ✅ Working      |
| Login Button Detection              | ✅ Working      |
| Browser Button Interaction          | ✅ Working      |
| Local Python Backend                | ✅ Working      |
| Screenshot → AI Pipeline            | ✅ Prototype    |
| YOLO Integration                    | ✅ Prototype    |
| Full autonomous browser agent       | 🚧 Future Work |
| Production-grade privacy protection | 🚧 Future Work |
| Fully on-device optimized model     | 🚧 Future Work |

---

# 📸 Demo

### Prototype Flow

```text
┌──────────────┐
│ User Request │
│ "Click Login"│
└──────┬───────┘
       ↓
┌──────────────┐
│ Browser UI   │
└──────┬───────┘
       ↓
┌──────────────┐
│ UI Detection │
└──────┬───────┘
       ↓
┌──────────────┐
│ Privacy 🔒   │
└──────┬───────┘
       ↓
┌──────────────┐
│ Local AI     │
└──────┬───────┘
       ↓
┌──────────────┐
│ Browser      │
│ Action       │
└──────┬───────┘
       ↓
    ✅ Done
```

> 💡 Add your actual prototype screenshots/GIFs here to make the repository much more impressive.

---

# ⚙️ Getting Started

## 1️⃣ Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd browser-agent
```

---

## 2️⃣ Install Node dependencies

```bash
npm install
```

---

## 3️⃣ Compile TypeScript

```bash
npx tsc
```

---

## 4️⃣ Start the local AI backend

Create/activate your Python environment and install the required dependencies.

Example:

```bash
pip install ultralytics
```

Then run:

```bash
python ai/detect.py
```

---

## 5️⃣ Load the Chrome Extension

Open Chrome and go to:

```text
chrome://extensions
```

Then:

1. Enable **Developer mode**
2. Click **Load unpacked**
3. Select the project's extension/build directory
4. Open the demo webpage
5. Test the browser agent

---

# 🧠 Why TypeScript?

The browser extension needs to interact directly with:

* DOM elements
* browser APIs
* events
* buttons
* inputs
* content scripts
* service workers

TypeScript provides JavaScript compatibility while adding:

* static typing
* better IDE support
* easier debugging
* improved maintainability

Python is used separately for the AI/vision pipeline.

### So the architecture becomes:

```text
TypeScript
   │
   │ Browser interaction
   ▼
Chrome Extension
   │
   │ Local communication
   ▼
Python
   │
   │ AI / Computer Vision
   ▼
YOLO
```

---

# 🌍 Real-World Applications

The concept can potentially be extended to:

### 🏦 Banking

Automate repetitive navigation while protecting:

* account numbers
* passwords
* transaction details

### 🏥 Healthcare

Assist with browser-based workflows involving sensitive patient information.

### 🏢 Enterprise Applications

Automate repetitive internal web tasks while reducing unnecessary data exposure.

### 🛰️ Space / Research Systems

Useful for controlled environments where:

* network connectivity may be limited
* privacy is important
* computational resources are constrained

### ♿ Accessibility

Assist users in interacting with complex web interfaces through natural-language commands.

---

# 🔮 Future Scope

The prototype can be extended into a complete browser agent with:

* 🧠 natural-language task planning
* 👁️ stronger visual UI understanding
* 🔐 automatic sensitive-data redaction
* 📱 on-device / edge inference
* ⚡ model quantization
* 🧩 multi-step browser workflows
* 📴 offline operation
* 🛡️ stronger privacy guarantees
* 🔄 task recovery and error handling
* 🧪 benchmark evaluation using browser-agent datasets

Potential optimization technologies include:

**ONNX Runtime Web + WebGPU + lightweight vision models**

to reduce dependency on large cloud-based models.

---

# 📊 Prototype vs. Future System

|              | Current Prototype                | Future System                       |
| ------------ | -------------------------------- | ----------------------------------- |
| UI Detection | DOM + prototype vision pipeline  | Advanced visual perception          |
| AI           | YOLO experimentation             | Lightweight optimized agent         |
| Privacy      | Sensitive element identification | Local redaction/privacy enforcement |
| Actions      | Browser interaction              | Autonomous multi-step tasks         |
| Compute      | Local prototype                  | Optimized edge/on-device            |
| Instructions | Basic task examples              | Natural-language task planning      |
| Connectivity | Local backend                    | Offline-first                       |

---

# 💡 Why This Matters

The goal isn't simply to build **another browser automation tool**.

The bigger idea is:

> ### **Make browser agents useful without making users give away unnecessary data.**

As AI agents become capable of interacting with websites on behalf of users, **privacy, efficiency, and local intelligence** become increasingly important.

This project explores one possible direction:

**Perceive locally → Protect sensitive information → Decide → Act**

---

# 👩‍💻 Contributors

**Team / Developer:** *[Add your name/team here]*

Built as a prototype for exploration of:

**AI Agents • Computer Vision • Browser Automation • Privacy-Preserving AI • Edge AI**

---

# ⭐ Support

If you find this project interesting, consider giving the repository a ⭐

It helps the project get noticed and motivates further development.

---

# 📜 License

This project is licensed under the **MIT License**.

---

<p align="center">

### 🤖 Building the next generation of privacy-aware browser agents.

**Perceive. Protect. Act. 🔒**

</p>
