import data from '@/../product/sections/settings-and-administration/data.json'
import { Settings } from './components/Settings'

export default function SettingsViewPreview() {
  return (
    <Settings
      currentUser={data.currentUser}
      users={data.users}
      brands={data.brands}
      categories={data.categories}
      availableColors={data.availableColors}
      onTabChange={(tab) => console.log('Tab changed:', tab)}
      onUpdateProfile={(updates) => console.log('Update profile:', updates)}
      onUploadAvatar={(file) => console.log('Upload avatar:', file.name)}
      onConnectGoogleCalendar={() => console.log('Connect Google Calendar')}
      onDisconnectGoogleCalendar={() => console.log('Disconnect Google Calendar')}
      onUpdateNotificationPreferences={(prefs) => console.log('Update notification prefs:', prefs)}
      onCreateUser={(user) => console.log('Create user:', user)}
      onEditUser={(id, updates) => console.log('Edit user:', id, updates)}
      onDeactivateUser={(id) => console.log('Deactivate user:', id)}
      onReactivateUser={(id) => console.log('Reactivate user:', id)}
      onDeleteUser={(id) => console.log('Delete user:', id)}
      onCreateBrand={(brand) => console.log('Create brand:', brand)}
      onEditBrand={(id, updates) => console.log('Edit brand:', id, updates)}
      onDeleteBrand={(id) => console.log('Delete brand:', id)}
      onCreateCategory={(category) => console.log('Create category:', category)}
      onEditCategory={(id, updates) => console.log('Edit category:', id, updates)}
      onDeleteCategory={(id) => console.log('Delete category:', id)}
    />
  )
}
