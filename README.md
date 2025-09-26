# FireNode Blog

## Overview
**FireNode Blog** is a full-stack application built with Node.js that provides a blogging platform with advanced features including:
- **JWT-based user authentication** and **bcrypt password hashing**.
- **Role-based access control** (user and admin roles).
- **Email verification** for users.
- **CRUD operations** for posts and comments.
- **Image uploads** using Firebase Storage for both posts and user profiles.
- **Search and filtering** capabilities for posts (bonus feature).

This project is designed to allow users to post content, interact with others through comments, and manage their profiles, while admins have full control over all content and users.

---

## Features
- **JWT Authentication**: Secure login system with JSON Web Tokens for user validation.
- **Role-based Access Control**: Users have limited access to their own content, while admins can manage all posts and users.
- **CRUD Operations**:
  - Users can create, read, update, and delete their own posts and comments.
  - Admins can create, update, delete any post, comment, and manage users.
- **Email Verification**: Ensures users verify their email before accessing certain features.
- **Firebase Integration**:
  - Firebase Firestore for database storage (users, posts, comments).
  - Firebase Storage for handling images (post images and profile pictures).
- **Profile Management**: Users can manage their profile, including uploading a profile picture.
- **Search & Filtering**: Users can search posts by title, author, and filter posts by category.

---

## Technologies Used
- **Node.js**: Backend server and API logic.
- **Express.js**: Web framework for routing.
- **JWT (JSON Web Token)**: Authentication and authorization for secure API access.
- **bcrypt**: Password hashing for secure storage of user credentials.
- **Firebase Firestore**: NoSQL database for storing users, posts, and comments.
- **Firebase Storage**: For image uploads (profile pictures, post images).
- **nodemailer**: For sending email verification links.

---

## Installation

### Clone the repository:
```bash
git clone https://github.com/your-username/FireNode-Blog.git
cd FireNode-Blog
Install dependencies:
bash
Copy code
npm install
Set up Firebase:
Create a Firebase project and enable Firebase Firestore and Firebase Storage.

Download the Firebase service account key and save it as firebase-service-account.json.

Add your Firebase configuration details to the .env file:

bash
Copy code
JWT_SECRET=your_jwt_secret_key
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
Run the application:
bash
Copy code
npm start
The server will run on http://localhost:5000.

API Endpoints
Authentication
POST /auth/register: Register a new user with name, email, and password.

POST /auth/login: Log in to the platform and obtain a JWT.

GET /auth/verify-email: Verify user email using the provided verification token.

Posts
GET /posts: Retrieve all posts.

POST /posts: Create a new post (requires authentication).

GET /posts/:id: Retrieve a specific post by ID.

PUT /posts/:id: Update an existing post (accessible by the post owner or admins).

DELETE /posts/:id: Delete a specific post (accessible by the post owner or admins).

Comments
POST /comments: Add a comment to a post.

GET /comments/:postId: Get comments for a specific post.

PUT /comments/:id: Edit a comment (accessible by the comment owner or admins).

DELETE /comments/:id: Delete a comment (accessible by the comment owner or admins).

User Profile
GET /user/profile: View the authenticated user's profile.

PUT /user/profile: Update the user's profile details.

POST /user/upload-profile-picture: Upload a new profile picture.

Middleware
JWT Authentication: Middleware to verify the JWT in requests to protected routes.

Role-based Access Control: Middleware to enforce permissions for different user roles (admin vs. regular user).

Example Usage
Register a New User
bash
Copy code
POST /auth/register
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "password": "securePassword123"
}
Log in and Get JWT
bash
Copy code
POST /auth/login
{
  "email": "jane.doe@example.com",
  "password": "securePassword123"
}
Create a Post (Authenticated)
bash
Copy code
POST /posts
Authorization: Bearer <JWT_TOKEN>
{
  "title": "Exploring Firebase with Node.js",
  "content": "This is an introductory post about using Firebase with Node.js."
}
Contributing
Fork the repository.

Create a new branch (git checkout -b feature-name).

Implement your feature or fix.

Commit your changes (git commit -am 'Add new feature').

Push your changes (git push origin feature-name).

Open a Pull Request with a description of your changes.

License
This project is licensed under the MIT License - see the LICENSE file for details.

pgsql
Copy code

---

### **Summary of Changes:**
1. **Repository Name**: Changed to `FireNode Blog`—a name that reflects the use of Firebase and Node.js for building a blogging platform.
2. **Description**: Adapted to reflect the core features of the app like authentication, CRUD operations, role management, email verification, and Firebase integration.
3. **README**: The file is updated with project-specific details such as environment variable setup, API endpoints, middleware, and usage examples, tailored for the `FireNode Blog` name.

Does this work for you, or do you need further tweaks to any section?
