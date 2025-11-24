# API Contracts - Authentication Service

**Service**: Authentication API  
**Base URL**: `/api/v1/auth`  
**Version**: 1.0.0  
**Date**: 2025-11-17

## Overview

This document defines the REST API contracts for the authentication service. The authentication backend (`auth-srv`) provides endpoints for user registration, sign-in, token refresh, and session management.

---

## Authentication

All protected endpoints require a valid JWT token in the `Authorization` header:

```
Authorization: Bearer <access_token>
```

---

## Endpoints

### 1. Sign Up

**POST** `/api/v1/auth/signup`

Create a new user account.

#### Request

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "fullName": "John Doe",
  "metadata": {
    "preferredLanguage": "en"
  }
}
```

**Request Schema**:
```typescript
{
  email: string;           // Required, valid email format
  password: string;        // Required, min 8 characters
  fullName?: string;       // Optional
  metadata?: {
    preferredLanguage?: 'en' | 'ru';
    [key: string]: unknown;
  }
}
```

#### Response

**Success (201 Created)**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "emailConfirmed": false,
      "fullName": "John Doe",
      "avatarUrl": null,
      "metadata": {
        "preferredLanguage": "en"
      },
      "createdAt": "2025-11-17T09:30:00.000Z",
      "updatedAt": "2025-11-17T09:30:00.000Z"
    },
    "session": null,
    "confirmationRequired": true
  },
  "metadata": {
    "requestId": "req_123abc",
    "timestamp": "2025-11-17T09:30:00.000Z",
    "version": "1.0.0"
  }
}
```

**Error (400 Bad Request)**:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_EMAIL",
    "message": "The provided email address is invalid",
    "details": {
      "field": "email"
    }
  },
  "metadata": {
    "requestId": "req_123abc",
    "timestamp": "2025-11-17T09:30:00.000Z",
    "version": "1.0.0"
  }
}
```

**Error (409 Conflict)**:
```json
{
  "success": false,
  "error": {
    "code": "EMAIL_ALREADY_EXISTS",
    "message": "An account with this email already exists"
  }
}
```

#### Error Codes
- `INVALID_EMAIL` - Email format is invalid
- `WEAK_PASSWORD` - Password doesn't meet requirements
- `EMAIL_ALREADY_EXISTS` - Email is already registered
- `INVALID_REQUEST` - Request body validation failed

---

### 2. Sign In

**POST** `/api/v1/auth/signin`

Authenticate a user and create a session.

#### Request

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Request Schema**:
```typescript
{
  email: string;     // Required
  password: string;  // Required
}
```

#### Response

**Success (200 OK)**:
```json
{
  "success": true,
  "data": {
    "session": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "v1.MjAxNC0xMS0xN1QwOTozMDowMFo...",
      "expiresAt": "2025-11-17T10:30:00.000Z",
      "tokenType": "Bearer"
    },
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "emailConfirmed": true,
      "fullName": "John Doe",
      "avatarUrl": null,
      "metadata": {
        "preferredLanguage": "en"
      },
      "createdAt": "2025-11-17T09:30:00.000Z",
      "updatedAt": "2025-11-17T09:30:00.000Z",
      "lastSignInAt": "2025-11-17T09:30:00.000Z"
    }
  }
}
```

**Error (401 Unauthorized)**:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

**Error (403 Forbidden)**:
```json
{
  "success": false,
  "error": {
    "code": "EMAIL_NOT_CONFIRMED",
    "message": "Please confirm your email before signing in"
  }
}
```

#### Error Codes
- `INVALID_CREDENTIALS` - Email or password incorrect
- `EMAIL_NOT_CONFIRMED` - Email verification pending
- `ACCOUNT_LOCKED` - Account has been locked

---

### 3. Sign Out

**POST** `/api/v1/auth/signout`

**Protected**: Requires authentication

End the current user session.

#### Request

No request body required. Authentication token in header.

#### Response

**Success (200 OK)**:
```json
{
  "success": true,
  "data": {
    "message": "Successfully signed out"
  }
}
```

**Error (401 Unauthorized)**:
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
```

---

### 4. Refresh Token

