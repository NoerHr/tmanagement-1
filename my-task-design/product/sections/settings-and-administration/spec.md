# Settings & Administration Specification

## Overview
Settings & Administration provides system configuration and personal profile management. Features a vertical tab layout with role-based access — PICs see only their Profile tab, while Superiors also have access to User Management, Brands, and Categories tabs for full system administration.

## User Flows
- **Edit Profile:** View and update personal info (name, email, profile photo) → Set WhatsApp number (required for notifications) → Optionally connect Google Calendar for sync → Configure notification preferences
- **Manage Users (Superior only):** View list of all users → Create new user with name, email, WhatsApp, and role (PIC/Superior) → Edit user details or change role → Deactivate or delete users
- **Manage Brands (Superior only):** View brand cards with color swatches → Add new brand with name and color picker → Edit existing brand name/color → Delete unused brand
- **Manage Categories (Superior only):** View category cards with color swatches → Add new category with name and color picker → Edit existing category → Delete unused category

## UI Requirements
- Vertical tabs sidebar layout (Profile, User Management, Brands, Categories)
- Role-based tab visibility: PICs only see Profile tab; Superiors see all tabs
- User Management: List/table view with user avatars, role badges, and action buttons
- Brands & Categories: Card grid with visual color pickers and color swatches
- Profile form: Name, email, photo upload, WhatsApp number (required), Google Calendar connect button, notification preference toggles
- Confirmation dialogs for destructive actions (delete user, delete brand/category)

## Configuration
- shell: true
