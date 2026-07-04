{% raw %}
# Dashboard Layout Documentation

## Overview
The Dashboard layout provides a complete application shell with sidebar navigation, header with search and user menu, and main content area. Perfect for admin panels, SaaS applications, and internal tools.

## CRITICAL: Required Usage Pattern

**ALL DASHBOARD PAGES MUST USE THIS LAYOUT** - Never create dashboard pages with their own navigation or layout structure.

### Correct Implementation ✅

```tsx
import Dashboard from '@/layouts/Dashboard';
import { Home, Users, Settings, BarChart } from 'lucide-react';

export default function DashboardPage() {
  return (
    <Dashboard config={{
      sidebar: { logo: { text: 'My App' } },
      navigation: {
        main: [
          { title: 'Dashboard', href: '/', icon: Home, active: true },
          { title: 'Users', href: '/users', icon: Users, badge: 12 },
          { title: 'Analytics', href: '/analytics', icon: BarChart },
          { title: 'Settings', href: '/settings', icon: Settings }
        ]
      }
    },
    header: {
      user: {
        name: 'John Doe',
        email: 'john@example.com',
        initials: 'JD'
      }
    }
    }}>
      {/* Dashboard content goes here */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {/* Your dashboard components */}
      </div>
    </Dashboard>
  );
}
```
{% endraw %}
