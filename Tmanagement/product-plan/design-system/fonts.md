# TeamPulse Typography

## Font Families

### DM Sans (Headings & Body)

A geometric sans-serif with a friendly, professional appearance. Used for all headings and body text.

**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap
```

**Weights:**
- 400 (Regular) - Body text
- 500 (Medium) - Emphasized text, nav items
- 600 (SemiBold) - Subheadings, labels
- 700 (Bold) - Main headings

### JetBrains Mono (Monospace)

A developer-focused monospace font. Used for code, data values, and technical information.

**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap
```

**Weights:**
- 400 (Regular) - Code blocks
- 500 (Medium) - Emphasized code

## Combined Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

## CSS Configuration

```css
:root {
  --font-heading: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-body: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
}

body {
  font-family: var(--font-body);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}

code, pre, .font-mono {
  font-family: var(--font-mono);
}
```

## Tailwind Configuration

If using Tailwind CSS, add to your CSS file (Tailwind v4):

```css
@theme {
  --font-family-sans: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
  --font-family-mono: 'JetBrains Mono', ui-monospace, monospace;
}
```

## Typography Scale

### Headings

| Element | Size | Weight | Tailwind Class |
|---------|------|--------|----------------|
| h1 | 2.25rem (36px) | Bold (700) | `text-4xl font-bold` |
| h2 | 1.5rem (24px) | Bold (700) | `text-2xl font-bold` |
| h3 | 1.25rem (20px) | SemiBold (600) | `text-xl font-semibold` |
| h4 | 1.125rem (18px) | SemiBold (600) | `text-lg font-semibold` |

### Body Text

| Use Case | Size | Weight | Tailwind Class |
|----------|------|--------|----------------|
| Large body | 1.125rem (18px) | Regular (400) | `text-lg` |
| Body | 1rem (16px) | Regular (400) | `text-base` |
| Small | 0.875rem (14px) | Regular (400) | `text-sm` |
| Caption | 0.75rem (12px) | Regular (400) | `text-xs` |

### UI Elements

| Element | Size | Weight | Tailwind Class |
|---------|------|--------|----------------|
| Nav item | 0.875rem (14px) | Medium (500) | `text-sm font-medium` |
| Button | 0.875rem (14px) | Medium (500) | `text-sm font-medium` |
| Label | 0.875rem (14px) | Medium (500) | `text-sm font-medium` |
| Badge | 0.75rem (12px) | Medium (500) | `text-xs font-medium` |
| Tooltip | 0.75rem (12px) | Regular (400) | `text-xs` |

## Line Heights

| Size | Line Height | Tailwind Class |
|------|-------------|----------------|
| Tight | 1.25 | `leading-tight` |
| Normal | 1.5 | `leading-normal` |
| Relaxed | 1.625 | `leading-relaxed` |

## Letter Spacing

| Use Case | Spacing | Tailwind Class |
|----------|---------|----------------|
| Tight (headings) | -0.025em | `tracking-tight` |
| Normal | 0 | `tracking-normal` |
| Wide (labels) | 0.025em | `tracking-wide` |
| Wider (uppercase) | 0.05em | `tracking-wider` |

## Usage Examples

### Page Title
```html
<h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100">
  Dashboard
</h1>
```

### Section Heading
```html
<h2 class="text-lg font-semibold text-slate-800 dark:text-slate-200">
  Recent Tasks
</h2>
```

### Card Title
```html
<h3 class="text-base font-semibold text-slate-900 dark:text-white">
  Task Name
</h3>
```

### Body Text
```html
<p class="text-sm text-slate-600 dark:text-slate-400">
  Description text goes here with regular weight.
</p>
```

### Muted Text
```html
<span class="text-sm text-slate-500 dark:text-slate-400">
  2 hours ago
</span>
```

### Code/Data
```html
<code class="font-mono text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-1 rounded">
  task-001
</code>
```
