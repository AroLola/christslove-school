import React, { useState } from 'react';

export default function AdminPanel() {
  const [token, setToken] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  if (!isLoggedIn) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h2>School Admin Login</h2>
        <input 
          type="password" 
          placeholder="Enter Token" 
          value={token} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToken(e.target.value)}
          style={{ padding: '10px', width: '250px', marginRight: '10px' }}
        />
        <button 
          onClick={() => token && setIsLoggedIn(true)}
          style={{ padding: '10px 20px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>School Website Admin Panel</h1>
      <p>You are successfully logged in. We can add editing buttons here next.</p>
    </div>
  );
}
