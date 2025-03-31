# Server Setup Instructions

This project includes an API server that handles authentication and proxies other API requests.

## Running the Server

You have several options for running the server:

### Option 1: Run the server separately

```bash
# Using CommonJS version (recommended for most setups)
npx node server.cjs

# OR using ES modules version
npx node server.js
```

### Option 2: Run server and development environment together

```bash
npm run dev:all
```

This uses `concurrently` to run both the API server and the Vite development server simultaneously.

## Environment Setup

Make sure you have the necessary environment variables:

1. Create a `.env` or `.env.local` file with:
   ```
   VITE_MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=3003
   ```

2. Install dependencies if you haven't already:
   ```bash
   npm install
   ```

## API Endpoints

The server provides these endpoints:

- `POST /api/register` - Register a new user
- `POST /api/login` - Login with username and password

## Testing the API

You can test the API using tools like Postman or curl:

```bash
# Register a new user
curl -X POST http://localhost:3003/api/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "email": "test@example.com", "password": "password123"}'

# Login
curl -X POST http://localhost:3003/api/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
```