**POST** `/api/v1/auth/refresh`

Refresh an expired access token using a refresh token.

#### Request

```json
{
  "refreshToken": "v1.MjAxNC0xMS0xN1QwOTozMDowMFo..."
}
```

**Request Schema**:
```typescript
{
  refreshToken: string;  // Required
}
```

#### Response

**Success (200 OK)**:
```json
{
  "success": true,
  "data": {
    "session": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "v1.MjAxNC0xMS0xN1QwOTozMDowMFo...",
      "expiresAt": "2025-11-17T11:30:00.000Z",
      "tokenType": "Bearer"
    }
  }
}
```

**Error (401 Unauthorized)**:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_REFRESH_TOKEN",
    "message": "The refresh token is invalid or expired"
  }
}
```

#### Error Codes
- `INVALID_REFRESH_TOKEN` - Refresh token is invalid or expired
- `TOKEN_REVOKED` - Refresh token has been revoked

---

### 5. Get Current User

**GET** `/api/v1/auth/user`

**Protected**: Requires authentication

Get the current authenticated user's profile.

#### Request

No request body. Authentication token in header.

#### Response

**Success (200 OK)**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "emailConfirmed": true,
      "fullName": "John Doe",
      "avatarUrl": "https://example.com/avatar.jpg",
      "metadata": {
        "preferredLanguage": "en",
        "role": "user"
      },
      "createdAt": "2025-11-17T09:30:00.000Z",
      "updatedAt": "2025-11-17T09:35:00.000Z",
      "lastSignInAt": "2025-11-17T09:30:00.000Z"
    }
  }
}
```

**Error (401 Unauthorized)**:
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
```

---

### 6. Update User Profile

**PATCH** `/api/v1/auth/user`

**Protected**: Requires authentication

Update the current user's profile information.

#### Request

```json
{
  "fullName": "Jane Doe",
  "avatarUrl": "https://example.com/new-avatar.jpg",
  "metadata": {
    "preferredLanguage": "ru"
  }
}
```

**Request Schema**:
```typescript
{
  fullName?: string;
  avatarUrl?: string;
  metadata?: {
    preferredLanguage?: 'en' | 'ru';
    [key: string]: unknown;
  }
}
```

#### Response

**Success (200 OK)**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "emailConfirmed": true,
      "fullName": "Jane Doe",
      "avatarUrl": "https://example.com/new-avatar.jpg",
      "metadata": {
        "preferredLanguage": "ru"
      },
      "createdAt": "2025-11-17T09:30:00.000Z",
      "updatedAt": "2025-11-17T09:40:00.000Z",
      "lastSignInAt": "2025-11-17T09:30:00.000Z"
    }
  }
}
```

**Error (400 Bad Request)**:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_AVATAR_URL",
    "message": "The avatar URL is invalid",
    "details": {
      "field": "avatarUrl"
    }
  }
}
```

---

### 7. Request Password Reset

**POST** `/api/v1/auth/password-reset`

Request a password reset email.

#### Request

```json
{
  "email": "user@example.com"
}
```

**Request Schema**:
```typescript
{
  email: string;  // Required
}
```

#### Response

**Success (200 OK)**:
```json
{
  "success": true,
  "data": {
    "message": "If an account exists with this email, a password reset link has been sent"
  }
}
```

**Note**: Always returns success to prevent email enumeration attacks, even if email doesn't exist.

---

### 8. Health Check

**GET** `/api/v1/auth/health`

Check if the authentication service is operational.

#### Request

No request body or authentication required.

#### Response

**Success (200 OK)**:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2025-11-17T09:30:00.000Z",
    "version": "1.0.0",
    "dependencies": {
      "supabase": "connected",
      "database": "healthy"
    }
  }
}
```

---

## Common Response Codes

| Status Code | Meaning | Common Use Cases |
|------------|---------|------------------|
| 200 | OK | Successful request |
| 201 | Created | Resource created (signup) |
| 400 | Bad Request | Invalid input validation |
| 401 | Unauthorized | Invalid/missing/expired token |
| 403 | Forbidden | Valid token but insufficient permissions |
| 409 | Conflict | Resource already exists (email) |
| 500 | Internal Server Error | Server-side error |

