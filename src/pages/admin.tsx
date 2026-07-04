import React, { useState } from 'react';

export default function AdminPanel() {
  const [token, setToken] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [technicalDetails, setTechnicalDetails] = useState<string>('');
  const [repoFiles, setRepoFiles] = useState<any[]>([]);

  const handleLogin = async () => {
    if (!token) return;
    setIsLoading(true);
    setErrorMessage('');
    setTechnicalDetails('');

       try {
      // Talks to your own server instead of GitHub directly, bypassing all browser blocks
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token.trim() })
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        setRepoFiles(Array.isArray(result.data) ? result.data : []);
        setIsLoggedIn(true);
      } else {
        setErrorMessage('Invalid token or repository access denied.');
        setTechnicalDetails(`Server Status: ${result.status}`);
      }
    } catch (error: any) {
      setErrorMessage('Local server routing failed.');
      setTechnicalDetails(error?.message);
    } finally {
      setIsLoading(false);
    }

      });

      if (response.ok) {
        const data = await response.json();
        setRepoFiles(Array.isArray(data) ? data : []);
        setIsLoggedIn(true);
      } else {
        const errData = await response.json().catch(() => ({}));
        setErrorMessage('Invalid token or repository access denied.');
        setTechnicalDetails(`Status: ${response.status} - ${errData.message || 'Unauthorized'}`);
      }
    } catch (error: any) {
      setErrorMessage('Browser network check blocked. Please disable your ad-blocker or check your token formatting.');
      setTechnicalDetails(error?.message || 'TypeError: Failed to fetch');
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
            placeholder="Paste your github_pat_ token" 
            value={token} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToken(e.target.value)}
            style={{ padding: '12px', width: '280px', marginRight: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '14px' }}
          />
          <button 
            onClick={handleLogin}
            disabled={isLoading}
            style={{ padding: '12px 24px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isLoading ? 'Verifying...' : 'Login'}
          </button>
          
          {errorMessage && (
            <div style={{ marginTop: '20px', maxWidth: '340px', background: '#fef2f2', padding: '15px', borderRadius: '6px', border: '1px solid #fee2e2', textAlign: 'left' }}>
              <p style={{ color: '#dc2626', margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>{errorMessage}</p>
              {technicalDetails && <code style={{ color: '#991b1b', fontSize: '11px', display: 'block', wordBreak: 'break-all', background: '#fee2e2', padding: '4px', borderRadius: '4px' }}>Debug Info: {technicalDetails}</code>}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', color: '#1e293b' }}>
      <header style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '20px', marginBottom: '20px' }}>
        <h1>School Website Admin Panel</h1>
        <p style={{ color: '#475569' }}>Connected Securely to Repository: <strong>AroLola/christslove-school</strong></p>
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
          <p style={{ color: '#64748b' }}>Select a page from the left sidebar panel to begin editing text layouts or titles visually.</p>
        </div>
      </div>
    </div>
  );
}
