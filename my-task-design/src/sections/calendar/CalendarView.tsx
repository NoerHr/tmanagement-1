import data from '@/../product/sections/calendar/data.json'
import { Calendar } from './components/Calendar'
import type { Event, User, Brand } from '@/../product/sections/calendar/types'

export default function CalendarViewPreview() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Calendar
        events={data.events as unknown as Event[]}
        users={data.users as unknown as User[]}
        brands={data.brands as unknown as Brand[]}
        currentView="month"
        onViewChange={(view) => console.log('View changed:', view)}
        onDateChange={(date) => console.log('Date changed:', date)}
        onFilterChange={(filters) => console.log('Filters changed:', filters)}
        onEventClick={(id) => console.log('Event clicked:', id)}
        onEventCreate={() => console.log('Create event clicked')}
        onEventSave={(event) => console.log('Event saved:', event)}
        onEventUpdate={(id, event) => console.log('Event updated:', id, event)}
        onEventDelete={(id) => console.log('Event deleted:', id)}
      />
    </div>
  )
}
