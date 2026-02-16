import { useState, useRef, useEffect } from 'react'
import { ChevronDown, LogOut, User } from 'lucide-react'

interface UserMenuProps {
  name: string
  role?: 'PIC' | 'Superior'
  avatarUrl?: string
  onLogout?: () => void
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function UserMenu({ name, role, avatarUrl, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center overflow-hidden">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
              {getInitials(name)}
            </span>
          )}
        </div>

        {/* Name and role */}
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium text-slate-900 dark:text-white">
            {name}
          </div>
          {role && (
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {role}
            </div>
          )}
        </div>

        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50">
          <button
            onClick={() => {
              setIsOpen(false)
              // Profile action could be added here
            }}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <User className="w-4 h-4" />
            Profile
          </button>
          <hr className="my-1 border-slate-200 dark:border-slate-700" />
          <button
            onClick={() => {
              setIsOpen(false)
              onLogout?.()
            }}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
