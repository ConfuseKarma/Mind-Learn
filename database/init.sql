-- Create database
CREATE DATABASE IF NOT EXISTS mindlearn
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Create application users
CREATE USER IF NOT EXISTS 'mindlearn'@'localhost' IDENTIFIED BY 'pass123';
CREATE USER IF NOT EXISTS 'mindlearn'@'127.0.0.1' IDENTIFIED BY 'pass123';

-- Grant privileges
GRANT ALL PRIVILEGES ON mindlearn.* TO 'mindlearn'@'localhost';
GRANT ALL PRIVILEGES ON mindlearn.* TO 'mindlearn'@'127.0.0.1';

FLUSH PRIVILEGES;

-- Optional: verify user creation
SELECT user, host, plugin
FROM mysql.user
WHERE user IN ('root','mindlearn');
