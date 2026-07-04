import Dashboard from '../layouts/Dashboard';
import { Settings, FileText } from 'lucide-react';
import { useState } from 'react';

export default function AdminPanel() {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-md">
          <h2 className="text-xl font-bold text-center text-slate-800">School Site Admin</h2>
          <input
            type="password"
            placeholder="Enter GitHub Access Token"
            className="w-full rounded border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <button 
            onClick={() => token && setIsLoggedIn(true)}
            className="w-full rounded bg-blue-600 p-2 text-white font-medium hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const config = {
    sidebar: { logo: { text: "School Admin" } },
    navigation: {
      main: [
        { title: 'Manage Pages', href: '/admin', icon: FileText, active: true },
        { title: 'Settings', href: '/admin/settings', icon: Settings }
      ]
    },
    header: { user: { name: 'Administrator', email: 'admin@school.com', initials: 'AD' } }
  };

  return (
    <Dashboard config={config as any}>
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">Welcome to the School Website Manager</h1>
        <p className="text-slate-600">Visual content fields can be wired here to update your frontend data models securely via the 
