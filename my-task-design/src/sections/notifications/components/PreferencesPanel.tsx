import type { NotificationPreferences } from '@/../product/sections/notifications/types'

interface PreferencesPanelProps {
  preferences: NotificationPreferences
  onToggle?: (
    type: keyof Omit<NotificationPreferences, 'userId'>,
    field: 'enabled' | 'inApp' | 'whatsapp',
    value: boolean
  ) => void
}

interface PreferenceRowProps {
  label: string
  description: string
  icon: React.ReactNode
  enabled: boolean
  inApp: boolean
  whatsapp: boolean
  isMandatory: boolean
  onToggle: (field: 'enabled' | 'inApp' | 'whatsapp', value: boolean) => void
}

function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean
  onChange: (value: boolean) => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`
        relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out
        ${checked
          ? 'bg-indigo-600'
          : 'bg-slate-200 dark:bg-slate-700'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900'}
      `}
    >
      <span
        className={`
          pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
          ${checked ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
  )
}

function PreferenceRow({
  label,
  description,
  icon,
  enabled,
  inApp,
  whatsapp,
  isMandatory,
  onToggle,
}: PreferenceRowProps) {
  return (
    <div className={`p-4 rounded-xl transition-colors ${enabled ? 'bg-white dark:bg-slate-800' : 'bg-slate-50 dark:bg-slate-800/50'}`}>
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${enabled ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400' : 'bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500'}`}>
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className={`font-medium ${enabled ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
              {label}
            </h4>
            {isMandatory && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                Wajib
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {description}
          </p>

          {/* Channel toggles */}
          {enabled && (
            <div className="mt-3 flex flex-wrap gap-4">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inApp}
                  onChange={(e) => onToggle('inApp', e.target.checked)}
                  disabled={isMandatory}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-700"
                />
                <span className="text-sm text-slate-600 dark:text-slate-300">In-App</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={whatsapp}
                  onChange={(e) => onToggle('whatsapp', e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700"
                />
                <span className="text-sm text-slate-600 dark:text-slate-300 inline-flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Master toggle */}
        <div className="flex-shrink-0">
          <Toggle
            checked={enabled}
            onChange={(value) => onToggle('enabled', value)}
            disabled={isMandatory}
          />
        </div>
      </div>
    </div>
  )
}

const preferenceConfig: {
  key: keyof Omit<NotificationPreferences, 'userId'>
  label: string
  description: string
  icon: React.ReactNode
}[] = [
  {
    key: 'deadlines',
    label: 'Deadline',
    description: 'Pengingat untuk deadline task dan event yang mendekat',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: 'assignments',
    label: 'Penugasan',
    description: 'Notifikasi saat Anda ditugaskan ke task atau sub-task baru',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
  {
    key: 'statusChanges',
    label: 'Perubahan Status',
    description: 'Update saat status task berubah (selesai, review, approved)',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    key: 'approvals',
    label: 'Approval',
    description: 'Notifikasi untuk permintaan dan hasil approval',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: 'sync',
    label: 'Sinkronisasi',
    description: 'Status sinkronisasi Google Calendar',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
]

export function PreferencesPanel({ preferences, onToggle }: PreferencesPanelProps) {
  return (
    <div className="space-y-3">
      <div className="px-1">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          Preferensi Notifikasi
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Atur jenis notifikasi yang ingin Anda terima dan channel pengirimannya
        </p>
      </div>

      <div className="space-y-2">
        {preferenceConfig.map((config) => {
          const pref = preferences[config.key]
          return (
            <PreferenceRow
              key={config.key}
              label={config.label}
              description={config.description}
              icon={config.icon}
              enabled={pref.enabled}
              inApp={pref.inApp}
              whatsapp={pref.whatsapp}
              isMandatory={pref.isMandatory}
              onToggle={(field, value) => onToggle?.(config.key, field, value)}
            />
          )
        })}
      </div>

      <div className="px-1 pt-2">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Notifikasi deadline bersifat wajib dan tidak dapat dinonaktifkan
          </span>
        </p>
      </div>
    </div>
  )
}