---

## Error Code Reference

| Error Code | HTTP Status | Description |
|-----------|-------------|-------------|
| `INVALID_EMAIL` | 400 | Email format is invalid |
| `WEAK_PASSWORD` | 400 | Password doesn't meet requirements |
| `EMAIL_ALREADY_EXISTS` | 409 | Email is already registered |
| `INVALID_CREDENTIALS` | 401 | Email or password incorrect |
| `EMAIL_NOT_CONFIRMED` | 403 | Email verification pending |
| `UNAUTHORIZED` | 401 | Invalid or expired token |
| `INVALID_REFRESH_TOKEN` | 401 | Refresh token invalid/expired |
| `TOKEN_REVOKED` | 401 | Token has been revoked |
| `ACCOUNT_LOCKED` | 403 | Account is locked |
| `INVALID_REQUEST` | 400 | Request validation failed |
| `INVALID_AVATAR_URL` | 400 | Avatar URL is invalid |

---

## Rate Limiting

Authentication endpoints are rate-limited to prevent brute-force attacks:

- **Sign In**: 5 attempts per 15 minutes per IP
- **Sign Up**: 3 attempts per hour per IP
- **Password Reset**: 3 attempts per hour per email
- **Other endpoints**: 100 requests per minute per token

Rate limit responses include headers:
```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 3
X-RateLimit-Reset: 1700212800
```

**Error (429 Too Many Requests)**:
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later.",
    "details": {
      "retryAfter": 900
    }
  }
}
```

---

## Security Considerations

1. **HTTPS Required**: All authentication endpoints must use HTTPS in production
2. **Token Storage**: Store tokens securely (HttpOnly cookies or secure storage)
3. **CORS**: Configure CORS to allow only trusted origins
4. **Password Requirements**: Minimum 8 characters, at least one uppercase, one lowercase, one number
5. **Session Expiry**: Access tokens expire after 1 hour, refresh tokens after 30 days
6. **Token Revocation**: Implement token revocation for sign-out and security events

---

## Future Endpoints (Not in Initial Implementation)

- `POST /api/v1/auth/mfa/enable` - Enable multi-factor authentication
- `POST /api/v1/auth/mfa/verify` - Verify MFA code
- `GET /api/v1/auth/sessions` - List active sessions
- `DELETE /api/v1/auth/sessions/:id` - Revoke specific session
- `POST /api/v1/auth/oauth/:provider` - OAuth social login

---

## Implementation Notes

### Backend (Go/Gin)

1. Use `supabase-community/supabase-go` for Supabase Auth integration
2. Implement middleware using `appleboy/gin-jwt` for JWT validation
3. Handle CORS with `gin-contrib/cors`
4. Add request logging and error recovery middleware
5. Use structured logging for security events

### Frontend (Angular)

1. Use `@angular/common/http` for HTTP requests
2. Implement `HttpInterceptor` for automatic token injection
3. Store tokens in secure storage (not localStorage for sensitive data)
4. Handle token refresh automatically before expiration
5. Redirect to login on 401 errors

---

## Testing

### Contract Testing

All endpoints should be tested with:
- Valid request → Expected response
- Invalid authentication → 401 error
- Invalid input → 400 error with validation details
- Rate limiting → 429 error after threshold

### Example Test Cases

```typescript
describe('POST /api/v1/auth/signin', () => {
  it('should return session on valid credentials', async () => {
    const response = await api.post('/auth/signin', {
      email: 'test@example.com',
      password: 'ValidPassword123!'
    });
    
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.data.session.accessToken).toBeDefined();
  });
  
  it('should return 401 on invalid credentials', async () => {
    const response = await api.post('/auth/signin', {
      email: 'test@example.com',
      password: 'WrongPassword'
    });
    
    expect(response.status).toBe(401);
    expect(response.data.error.code).toBe('INVALID_CREDENTIALS');
  });
});
```

---

## Versioning

API version is included in the URL (`/api/v1/`) and response metadata. Breaking changes require a new version (v2, v3, etc.).

**Version History**:
- v1.0.0 (2025-11-17): Initial authentication API specification
