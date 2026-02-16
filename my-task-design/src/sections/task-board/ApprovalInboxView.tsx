import data from '@/../product/sections/task-board/data.json'
import { ApprovalInbox } from './components/ApprovalInbox'

export default function ApprovalInboxPreview() {
  // Filter tasks to only show those with 'review' status
  const tasksForReview = data.tasks.filter(task => task.status === 'review')

  return (
    <ApprovalInbox
      tasksForReview={tasksForReview}
      users={data.users}
      brands={data.brands}
      categories={data.categories}
      onViewTask={(id) => console.log('View task:', id)}
      onApprove={(id) => console.log('Approve task:', id)}
      onRequestRevision={(id, feedback) => console.log('Request revision:', id, feedback)}
    />
  )
}
