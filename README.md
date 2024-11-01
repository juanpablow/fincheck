# Fincheck - Personal Finance Management System

![Initial Screen](https://github.com/juanpablow/fincheck/blob/main/docs/images/dashboard-screen.png)

**Fincheck** is a personal finance management system developed during the **JStack** course. The project follows best practices in software development, such as **Clean Architecture**, **SOLID principles**, and a modular design, allowing users to manage their finances efficiently.

## Features

- **User Authentication**: Secure user registration and login using JWT.
- **Bank Account Management**: Add, update, and manage multiple bank accounts.
- **Categories**: Define categories for transactions.
- **Transaction Management**: Create, update, and track transactions.
- **Ownership Validation**: Validates user ownership for secure data access.
- **Environment Configuration**: Easily configure environments using environment variables.
- **Database Integration**: Built using Prisma with PostgreSQL as the database.

## Technologies Used

- **Node.js** with **NestJS** framework
- **TypeScript**
- **JWT** for authentication
- **Prisma ORM** for database management
- **PostgreSQL** for data storage
- **Docker** for containerization
- **Vercel** for deployment

## Project Structure

The project is structured according to **Clean Architecture**, separating concerns into different layers, such as application logic, database access, and user interface handling. This modular approach ensures scalability, maintainability, and testability.

### Project Tree

```bash
.
├── dist
├── prisma
│   ├── migrations
│   └── schema.prisma
├── src
│   ├── app.module.ts
│   ├── infra
│   │   └── database
│   │       ├── database.module.ts
│   │       ├── prisma.service.ts
│   │       └── repositories
│   │           ├── bank-accounts.repository.ts
│   │           ├── categories.repository.ts
│   │           ├── transactions.repository.ts
│   │           └── users.repository.ts
│   ├── main.ts
│   ├── modules
│   │   ├── auth
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.guard.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.service.ts
│   │   │   └── dto
│   │   │       ├── signin.dto.ts
│   │   │       └── signup.dto.ts
│   │   ├── bank-accounts
│   │   │   ├── bank-accounts.controller.ts
│   │   │   ├── bank-accounts.module.ts
│   │   │   ├── dto
│   │   │   │   ├── create-bank-account.dto.ts
│   │   │   │   └── update-bank-account.dto.ts
│   │   │   ├── entities
│   │   │   │   └── bank-account-type.enum.ts
│   │   │   └── services
│   │   │       ├── bank-accounts.service.ts
│   │   │       └── validate-bank-account-ownership.service.ts
│   │   ├── categories
│   │   │   ├── categories.controller.ts
│   │   │   ├── categories.module.ts
│   │   │   └── services
│   │   │       ├── categories.service.ts
│   │   │       └── validate-category-ownership.service.ts
│   │   ├── transactions
│   │   │   ├── dto
│   │   │   │   ├── create-transaction.dto.ts
│   │   │   │   └── update-transaction.dto.ts
│   │   │   ├── entities
│   │   │   │   └── transaction.enum.ts
│   │   │   ├── services
│   │   │   │   ├── transactions.service.ts
│   │   │   │   └── validate-transaction-ownership.service.ts
│   │   │   ├── transactions.controller.ts
│   │   │   └── transactions.module.ts
│   │   └── users
│   │       ├── users.controller.ts
│   │       ├── users.module.ts
│   │       └── users.service.ts
│   └── shared
│       ├── config
│       │   └── env.ts
│       └── decorators
│           ├── ActiveUserId.ts
│           └── IsPublic.ts
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── vercel.json
```

## Setup Instructions

### Prerequisites

- **Node.js** (v14 or higher)
- **PostgreSQL** (or any other SQL database)
- **Docker** (optional, for containerization)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/seu-usuario/fincheck.git
cd fincheck
```

2. Install dependencies:

```bash
pnpm install
```

3. Configure environment variables:

Create a `.env` file in the root directory using the provided `.env.example` file as a template.

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/fincheck
JWT_SECRET=your_jwt_secret_key
```

4. Run database migrations:

```bash
pnpm prisma migrate dev
```

5. Start the application:

```bash
pnpm run dev
```
