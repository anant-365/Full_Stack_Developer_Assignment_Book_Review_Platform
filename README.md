# Book Review Website - MERN Stack

This is a **Book Review Website** project built using the **MERN** stack (MongoDB, Express, React, Node.js). It allows users to register, log in, and review books, while admins can manage the content and users.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Cloning and Setup](#cloning-and-setup)
- [Configuration](#configuration)
- [User and Admin Setup](#user-and-admin-setup)
- [Tips and Additional Commands](#tips-and-additional-commands)

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (locally or using a cloud database like MongoDB Atlas)
- **Git** for cloning the repository
- **npm** or **yarn** as the package manager

## Cloning and Setup

To clone and set up the project on your local system:

1. Clone the repository:
    ```bash
    git clone https://github.com/anant-365/Full_Stack_Developer_Assignment_Book_Review_Platform.git
    ```

2. Navigate into the project folder:
    ```bash
    cd book-review-website
    ```

3. Install dependencies:
    - **Backend**: Navigate to the `server` directory and install dependencies:
      ```bash
      cd server
      npm install
      ```

    - **Frontend**: Navigate to the `client` directory and install dependencies:
      ```bash
      cd client
      npm install
      ```

4. Create a `.env` file in both `server` and `client` directories.

   - In the `server` `.env` file, add:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

   - In the `client` `.env` file, add:
     ```
     REACT_APP_API_URL=http://localhost:5000
     ```

5. Run the project:
    - **Backend**:
      ```bash
      cd server
      npm start
      ```
    - **Frontend**:
      ```bash
      cd client
      npm start
      ```

Now, your app should be running at `http://localhost:3000`.

## Configuration

1. **MongoDB URI**: Make sure to replace `your_mongodb_connection_string` in the `.env` file with your MongoDB URI (either from a local MongoDB instance or MongoDB Atlas).

2. **JWT Secret**: Replace `your_jwt_secret` with a secret key for signing JWT tokens.

## User and Admin Setup

1. **Register Users**: To register, visit the login/register page and create at least two users.

2. **Seed Admin User**:
   - After registering the users, run the admin seeder to manually add the admin user. The `adminSeeder.js` file is already hardcoded with the admin credentials:
     - Username: `anant`
     - Password: `1234567890`

   - To run the seed script, execute:
     ```bash
     node adminSeeder.js
     ```

3. **Userbookapp Collection**:
   - All **admin users** must be present in the `userbookapp` collection, but **normal users** don't need to be added to the admin collection.

4. **Unique ISBN**: The `isbn` field of each book must be **unique**. Ensure that no two books have the same ISBN.

5. **Book Addition**:
   - New books can be added by both **normal users** and **admins**. To ensure this, the book creation functionality should check that the user submitting the book is authenticated.

6. **Common User in Both Collections**: Ensure there is at least **one common user** present in both the `admin` and `userbookapp` collections for the system to work as intended.

## Tips and Additional Commands

- **Add More Admin Users**: You can add more admin users manually by modifying the `adminSeeder.js` file.
  
- **Update MongoDB URI**: To use a custom MongoDB URI, replace the default value in the `.env` file with the new URI.

- **Testing**:
  - You can test the backend APIs using Postman or similar tools.
  - Use `npm run test` in the backend directory to run tests.

- **Starting the Development Server**:
  - You can start both backend and frontend simultaneously by running the following command from the root directory:
    ```bash
    npm run dev
    ```

- **Environment Variables**: Don't forget to add or update any necessary environment variables like `JWT_SECRET` or `MONGO_URI` when deploying to production.

---
