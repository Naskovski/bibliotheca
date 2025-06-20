# Bibliotheca

Bibliotheca is a modern, full-featured library management system designed to streamline book lending and administration for both librarians and library users. Built with Laravel (PHP) and React (TypeScript), it offers a seamless, responsive experience for managing books, leases, and notifications.

## Overview

Bibliotheca enables libraries to efficiently manage their book collections, track leases, and communicate with users. The system supports multiple user roles, automated email notifications, and a visually appealing interface for both staff and patrons.

## Key Features

- **User Roles & Authentication**
    - Secure registration and login for clients and librarians
    - Role-based access control for sensitive actions

- **Book Catalog Management**
    - Add, edit, and browse books and their editions
    - Upload and display book cover images
    - Search and filter books by title, author, or ISBN

- **Lease Management**
    - Request, approve, collect, return, mark overdue, or cancel book leases
    - Lease status tracking with clear, color-coded indicators
    - Librarian dashboard for managing all active and historical leases

- **Automated Email Notifications**
    - Users receive styled email updates when lease statuses change
    - Emails include book details, cover image, and personalized messages

- **Modern, Responsive UI**
    - Built with React and Inertia.js for a fast, app-like experience
    - Mobile-friendly layouts and intuitive navigation
    - Visual feedback for actions (toasts, loaders, etc.)

## How It Works

1. **Users** browse the catalog, request books, and track their leases.
2. **Librarians** review requests, approve or reject them, and update lease statuses as books are collected, returned, or become overdue.
3. **Notifications** are sent automatically to users when their lease status changes, keeping everyone informed.

## Tech Stack

- **Backend:** Laravel (PHP)
- **Frontend:** React, TypeScript, Inertia.js
- **Database:** MySQL (or compatible)
- **Styling:** Tailwind CSS
- **Mail:** Laravel Mailables, Blade templates

