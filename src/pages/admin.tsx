/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import React, { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [repoFiles, setRepoFiles] = useState([]);

  useEffect(() => {
    const savedToken = sessionStorage.getItem('school_admin_token');
    if (savedToken) {
      fetchFiles(savedToken);
    }
  }, []);

  const fetchFiles = async (tokenValue) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      // Direct, standard native browser request layout accepted globally by GitHub security layers
      const response = await fetch('https://github.com', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokenValue.trim()}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRepoFiles(Array.isArray(data) ? data : []);
        setIsLoggedIn(true);
      } else if (response.status === 401 || response.status === 403) {
        setErrorMessage('Access Denied. Check your fine-grained token settings on GitHub and ensure it has "Contents: Read and Write" permissions.');
        sessionStorage.removeItem('school_admin_token');
      } else {
        setErrorMessage(`GitHub API responded with error code: ${response.status}`);
      }
    } catch (error) {
      setErrorMessage('Browser network stream blocked by system antivirus or VPN settings. Please retry in a clean window.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginPrompt = () => {
    const userToken = prompt('Please enter your GitHub Personal Access Token (github_pat_...):');
    if (!userToken) return;
    
    sessionStorage.setItem('school_admin_token', userToken);
    fetchFiles(userToken);
  };

  if (!isLoggedIn) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center', fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <div style={{ background: 'white', padding: '40px', display: 'inline-block', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', maxWidth: '400px' }}>
          <h2 style={{ color: '#1e293b', marginBottom: '10px', fontSize: '24px' }}>School Admin Portal</h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '30px', lineHeight: '1.5' }}>
            Secure administrative interface for managing **christslove-school** workspace assets.
          </p>
          
          <button 
            onClick={handleLoginPrompt}
            disabled={isLoading}
            style={{ padding: '14px 28px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', width: '100%', fontSize: '15px' }}
          >
            {isLoading ? 'Authenticating...' : 'Sign In with GitHub Token'}
          </button>
          
          {errorMessage && (
            <p style={{ color: '#dc2626', marginTop: '20px', fontSize: '14px', background: '#fef2f2', padding: '10px', borderRadius: '6px', border: '1px solid #fee2e2' }}>
              ⚠️ {errorMessage}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', color: '#1e293b' }}>
      <header style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: '0 0 5px 0' }}>School Website Admin Panel</h1>
          <p style={{ color: '#475569', margin: '0' }}>Securely Connected to: <strong>AroLola/christslove-school</strong></p>
        </div>
        <button 
          onClick={() => { sessionStorage.removeItem('school_admin_token'); setIsLoggedIn(false); }}
          style={{ padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Logout
        </button>
      </header>
      
      <div style={{ display: 'flex', gap: '30px' }}>
        <div style={{ width: '250px', background: '#f1f5f9', padding: '20px', borderRadius: '6px' }}>
          <h3 style={{ marginTop: '0', color: '#334155' }}>Website Pages</h3>
          <ul style={{ listStyle: 'none', padding: '0' }}>
            {repoFiles.map((file: any) => (
              <li key={file.path} style={{ padding: '10px 12px', marginBottom: '6px', background: 'white', borderRadius: '4px', fontSize: '14px', color: '#1e293b', border: '1px solid #e2e8f0' }}>
                📄 {file.name.replace('.tsx', '').toUpperCase()}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: '1', background: '#f8fafc', padding: '40px', borderRadius: '6px', border: '2px dashed #cbd5e1', textAlign: 'center' }}>
          <h3 style={{ color: '#475569' }}>Editor Workspace Active</h3>
          <p style={{ color: '#64748b', maxWidth: '400px', margin: '0 auto' }}>Select an active page layout from the sidebar navigation stack to modify frontend visual elements.</p>
        </div>
      </div>
    </div>
  );
}
