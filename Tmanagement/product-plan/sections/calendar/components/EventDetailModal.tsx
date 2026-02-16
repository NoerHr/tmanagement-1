import { useState } from 'react'
import type { Event, EventType, EventDetailModalProps } from '../types'

const eventTypeLabels: Record<EventType, { label: string; icon: string }> = {
  photo_shoot: { label: 'Photo Shoot', icon: '📸' },
  video_shoot: { label: 'Video Shoot', icon: '🎬' },
  launch: { label: 'Launch', icon: '🚀' },
  editorial: { label: 'Editorial', icon: '📝' },
  event: { label: 'Event', icon: '📅' }
}

const eventTypes: EventType[] = ['photo_shoot', 'video_shoot', 'launch', 'editorial', 'event']

export function EventDetailModal({
  event,
  users,
  brands,
  isEditing = false,
  onClose,
  onEdit,
  onSave,
  onDelete
}: EventDetailModalProps) {
  const [editData, setEditData] = useState<Partial<Event>>({})
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  if (!event) return null

  const brand = brands.find(b => b.id === event.brandId)
  const pic = users.find(u => u.id === event.picId)
  const typeInfo = eventTypeLabels[event.type]

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  const handleSave = () => {
    onSave?.(editData)
    setEditData({})
  }

  const handleDelete = () => {
    onDelete?.()
    setShowDeleteConfirm(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{typeInfo.icon}</span>
              {isEditing ? (
                <input
                  type="text"
                  defaultValue={event.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="text-xl font-bold text-slate-800 dark:text-slate-100 bg-transparent border-b-2 border-indigo-500 focus:outline-none"
                />
              ) : (
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  {event.title}
                </h2>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
              {typeInfo.label}
            </span>
            {brand && (
              <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {brand.name}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-5 max-h-[60vh] overflow-y-auto">
          {/* Date & Time */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
              <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                {formatDate(event.date)}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {event.startTime} - {event.endTime}
              </p>
            </div>
          </div>

          {/* Location */}
          {event.location && (
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  defaultValue={event.location}
                  onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                  className="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                />
              ) : (
                <p className="text-sm text-slate-600 dark:text-slate-300">{event.location}</p>
              )}
            </div>
          )}

          {/* PIC */}
          {pic && (
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{pic.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Person in Charge</p>
              </div>
            </div>
          )}

          {/* Type (editable) */}
          {isEditing && (
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <select
                defaultValue={event.type}
                onChange={(e) => setEditData({ ...editData, type: e.target.value as EventType })}
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              >
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {eventTypeLabels[type].icon} {eventTypeLabels[type].label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Description</h4>
            {isEditing ? (
              <textarea
                defaultValue={event.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none"
              />
            ) : (
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {event.description || 'No description provided.'}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          {showDeleteConfirm ? (
            <div className="flex items-center justify-between">
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">Delete this event?</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : isEditing ? (
            <div className="flex justify-end gap-2">
              <button
                onClick={() => { setEditData({}); onClose?.() }}
                className="px-4 py-2 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div className="flex justify-between">
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 text-sm font-medium rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={onEdit}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                Edit Event
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
