import { AppShell } from './components/AppShell'

export default function ShellPreview() {
  const navigationItems = [
    { label: 'Dashboard', href: '/dashboard', isActive: true },
    { label: 'Calendar', href: '/calendar' },
    { label: 'Task Board', href: '/task-board' },
    { label: 'Notifications', href: '/notifications' },
    { label: 'Settings', href: '/settings' },
  ]

  const user = {
    name: 'Sally Dinihari',
    role: 'Superior' as const,
    avatarUrl: undefined,
  }

  return (
    <AppShell
      navigationItems={navigationItems}
      user={user}
      onNavigate={(href) => console.log('Navigate to:', href)}
      onLogout={() => console.log('Logout')}
    >
      <div className="max-w-4xl">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Welcome back! Here's an overview of your team's progress.
        </p>

        {/* Sample content cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">
              Active Tasks
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              24
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">
              Due This Week
            </div>
            <div className="text-2xl font-bold text-amber-600">
              8
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">
              Completed Today
            </div>
            <div className="text-2xl font-bold text-indigo-600">
              5
            </div>
          </div>
        </div>

        {/* Placeholder for content */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <p className="text-slate-500 dark:text-slate-400 text-center">
            Section content will render here.
          </p>
        </div>
      </div>
    </AppShell>
  )
}
