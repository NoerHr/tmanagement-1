# TeamPulse Tailwind Color Classes

This document lists the Tailwind CSS color classes used throughout TeamPulse.

## Color Palette

### Primary: Indigo

Use for primary actions, active states, and focus indicators.

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Background | `bg-indigo-600` | `bg-indigo-600` |
| Background Hover | `bg-indigo-700` | `bg-indigo-700` |
| Background Light | `bg-indigo-50` | `bg-indigo-900/30` |
| Text | `text-indigo-600` | `text-indigo-400` |
| Text Light | `text-indigo-100` | `text-indigo-200` |
| Border | `border-indigo-600` | `border-indigo-500` |
| Ring | `ring-indigo-500` | `ring-indigo-400` |

### Secondary: Amber

Use for warnings, attention items, and secondary accents.

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Background | `bg-amber-500` | `bg-amber-600` |
| Background Hover | `bg-amber-600` | `bg-amber-700` |
| Background Light | `bg-amber-50` | `bg-amber-900/20` |
| Text | `text-amber-600` | `text-amber-400` |
| Border | `border-amber-500` | `border-amber-600` |

### Neutral: Slate

Use for text, backgrounds, and borders.

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Page Background | `bg-slate-50` | `bg-slate-950` |
| Card Background | `bg-white` | `bg-slate-900` |
| Surface | `bg-slate-100` | `bg-slate-800` |
| Text Primary | `text-slate-900` | `text-slate-100` |
| Text Secondary | `text-slate-700` | `text-slate-300` |
| Text Muted | `text-slate-500` | `text-slate-400` |
| Border | `border-slate-200` | `border-slate-700` |
| Border Light | `border-slate-100` | `border-slate-800` |

## Semantic Colors

### Success: Emerald

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Background | `bg-emerald-500` | `bg-emerald-600` |
| Background Light | `bg-emerald-50` | `bg-emerald-900/20` |
| Text | `text-emerald-600` | `text-emerald-400` |

### Error: Red

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Background | `bg-red-500` | `bg-red-600` |
| Background Light | `bg-red-50` | `bg-red-900/20` |
| Text | `text-red-600` | `text-red-400` |

## Common Patterns

### Primary Button
```html
<button class="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2">
  Button
</button>
```

### Secondary Button
```html
<button class="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg px-4 py-2">
  Button
</button>
```

### Card
```html
<div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
  Content
</div>
```

### Input
```html
<input class="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
```

### Active Navigation Item
```html
<a class="bg-indigo-600 text-white rounded-lg px-3 py-2">
  Active
</a>
```

### Inactive Navigation Item
```html
<a class="text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg px-3 py-2">
  Inactive
</a>
```

## Status Badge Colors

| Status | Background | Text |
|--------|-----------|------|
| To Do | `bg-slate-100 dark:bg-slate-800` | `text-slate-600 dark:text-slate-400` |
| In Progress | `bg-indigo-100 dark:bg-indigo-900/30` | `text-indigo-700 dark:text-indigo-300` |
| Done | `bg-emerald-100 dark:bg-emerald-900/30` | `text-emerald-700 dark:text-emerald-300` |
| Review | `bg-amber-100 dark:bg-amber-900/30` | `text-amber-700 dark:text-amber-300` |
| Approved | `bg-emerald-100 dark:bg-emerald-900/30` | `text-emerald-700 dark:text-emerald-300` |

## Brand Colors (Configurable)

Default brand colors from sample data:

| Brand | Color Name | Tailwind Class |
|-------|-----------|----------------|
| Shi by Shireen | rose | `bg-rose-500` |
| ZS | sky | `bg-sky-500` |
| ZS Active | emerald | `bg-emerald-500` |
| ZS Signature | violet | `bg-violet-500` |
