 /* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import React, { useState } from 'react';

export default function AdminPanel() {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [repoFiles, setRepoFiles] = useState([]);

  const handleLogin = async () => {
    if (!token) return;
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('https://github.com', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.trim()}`,
          'Accept': 'application/vnd.github.v3+json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        setRepoFiles(data || []);
        setIsLoggedIn(true);
      } else {
        setErrorMessage('Access Denied. Check your token permissions.');
      }
    } catch (error) {
      setErrorMessage('Browser network check blocked. Ensure your token is correct and ad-blockers are disabled.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <div style={{ background: 'white', padding: '30px', display: 'inline-block', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
          <h2 style={{ color: '#1e293b', marginBottom: '20px' }}>School Admin Login</h2>
          <input 
            type="password" 
            placeholder="Enter token (github_pat_...)" 
            value={token} 
            onChange={(e) => setToken(e.target.value)}
            style={{ padding: '12px', width: '280px', marginRight: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '14px' }}
          />
          <button 
            onClick={handleLogin}
            disabled={isLoading}
            style={{ padding: '12px 24px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isLoading ? 'Verifying...' : 'Login'}
          </button>
          {errorMessage && <p style={{ color: '#dc2626', marginTop: '15px', fontSize: '14px', maxWidth: '320px', lineHeight: '1.4' }}>{errorMessage}</p>}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', color: '#1e293b' }}>
      <header style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '20px', marginBottom: '20px' }}>
        <h1>School Website Admin Panel</h1>
        <p style={{ color: '#475569' }}>Securely Connected to: <strong>AroLola/christslove-school</strong></p>
      </header>
      
      <div style={{ display: 'flex', gap: '30px' }}>
        <div style={{ width: '250px', background: '#f1f5f9', padding: '20px', borderRadius: '6px' }}>
          <h3 style={{ marginTop: '0' }}>Website Pages</h3>
          <ul style={{ listStyle: 'none', padding: '0' }}>
            {repoFiles.map((file: any) => (
              <li key={file.path} style={{ padding: '8px 0', borderBottom: '1px solid #e2e8f0', fontSize: '14px', color: '#2563eb' }}>
                📄 {file.name}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: '1', background: '#f8fafc', padding: '20px', borderRadius: '6px', border: '1px dashed #cbd5e1' }}>
          <h3>Editor Workspace</h3>
          <p style={{ color: '#64748b' }}>Select a page component to begin managing text visuals.</p>
        </div>
      </div>
    </div>
  );
}
