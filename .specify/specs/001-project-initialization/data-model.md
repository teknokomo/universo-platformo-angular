# Data Model - Universo Platformo Angular

**Feature**: Project Initialization  
**Date**: 2025-11-17  
**Status**: Design Phase

## Overview

This document defines the key entities, relationships, and data structures for the Universo Platformo Angular project initialization. This focuses on the foundational data models required for the initial shared infrastructure and authentication packages.

## Core Entity Categories

### 1. Infrastructure Entities

These entities are part of the shared infrastructure packages and provide foundational types used across all features.

#### 1.1 Package Metadata

**Purpose**: Metadata describing packages within the monorepo

**Entity**: `PackageInfo`

```typescript
interface PackageInfo {
  name: string;                    // Package name (e.g., "universo-types")
  version: string;                 // Semantic version (e.g., "1.0.0")
  type: 'shared' | 'feature';     // Package category
  layer: 'frontend' | 'backend' | 'shared';  // Technology layer
  dependencies: string[];          // Internal package dependencies
  description: string;             // Package description
  status: 'active' | 'deprecated'; // Lifecycle status
}
```

**Validation Rules**:
- `name` must follow naming convention: `{feature}-{frt|srv}` or `universo-*`
- `version` must be valid semver
- `dependencies` must reference existing packages

#### 1.2 Configuration

**Purpose**: Application and package configuration management

**Entity**: `AppConfig`

```typescript
interface AppConfig {
  environment: 'development' | 'staging' | 'production';
  apiBaseUrl: string;              // Backend API base URL
  supabaseUrl: string;             // Supabase project URL
  supabaseAnonKey: string;         // Supabase anonymous key
  enableDebugMode: boolean;        // Debug logging flag
  i18n: I18nConfig;               // Internationalization settings
}

interface I18nConfig {
  defaultLanguage: 'en' | 'ru';
  supportedLanguages: ('en' | 'ru')[];
  fallbackLanguage: 'en' | 'ru';
}
```

**Validation Rules**:
- `apiBaseUrl` and `supabaseUrl` must be valid URLs
- `supabaseAnonKey` is required for Supabase operations
- `defaultLanguage` must be in `supportedLanguages`

---

### 2. Authentication Entities

These entities are specific to the `auth-frt` and `auth-srv` packages.

#### 2.1 User

**Purpose**: Represents an authenticated user in the system

**Entity**: `User`

```typescript
interface User {
  id: string;                      // UUID from Supabase Auth
  email: string;                   // User's email address
  emailConfirmed: boolean;         // Email verification status
  phoneNumber?: string;            // Optional phone number
  fullName?: string;               // Optional full name
  avatarUrl?: string;              // Optional profile picture URL
  metadata: UserMetadata;          // Additional user data
  createdAt: Date;                 // Account creation timestamp
  updatedAt: Date;                 // Last update timestamp
  lastSignInAt?: Date;             // Last successful sign-in
}

interface UserMetadata {
  preferredLanguage?: 'en' | 'ru';
  role?: string;                   // User role (future: for authorization)
  customClaims?: Record<string, unknown>;  // Future: custom JWT claims
}
```

**Validation Rules**:
- `id` must be valid UUID
- `email` must be valid email format and unique
- `avatarUrl` must be valid URL if provided
- `phoneNumber` must be valid E.164 format if provided

**State Transitions**:
- New user: `emailConfirmed: false`
- After email verification: `emailConfirmed: true`
- On sign-in: `lastSignInAt` updated

#### 2.2 Authentication Session

**Purpose**: Represents an active user session

**Entity**: `AuthSession`

```typescript
interface AuthSession {
  accessToken: string;             // JWT access token
  refreshToken: string;            // JWT refresh token
  expiresAt: Date;                 // Access token expiration
  tokenType: 'Bearer';             // Token type (always Bearer)
  user: User;                      // Associated user
}
```

**Validation Rules**:
- `accessToken` must be valid JWT
- `expiresAt` must be future timestamp
- Session is invalid if `expiresAt` has passed

**State Transitions**:
- Created: On successful sign-in
- Refreshed: When access token expires (using refresh token)
- Destroyed: On sign-out or token revocation

#### 2.3 Authentication Request/Response

**Purpose**: DTOs for authentication operations

**Sign In Request**:
```typescript
interface SignInRequest {
  email: string;
  password: string;
}
```

