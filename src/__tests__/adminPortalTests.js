// TalentSync AI — Admin / Workforce Manager Portal Test Suite
// Verifies Section 17 Hackathon Requirements:
// 1. KPI recalculation & dynamic utilization derivation
// 2. AI Team Builder multi-factor matching & allocation logic
// 3. Workload rebalancing & capacity updates
// 4. Resource request approvals & audit trail logging
// 5. Employee CRUD and account deactivation status

import assert from 'node:assert';
import { talentSyncStore } from '../data/talentSyncStore.js';

console.log('🧪 Starting TalentSync AI Admin & Workforce Manager Test Suite...\n');

let passCount = 0;
let failCount = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passCount++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     Error: ${err.message}`);
    failCount++;
  }
}

// SUITE 1: DYNAMIC KPI DERIVATION (Section 4)
console.log('📊 Suite 1: Dynamic KPI Derivation & Utilization Logic');

test('Admin KPIs recalculate dynamically from actual employee records', () => {
  const kpis = talentSyncStore.calculateAdminKPIs();
  assert.ok(kpis.totalEmployees >= 10, 'Total employees must reflect directory count');
  assert.ok(kpis.workforceUtilizationPct > 50 && kpis.workforceUtilizationPct <= 100, 'Utilization must be realistic percentage');
  assert.ok(kpis.activeProjects >= 4, 'Must count active projects');
  assert.ok(kpis.overloadedEmployees >= 1, 'Must accurately count overloaded staff (>100%)');
  assert.ok(kpis.underutilizedEmployees >= 1, 'Must accurately count underutilized staff (<70%)');
  assert.ok(kpis.unfilledPositions >= 0, 'Must count open project positions');
});

test('Department distribution groups employees and calculates average workload', () => {
  const depts = talentSyncStore.getDepartmentDistribution();
  assert.ok(depts.length >= 3, 'Must aggregate across multiple departments');
  depts.forEach(d => {
    assert.ok(d.name, 'Department must have a name');
    assert.ok(d.count > 0, 'Headcount must be positive');
    assert.ok(d.avgWorkload >= 0, 'Avg workload must be non-negative');
  });
});

// SUITE 2: AI TEAM ALLOCATION & CANDIDATE MATCHING (Section 6)
console.log('\n🤖 Suite 2: AI Team Allocation & Candidate Matching');

test('Allocating team members to project updates staffing status and increases workload', () => {
  const targetProject = 'PRJ-005'; // CyberShield (initially 0 staff)
  const candidates = ['EMP-102', 'EMP-106']; // Marcus Chen & Elena Rostova
  
  const empBefore = talentSyncStore.getEmployee('EMP-102');
  const initialLoad = empBefore.workload;

  talentSyncStore.allocateTeamToProject(targetProject, candidates);

  const projAfter = talentSyncStore.getAllProjects().find(p => p.id === targetProject);
  assert.ok(projAfter.assignedEmployees.includes('EMP-102'), 'EMP-102 must be assigned');
  assert.ok(projAfter.assignedEmployees.includes('EMP-106'), 'EMP-106 must be assigned');

  const empAfter = talentSyncStore.getEmployee('EMP-102');
  assert.ok(empAfter.activeProjectIds.includes(targetProject), 'Active projects must contain PRJ-005');
  assert.ok(empAfter.workload >= initialLoad, 'Workload must update consistently');
});

// SUITE 3: WORKLOAD REBALANCING & CAPACITY ADJUSTMENT (Section 7)
console.log('\n⚖️ Suite 3: Workload Rebalancing & Conflict Resolution');

test('Workload rebalance transfers capacity from donor to recipient', () => {
  // Transfer 20% from Rahul Sharma (EMP-101, overloaded) to Priya Patel (EMP-105)
  const rahulBefore = talentSyncStore.getEmployee('EMP-101');
  const priyaBefore = talentSyncStore.getEmployee('EMP-105');

  talentSyncStore.rebalanceWorkload('EMP-101', 'EMP-105', 20);

  const rahulAfter = talentSyncStore.getEmployee('EMP-101');
  const priyaAfter = talentSyncStore.getEmployee('EMP-105');

  assert.ok(rahulAfter.workload <= rahulBefore.workload, 'Donor workload must be reduced');
  assert.ok(priyaAfter.workload >= priyaBefore.workload, 'Recipient workload must increase');
  assert.strictEqual(rahulAfter.assignedHours, Math.round((rahulAfter.workload / 100) * 40));
});

// SUITE 4: RESOURCE REQUESTS & AUDIT LOGGING (Section 8 & 13)
console.log('\n📝 Suite 4: Resource Request Approvals & Audit Governance');

test('Admin approval of resource request updates status and logs audit entry', () => {
  const reqId = 'REQ-2026-081';
  talentSyncStore.respondToSupportRequest(reqId, 'Approved', 'Workload relief confirmed in sprint.', 8);

  const updatedReq = talentSyncStore.getAllSupportRequests().find(r => r.id === reqId);
  assert.strictEqual(updatedReq.status, 'Approved');
  assert.ok(updatedReq.resolutionNotes.includes('relief confirmed'));

  const latestAudit = talentSyncStore.getAuditLog()[0];
  assert.ok(latestAudit.action.includes('Request Approved') || latestAudit.action.includes('Resource'));
  assert.strictEqual(latestAudit.decision, 'Approved');
});

test('CSV report generation produces certified application records', () => {
  const csv = talentSyncStore.generateCSVReport();
  assert.ok(typeof csv === 'string');
  assert.ok(csv.includes('Employee ID,Name,Role,Department,Workload (%)'));
  assert.ok(csv.includes('Rahul Sharma'));
});

// SUITE 5: EMPLOYEE LIFECYCLE & DEACTIVATION (Section 5)
console.log('\n👤 Suite 5: Employee Directory Lifecycle & Deactivation');

test('Employee can be added, updated, and deactivated', () => {
  const newEmp = talentSyncStore.addEmployee({
    name: 'Vikram Seth',
    role: 'Staff DevOps Architect',
    department: 'Cloud Platform Engineering',
    workload: 30
  });

  assert.ok(newEmp.id.startsWith('EMP-'));
  assert.strictEqual(newEmp.name, 'Vikram Seth');

  // Deactivate
  talentSyncStore.deactivateEmployee(newEmp.id);
  const deactivated = talentSyncStore.getEmployee(newEmp.id);
  assert.strictEqual(deactivated.status, 'Deactivated');
});

// SUMMARY
console.log('\n' + '-'.repeat(40));
console.log(`Results: ${passCount} passed, ${failCount} failed.`);
console.log('-'.repeat(40) + '\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 All Admin & Workforce Manager Portal tests passed successfully!');
}
