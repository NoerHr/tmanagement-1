import { useState } from 'react'
import type { SettingsProps, SettingsTab } from '../types'
import { ProfileTab } from './ProfileTab'
import { UsersTab } from './UsersTab'
import { MasterDataTab } from './MasterDataTab'

const tabs: { id: SettingsTab; label: string; icon: React.ReactNode; superiorOnly?: boolean }[] = [
  {
    id: 'profile',
    label: 'Profile',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: 'users',
    label: 'Users',
    superiorOnly: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    id: 'brands',
    label: 'Brands',
    superiorOnly: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  {
    id: 'categories',
    label: 'Categories',
    superiorOnly: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
]

export function Settings({
  currentUser,
  users,
  brands,
  categories,
  availableColors,
  activeTab: initialTab = 'profile',
  onTabChange,
  onUpdateProfile,
  onUploadAvatar,
  onConnectGoogleCalendar,
  onDisconnectGoogleCalendar,
  onUpdateNotificationPreferences,
  onCreateUser,
  onEditUser,
  onDeactivateUser,
  onReactivateUser,
  onDeleteUser,
  onCreateBrand,
  onEditBrand,
  onDeleteBrand,
  onCreateCategory,
  onEditCategory,
  onDeleteCategory,
}: SettingsProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>(initialTab)

  const isSuperior = currentUser.role === 'Superior'
  const visibleTabs = tabs.filter(tab => !tab.superiorOnly || isSuperior)

  const handleTabChange = (tab: SettingsTab) => {
    setActiveTab(tab)
    onTabChange?.(tab)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Settings
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isSuperior
              ? 'Manage your profile, team members, and system configuration'
              : 'Manage your profile and notification preferences'}
          </p>
        </div>

        {/* Horizontal Tabs */}
        <div className="border-b border-slate-200 dark:border-slate-800 mb-6">
          <nav className="flex gap-1 -mb-px overflow-x-auto">
            {visibleTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <span className={activeTab === tab.id ? 'text-indigo-600 dark:text-indigo-400' : ''}>
                  {tab.icon}
                </span>
                {tab.label}
                {tab.superiorOnly && (
                  <span className="px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    Admin
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          {activeTab === 'profile' && (
            <ProfileTab
              currentUser={currentUser}
              onUpdateProfile={onUpdateProfile}
              onUploadAvatar={onUploadAvatar}
              onConnectGoogleCalendar={onConnectGoogleCalendar}
              onDisconnectGoogleCalendar={onDisconnectGoogleCalendar}
              onUpdateNotificationPreferences={onUpdateNotificationPreferences}
            />
          )}

          {activeTab === 'users' && isSuperior && (
            <UsersTab
              users={users}
              onCreateUser={onCreateUser}
              onEditUser={onEditUser}
              onDeactivateUser={onDeactivateUser}
              onReactivateUser={onReactivateUser}
              onDeleteUser={onDeleteUser}
            />
          )}

          {activeTab === 'brands' && isSuperior && (
            <MasterDataTab
              type="brands"
              items={brands}
              availableColors={availableColors}
              onCreate={onCreateBrand}
              onEdit={onEditBrand}
              onDelete={onDeleteBrand}
            />
          )}

          {activeTab === 'categories' && isSuperior && (
            <MasterDataTab
              type="categories"
              items={categories}
              availableColors={availableColors}
              onCreate={onCreateCategory}
              onEdit={onEditCategory}
              onDelete={onDeleteCategory}
            />
          )}
        </div>
      </div>
    </div>
  )
}
