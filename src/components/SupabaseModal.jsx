import React, { useState } from 'react';
import { Database, CheckCircle, AlertTriangle, RefreshCw, X, ExternalLink, Copy, Check } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';
import { seedInitialData } from '../lib/supabaseService';

export function SupabaseModal({ isOpen, onClose, onRefreshData, isUsingSupabase }) {
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSeed = async () => {
    setSeeding(true);
    setSeedResult(null);
    try {
      const res = await seedInitialData();
      setSeedResult(res);
      if (res.success && onRefreshData) {
        onRefreshData();
      }
    } catch (err) {
      setSeedResult({ success: false, message: err.message });
    } finally {
      setSeeding(false);
    }
  };

  const handleCopyEnv = () => {
    navigator.clipboard.writeText(`VITE_SUPABASE_URL=https://your-project.supabase.co\nVITE_SUPABASE_ANON_KEY=your-anon-key`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 9999 }}>
      <div 
        className="modal-content glass-card" 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '460px',
          width: '90%',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: '24px',
          borderRadius: '20px',
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          color: '#f8fafc',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(56, 189, 248, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38bdf8'
            }}>
              <Database size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Supabase Integration</h3>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>Real-time PostgreSQL database sync</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Current Connection Status Badge */}
        <div style={{
          padding: '12px 16px',
          borderRadius: '12px',
          background: isUsingSupabase ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
          border: `1px solid ${isUsingSupabase ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          {isUsingSupabase ? (
            <CheckCircle size={24} color="#10b981" />
          ) : (
            <AlertTriangle size={24} color="#f59e0b" />
          )}
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: isUsingSupabase ? '#34d399' : '#fbbf24' }}>
              {isUsingSupabase ? 'Connected to Supabase' : 'Running in Local Fallback Mode'}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
              {isUsingSupabase 
                ? 'App data is actively querying and updating Supabase tables.'
                : 'Supabase keys are not set yet in `.env`. Using local mock data.'}
            </div>
          </div>
        </div>

        {/* Action: Seed initial data if connected */}
        {isSupabaseConfigured && (
          <div style={{ marginBottom: '20px' }}>
            <button
              onClick={handleSeed}
              disabled={seeding}
              style={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                border: 'none',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: seeding ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <RefreshCw size={16} className={seeding ? 'animate-spin' : ''} />
              {seeding ? 'Pushing Data to Supabase...' : 'Seed / Sync All Data to Supabase'}
            </button>
            {seedResult && (
              <div style={{
                marginTop: '10px',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                background: seedResult.success ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: seedResult.success ? '#34d399' : '#f87171'
              }}>
                {seedResult.message}
              </div>
            )}
          </div>
        )}

        {/* Setup Guide */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          borderRadius: '12px',
          padding: '14px',
          fontSize: '0.8rem',
          lineHeight: '1.5'
        }}>
          <div style={{ fontWeight: 600, color: '#38bdf8', marginBottom: '8px' }}>
            Quick Setup Steps:
          </div>
          <ol style={{ margin: 0, paddingLeft: '18px', color: '#cbd5e1' }}>
            <li style={{ marginBottom: '6px' }}>
              Create a free project at <a href="https://supabase.com" target="_blank" rel="noreferrer" style={{ color: '#38bdf8', textDecoration: 'underline' }}>supabase.com</a>.
            </li>
            <li style={{ marginBottom: '6px' }}>
              Open your <strong>SQL Editor</strong> in Supabase and run the SQL code from <code style={{ color: '#a5f3fc', background: 'rgba(0,0,0,0.3)', padding: '2px 5px', borderRadius: '4px' }}>supabase_schema.sql</code>.
            </li>
            <li style={{ marginBottom: '6px' }}>
              In your Supabase project: go to <strong>Project Settings &gt; API</strong> and copy your Project URL &amp; anon/public API key.
            </li>
            <li style={{ marginBottom: '6px' }}>
              Paste them into your local <code style={{ color: '#a5f3fc', background: 'rgba(0,0,0,0.3)', padding: '2px 5px', borderRadius: '4px' }}>.env</code> file:
              <div style={{
                margin: '6px 0',
                background: '#090d16',
                padding: '8px 10px',
                borderRadius: '6px',
                fontFamily: 'monospace',
                fontSize: '0.72rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>VITE_SUPABASE_URL=...<br />VITE_SUPABASE_ANON_KEY=...</span>
                <button
                  onClick={handleCopyEnv}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer'
                  }}
                  title="Copy example format"
                >
                  {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                </button>
              </div>
            </li>
            <li>
              Restart the Vite dev server or refresh the browser.
            </li>
          </ol>
        </div>

        {/* Footer Button */}
        <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#fff',
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
