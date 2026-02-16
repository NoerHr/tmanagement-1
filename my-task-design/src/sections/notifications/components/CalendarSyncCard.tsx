import type { GoogleCalendarConnection, SyncLog } from '@/../product/sections/notifications/types'

interface CalendarSyncCardProps {
  connection: GoogleCalendarConnection
  syncLogs: SyncLog[]
  onConnect?: () => void
  onDisconnect?: () => void
  onSyncNow?: () => void
  onRetrySync?: () => void
}

function formatDate(dateString: string | null): string {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function CalendarSyncCard({
  connection,
  syncLogs,
  onConnect,
  onDisconnect,
  onSyncNow,
  onRetrySync,
}: CalendarSyncCardProps) {
  const lastFailedSync = syncLogs.find((log) => log.status === 'failed')
  const isSyncing = connection.syncStatus === 'in-progress'

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.5 22.5h-15A2.25 2.25 0 012.25 20.25V6a2.25 2.25 0 012.25-2.25h1.5V2.25a.75.75 0 011.5 0v1.5h9V2.25a.75.75 0 011.5 0v1.5h1.5A2.25 2.25 0 0121.75 6v14.25a2.25 2.25 0 01-2.25 2.25zM4.5 5.25a.75.75 0 00-.75.75v14.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75h-15z"/>
              <path d="M12 17.25a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"/>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Google Calendar</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Sinkronkan event ke calendar Anda
            </p>
          </div>
        </div>
      </div>

      {/* Connection status */}
      <div className="p-5">
        {connection.isConnected ? (
          <div className="space-y-4">
            {/* Connected account */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-emerald-900 dark:text-emerald-100">
                  {connection.accountName}
                </p>
                <p className="text-sm text-emerald-700 dark:text-emerald-300 truncate">
                  {connection.accountEmail}
                </p>
              </div>
            </div>

            {/* Sync stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Event Tersinkron
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                  {connection.eventsCount}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Terakhir Sync
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
                  {formatDate(connection.lastSyncAt)}
                </p>
              </div>
            </div>

            {/* Error alert */}
            {lastFailedSync && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center text-rose-600 dark:text-rose-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-rose-900 dark:text-rose-100">
                      Sync gagal
                    </p>
                    <p className="text-xs text-rose-700 dark:text-rose-300 mt-0.5">
                      {lastFailedSync.errorMessage}
                    </p>
                    <button
                      onClick={onRetrySync}
                      className="mt-2 text-xs font-medium text-rose-700 hover:text-rose-800 dark:text-rose-400 dark:hover:text-rose-300 underline underline-offset-2"
                    >
                      Coba lagi
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onSyncNow}
                disabled={isSyncing}
                className={`
                  flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
                  ${isSyncing
                    ? 'bg-indigo-100 text-indigo-400 dark:bg-indigo-900/30 dark:text-indigo-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40'
                  }
                `}
              >
                {isSyncing ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Menyinkronkan...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Sync Sekarang
                  </>
                )}
              </button>
              <button
                onClick={onDisconnect}
                className="px-4 py-2.5 rounded-xl font-medium text-sm text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 dark:text-slate-400 dark:hover:text-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
              >
                Putuskan
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
            </div>
            <h4 className="font-medium text-slate-900 dark:text-white mb-1">
              Belum terhubung
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Hubungkan Google Calendar untuk sinkronisasi event otomatis
            </p>
            <button
              onClick={onConnect}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Hubungkan Google Calendar
            </button>
          </div>
        )}
      </div>

      {/* Sync history */}
      {connection.isConnected && syncLogs.length > 0 && (
        <div className="border-t border-slate-100 dark:border-slate-700">
          <button
            className="w-full px-5 py-3 flex items-center justify-between text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <span>Riwayat Sinkronisasi</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
