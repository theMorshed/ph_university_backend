/*
 * Importing necessary modules:
 * - `dotenv`: Loads environment variables from a .env file into `process.env`.
 * - `path`: Provides utilities for working with file and directory paths.
 */
import dotenv from 'dotenv';
import path from 'path';

/*
 * Configuring dotenv to load environment variables from the `.env` file in the current working directory.
 * This allows access to sensitive information like API keys, database URLs, etc.
 */
dotenv.config({ path: path.join(process.cwd(), '.env') });

/*
 * Exporting an object containing essential environment variables for the application.
 * These variables are used throughout the app for configuration.
 */
export default {
  // Application environment (e.g., 'development', 'production').
  NODE_ENV: process.env.NODE_ENV,

  // Port number the server will listen on.
  port: process.env.PORT,

  // Database connection URL.
  database_url: process.env.DATABASE_URL,

  // Default password used across the application.
  default_password: process.env.DEFAULT_PASSWORD,

  // Bcrypt salt rounds for secure password hashing.
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,

  // Secret key for signing JWT access tokens.
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,

  // Secret key for signing JWT refresh tokens.
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,

  // expires time for JWT access tokens.
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,

  // expires time for JWT refresh tokens.
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,

  // reset password ui link
  reset_password_ui_link: process.env.RESET_PASSWORD_UI_LINK,

  // cloudinary cloud name
  cloudinary_cloud_name: process.env.CLOUD_NAME,

  // cloudinary api key
  cloudinary_api_key: process.env.API_KEY,

  // cloudinary api secret
  cloudinary_api_secret: process.env.API_SECRET,

  // super admin password
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD
};