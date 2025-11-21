# Full-Stack Login Page

A complete full-stack login application with HTML/CSS/JavaScript frontend, Node.js/Express backend, and MySQL database.

## Features

- **Frontend**: Responsive login form with real-time validation
- **Backend**: Express.js REST API with JWT authentication
- **Database**: MySQL with user authentication and login logging
- **Security**: Password hashing with bcryptjs, JWT tokens
- **CORS**: Cross-origin request support

## Project Structure

```
login-page/
├── index.html              # Frontend HTML form
├── styles.css              # Responsive CSS styling
├── script.js               # Frontend validation & API integration
├── server.js               # Express backend server
├── package.json            # Node.js dependencies
├── .env                    # Environment configuration
├── database.sql            # MySQL schema and tables
└── README.md               # This file
```

## Tech Stack

**Frontend:**
- HTML5
- CSS3
- JavaScript (ES6+)

**Backend:**
- Node.js
- Express.js
- MySQL2 (Promise-based)
- JWT (JSON Web Tokens)
- bcryptjs (Password hashing)
- CORS
- dotenv (Environment variables)

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MySQL Server (v5.7+)
- npm or yarn

### Backend Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup MySQL Database**
   ```bash
   mysql -u root -p < database.sql
   ```
   This creates the `login_db` database with `users` and `login_logs` tables.

3. **Configure Environment Variables**
   Edit `.env` file with your credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=login_db
   DB_PORT=3306
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_secret_key_change_this_in_production
   JWT_EXPIRE=7d
   CLIENT_URL=http://localhost:3000
   ```

4. **Start Backend Server**
   ```bash
   npm start
   # Or for development with auto-reload:
   npm run dev
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Serve Frontend Files**
   - Use any web server (Live Server, SimpleHTTPServer, etc.)
   - Or serve from port 3000/8000

2. **Update API URL in script.js**
   If your backend is on a different URL, update:
   ```javascript
   const API_URL = 'http://your-backend-url:5000/api';
   ```

## API Endpoints

### Authentication

**POST /api/auth/signup**
- Register a new user
- Body: `{ "email": "user@example.com", "password": "password123" }`
- Response: `{ "message": "User registered successfully" }`

**POST /api/auth/login**
- User login
- Body: `{ "email": "user@example.com", "password": "password123" }`
- Response: `{ "token": "jwt_token", "user": { "id": 1, "email": "user@example.com" } }`

### Protected Routes

**GET /api/user/profile**
- Get user profile (requires authentication)
- Headers: `{ "Authorization": "Bearer jwt_token" }`
- Response: `{ "id": 1, "email": "user@example.com", "created_at": "2025-11-21" }`

**GET /api/health**
- Health check endpoint
- Response: `{ "status": "Server is running" }`

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);
```

### Login Logs Table
```sql
CREATE TABLE login_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  success BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Usage

1. Open `index.html` in your browser
2. Enter your email and password
3. Click "Login"
4. Frontend validates input and sends to backend API
5. Backend verifies credentials against database
6. On success, JWT token is returned and stored in localStorage
7. User can access protected routes with the token

## Security Features

- ✓ Password hashing with bcryptjs (salt rounds: 10)
- ✓ JWT token-based authentication
- ✓ CORS protection
- ✓ Email format validation
- ✓ Password minimum length (6 characters)
- ✓ SQL injection prevention with prepared statements
- ✓ Secure headers configuration

## Environment Variables

```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=login_db
DB_PORT=3306

# Server
PORT=5000
NODE_ENV=development

# Security
JWT_SECRET=your_secret_key_change_this_in_production
JWT_EXPIRE=7d

# CORS
CLIENT_URL=http://localhost:3000
```

## Common Issues & Solutions

**1. Database Connection Failed**
- Ensure MySQL is running
- Check DB credentials in `.env` file
- Verify database exists: `mysql -u root -p login_db`

**2. CORS Error**
- Check `CLIENT_URL` in `.env` matches your frontend URL
- Ensure backend is running on correct port

**3. Port Already in Use**
- Change PORT in `.env` file
- Kill process: `lsof -i :5000` then `kill -9 <PID>`

**4. Token Expiration**
- Default: 7 days, change `JWT_EXPIRE` in `.env`
- Clear localStorage and re-login if token expired

## Next Steps

- [ ] Add password reset functionality
- [ ] Implement email verification
- [ ] Add user profile management
- [ ] Create dashboard page
- [ ] Add refresh token mechanism
- [ ] Implement rate limiting
- [ ] Add logging and monitoring
- [ ] Deploy to production (Heroku, AWS, etc.)

## Contributing

Feel free to submit issues and enhancement requests!

## License

ISC

## Support

For issues or questions, please create an issue in the repository.
