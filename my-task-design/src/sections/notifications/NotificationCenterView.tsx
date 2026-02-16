import data from '@/../product/sections/notifications/data.json'
import { NotificationCenter } from './components/NotificationCenter'
import type {
  Notification,
  NotificationPreferences,
  GoogleCalendarConnection,
  SyncLog,
  NotificationTypeInfo,
  CurrentUser,
} from '@/../product/sections/notifications/types'

export default function NotificationCenterPreview() {
  return (
    <NotificationCenter
      currentUser={data.currentUser as CurrentUser}
      notifications={data.notifications as Notification[]}
      preferences={data.notificationPreferences as NotificationPreferences}
      calendarConnection={data.googleCalendarConnection as GoogleCalendarConnection}
      syncLogs={data.syncLogs as SyncLog[]}
      notificationTypes={data.notificationTypes as NotificationTypeInfo[]}
      onNotificationClick={(notification) => console.log('Navigate to:', notification.taskId || notification.eventId)}
      onMarkAsRead={(id) => console.log('Mark as read:', id)}
      onMarkAsUnread={(id) => console.log('Mark as unread:', id)}
      onDismiss={(id) => console.log('Dismiss:', id)}
      onMarkAllAsRead={() => console.log('Mark all as read')}
      onToggleNotificationType={(type, field, value) => console.log('Toggle preference:', type, field, value)}
      onConnectGoogleCalendar={() => console.log('Connect Google Calendar')}
      onDisconnectGoogleCalendar={() => console.log('Disconnect Google Calendar')}
      onSyncNow={() => console.log('Sync now')}
      onRetrySync={() => console.log('Retry sync')}
    />
  )
}