**Sign In Response**:
```typescript
interface SignInResponse {
  session: AuthSession;
  user: User;
}
```

**Sign Up Request**:
```typescript
interface SignUpRequest {
  email: string;
  password: string;
  fullName?: string;
  metadata?: Partial<UserMetadata>;
}
```

**Sign Up Response**:
```typescript
interface SignUpResponse {
  user: User;
  session?: AuthSession;           // May be null if email confirmation required
  confirmationRequired: boolean;   // Whether email confirmation needed
}
```

**Password Reset Request**:
```typescript
interface PasswordResetRequest {
  email: string;
}
```

---

### 3. API Response Entities

These entities standardize API communication between frontend and backend.

#### 3.1 Standard API Response

**Purpose**: Consistent API response format

**Entity**: `ApiResponse<T>`

```typescript
interface ApiResponse<T> {
  success: boolean;                // Operation success status
  data?: T;                        // Response data (if successful)
  error?: ApiError;                // Error details (if failed)
  metadata?: ResponseMetadata;     // Optional response metadata
}

interface ApiError {
  code: string;                    // Error code (e.g., "AUTH_FAILED")
  message: string;                 // Human-readable error message
  details?: Record<string, unknown>;  // Additional error context
}

interface ResponseMetadata {
  requestId: string;               // Unique request identifier
  timestamp: Date;                 // Server timestamp
  version: string;                 // API version
}
```

**Validation Rules**:
- If `success: true`, `data` should be present
- If `success: false`, `error` should be present
- `code` should follow convention: `UPPERCASE_SNAKE_CASE`

#### 3.2 Paginated Response

**Purpose**: Paginated list responses

**Entity**: `PaginatedResponse<T>`

```typescript
interface PaginatedResponse<T> {
  items: T[];                      // List of items
  pagination: PaginationMetadata;  // Pagination information
}

interface PaginationMetadata {
  page: number;                    // Current page (1-indexed)
  pageSize: number;                // Items per page
  totalItems: number;              // Total number of items
  totalPages: number;              // Total number of pages
  hasNext: boolean;                // Whether next page exists
  hasPrev: boolean;                // Whether previous page exists
}
```

**Validation Rules**:
- `page` must be >= 1
- `pageSize` must be > 0
- `totalPages` = ceil(`totalItems` / `pageSize`)

---

### 4. Internationalization Entities

These entities support bilingual documentation and UI.

#### 4.1 Translation Key

**Purpose**: Structured translation keys

**Entity**: `TranslationKey`

```typescript
type TranslationKey = string;  // Dot-notation path (e.g., "auth.login.title")

interface Translation {
  key: TranslationKey;
  translations: {
    en: string;
    ru: string;
  };
}
```

**Validation Rules**:
- Keys must follow dot notation: `{namespace}.{section}.{key}`
- Both `en` and `ru` translations required
- Translations should have identical structure (same placeholders)

---

## Relationships

### Entity Relationship Diagram

```
┌─────────────┐
│   User      │
└─────┬───────┘
      │ 1
      │
      │ *
┌─────▼───────────┐
│  AuthSession    │
└─────────────────┘

┌─────────────────┐
│   AppConfig     │◄──┐
└─────────────────┘   │ uses
                      │
┌─────────────────┐   │
│  PackageInfo    │───┘
└─────────────────┘
```

**Key Relationships**:
1. **User ↔ AuthSession**: One user can have multiple active sessions (1:N)
2. **AppConfig → I18nConfig**: Configuration contains internationalization settings (1:1 composition)
3. **All Entities → ApiResponse**: Wrapped in standard response format for API communication

---

## Repository Interfaces

The following interfaces define the data access layer abstraction (FR-030). These interfaces isolate database-specific code and enable future addition of other database providers without modifying feature code.

### AuthRepository Interface

**Purpose**: Data access for authentication operations

**Go Interface Definition**:
```go
// AuthRepository defines the interface for authentication data operations
type AuthRepository interface {
    // FindUserByID retrieves a user by their unique identifier
    FindUserByID(ctx context.Context, id string) (*User, error)
    
    // FindUserByEmail retrieves a user by their email address
    FindUserByEmail(ctx context.Context, email string) (*User, error)
    
    // CreateUser creates a new user account
    CreateUser(ctx context.Context, req *CreateUserRequest) (*User, error)
    
    // UpdateUser updates an existing user's profile
    UpdateUser(ctx context.Context, id string, req *UpdateUserRequest) (*User, error)
    
    // DeleteUser removes a user account
    DeleteUser(ctx context.Context, id string) error
}
```

