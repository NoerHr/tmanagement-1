import { useState } from 'react'
import type { Brand, Category, ColorOption } from '@/../product/sections/settings-and-administration/types'

interface MasterDataTabProps {
  type: 'brands' | 'categories'
  items: Brand[] | Category[]
  availableColors: ColorOption[]
  onCreate?: (item: Omit<Brand | Category, 'id' | 'taskCount'>) => void
  onEdit?: (id: string, updates: Partial<Brand | Category>) => void
  onDelete?: (id: string) => void
}

export function MasterDataTab({
  type,
  items,
  availableColors,
  onCreate,
  onEdit,
  onDelete,
}: MasterDataTabProps) {
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<Brand | Category | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    color: availableColors[0]?.value || '#6366f1',
    colorName: availableColors[0]?.name || 'indigo',
  })

  const label = type === 'brands' ? 'Brand' : 'Category'
  const labelPlural = type === 'brands' ? 'Brands' : 'Categories'

  const handleCreate = () => {
    onCreate?.(formData)
    setShowModal(false)
    setFormData({
      name: '',
      color: availableColors[0]?.value || '#6366f1',
      colorName: availableColors[0]?.name || 'indigo',
    })
  }

  const handleEdit = () => {
    if (editingItem) {
      onEdit?.(editingItem.id, formData)
      setEditingItem(null)
      setFormData({
        name: '',
        color: availableColors[0]?.value || '#6366f1',
        colorName: availableColors[0]?.name || 'indigo',
      })
    }
  }

  const openEditModal = (item: Brand | Category) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      color: item.color,
      colorName: item.colorName,
    })
  }

  const selectColor = (color: ColorOption) => {
    setFormData({ ...formData, color: color.value, colorName: color.name })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            {labelPlural}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage {type === 'brands' ? 'brands for filtering tasks and events' : 'activity categories for tasks'}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700
            text-white font-medium rounded-lg transition-colors shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add {label}
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white dark:bg-slate-800 rounded-xl border border-slate-200
              dark:border-slate-700 p-5 hover:shadow-lg transition-all duration-200"
          >
            {/* Color indicator */}
            <div
              className="absolute top-0 left-0 right-0 h-1.5 rounded-t-xl"
              style={{ backgroundColor: item.color }}
            />

            <div className="flex items-start justify-between pt-2">
              <div className="flex items-center gap-3">
                {/* Color swatch */}
                <div
                  className="w-10 h-10 rounded-lg shadow-sm flex items-center justify-center"
                  style={{ backgroundColor: item.color }}
                >
                  {type === 'brands' ? (
                    <svg className="w-5 h-5 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-slate-100">
                    {item.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {item.taskCount} {item.taskCount === 1 ? 'task' : 'tasks'}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEditModal(item)}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300
                    hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  onClick={() => setDeleteConfirm(item.id)}
                  className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400
                    hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  disabled={item.taskCount > 0}
                  title={item.taskCount > 0 ? `Cannot delete: ${item.taskCount} tasks assigned` : undefined}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add Card (Empty State) */}
        <button
          onClick={() => setShowModal(true)}
          className="flex flex-col items-center justify-center gap-2 p-8 border-2 border-dashed
            border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 dark:text-slate-500
            hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-500
            dark:hover:text-indigo-400 transition-colors"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-sm font-medium">Add {label}</span>
        </button>
      </div>

      {/* Create/Edit Modal */}
      {(showModal || editingItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {editingItem ? `Edit ${label}` : `Add New ${label}`}
              </h3>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={type === 'brands' ? 'e.g., ZS Premium' : 'e.g., Social Media'}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700
                    bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100
                    focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Color
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {availableColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => selectColor(color)}
                      className={`w-10 h-10 rounded-lg transition-transform hover:scale-110 ${
                        formData.color === color.value
                          ? 'ring-2 ring-offset-2 ring-slate-400 dark:ring-offset-slate-800'
                          : ''
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
              {/* Preview */}
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Preview
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg"
                    style={{ backgroundColor: formData.color }}
                  />
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {formData.name || `New ${label}`}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false)
                  setEditingItem(null)
                  setFormData({
                    name: '',
                    color: availableColors[0]?.value || '#6366f1',
                    colorName: availableColors[0]?.name || 'indigo',
                  })
                }}
                className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100
                  dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingItem ? handleEdit : handleCreate}
                disabled={!formData.name.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400
                  text-white font-medium rounded-lg transition-colors"
              >
                {editingItem ? 'Save Changes' : `Add ${label}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30
                flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Delete {label}?
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                This action cannot be undone. The {type === 'brands' ? 'brand' : 'category'} will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 text-slate-700 dark:text-slate-300 bg-slate-100
                    dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onDelete?.(deleteConfirm)
                    setDeleteConfirm(null)
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium
                    rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
