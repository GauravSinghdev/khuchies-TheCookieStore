# User Authentication API

This API provides endpoints for user registration, login, logout, and profile management.

## Features

- User registration with validation
- User login with authentication
- User logout
- Retrieve user profile information

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens) for authentication
- bcrypt for password hashing
- Zod for schema validation


## Setup and Installation
To run the application locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/GauravSinghdev/Assignment
2. **Navigate to the project directory:**
	```bash
	cd backend
3. **Install dependencies:**
	```bash
	npm install
4. **Set up environment variables:**

   - Create a `.env` file inside the backend folder and define the following variables:
     ```plaintext
     MONGODB_URI=your_mongodb_connection_string
     ```
   - Create a `config.js` file inside the backend folder and define the JWT secret key:
     ```javascript
     // config.js
     const JWT_SECRET = "your_secret_key_here";
     module.exports = JWT_SECRET;
     ```

		Replace `"your_secret_key_here"` with your actual JWT secret key.
5. **Run your backend**
	```bash
	node index.js
## API Documentation
Detailed API documentation can be found in the [Swagger UI](http://localhost:3000/api-docs) when the server is running locally.

## Functional Requirements Completion
- [x] User registration endpoint (`/registration`)
- [x] User login endpoint (`/login`)
- [x] User logout endpoint (`/logout`)
- [x] Get user profile endpoint (`/profile`)
- [x] Authentication middleware to protect routes
- [x] Unit tests for each endpoint
