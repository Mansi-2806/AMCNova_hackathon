# TalentSync AI — Employee Portal (Android Application)

[![Vite Build](https://img.shields.io/badge/Build-Passing-10b981.svg)]()
[![Android SDK](https://img.shields.io/badge/Android-SDK%2034-0891b2.svg)]()
[![Tests](https://img.shields.io/badge/Unit%20Tests-8%20Passed-14b8a6.svg)]()

**TalentSync AI — Employee Portal** is an AI-powered mobile application built exclusively for employees to manage their daily work, track assigned projects and tasks, monitor personal workloads, update skills, submit support requests, and receive personalized AI recommendations.

---

## 📱 Project Architecture & Deliverables

This repository delivers:
1. **Live Android Web Application**: Built with React 19, Vite 8, and Material Design 3 tokens. Runs in an authentic Android Pixel titanium device shell with live status bar, punch-hole camera, and gesture navigation.
2. **Native Android Studio Project**: Full Gradle setup in the [`android/`](./android) directory (`AndroidManifest.xml`, `MainActivity.java`, `build.gradle`) ready to open in Android Studio.
3. **Reactive Data & Backend Synchronization Layer**: Centralized state store (`src/data/talentSyncStore.js`) managing persistent offline-first records and simulating real-time synchronization with the TalentSync Workforce Management backend.
4. **Automated Unit & Integration Test Suite**: 8 unit and integration tests covering domain models, task execution, workload calculation, conflict detection, and request lifecycle (`npm test`).

---

## 🌟 Key Application Features

### 1. Authentication & Onboarding
- **Employee Sign In**: Support for Employee ID (e.g. `EMP-101`) or corporate email (`rahul.s@talentsync.ai`).
- **Secure Password Field**: Toggle visibility with eye icon, input validation, and password recovery simulation.
- **Session Management**: Client-side encrypted persistent session with "Remember this device".
- **1-Click Demo Profiles**: Immediate testing for Rahul Sharma (Sr. Cloud Architect), Priya Patel (DevOps Associate), and Marcus Chen (Frontend Architect).
- **Interactive Feature Tour**: 4-step onboarding walkthrough explaining My Workspace, Tasks, Workload, and AI Copilot.

### 2. My Workspace (Home Dashboard)
- **Personalized Greeting**: Dynamic local-time greeting (Morning/Afternoon/Evening) with employee name, department, and location.
- **6 Dynamic KPI Cards**:
  1. *Active Projects* (authorized assignments)
  2. *Pending Tasks* (live count)
  3. *Tasks Due Soon* (due within next 7 days)
  4. *Current Workload* (% with color tier: Healthy, High Load, Overloaded)
  5. *Availability* (% and remaining buffer hours/week)
  6. *Pending Requests* (open support requests)
- **Today's Priorities**: Urgent tasks due today/soon or flagged as critical/blocked.
- **My Workload & Conflict Callout**: Visual comparison against 40h standard week, plus alert for overlapping milestones.
- **My Projects Preview**: Progress bars, next milestone date, and role tags.
- **AI Personal Insights**: Direct suggestions with explainable heuristic reasoning.
- **Quick Action Bar**: One-tap access to Raise Request, Workload Deep-Dive, Tasks, Copilot, and Learning Center.

### 3. My Tasks (Task Management)
- **Live Search**: Filter tasks instantly by title.
- **Multi-Filter Chips**: Filter by Project, Status (To Do, In Progress, Blocked, Completed), Priority (Critical, High, Medium, Low), and Due Date (Due Soon, Overdue).
- **Task Detail Modal**:
  - Interactive status controls (To Do, In Progress, Blocked, Completed).
  - Granular progress slider (0% to 100%).
  - Checkable acceptance criteria list.
  - Blocker reporting with custom reason.
  - Deadline risk flagging.
  - Progress notes thread with author timestamps.
  - Comprehensive audit trail and history.
  - Real-time backend synchronization indicator.

### 4. My Projects
- **Authorized Project Assignments**: Displays project name, client, employee's official role, progress %, next milestone, deadline, and team count.
- **Project Detail Sheet**:
  - Strategic business objectives.
  - Specific employee responsibilities.
  - Authorized team members directory with avatars and roles.
  - Milestones timeline with completion status.
  - Official announcements and documentation links.
  - Direct shortcut: *"Open Assigned Project Tasks"* with project filter pre-applied.

### 5. AI Personal Assistant (Copilot)
- **Dedicated AI Engine**: Rule-based heuristic copilot parsing live tasks, projects, workload %, and skills.
- **Actionable Modes**:
  - *Task Prioritization*: Reorders tasks by urgency & blockers with transparent reasoning.
  - *Workload Insights*: Diagnoses hours overload and overlapping milestone dates.
  - *Project Assistance*: Summarizes deliverables and authorized updates.
  - *Skill Development*: Highlights skill gaps for upcoming project phases.
- **Interactive Chat Interface**: Freeform chat with quick-prompt chips.

### 6. My Skills & Professional Profile
- **Profile Header**: Name, ID, role, department, location, contact email, and total years of experience.
- **Editable Summary**: Update bio, contact phone, and emergency contact details.
- **Skills Management**:
  - Proficiency levels: Beginner, Intermediate, Advanced, Expert.
  - Clear distinction: **Verified** (green shield badge) vs **Self-Reported** (amber tag).
  - Add self-reported skills modal.
  - *"Verify"* button immediately logs a Skill Verification ticket in the Support Center.
- **Certifications & Training**:
  - List verified licenses with credential IDs and expiration dates.
  - Add credential modal.
  - Completed training records history.
- **Account Settings**: Notification preferences, dark/light theme switch, privacy policy, and logout.

### 7. Workload & Availability Modal
- **Capacity Utilization**: Current assigned workload vs 40h standard planned capacity.
- **4-Week Workload Projection**: Interactive visual bar chart.
- **Detected Scheduling Conflicts**: Highlights overlapping critical milestones across projects.
- **Workload Assistance Card**: 1-click button to submit a pre-filled Workload Support Request.

### 8. Requests & Support Center
- **Submit Request Form**:
  - 7 Supported Request Types: *Workload Support, Deadline Conflict, Additional Resource, Project Clarification, Training Request, Skill Verification, Profile Correction*.
  - Project association, priority selector (Low, Medium, High, Urgent), description, reason, and supporting evidence.
- **Request Tracking**:
  - Real-time status tags: *Submitted, Under Review, Approved, Rejected, Resolved*.
  - Expandable detail view showing history and authorized administrator responses.

### 9. Learning & Development Center
- **Tailored Tracks**: Technical Tracks, Certification Tracks, and Soft Skills Tracks.
- **Personal Learning Goal**: Editable annual professional goal.
- **Interactive Checklists**: Check off modules, track completion percentage, and trigger confetti on completion.

### 10. In-App Notifications Center
- **Categorized Feed**: Filter by Tasks, Projects, Requests, Learning, Announcements.
- **Actionable Links**: Click any notification to navigate directly to the related task, project, or request.
- **Mark All Read**: Instant unread counter clear.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+)

### Installation
```bash
# Clone the repository
git clone https://github.com/Mansi-2806/AMCNova_hackathon.git
cd AMCNova_hackathon

# Install dependencies
npm install
```

### Running the Application
```bash
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

> **Tip:** Use the *"Full Screen View"* / *"Android Phone Frame"* toggle at the top of the screen to preview the application as an Android device or in full mobile responsive viewport!

### Running Unit Tests
```bash
npm test
```
Executes the automated domain verification suite covering models, tasks, workload, and requests.

### Building for Production
```bash
npm run build
```

---

## 🛠️ Android Studio Integration

The [`android/`](./android) folder contains standard Android Studio project files:
1. Open **Android Studio**.
2. Select **File > Open** and choose the `android/` directory in this project.
3. Gradle will sync dependencies (`androidx.appcompat`, `material`, `androidx.webkit`).
4. Select an Android emulator (e.g., Pixel 8 / 9 with API 34) and click **Run 'app'**.

---

## 👤 Demo User Accounts

| Employee ID | Name | Role | Workload Tier | Focus |
|---|---|---|---|---|
| `EMP-101` | **Rahul Sharma** | Senior Cloud Architect | **92% Overloaded** | Critical tasks, milestone conflict on Oct 24-25 |
| `EMP-102` | **Priya Patel** | DevOps Associate | **35% Available** | High availability, candidate for rebalancing |
| `EMP-104` | **Marcus Chen** | Frontend Architect | **85% High Load** | React / Next.js architecture |

*Default Demo Password for all accounts:* `TalentSync@2026` (or click any 1-Click Persona chip on the login screen).

---

## 🔒 Security & Role Boundary

- **Strict Separation**: This application is strictly for employees. Administrative and workforce manager dashboards are isolated.
- **Authorization Enforcement**: Employees can only view and update their authorized assignments.
- **Official Policy Isolation**: Employees cannot independently alter project membership, budgets, or capacity limits. Submitting requests triggers formal review workflows.

---

*Developed for the AMC TalentSync Hackathon 2026.*
