# NexaDesk

### IT Helpdesk Management System

NexaDesk is a web-based IT Helpdesk Management System designed to manage internal IT support requests, ticket assignments, issue resolution, and user access within an organization.

This project was built as a portfolio project to demonstrate practical experience in **full-stack web development, database design, authentication, role-based access control, server-side application development, and production deployment**.

**Live Demo:** [NexaDesk](https://nexadesk-8d7s.vercel.app/)
**Repository:** [GitHub](https://github.com/IrgiAhmadzFhrezi/nexadesk)

---

## Overview

NexaDesk provides a centralized platform for employees to submit IT support requests and for IT Support teams to manage, track, and resolve those requests.

The system uses a structured ticket lifecycle:

```text
OPEN
  ↓
ASSIGNED
  ↓
IN_PROGRESS
  ↓
WAITING_USER
  ↓
IN_PROGRESS
  ↓
RESOLVED
  ↓
CLOSED
```

Different user roles have different permissions and responsibilities within the system.

---

## Screenshots

### Login

![NexaDesk Login](static/login-page.png)

### Dashboard

![NexaDesk Dashboard](static/Dashboard.jpeg)

### Ticket Management

![NexaDesk Tickets](static/tickets.jpeg)

### Ticket Detail

![NexaDesk Ticket Detail](static/Detail-tickets.jpeg)

### Category Management

![NexaDesk Categories](static/categories.jpeg)

---

## Features

### Authentication

- Login using email and password
- Password hashing with Argon2
- Database-backed server-side session management
- HTTP-only session cookies
- Session expiration
- Protected application routes
- Role-based authorization
- Logout and session invalidation

### Role-Based Access Control

NexaDesk supports three user roles:

- **Employee**
- **IT Support**
- **Admin**

Each role has specific permissions within the application.

### Ticket Management

- Create support tickets
- View ticket details
- Search tickets
- Filter by status
- Filter by priority
- Filter by category
- Assign tickets
- Update ticket status
- Add solutions
- Add comments
- Track ticket activities
- Close resolved tickets

### Ticket Workflow

The application implements controlled ticket transitions based on user roles.

```text
Employee
   │
   └── Create Ticket
          │
          ▼
        OPEN
          │
          ├── Admin assigns IT Support
          │
          └── IT Support takes ticket
          │
          ▼
       ASSIGNED
          │
          ▼
     IN_PROGRESS
       /       \
      /         \
     ▼           ▼
WAITING_USER   RESOLVED
     │             │
     │             │
     ▼             ▼
IN_PROGRESS     CLOSED
     │
     ▼
  RESOLVED
     │
     ▼
   CLOSED
```

### User Management

Administrators can:

- View users
- Create users
- Edit users
- Change user roles
- Change departments
- Delete users when they have no related tickets

### Category Management

Administrators can:

- Create categories
- Edit categories
- Delete categories that are not being used by tickets

Default categories include:

- Hardware
- Software
- Network
- Account
- Printer
- Email
- Security
- Other

### Dashboard

The dashboard provides an overview of ticket activity:

- Open tickets
- Assigned tickets
- In Progress tickets
- Waiting User tickets
- Resolved tickets
- Closed tickets
- Recent tickets

### Responsive Interface

The interface is designed for:

- Desktop
- Tablet
- Mobile

The application includes responsive navigation for smaller screens.

---

## User Roles

| Role           | Responsibilities                                                                      |
| -------------- | ------------------------------------------------------------------------------------- |
| **Employee**   | Create tickets, view own tickets, comment, and close resolved tickets                 |
| **IT Support** | Manage assigned tickets, take open tickets, update status, add solutions, and comment |
| **Admin**      | Manage users, categories, tickets, assignments, and system access                     |

### Assignment Rules

Administrators can assign tickets to any IT Support user.

IT Support users can take an unassigned ticket for themselves but cannot assign a ticket to another IT Support user.

This keeps ticket assignment controlled while still allowing support staff to pick up available tickets.

---

## Tech Stack

### Frontend

- SvelteKit
- Svelte
- TypeScript
- Tailwind CSS

### Backend

- SvelteKit Server Routes
- TypeScript
- Argon2

### Database

- PostgreSQL
- Drizzle ORM
- Drizzle Kit

### Runtime & Tooling

- Bun
- Vite
- Git
- GitHub
- Vercel

---

## Architecture

NexaDesk uses SvelteKit as a full-stack framework, handling both the user interface and server-side application logic.

```text
Browser
   │
   ▼
SvelteKit
   │
   ├── Pages & Components
   │
   ├── Server Load Functions
   │
   ├── Form Actions
   │
   ├── Authentication
   │
   └── Authorization
   │
   ▼
Drizzle ORM
   │
   ▼
PostgreSQL
```

Server-only database and authentication logic is separated from client-facing components.

---

## Database Design

The application uses PostgreSQL with relational data modeling through Drizzle ORM.

Main relationships:

```text
departments
      │
      └──── users
              │
              ├──── tickets
              │       │
              │       └──── categories
              │
              ├──── ticket_comments
              │
              └──── ticket_activities

sessions
    │
    └──── users
```

### Main Tables

#### `users`

Stores application users and their roles.

Key fields:

- `id`
- `name`
- `email`
- `password_hash`
- `role`
- `department_id`

#### `tickets`

Stores IT support requests.

Key fields:

- `id`
- `created_at`
- `title`
- `description`
- `solution`
- `status`
- `priority`
- `requester_id`
- `assigned_to`
- `department_id`
- `category_id`

#### `ticket_comments`

Stores comments and conversations related to tickets.

#### `ticket_activities`

Stores important actions and status changes performed on tickets.

#### `categories`

Stores available ticket categories.

#### `departments`

Stores organizational departments.

#### `sessions`

Stores server-side authentication sessions and their expiration time.

---

## Project Structure

```text
nexadesk/
│
├── drizzle/
│   └── migrations/
│
├── scripts/
│   ├── hash-password.ts
│   └── verify-password.ts
│
├── src/
│   ├── lib/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── data/
│   │   └── server/
│   │       ├── auth/
│   │       └── db/
│   │
│   └── routes/
│       ├── (app)/
│       │   ├── categories/
│       │   ├── tickets/
│       │   │   ├── create/
│       │   │   ├── new/
│       │   │   └── [id]/
│       │   │       └── edit/
│       │   │
│       │   └── users/
│       │       ├── new/
│       │       └── [id]/
│       │           └── edit/
│       │
│       ├── login/
│       └── logout/
│
├── static/
│   ├── Dashboard.jpeg
│   ├── Detail-tickets.jpeg
│   ├── categories.jpeg
│   ├── login-page.png
│   └── tickets.jpeg
│
├── .gitignore
├── .npmrc
├── bun.lock
├── drizzle.config.ts
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

Make sure the following are installed:

- [Bun](https://bun.sh/)
- PostgreSQL
- Git

### 1. Clone the repository

```bash
git clone https://github.com/IrgiAhmadzFhrezi/nexadesk.git
cd nexadesk
```

### 2. Install dependencies

```bash
bun install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/nexadesk"
```

Replace `YOUR_PASSWORD` with your local PostgreSQL password.

> Never commit the `.env` file to version control.

### 4. Create the database

Create a PostgreSQL database named:

```text
nexadesk
```

### 5. Run database migrations

```bash
bunx drizzle-kit migrate
```

### 6. Start the development server

```bash
bun run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## Environment Variables

NexaDesk requires the following environment variable:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/nexadesk"
```

The `.env` file is excluded from version control through `.gitignore`.

For production deployment, the database connection string is configured through the hosting platform's environment variables.

---

## Production Deployment

NexaDesk is deployed using **Vercel** with **Supabase PostgreSQL** as the production database.

```text
User
 │
 ▼
Vercel
 │
 ▼
SvelteKit
 │
 ├── Authentication
 ├── Server-side Logic
 └── Drizzle ORM
       │
       ▼
   Supabase
   PostgreSQL
```

The production application has been tested for:

- User authentication
- Session management
- Ticket creation
- Ticket assignment
- Ticket status transitions
- Comments
- Activity history
- Ticket resolution
- Ticket closure

---

## Security

The application implements several basic security practices:

- Passwords are hashed using Argon2
- Authentication uses database-backed server-side sessions
- Session cookies use `HttpOnly`
- Sessions have expiration times
- Role-based authorization is enforced on the server
- Database credentials are stored in environment variables
- Administrator routes are protected by role checks
- Categories cannot be deleted while referenced by tickets
- Users with related tickets cannot be deleted
- Authentication sessions can be invalidated during logout

---

## What I Learned

This project allowed me to practice and apply several software engineering concepts:

- Full-stack application architecture
- SvelteKit routing and server-side functionality
- TypeScript
- Form actions and server validation
- Authentication and authorization
- Session management
- Role-based access control
- Relational database design
- PostgreSQL
- Drizzle ORM
- Foreign key relationships
- Database migrations
- CRUD operations
- Ticket workflow design
- Activity logging
- Responsive UI development
- Error handling and validation
- Git and GitHub
- Production deployment with Vercel
- PostgreSQL deployment with Supabase

---

## Future Improvements

Potential improvements for future versions include:

- Email notifications
- File attachments
- Ticket SLA tracking
- Advanced reporting and analytics
- Pagination for large datasets
- Automated testing
- CI/CD pipeline
- More granular permission management
- Improved audit logging
- Performance optimization for larger datasets

---

## Author

**Irgi Ahmad Fahrezi**

Computer Engineering Graduate

NexaDesk was built as a portfolio project to demonstrate practical software engineering skills using SvelteKit, TypeScript, PostgreSQL, Drizzle ORM, and modern web development practices.

---

## License

This project is intended as a personal portfolio project.
