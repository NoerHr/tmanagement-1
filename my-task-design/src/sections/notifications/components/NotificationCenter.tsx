'use client'

import { useState, useMemo } from 'react'
import type { NotificationsProps, NotificationType } from '@/../product/sections/notifications/types'
import { NotificationCard } from './NotificationCard'
import { NotificationFilters } from './NotificationFilters'
import { PreferencesPanel } from './PreferencesPanel'
import { CalendarSyncCard } from './CalendarSyncCard'

type TabId = 'inbox' | 'settings'

export function NotificationCenter({
  notifications,
  preferences,
  calendarConnection,
  syncLogs,
  notificationTypes,
  onNotificationClick,
  onMarkAsRead,
  onMarkAsUnread,
  onDismiss,
  onMarkAllAsRead,
  onToggleNotificationType,
  onConnectGoogleCalendar,
  onDisconnectGoogleCalendar,
  onSyncNow,
  onRetrySync,
}: NotificationsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('inbox')
  const [activeFilter, setActiveFilter] = useState<NotificationType | 'all'>('all')

  // Filter out dismissed notifications and apply type filter
  const visibleNotifications = useMemo(() => {
    return notifications
      .filter((n) => !n.isDismissed)
      .filter((n) => activeFilter === 'all' || n.type === activeFilter)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [notifications, activeFilter])

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead && !n.isDismissed).length
  }, [notifications])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Notifications
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up'}
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 dark:border-slate-800 mb-6">
          <nav className="flex gap-1 -mb-px">
            <button
              onClick={() => setActiveTab('inbox')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'inbox'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              Inbox
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 text-xs rounded-full bg-indigo-500 text-white">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'settings'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Preferences
            </button>
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'inbox' ? (
          <div className="space-y-4">
            {/* Filters */}
            <NotificationFilters
              types={notificationTypes}
              activeFilter={activeFilter}
              unreadCount={unreadCount}
              onFilterChange={setActiveFilter}
              onMarkAllAsRead={onMarkAllAsRead}
            />

            {/* Notification list */}
            {visibleNotifications.length > 0 ? (
              <div className="space-y-3">
                {visibleNotifications.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onClick={() => onNotificationClick?.(notification)}
                    onMarkAsRead={() => onMarkAsRead?.(notification.id)}
                    onMarkAsUnread={() => onMarkAsUnread?.(notification.id)}
                    onDismiss={() => onDismiss?.(notification.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <svg className="w-10 h-10 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="font-medium text-slate-900 dark:text-white mb-1">
                  {activeFilter === 'all' ? 'No notifications' : 'No notifications for this filter'}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {activeFilter === 'all'
                    ? 'New notifications will appear here'
                    : 'Try selecting a different filter or view all notifications'
                  }
                </p>
                {activeFilter !== 'all' && (
                  <button
                    onClick={() => setActiveFilter('all')}
                    className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    View all notifications
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Preferences */}
            <div className="lg:col-span-1">
              <PreferencesPanel
                preferences={preferences}
                onToggle={onToggleNotificationType}
              />
            </div>

            {/* Calendar sync */}
            <div className="lg:col-span-1">
              <div className="space-y-3">
                <div className="px-1">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Integrations
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Connect with external services
                  </p>
                </div>
                <CalendarSyncCard
                  connection={calendarConnection}
                  syncLogs={syncLogs}
                  onConnect={onConnectGoogleCalendar}
                  onDisconnect={onDisconnectGoogleCalendar}
                  onSyncNow={onSyncNow}
                  onRetrySync={onRetrySync}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
