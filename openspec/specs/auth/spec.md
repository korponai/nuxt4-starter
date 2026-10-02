# Authentication Specification

## Purpose
Provides secure session-based authentication for user and administrator accounts using nuxt-auth-utils and scrypt password hashing.

## Requirements

### Requirement: User Authentication
The system SHALL authenticate users using verified credentials and establish a secure HttpOnly session.

#### Scenario: Successful login
- **WHEN** valid user credentials are submitted to `/api/auth/login`
- **THEN** an authenticated session is created and user profile details are returned

#### Scenario: Failed login
- **WHEN** invalid credentials are submitted to `/api/auth/login`
- **THEN** access is rejected with an HTTP 401 Unauthorized status

### Requirement: Session Invalidation
The system SHALL allow authenticated users to terminate their active session.

#### Scenario: Successful logout
- **WHEN** a logout request is sent to `/api/auth/logout`
- **THEN** the session cookie is cleared
