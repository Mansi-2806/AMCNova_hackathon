import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  ArrowRight, 
  GraduationCap, 
  ShieldAlert, 
  HelpCircle,
  BarChart3,
  Lightbulb
} from 'lucide-react';

export function AIAssistantScreen({ 
  employee, 
  tasks = [], 
  projects = [],
  onOpenTaskDetail,
  onOpenSupportRequest,
  onOpenLearningCenter
}) {
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'm-init',
      sender: 'assistant',
      timestamp: 'Just now',
      text: `Hello ${employee?.name?.split(' ')[0] || 'Rahul'}! I am your TalentSync AI Personal Copilot. I analyze your assigned deliverables, detect workload capacity risks, and suggest day-to-day execution priorities with transparent reasoning.`,
      quickPrompts: [
        '🎯 Prioritize my daily tasks',
        '⚠️ Analyze my workload & conflicts',
        '📋 Summarize active projects',
        '🚀 Recommend skill growth paths'
      ]
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);

  // Generate Rule-Based Dynamic AI Responses using Real Records
  const generateAIResponse = (query) => {
    const q = query.toLowerCase();

    // 1. Task Prioritization
    if (q.includes('prioritize') || q.includes('task order') || q.includes('focus') || q.includes('priority')) {
      const pending = tasks.filter(t => t.status !== 'Completed');
      const blocked = pending.filter(t => t.isBlocked);
      const critical = pending.filter(t => t.priority === 'Critical' && !t.isBlocked);
      const high = pending.filter(t => t.priority === 'High');

      let text = `Here is my recommended task execution sequence based on deadline proximity, criticality, and dependency graph:\n\n`;
      
      if (blocked.length > 0) {
        text += `1. **🚨 URGENT BLOCKER: ${blocked[0].title} (${blocked[0].id})**\n`;
        text += `   - **Reasoning:** Due tomorrow (${blocked[0].dueDate}) with active blocker "${blocked[0].blockerReason}". Escalating this is critical to avoid missing the Oct 24 milestone.\n\n`;
      }
      
      if (critical.length > 0) {
        text += `2. **⭐ TOP PRIORITY: ${critical[0].title} (${critical[0].id})**\n`;
        text += `   - **Reasoning:** Progress is at ${critical[0].progress}%. Completing the remaining acceptance criteria unblocks downstream OAuth token introspection.\n\n`;
      }

      if (high.length > 0) {
        text += `3. **📌 NEXT COMMITMENT: ${high[0].title} (${high[0].id})**\n`;
        text += `   - **Reasoning:** High priority on ${high[0].projectName}. Target completion date is ${high[0].dueDate}.\n`;
      }

      return {
        text,
        type: 'task_priority',
        actionLabel: 'Open Blocker Task (TSK-103)',
        actionTarget: 'task_TSK-103'
      };
    }

    // 2. Workload & Conflicts
    if (q.includes('workload') || q.includes('capacity') || q.includes('conflict') || q.includes('overload') || q.includes('hours')) {
      const load = employee?.workload || 92;
      const assigned = employee?.assignedHours || 37;
      const conflicts = employee?.schedulingConflicts || [];

      let text = `**Workload Health Diagnosis:**\n`;
      text += `Your current assigned capacity is at **${load}%** (${assigned} hours/week of standard 40h capacity). This puts you in the **OVERLOADED** tier.\n\n`;

      if (conflicts.length > 0) {
        text += `**⚠️ Detected Milestone Collision:**\n`;
        text += `Milestones on **PRJ-001 (OmniAI Beta)** and **PRJ-002 (Telemetry Audit)** overlap on **Oct 24-25**.\n\n`;
        text += `**Recommended Action:** Submit a Workload Support Request to have management delegate TSK-105 (Telemetry Alerting) to an available team member (e.g. Priya Patel).`;
      }

      return {
        text,
        type: 'workload_insight',
        actionLabel: 'Draft Workload Support Request',
        actionTarget: 'support_workload'
      };
    }

    // 3. Project Summaries
    if (q.includes('project') || q.includes('summary') || q.includes('milestone')) {
      let text = `**Authorized Project Commitments Summary:**\n\n`;
      projects.forEach((p, idx) => {
        text += `${idx + 1}. **${p.name}** (${p.status})\n`;
        text += `   - **Your Role:** ${p.employeeRole}\n`;
        text += `   - **Next Milestone:** ${p.nextMilestone} on ${p.milestoneDate}\n`;
        text += `   - **Overall Progress:** ${p.progress}% | Final Deadline: ${p.deadline}\n\n`;
      });
      text += `Both projects are currently in active sprint stages.`;

      return {
        text,
        type: 'project_summary'
      };
    }

    // 4. Skill Development
    if (q.includes('skill') || q.includes('learn') || q.includes('course') || q.includes('certif') || q.includes('career')) {
      return {
        text: `**Targeted Upskilling Recommendations:**\n\n` +
          `1. **Docker Intermediate: Multi-Stage Production Builds**\n` +
          `   - **Reasoning:** You currently self-report Intermediate Docker. Upgrading to Advanced will bridge the containerization gap for upcoming Q1 infrastructure plans.\n\n` +
          `2. **Certified Kubernetes Administrator (CKA)**\n` +
          `   - **Reasoning:** Directly aligned with your Training Request REQ-2026-052. Elevates organizational readiness score by +15%.\n\n` +
          `3. **Production LLM Pipelines**\n` +
          `   - **Reasoning:** Complements your Python & AWS expertise for OmniAI Enterprise roadmap.`,
        type: 'skill_recommendation',
        actionLabel: 'Open Learning Center',
        actionTarget: 'open_learning'
      };
    }

    // Default Fallback
    return {
      text: `Based on your profile as **${employee?.role}**, you currently have **${tasks.filter(t => t.status !== 'Completed').length} active tasks** across **${projects.length} projects**, with a workload allocation of **${employee?.workload}%**.\n\nHow can I assist you further? Try asking about daily task priorities, workload conflicts, project deliverables, or skill certifications.`,
      type: 'general'
    };
  };

  const handleSendMessage = (queryText) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: textToSend.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      const aiReply = generateAIResponse(textToSend);
      const assistantMsg = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: aiReply.text,
        actionLabel: aiReply.actionLabel,
        actionTarget: aiReply.actionTarget
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsThinking(false);
    }, 450);
  };

  const handleActionClick = (target) => {
    if (target === 'task_TSK-103') {
      const t = tasks.find(tsk => tsk.id === 'TSK-103');
      if (t) onOpenTaskDetail(t);
    } else if (target === 'support_workload') {
      onOpenSupportRequest({
        type: 'Workload Support',
        description: 'Workload at 92%. Requesting delegation of TSK-105 before Oct 24 milestone.'
      });
    } else if (target === 'open_learning') {
      onOpenLearningCenter();
    }
  };

  return (
    <div className="tab-view-container ai-copilot-container">
      {/* AI Persona Header Card */}
      <div className="ai-persona-card">
        <div className="ai-persona-top">
          <div className="ai-avatar-glow">
            <Bot size={26} />
          </div>
          <div className="ai-persona-meta">
            <h2 className="ai-title">TalentSync AI Copilot</h2>
            <div className="ai-sub-badge-row">
              <span className="ai-badge-pill">Personal Workforce Model v2.4</span>
              <span className="ai-connected-tag">
                <span className="ai-green-dot" /> Connected to Live Profile
              </span>
            </div>
          </div>
        </div>
        <p className="ai-explanation-caption">
          Transparent rule-based workforce engine providing explainable daily priorities, capacity alerts, and career development.
        </p>
      </div>

      {/* Chat Messages Stream */}
      <div className="ai-chat-stream">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message-bubble ${msg.sender}`}>
            <div className="chat-msg-header">
              <span className="msg-author-tag">
                {msg.sender === 'assistant' ? 'TalentSync AI' : 'You'}
              </span>
              <span className="msg-time">{msg.timestamp}</span>
            </div>

            <div className="msg-text-markdown">
              {msg.text.split('\n').map((line, idx) => {
                if (line.startsWith('### ') || line.startsWith('**')) {
                  return <p key={idx} className="msg-p-bold" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
                }
                if (line.trim().startsWith('- ') || line.trim().startsWith('1. ') || line.trim().startsWith('2. ') || line.trim().startsWith('3. ')) {
                  return <p key={idx} className="msg-p-list" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
                }
                return <p key={idx} className="msg-p" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
              })}
            </div>

            {/* Action Button inside AI message */}
            {msg.actionLabel && (
              <div className="ai-message-action-wrap">
                <button
                  type="button"
                  className="ai-action-btn"
                  onClick={() => handleActionClick(msg.actionTarget)}
                >
                  <Sparkles size={14} />
                  <span>{msg.actionLabel}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}

            {/* Quick Prompts on initial message */}
            {msg.quickPrompts && (
              <div className="quick-prompts-chips">
                {msg.quickPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    type="button"
                    className="prompt-chip"
                    onClick={() => handleSendMessage(prompt.replace(/^[^\s]+\s/, ''))}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isThinking && (
          <div className="chat-message-bubble assistant thinking-bubble">
            <div className="thinking-dots">
              <span />
              <span />
              <span />
            </div>
            <span className="thinking-label">Synthesizing personal workforce data...</span>
          </div>
        )}
      </div>

      {/* Sticky Bottom Prompt Input */}
      <div className="ai-input-sticky-footer">
        <div className="ai-input-bar">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder="Ask AI Copilot about tasks, workload, or upskilling..."
            className="ai-chat-input"
          />
          <button
            type="button"
            className="ai-send-btn"
            disabled={!inputQuery.trim() || isThinking}
            onClick={() => handleSendMessage()}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
