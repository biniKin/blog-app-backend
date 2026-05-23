# Blog Backend Project (Node.js + Express + PostgreSQL)

## Goal

Build a REST API for a blog platform using:

- Node.js
- Express
- PostgreSQL
- Prisma
- JWT Authentication
- bcrypt

---

# Features

## 1. Account Management

### Authentication

1. User creates an account
2. User logs into an account
3. User logs out of an account

### Authorization

4. Users can access protected routes only when authenticated
5. Users can only modify their own posts

---

## 2. Blog Management

### CRUD Operations

1. Create / publish a blog post
2. Fetch all blog posts
3. Fetch a single blog post
4. Update an existing blog post
5. Delete a blog post

### Optional Enhancements

6. Filter blogs
7. Pagination
8. Search blog posts by title

---

# API Endpoints

## Auth Routes

```txt
POST /auth/register
POST /auth/login
POST /auth/logout
```

## Blog Routes

```txt
POST   /posts
GET    /posts
GET    /posts/:id
PATCH  /posts/:id
DELETE /posts/:id
```

---

# Database Structure

## User Table

```txt
id
username
email
password
created_at
updated_at
```

Notes:
- password must be hashed using bcrypt
- email should be unique

---

## Post Table

```txt
id
title
content
author_id
created_at
updated_at
```

### Relationship

```txt
One User → Many Posts
```

Each post belongs to exactly one user.

---

# Validation Rules

### Register

Required:

- username
- email
- password

### Create Post

Required:

- title
- content

Reject empty fields.

---

# Security Requirements

1. Passwords must be hashed
2. JWT tokens required for protected routes
3. Users cannot edit/delete posts they do not own

---

# Project Structure

```txt
src/
│
├── controllers/
├── routes/
├── middleware/
├── services/
├── prisma/
├── app.js
└── server.js
```

---

# Learning Objectives

By finishing this project, I should understand:

- Express routing
- Middleware
- REST API design
- PostgreSQL basics
- Prisma ORM
- Authentication (JWT)
- Password hashing
- Authorization
- Database relationships
- Project structure / separation of concerns