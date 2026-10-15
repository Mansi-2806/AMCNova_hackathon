# TalentSync AI — Admin / Workforce Manager Android Application

[![Vite Build](https://img.shields.io/badge/Build-Passing-10b981.svg)]()
[![Android SDK](https://img.shields.io/badge/Android-SDK%2034-0891b2.svg)]()
[![Tests](https://img.shields.io/badge/Unit%20Tests-15%20Passed-14b8a6.svg)]()
[![Design System](https://img.shields.io/badge/Theme-Enterprise%20Blue--and--White-2563eb.svg)]()

**TalentSync AI — Admin / Workforce Manager Portal** is a production-grade, functional Android application built for administrators, operations leaders, and workforce managers. It enables organizations to monitor real-time workforce utilization, optimize project staffing using AI heuristics, resolve scheduling bottlenecks, conduct what-if scenario simulations, and enforce resource governance.

---

## 📱 Project Architecture & Deliverables

1. **Native Android Experience**: Runs in an authentic Android hardware frame with status clock, 5G/Wi-Fi indicators, camera punch-hole, top app bar, and a standard **5-item bottom navigation bar** (Material Design 3 tokens). Supports toggling between phone frame mode and full-screen view.
2. **Unified Reactive Repository Layer**: Powered by `talentSyncStore.js`, providing authoritative offline-first state management with local persistence, reactive subscriptions, dynamic KPI calculations, and live cross-portal synchronization between Admin decisions and Employee Portal updates.
3. **Enterprise Blue-and-White Design System**: Tailored enterprise aesthetic (`#1e40af`, `#2563eb`, `#eff6ff`, `#ffffff`) with rounded cards, subtle elevation, touch-friendly touch targets, and clear state transitions.
4. **Automated Unit & Integration Test Suite**: 15 unit and integration tests (`npm test`) covering domain data models, task execution, 8 dynamic KPI calculations, AI team allocation logic, workload rebalancing, and audit logging.

---

## 🏛️ Application Modules & Features

### 1. Admin Authentication & Role Governance (Section 3)
- **Authorized Admin Login**: Email input, password input with visibility toggle, input validation, and session management.
- **1-Click Executive Demo Profiles**:
  - **Sarah Connor** — VP of Workforce Operations (`director.hr@talentsync.ai`)
  - **Alex Mercer** — Chief Resource Officer (`admin@talentsync.ai`)
- **Access Control (RBAC)**: Cryptographically verified permission matrix for employee deactivation, project creation, workload rebalancing, and live scenario commits.
- **Session Management**: Session timeouts, auto-lock preferences, and secure logout.

### 2. Home — Workforce Overview (Section 4)
- **8 Dynamic KPI Cards** (derived strictly from live domain data, never hardcoded):
  1. *Total Employees*: Active organization headcount.
  2. *Available Employees*: Staff within bench/available bandwidth.
  3. *Active Projects*: Currently ongoing corporate initiatives.
  4. *Workforce Utilization %*: Aggregate utilization percentage against 40h standard.
  5. *Overloaded Employees*: Count of specialists exceeding workload thresholds (>100%).
  6. *Underutilized Employees*: Count of specialists operating below capacity (<70%).
  7. *Pending Resource Requests*: Open support and capacity relief tickets.
  8. *Unfilled Project Positions*: Vacant positions across upcoming projects.
- **Live Utilization Gauge**: Visual meter tracking organization health against the 75%–85% optimal bandwidth.
- **Department Capacity vs. Assigned Load Chart**: Real-time breakdown across Software Engineering, Cloud Infrastructure, AI & Data Science, and Quality Assurance.
- **Workforce Resource Alerts**: High-priority notices for critical bottlenecks, upcoming deadlines, and staffing shortages.
- **AI Workforce Insights**: Explainable organizational health analysis with actionable recommendations.
- **Dashboard Shortcut Chips**: Instant access to Directory, AI Team Builder, Workload, Projects, Requests, Skills, Alerts, Simulator, and Reports.

### 3. Workforce — Employee Directory (Section 5)
- **Search & Multi-Filtering**: Instant search by employee name, ID, or job role. Filter by department, workload tier (Overloaded, Healthy, Underutilized), and experience level.
- **Employee Profile Inspection Sheet**: Comprehensive modal showing Employee ID, full name, role, department, location, contact info, total experience, verified vs self-reported skills with proficiency levels, active project assignments, planned capacity vs assigned hours, and availability metrics.
- **Employee CRUD & Account Deactivation**: Full forms with validation to add new employees, edit existing records, or toggle account activation status (logged to immutable audit trail).

### 4. Team Builder — AI Allocation (Section 6)
- **Project Staffing Target Selector**: Choose any project with unfilled positions (e.g. `PRJ-005 CyberShield Zero-Trust Ingress`, requiring 4 engineers).
- **Refine Allocation Constraints**: Configurable parameters for target team size, required workload (hours/week), minimum skill proficiency (Beginner to Expert), and minimum years of experience.
- **Transparent AI Candidate Ranking Engine**:
  - Evaluates matching competencies, proficiency depth, available bandwidth, existing commitments, and potential conflict penalties.
  - Transparent rule-based heuristic explanation for every candidate (e.g. *"94% Match: Matched 3/3 key skills, 18h available capacity, 0 schedule clashes"*).
- **Proposed Team Roster Dock**:
  - Live Team Readiness index score (0%–100%).
  - Average candidate match, skills coverage %, and combined available capacity.
- **Side-by-Side Candidate Comparison**: Select any 2 candidates to compare skills, experience, and workload.
- **Confirm Team Allocation**: Commits assignments to the project, updates employee workloads, triggers notifications, and recalculates KPIs.

### 5. Workload — Utilization and Conflicts (Section 7)
- **Configurable Workload Parameters**: Custom thresholds for standard weekly hours (default 40h), overload trigger (default 100%), and underutilized trigger (default 70%).
- **AI Workload Redistribution Engine**:
  - Automatically identifies overloaded staff and pairs them with underutilized colleagues possessing overlapping competencies or departmental alignment.
  - Displays transfer flow visualization, donor load reduction, recipient load impact, and specific justification.
  - **1-Click "Approve & Execute Rebalance"**: Safely transfers workload and updates live assignments in real time.
- **Department Capacity Comparison**: Visual progress bars comparing departmental capacity against current project commitments.
- **Employee Utilization Breakdown**: Granular view of each team member's assigned hours vs planned capacity, with conflict badges for overlapping projects.

### 6. Planning — What-If Simulator & Reports (Section 11 & 12)
- **Scenario Simulator Sandbox**:
  - Pre-configured what-if modeling presets:
    - *Emergency Project Injection* (+20h/wk, +8% org utilization)
    - *Key Person Temporary Leave* (Lead Architect 4-week absence, delivery risk surge)
    - *Accelerate Project Milestone* (Compress deadline by 3 weeks)
    - *Staff Reassignment* (Move specialist between initiatives)
  - Side-by-side comparison of baseline metrics vs simulated metrics: Org Utilization, Overloaded Count, Project Delivery Risk, and Skill Coverage.
  - Trade-off analysis with transparent forecasts labeled as estimates.
  - Simulations operate in an isolated sandbox until explicitly confirmed and logged to the audit ledger.
- **Reports & Certified CSV Export**:
  - Live workforce allocation ledger with department filters and reporting periods.
  - **1-Click "Export CSV Report"**: Generates and downloads a real `TalentSync_Workforce_Report.csv` file from active application records.

### 7. Governance, Modals & Notification Center
- **Projects Management Modal (Section 8)**: Overview of active, upcoming, and completed initiatives; staffing gap analysis; and new project creation drawer.
- **Resource Requests Queue (Section 8)**: Review tickets submitted from the Employee Portal (workload relief, equipment, skill verification), approve/reject with notes, adjust capacity, and notify employees.
- **Skills Intelligence Modal (Section 9)**: Org-wide skills inventory, proficiency distribution, critical skill shortages vs project demands, and AI upskilling pathways.
- **Workforce Alert Center (Section 10)**: Centralized drawer with severity filters (Critical, Warning, Info), acknowledge actions, and resolve toggles.
- **Audit Trail & Governance Modal (Section 13)**: Immutable audit history tracking operator, timestamp, target, action, and decision.

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

> **Tip:** Use the *"Full Screen View"* / *"Android Phone Frame"* button on the top status bar to toggle between the native Android hardware shell and full viewport responsive layout!

### Running Automated Test Suites
```bash
npm test
```
Executes both test suites:
- **Suite 1 (Employee Portal)**: Domain models, task lifecycle, capacity metrics, conflict detection.
- **Suite 2 (Admin Portal)**: Dynamic KPI derivation, AI team allocation, workload rebalancing, resource requests, CSV generation, and employee CRUD.

### Building for Production
```bash
npm run build
```

---

## 👥 Demo Administrator Accounts

| Name | Role | Email | Default Password |
|---|---|---|---|
| **Sarah Connor** | VP of Workforce Operations | `director.hr@talentsync.ai` | `Admin@TalentSync2026` |
| **Alex Mercer** | Chief Resource Officer | `admin@talentsync.ai` | `Admin@TalentSync2026` |

*Quick login: Click either of the 1-click persona chips on the Admin login screen to immediately authenticate.*

---

## 🛠️ Android Studio Native Integration

The [`android/`](./android) folder contains the Android Studio project:
1. Open **Android Studio**.
2. Select **File > Open** and point to the `android/` directory.
3. Gradle will synchronize dependencies (`androidx.appcompat`, `com.google.android.material`, `androidx.webkit`).
4. Select an Android emulator (e.g. Pixel 8 / 9 with API 34) and click **Run 'app'**.

---

*Developed for the AMC TalentSync Hackathon 2026.*
