import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  BrainCircuit, 
  SlidersHorizontal,
  Home,
  Award,
  GraduationCap,
  User
} from 'lucide-react';

export function BottomNav({ activeRole, currentTab, setCurrentTab }) {
  if (activeRole === 'admin') {
    return (
      <nav className="bottom-nav">
        <button 
          className={`nav-item ${currentTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentTab('dashboard')}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </button>

        <button 
          className={`nav-item ${currentTab === 'workforce' ? 'active' : ''}`}
          onClick={() => setCurrentTab('workforce')}
        >
          <Users size={20} />
          <span>Workforce</span>
        </button>

        <button 
          className={`nav-item ${currentTab === 'projects' ? 'active' : ''}`}
          onClick={() => setCurrentTab('projects')}
        >
          <Briefcase size={20} />
          <span>Projects</span>
        </button>

        <button 
          className={`nav-item ${currentTab === 'intelligence' ? 'active' : ''}`}
          onClick={() => setCurrentTab('intelligence')}
        >
          <BrainCircuit size={20} />
          <span>Intelligence</span>
        </button>

        <button 
          className={`nav-item ${currentTab === 'simulator' ? 'active' : ''}`}
          onClick={() => setCurrentTab('simulator')}
        >
          <SlidersHorizontal size={20} />
          <span>Simulator</span>
        </button>
      </nav>
    );
  }

  // Employee Role Bottom Navigation
  return (
    <nav className="bottom-nav">
      <button 
        className={`nav-item ${currentTab === 'home' ? 'active' : ''}`}
        onClick={() => setCurrentTab('home')}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <button 
        className={`nav-item ${currentTab === 'skills' ? 'active' : ''}`}
        onClick={() => setCurrentTab('skills')}
      >
        <Award size={20} />
        <span>My Skills</span>
      </button>

      <button 
        className={`nav-item ${currentTab === 'projects' ? 'active' : ''}`}
        onClick={() => setCurrentTab('projects')}
      >
        <Briefcase size={20} />
        <span>My Projects</span>
      </button>

      <button 
        className={`nav-item ${currentTab === 'learning' ? 'active' : ''}`}
        onClick={() => setCurrentTab('learning')}
      >
        <GraduationCap size={20} />
        <span>Learning</span>
      </button>

      <button 
        className={`nav-item ${currentTab === 'profile' ? 'active' : ''}`}
        onClick={() => setCurrentTab('profile')}
      >
        <User size={20} />
        <span>Profile</span>
      </button>
    </nav>
  );
}
