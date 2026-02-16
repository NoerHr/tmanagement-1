import data from '@/../product/sections/dashboard/data.json'
import { Dashboard } from './components/Dashboard'

export default function DashboardViewPreview() {
  return (
    <Dashboard
      users={data.users}
      brands={data.brands}
      tasks={data.tasks}
      subTasks={data.subTasks}
      events={data.events}
      taskStatistics={data.taskStatistics}
      workloadDistribution={data.workloadDistribution}
      upcomingLaunch={data.upcomingLaunch}
      attentionItems={data.attentionItems}
      onBrandFilterChange={(brandId) => console.log('Filter by brand:', brandId)}
      onTaskClick={(taskId) => console.log('Navigate to task:', taskId)}
      onReschedule={(taskId) => console.log('Reschedule task:', taskId)}
      onMarkDone={(taskId) => console.log('Mark task done:', taskId)}
      onApprove={(taskId) => console.log('Approve task:', taskId)}
      onRevise={(taskId) => console.log('Request revision for task:', taskId)}
    />
  )
}
