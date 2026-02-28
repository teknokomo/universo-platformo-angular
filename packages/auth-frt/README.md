# auth-frt — Authentication Frontend (Angular)

> **Package**: `@universo/auth-frt`  
> **Technology**: Angular 17+ (Standalone Components)  
> **Status**: Active Development

## Overview

Angular authentication frontend module providing reactive auth state management via the Go/Gin backend with Supabase. This package is the Angular equivalent of `auth-frontend` in `universo-platformo-react`.

## Package Information

| Attribute | Value |
|-----------|-------|
| Framework | Angular 17+ |
| State Management | RxJS BehaviorSubject + Signals |
| Auth Backend | Go/Gin (`auth-srv`) via Supabase |
| Component Style | Standalone (no NgModule required) |

## Key Features

- **AuthService**: Reactive auth state with `isAuthenticated$`, `user$`, `loading$`
- **Auth Guards**: `authGuard` and `guestGuard` for route protection
- **Login Form**: Material Design login form with validation
- **Register Form**: Registration form with password confirm and legal agreements
- **Auth View**: Complete auth UI with tabbed login/register
- **Cookie-based Sessions**: Secure session handling with CSRF protection

## Installation

```bash
pnpm add @universo/auth-frt
```

## Usage

### Setup

Provide `HttpClient` in your application:

```typescript
// app.config.ts
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
```

### Using AuthService

```typescript
import { Component, inject } from '@angular/core';
import { AuthService } from '@universo/auth-frt';

@Component({
  standalone: true,
  template: `
    @if (authService.isAuthenticated$ | async) {
      <p>Welcome, {{ (authService.user$ | async)?.email }}</p>
    }
  `
})
export class MyComponent {
  authService = inject(AuthService);
}
```

### Using Auth Guard

```typescript
// app.routes.ts
import { authGuard, guestGuard } from '@universo/auth-frt';

export const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'auth', component: AuthViewComponent, canActivate: [guestGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
];
```

### Using AuthViewComponent

```typescript
// auth.component.ts
import { AuthViewComponent } from '@universo/auth-frt';

@Component({
  standalone: true,
  imports: [AuthViewComponent],
  template: `
    <up-auth-view
      title="Welcome"
      [showRegister]="true"
      (authenticated)="onAuthenticated($event)"
    />
  `
})
export class AuthPageComponent {
  onAuthenticated(user: AuthUser): void {
    this.router.navigate(['/']);
  }
}
```

## API

### AuthService

| Member | Type | Description |
|--------|------|-------------|
| `state$` | `Observable<AuthState>` | Full auth state |
| `user$` | `Observable<AuthUser \| null>` | Current user |
| `isAuthenticated$` | `Observable<boolean>` | Auth status |
| `loading$` | `Observable<boolean>` | Loading state |
| `login(credentials)` | `Observable<AuthUser>` | Login |
| `register(credentials)` | `Observable<{message}>` | Register |
| `logout()` | `Observable<void>` | Logout |
| `refreshSession()` | `Observable<AuthUser>` | Refresh session |

## Architecture

```
base/src/lib/
├── models/
│   └── auth.models.ts          # TypeScript interfaces
├── services/
│   └── auth.service.ts         # Core auth service
├── guards/
│   └── auth.guard.ts           # authGuard, guestGuard
└── components/
    ├── login-form/
    │   ├── login-form.component.ts
    │   └── register-form.component.ts
    └── auth-view/
        └── auth-view.component.ts
```

## License

Omsk Open License
