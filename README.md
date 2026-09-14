# 🤖 Browser Agent

### Privacy-Preserving • Lightweight • On-Device Browser Automation

> **On-device Visual Perception for Lightweight Browser Agents**
> A working prototype exploring privacy-aware browser automation using a Chrome Extension, TypeScript, Python, and lightweight computer vision.

<p align="center">

**👁️ Perceive → 🔒 Protect → 🧠 Decide → 🖱️ Act**

</p>

---

## 🚀 What is Browser Agent?

**Browser Agent** is a prototype of an AI-powered browser agent that can understand and interact with elements of a web page.

The project explores an important question:

> **Can browser agents automate tasks while minimizing unnecessary exposure of sensitive user information?**

For example, imagine a user has a login page open:

```text
┌─────────────────────────────────┐
│          LOGIN PAGE             │
│                                 │
│  Username  [______________]     │
│  Password  [••••••••••••••] 🔒  │
│                                 │
│           [ LOGIN ]             │
└─────────────────────────────────┘
```

The user can request:

```text
"Click Login"
```

The agent's goal is to identify the correct UI element and perform the action while treating sensitive elements differently.

---

# 🎯 Problem

Browser agents are becoming increasingly capable of interacting with websites on behalf of users.

However, webpages can contain sensitive information such as:

* 🔑 Passwords
* 👤 Usernames
* 💳 Financial information
* 🏥 Personal/health information
* 📄 Private form data

A traditional cloud-based agent may require webpage information, screenshots, or other UI context to be processed remotely.

This creates an important challenge:

### How can we make browser automation more privacy-aware and lightweight?

At the same time, browser agents should ideally work with:

* limited computational resources
* reduced cloud dependency
* efficient visual perception
* fast browser interaction

---

# 💡 Our Approach

This prototype explores a **privacy-first browser agent architecture**.

Instead of treating every webpage element equally, the system identifies UI elements and detects potentially sensitive inputs before continuing through the AI pipeline.

### High-level workflow

```text
             👤 User Instruction
                    │
                    ▼
          🌐 Browser Web Page
                    │
                    ▼
           👁️ UI Perception
                    │
                    ├───────────────┐
                    ▼               ▼
             Normal Elements    🔒 Sensitive
                    │               │
                    └───────┬───────┘
                            ▼
                    🧠 AI Pipeline
                            │
                            ▼
                    🎯 Target Element
                            │
                            ▼
                    🖱️ Browser Action
                            │
                            ▼
                         ✅ Done
```

---

# ✨ Key Features

## 👁️ 1. Browser UI Perception

The Chrome extension detects elements present on the webpage.

The prototype can identify elements such as:

* `INPUT`
* `BUTTON`
* interactive UI elements
* approximate screen coordinates

Example:

```text
UI Elements Found: 6

INPUT
INPUT → Sensitive
BUTTON → Login
BUTTON → Transfer Money
...
```

---

## 🔒 2. Sensitive Element Detection

Not every element on a webpage should be treated equally.

The prototype specifically identifies sensitive inputs such as password fields.

Example:

```text
Username  → Normal Input
Password  → 🔒 Sensitive Input
Login     → Button
```

This forms the basis of the project's **Privacy Layer**.

---

## 🧠 3. Local AI Pipeline

The prototype contains a Python-based computer vision pipeline using **Ultralytics YOLO**.

Current flow:

```text
Screenshot
     ↓
Local Python Backend
     ↓
YOLO Model
     ↓
Detection Results
```

The model file is intentionally **not stored in this repository**.

It can be downloaded locally when setting up the project.

---

## 🖱️ 4. Browser Interaction

After identifying the required element, the browser extension can interact with it.

Example:

```text
User:
"Click Login"

       ↓

Agent:
Login button found

       ↓

Browser:
Login button clicked ✅
```

---

## ⚡ 5. Lightweight Architecture

The project separates browser interaction from the AI/vision pipeline:

```text
┌───────────────────────────────┐
│       Chrome Extension       │
│          TypeScript          │
│                               │
│   DOM / UI Perception        │
│   Browser Interaction        │
└───────────────┬───────────────┘
                │
                │ Local HTTP
                ▼
┌───────────────────────────────┐
│       Python Backend          │
│                               │
│       Computer Vision         │
│            YOLO               │
└───────────────────────────────┘
```

---

# 🔄 Prototype Workflow

### 1️⃣ User opens a webpage

The browser extension starts its content script.

```text
Web Page
   ↓
Content Script
```

### 2️⃣ UI elements are detected

The extension scans the page and identifies interactive elements.

### 3️⃣ Sensitive elements are classified

Password and other sensitive input fields are handled separately.

### 4️⃣ Screenshot enters the local AI pipeline

The prototype can send screenshot information to the local Python backend.

### 5️⃣ AI perception runs locally

The Python backend performs the available detection process.

### 6️⃣ Agent identifies the required UI element

For example:

```text
Target → Login Button
```

