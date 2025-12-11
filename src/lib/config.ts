/**
 * Centralized configuration for the Alchemiscale web application
 *
 * This module provides access to environment variables and configuration settings.
 * All environment variables MUST be provided by the user - no defaults are included.
 */

import { get } from "http";

/**
 * Get the Alchemiscale API base URL from environment variables
 * @throws {Error} If NEXT_PUBLIC_ALCHEMISCALE_API_URL is not set
 */
export function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_ALCHEMISCALE_API_URL;

  if (!url) {
    throw new Error(
      'NEXT_PUBLIC_ALCHEMISCALE_API_URL environment variable is not set. ' +
      'Please create a .env.local file with this variable defined.'
    );
  }

  return url;
}

/**
 * Get the AWS S3 bucket name from environment variables
 * @throws {Error} If AWS_S3_BUCKET is not set
 */
export function getAwsS3Bucket(): string {
  const bucket = process.env.AWS_S3_BUCKET;

  if (!bucket) {
    throw new Error(
      'AWS_S3_BUCKET environment variable is not set. ' +
      'Please add this variable to your .env.local file.'
    );
  }

  return bucket;
}

/**
 * Application configuration object
 * Access configuration values through this object
 */
export const config = {
  /**
   * The base URL for the Alchemiscale API
   */
  get apiBaseUrl(): string {
    return getApiBaseUrl();
  },

  /**
   * The AWS S3/R2 bucket name
   */
  get awsS3Bucket(): string {
    return getAwsS3Bucket();
  },

} as const;