import { useState } from 'react'
import type { CurrentUser, NotificationPreferences } from '../types'

interface ProfileTabProps {
  currentUser: CurrentUser
  onUpdateProfile?: (updates: Partial<CurrentUser>) => void
  onUploadAvatar?: (file: File) => void
  onConnectGoogleCalendar?: () => void
  onDisconnectGoogleCalendar?: () => void
  onUpdateNotificationPreferences?: (prefs: Partial<NotificationPreferences>) => void
}

export function ProfileTab({
  currentUser,
  onUpdateProfile,
  onUploadAvatar,
  onConnectGoogleCalendar,
  onDisconnectGoogleCalendar,
  onUpdateNotificationPreferences,
}: ProfileTabProps) {
  const [name, setName] = useState(currentUser.name)
  const [email, setEmail] = useState(currentUser.email)
  const [whatsapp, setWhatsapp] = useState(currentUser.whatsappNumber)
  const [prefs, setPrefs] = useState(currentUser.notificationPreferences)

  const handlePreferenceChange = (key: keyof NotificationPreferences) => {
    const newPrefs = { ...prefs, [key]: !prefs[key] }
    setPrefs(newPrefs)
    onUpdateNotificationPreferences?.(newPrefs)
  }

  const handleSaveProfile = () => {
    onUpdateProfile?.({ name, email, whatsappNumber: whatsapp })
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Profile Settings
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your personal information and preferences
        </p>
      </div>

      {/* Avatar Section */}
      <div className="flex items-center gap-6 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
        <div className="relative group">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600
            flex items-center justify-center text-2xl font-semibold text-white shadow-lg">
            {currentUser.avatarInitials}
          </div>
          <button
            onClick={() => {
              const input = document.createElement('input')
              input.type = 'file'
              input.accept = 'image/*'
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0]
                if (file) onUploadAvatar?.(file)
              }
              input.click()
            }}
            className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100
              transition-opacity flex items-center justify-center"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        <div>
          <h3 className="font-medium text-slate-900 dark:text-slate-100">{currentUser.name}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{currentUser.email}</p>
          <span className={`inline-block mt-2 px-2.5 py-0.5 text-xs font-medium rounded-full ${
            currentUser.role === 'Superior'
              ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
              : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
          }`}>
            {currentUser.role}
          </span>
        </div>
      </div>

      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700
                bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
                focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700
                bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
                focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              WhatsApp Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+62..."
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700
                bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
                focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Required for receiving notifications
            </p>
          </div>
        </div>
        <button
          onClick={handleSaveProfile}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg
            transition-colors shadow-sm"
        >
          Save Changes
        </button>
      </div>

      {/* Google Calendar Integration */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Integrations
        </h3>
        <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
                flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">Google Calendar</p>
                {currentUser.googleCalendarConnected ? (
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">
                    Connected as {currentUser.googleCalendarEmail}
                  </p>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Sync events to your calendar
                  </p>
                )}
              </div>
            </div>
            {currentUser.googleCalendarConnected ? (
              <button
                onClick={onDisconnectGoogleCalendar}
                className="px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400
                  hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                Disconnect
              </button>
            ) : (
              <button
                onClick={onConnectGoogleCalendar}
                className="px-3 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400
                  bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50
                  rounded-lg transition-colors"
              >
                Connect
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Notification Preferences
        </h3>
        <div className="space-y-3">
          {[
            { key: 'deadlineReminders' as const, label: 'Deadline Reminders', desc: 'Get notified 1 day before deadlines' },
            { key: 'eventReminders' as const, label: 'Event Reminders', desc: 'Get notified 3 days before events' },
            { key: 'taskAssignments' as const, label: 'Task Assignments', desc: 'When you\'re assigned to a new task' },
            { key: 'statusChanges' as const, label: 'Status Changes', desc: 'When task status changes' },
            { key: 'approvalRequests' as const, label: 'Approval Requests', desc: 'When tasks need your approval' },
          ].map(({ key, label, desc }) => (
            <div
              key={key}
              className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
            >
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">{label}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{desc}</p>
              </div>
              <button
                onClick={() => handlePreferenceChange(key)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  prefs[key]
                    ? 'bg-indigo-600'
                    : 'bg-slate-300 dark:bg-slate-600'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    prefs[key] ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
