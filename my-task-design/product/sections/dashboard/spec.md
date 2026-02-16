# Dashboard Specification

## Overview
A bento-style dashboard providing a visual overview of project progress with a timeline/Gantt view, attention items requiring action, task statistics, workload distribution, and upcoming brand launches. Supports brand filtering across all dashboard boxes.

## User Flows
- **View Timeline:** See tasks and campaigns on a Gantt chart for the current month → Hover on a task bar to see quick preview → Click to navigate to Task Board with that task selected
- **Handle Attention Items:** View overdue tasks (red highlight) and items needing approval (yellow highlight) → Hover to reveal action buttons → For overdue: [Reschedule] or [Mark Done] → For needs approval: [Approve] or [Revise]
- **View Task Statistics:** See task status breakdown as a donut chart (To Do/In Progress/Done/Review/Approved) → Understand overall project health at a glance
- **View Workload Distribution:** See workload per PIC as a bar chart → Identify who's overloaded or has capacity
- **Track Upcoming Launches:** See countdown card to the nearest brand launch event
- **Filter by Brand:** Toggle brand filter to show data for Shi by Shireen, ZS, ZS Active, or ZS Signature across all dashboard boxes

## UI Requirements
- Bento grid layout (responsive 3-4 columns, stacking on mobile)
- Large box (full-width or 2x2): Timeline/Gantt view with horizontal scroll for date range
- Medium vertical box: Overdue & Needs Approval list with hover-reveal action buttons
- Small box (1x1): Task Status donut chart (green=Done, blue=Approved, gray=To Do)
- Small box (1x1): Workload per PIC mini bar chart
- Small box (1x1): Upcoming Launch countdown card
- Brand filter toggle at dashboard header
- Red highlight for overdue items, yellow/amber for needs approval
- Hover preview popover on Gantt task bars
- Current month as default timeline range

## Configuration
- shell: true