**TypeScript Interface Definition** (for API client):
```typescript
interface IAuthRepository {
    findUserById(id: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    createUser(request: CreateUserRequest): Promise<User>;
    updateUser(id: string, request: UpdateUserRequest): Promise<User>;
    deleteUser(id: string): Promise<void>;
}
```

### SessionRepository Interface

**Purpose**: Data access for session management

**Go Interface Definition**:
```go
// SessionRepository defines the interface for session data operations
type SessionRepository interface {
    // CreateSession creates a new user session
    CreateSession(ctx context.Context, userID string) (*AuthSession, error)
    
    // GetSession retrieves an active session by token
    GetSession(ctx context.Context, accessToken string) (*AuthSession, error)
    
    // RefreshSession refreshes an expired session using refresh token
    RefreshSession(ctx context.Context, refreshToken string) (*AuthSession, error)
    
    // RevokeSession invalidates a session
    RevokeSession(ctx context.Context, accessToken string) error
    
    // RevokeAllUserSessions invalidates all sessions for a user
    RevokeAllUserSessions(ctx context.Context, userID string) error
}
```

### Implementation Strategy

**Supabase Implementation** (Initial):
- `SupabaseAuthRepository` implements `AuthRepository`
- `SupabaseSessionRepository` implements `SessionRepository`
- Uses `supabase-community/supabase-go` client

**Future Database Implementations**:
- `PostgresAuthRepository` - Direct PostgreSQL access
- `MongoAuthRepository` - MongoDB alternative
- Interfaces remain unchanged; only implementations differ

---

## Data Storage

### Supabase Tables

For the authentication system, Supabase provides built-in tables:

**`auth.users`** (Managed by Supabase Auth)
- Core user authentication data
- Mapped to our `User` entity

**Future Extensions** (deferred to feature implementation):
- Custom user profile table for extended metadata
- Session management table for revocation
- Audit log table for security events

### Frontend State

**Angular Services (RxJS)**:
- `AuthService`: Manages authentication state (`User`, `AuthSession`)
- `ConfigService`: Manages application configuration
- `I18nService`: Manages current language and translations

**Local Storage**:
- `auth_session`: Persisted authentication session
- `user_preferences`: User preferences (language, theme, etc.)

### Backend State

**In-Memory (Go)**:
- JWT validation cache
- Configuration loaded at startup
- Connection pools for Supabase

---

## Validation Summary

| Entity | Key Validations | Business Rules |
|--------|----------------|----------------|
| User | Email format, UUID | Unique email, email confirmation required |
| AuthSession | JWT validity, expiration | Auto-refresh before expiry |
| AppConfig | URL formats | Required for app initialization |
| ApiResponse | success/data/error consistency | Standard error codes |
| Translation | Both languages present | Identical structure across languages |

---

## Future Considerations

### Planned Extensions (Not in Initial Implementation)

1. **Authorization System**:
   - Role entity (Admin, User, Guest)
   - Permission entity
   - Role-based access control (RBAC)

2. **Multi-Factor Authentication**:
   - MFA configuration entity
   - TOTP secret storage
   - Backup codes

3. **Social Authentication**:
   - OAuth provider links
   - Provider-specific user identifiers

4. **Session Management**:
   - Device tracking
   - Session revocation
   - Concurrent session limits

5. **Audit Logging**:
   - Authentication events
   - Security events
   - User actions

These extensions will be defined in future specifications as features are implemented.

---

## Migration Strategy

### Phase 1: Initial Setup (Current)
- Define TypeScript interfaces in `universo-types` package
- No database migrations needed (using Supabase Auth tables)

### Phase 2: Feature Implementation (Future)
- Add custom tables for extended user profiles
- Define migration scripts for schema changes
- Version migrations with semantic versioning

---

## Conclusion

This data model provides the foundational structure for:
1. ✅ Shared infrastructure packages (types, config, API responses)
2. ✅ Authentication system (users, sessions, tokens)
3. ✅ Internationalization support (bilingual translations)
4. ✅ API communication patterns (standard responses, pagination)

All entities are designed with:
- Clear validation rules
- State transition definitions
- Relationship mappings
- Future extensibility

Next step: Define API contracts in `/contracts/` directory.
