# React + Vite

https://github.com/adervishaj-afk/news-explorer-backend

https://github.com/adervishaj-afk/news-explorer-frontend

newsexplore.twilightparadox.com
api.newsexplore.twilightparadox.com

News Explorer API
Welcome to the News Explorer API! This project forms the backend for a news aggregation and bookmarking platform, where users can search for news articles, save their favorite ones, and manage their saved articles. The application demonstrates several backend development concepts, including RESTful API development, authentication and authorization, database management, and error handling.

Table of Contents
Project Overview
Key Features
Tech Stack

Project Overview
The News Explorer API is a server-side application that allows users to search for articles via a third-party API (such as NewsAPI), save articles to their profile, and manage saved articles. The backend communicates with a MongoDB database to store user information, saved articles, and supports operations such as saving, deleting, and retrieving user-specific news data.

Main Functionality:
User Authentication and Authorization: Users can register, login, and get access to a personalized news feed and saved articles. JWT tokens are used for authentication.
RESTful API Design: The API follows RESTful principles with endpoints to handle CRUD operations on articles, user authentication, and more.
Article Bookmarking: Users can save articles and manage their bookmarked articles (save, delete, and fetch).
Keyword Search: Keywords used to search for articles are stored with the saved articles to facilitate search refinement.
Key Features
User Authentication:

Secure user registration and login using JWT (JSON Web Tokens).
Passwords are hashed using bcrypt for security.
RESTful API:

The API provides well-structured endpoints to create, read, update, and delete resources (articles).
Adheres to best practices of REST by using appropriate HTTP methods and status codes.
Article Management:

Users can save articles from external news sources.
Articles are bookmarked along with relevant metadata, including titles, descriptions, URLs, and keywords.
Supports retrieving all saved articles for a specific user.
Error Handling:

Implements centralized error handling using custom error classes.
Responses are standardized to ensure consistency in the error output.
Security and Data Validation:

User inputs are validated using Joi to prevent malformed data.
Protection against common web vulnerabilities, such as unauthorized access, by ensuring JWT tokens are verified and valid.
Endpoints are secured by requiring authentication for access to user-specific resources.
Modular Architecture:

Follows a clean, modular architecture that separates concerns, making the codebase easier to scale and maintain.
Business logic is separated from route handlers, ensuring a clear flow from request to response.
Tech Stack
This project leverages modern web development technologies:

Node.js: As the runtime environment for building server-side logic.
Express.js: A minimalist framework used for building RESTful APIs.
MongoDB: NoSQL database for storing user data, saved articles, and related metadata.
Mongoose: An object data modeling (ODM) library for MongoDB that provides a schema-based solution for application data.
JWT (JSON Web Tokens): Used for secure user authentication and session management.
bcrypt: Used to hash and secure user passwords.
celebrate (Joi): For validating incoming request data (e.g., user inputs, article IDs, etc.).
dotenv: Used for environment configuration to manage sensitive data (e.g., JWT secret, database URL).
Helmet: For setting HTTP headers to improve security.

-
