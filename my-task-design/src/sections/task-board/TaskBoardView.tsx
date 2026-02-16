import data from '@/../product/sections/task-board/data.json'
import { TaskBoard } from './components/TaskBoard'

export default function TaskBoardPreview() {
  // Set current user as Superior to demonstrate approval flow
  const currentUser = data.users.find(u => u.role === 'superior') || data.users[0]

  return (
    <TaskBoard
      tasks={data.tasks}
      users={data.users}
      brands={data.brands}
      categories={data.categories}
      taskTemplates={data.taskTemplates}
      currentUser={currentUser}
      onCreateTask={(template) => console.log('Create task with template:', template?.name || 'blank')}
      onViewTask={(id) => console.log('View task:', id)}
      onEditTask={(id) => console.log('Edit task:', id)}
      onDeleteTask={(id) => console.log('Delete task:', id)}
      onStatusChange={(taskId, status) => console.log('Status change:', taskId, '->', status)}
      onApproveTask={(id) => console.log('Approve task:', id)}
      onRequestRevision={(id, feedback) => console.log('Request revision:', id, feedback)}
      onToggleSubTask={(taskId, subTaskId) => console.log('Toggle sub-task:', taskId, subTaskId)}
      onAddSubTask={(taskId, title) => console.log('Add sub-task:', taskId, title)}
      onRemoveSubTask={(taskId, subTaskId) => console.log('Remove sub-task:', taskId, subTaskId)}
      onViewChange={(view) => console.log('View changed to:', view)}
      onFilterChange={(filters) => console.log('Filters changed:', filters)}
      onSearch={(query) => console.log('Search:', query)}
    />
  )
}
