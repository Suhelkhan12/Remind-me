# Remind Me App

The Remind Me App is a full-stack web application built with Prisma, Next.js 14, Server Actions, Chakra UI, and Tailwind CSS. It incorporates authentication powered by Clerk. Users can create categories of tasks and manage tasks within these categories with full CRUD (Create, Read, Update, Delete) functionality.

## Screenshots

![App Screenshot](https://uploads-ssl.webflow.com/66673bdbe019d06416f24668/6677e89e60e3e6536ff51be0_Screenshot%202024-06-23%20at%202.47.59%E2%80%AFPM.png)

![App Screenshot](https://uploads-ssl.webflow.com/66673bdbe019d06416f24668/6677e89ebc9e35b163439c67_Screenshot%202024-06-23%20at%202.48.17%E2%80%AFPM.png)

![App Screenshot](https://uploads-ssl.webflow.com/66673bdbe019d06416f24668/6677e89ece7ed765744e5e45_Screenshot%202024-06-23%20at%202.48.24%E2%80%AFPM.png)

![App Screenshot](https://uploads-ssl.webflow.com/66673bdbe019d06416f24668/6677e89e43dec1da90607629_Screenshot%202024-06-23%20at%202.48.36%E2%80%AFPM.png)

![App Screenshot](https://uploads-ssl.webflow.com/66673bdbe019d06416f24668/6677e89e3b4a2a6c932b93eb_Screenshot%202024-06-23%20at%202.49.02%E2%80%AFPM.png)

![App Screenshot](https://uploads-ssl.webflow.com/66673bdbe019d06416f24668/6677e89e9576478edafa2be5_Screenshot%202024-06-23%20at%202.48.47%E2%80%AFPM.png)


## Features

- **Authentication**: User authentication using Clerk.
- **Categories**: Create, edit, and delete categories for organizing tasks.
- **Tasks**: CRUD operations for managing tasks within categories.
- **UI Frameworks**: Utilizes Chakra UI for components and Tailwind CSS for styling.

## Technologies Used

- **Backend**:
  - Prisma: ORM for interfacing with the database.
  - Next.js 14: React framework for server-rendered React applications.
  - Server Actions: Logic for handling server-side operations.
  - Clerk: Authentication service provider.
  
- **Frontend**:
  - React: Frontend framework for building user interfaces.
  - Chakra UI: Component library for React applications.
  - Tailwind CSS: Utility-first CSS framework for styling.

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

- Node.js installed on your machine.
- npm or yarn package manager installed.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/remind-me-app.git
   cd remind-me-app

2. Install dependencies:
   
   ```bash
   npm install
   or
   yarn install

3. Set up environment variables:
   
   Rename .env.example to .env.local and fill in the necessary environment variables, especially those required by Clerk for authentication and Prisma for database connection.

4. Initialize the database:
   npx prisma migrate dev

### Usage

 - Authentication: Sign up or log in using Clerk's authentication flow.
 - Categories: Create, edit, and delete categories from the sidebar.
 - Tasks: Manage tasks within each category using the respective CRUD operations. 

 ### Acknowledgements

 - Clerk documentation: https://docs.clerk.dev/
 - Prisma documentation: https://www.prisma.io/docs/
 - Next.js documentation: https://nextjs.org/docs
 - Chakra UI documentation: https://chakra-ui.com/docs/getting-started
 - Tailwind CSS documentation: https://tailwindcss.com/docs 