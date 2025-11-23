-- Create database
CREATE DATABASE IF NOT EXISTS mindlearn
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Create application user (accessible from Docker network)
CREATE USER IF NOT EXISTS 'mindlearn'@'%' IDENTIFIED BY 'pass123';

-- Grant privileges
GRANT ALL PRIVILEGES ON mindlearn.* TO 'mindlearn'@'%';

FLUSH PRIVILEGES;

-- Optional: verify user creation
SELECT user, host, plugin
FROM mysql.user
WHERE user IN ('root','mindlearn');
