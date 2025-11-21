-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS login_db;
USE login_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);

-- Create login_logs table (optional - for tracking login attempts)
CREATE TABLE IF NOT EXISTS login_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  success BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create sample user (password: Test@123 hashed with bcryptjs)
-- INSERT INTO users (email, password) VALUES ('test@example.com', '$2a$10$salt_and_hashed_password');

-- Note: To hash passwords in production, use bcryptjs module or similar
-- Example: bcryptjs.hash('password', 10)
