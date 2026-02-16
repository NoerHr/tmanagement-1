import { LayoutDashboard, Calendar, ClipboardList, Bell, Settings } from 'lucide-react'
import type { NavigationItem } from './AppShell'

interface MainNavProps {
  items: NavigationItem[]
  onNavigate?: (href: string) => void
}

const defaultIcons: Record<string, React.ReactNode> = {
  dashboard: <LayoutDashboard className="w-5 h-5" />,
  calendar: <Calendar className="w-5 h-5" />,
  'task board': <ClipboardList className="w-5 h-5" />,
  'task-board': <ClipboardList className="w-5 h-5" />,
  notifications: <Bell className="w-5 h-5" />,
  settings: <Settings className="w-5 h-5" />,
}

function getIcon(label: string, customIcon?: React.ReactNode) {
  if (customIcon) return customIcon
  const key = label.toLowerCase()
  return defaultIcons[key] || <LayoutDashboard className="w-5 h-5" />
}

export function MainNav({ items, onNavigate }: MainNavProps) {
  // Separate settings from other items
  const mainItems = items.filter(
    (item) => item.label.toLowerCase() !== 'settings'
  )
  const settingsItem = items.find(
    (item) => item.label.toLowerCase() === 'settings'
  )

  return (
    <nav className="flex flex-col h-[calc(100%-4rem)]">
      {/* Main navigation items */}
      <div className="flex-1 py-4 px-3 space-y-1">
        {mainItems.map((item) => (
          <button
            key={item.href}
            onClick={() => onNavigate?.(item.href)}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left
              transition-colors duration-150
              ${
                item.isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400'
              }
            `}
          >
            {getIcon(item.label, item.icon)}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Settings at bottom */}
      {settingsItem && (
        <div className="py-4 px-3 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={() => onNavigate?.(settingsItem.href)}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left
              transition-colors duration-150
              ${
                settingsItem.isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400'
              }
            `}
          >
            {getIcon(settingsItem.label, settingsItem.icon)}
            <span className="font-medium">{settingsItem.label}</span>
          </button>
        </div>
      )}
    </nav>
  )
}
