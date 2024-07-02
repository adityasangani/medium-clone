# Medium Clone - README

Welcome to the Medium Clone project! This is a web application inspired by the popular blogging platform, Medium. It allows users to sign up, create, and read blog posts.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)

## Demo

You can access the live demo of the application [here](https://medium-clone-seven-chi.vercel.app/signup).

## Features

- User authentication and authorization using JWT.
- Create and view blog posts.
- Responsive design.

## Tech Stack

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Typescript**: TypeScript as the primary language for type safety and tooling.
- **Zod**: For validation and type inference.

### Backend

- **Cloudflare Workers**: Serverless platform for running backend logic.
- **Prisma**: ORM for database interactions with connection pooling.
- **Postgres**: Relational database for data storage.
- **JWT**: For authentication.

## Installation

To run the project locally, follow these steps:

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/medium-clone.git
    cd medium-clone
    ```

2. Install frontend dependencies:

    ```sh
    cd frontend
    npm install
    ```

3. Install backend dependencies:

    ```sh
    cd backend
    npm install
    ```

4. Set up environment variables:

    Create a `.env` file in the `backend` directory and add your environment variables:

    ```sh
    DATABASE_URL=your_postgres_database_url
    JWT_SECRET=your_jwt_secret
    ```

5. Run the Prisma migrations to set up the database schema:

    ```sh
    npx prisma migrate dev --name init
    ```

6. Start the development server:

    ```sh
    # In the backend directory
    npm run dev

    # In the frontend directory
    npm run dev
    ```

7. Open your browser and navigate to `http://localhost:3000`.