### 7️⃣ Browser performs the action

```text
Agent → Chrome Extension → Button → Click
```

---

# 🏗️ Project Structure

```text
browser_agent/
│
├── 📁 ai/
│   └── detect.py
│
├── 📁 demo/
│   └── screenshot.png
│
├── 📁 public/
│
├── 📁 src/
│   ├── content.ts
│   ├── background.ts
│   └── ...
│
├── 📄 manifest.json
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 requirements.txt
├── 📄 tsconfig.json
├── 📄 .gitignore
└── 📄 README.md
```

> Generated files, dependencies, virtual environments, and AI model weights are excluded using `.gitignore`.

---

# 🛠️ Tech Stack

| Technology                   | Role                             |
| ---------------------------- | -------------------------------- |
| 🟦 **TypeScript**            | Browser extension logic          |
| 🌐 **Chrome Extension APIs** | Browser interaction              |
| 🐍 **Python**                | AI/vision backend                |
| 🤖 **Ultralytics YOLO**      | Computer vision                  |
| 🌐 **DOM APIs**              | Webpage UI perception            |
| 🔗 **HTTP / Localhost**      | Extension ↔ Python communication |
| 💻 **VS Code**               | Development                      |

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/s64537203-pixel/browser_agent.git
cd browser_agent
```

---

## 2. Install Node dependencies

```bash
npm install
```

---

## 3. Compile TypeScript

```bash
npx tsc
```

---

## 4. Set up Python environment

Create a virtual environment:

### Windows

```powershell
python -m venv .venv
```

Activate it:

```powershell
.venv\Scripts\activate
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

---

# 🤖 YOLO Model Setup

The YOLO model weights are **not included in the GitHub repository** to keep the repository lightweight.

The AI script uses:

```python
YOLO("yolo11n.pt")
```

If the model is not already present locally, download/place the required model file in the expected project location before running the detection script.

Then run:

```powershell
python ai/detect.py
```

---

# 🌐 Load the Chrome Extension

Open Chrome:

```text
chrome://extensions
```

Then:

1. Enable **Developer mode**
2. Select **Load unpacked**
3. Choose the extension's generated/build directory
4. Open the demo webpage
5. Reload the extension if required
6. Test the browser interaction

---

# 🧪 Current Prototype

The current prototype demonstrates:

```text
✅ Chrome Extension
        ↓
✅ UI Element Detection
        ↓
✅ Sensitive Input Detection
        ↓
✅ Local Python AI Pipeline
        ↓
✅ YOLO Integration
        ↓
✅ Browser Button Interaction
```

### Prototype evidence

Example events produced during testing:

```text
Browser Agent - UI Perception Started!

Sensitive element detected: INPUT

Agent found Login button

Agent clicked Login button

Privacy Layer: Active

Starting screenshot → AI pipeline
```

---

# 📸 Demo

> Add your prototype screenshots/GIF here.

### Recommended demo sequence

**1. Browser UI**

Show the webpage containing:

* Username
* Password
* Login
* Transfer Money

**2. Extension logs**

Show:

```text
Sensitive element detected
```

**3. Agent action**

Show:

```text
Agent found Login button
Agent clicked Login button
```

**4. AI pipeline**

Show:

```text
Screenshot
    ↓
Local Python
    ↓
YOLO
```

---

# 🔐 Privacy Architecture

The central concept of this project is to introduce a privacy layer before sensitive information becomes unnecessary input to the agent.

### Traditional approach

```text
Webpage
   ↓
Screenshot / Page Data
   ↓
☁️ Remote AI
   ↓
Decision
   ↓
Browser Action
```

### Proposed direction

```text
Webpage
   ↓
👁️ Local UI Perception
   ↓
🔒 Privacy Layer
   ↓
🧠 Lightweight Local AI
   ↓
🎯 Decision
   ↓
🖱️ Browser Action
```

### Why?

Because the agent does not necessarily need to know everything visible on a webpage to perform a simple task.

For example:

```text
Task:
"Click Login"

Useful:
✅ Login button location

Potentially unnecessary:
❌ Password value
❌ Private form contents
```

This **data-minimization principle** is one of the key ideas explored by the project.

---

# ⚠️ Prototype Limitation

This is an **experimental prototype**, not a production-grade security system.

The current implementation demonstrates the architecture and core interaction concepts.

It does **not** claim that sensitive information can never be exposed.

A production system would require significantly stronger:

* privacy guarantees
* isolation
* permission controls
* model evaluation
* adversarial testing
* security auditing
* reliable UI understanding

---

# 🔮 Future Scope

The prototype can evolve into a complete lightweight browser agent.

### 🧠 Advanced Agent Reasoning

Add natural-language task planning:

```text
"Open my email and find today's meeting invitation."
```

The agent could break this into multiple browser actions.

---

### 👁️ Advanced Visual Perception

Improve understanding of:

* buttons
* forms
* menus
* icons
* layouts
* dynamic web components

---

### 🔒
