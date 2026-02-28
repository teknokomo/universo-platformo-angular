# start-frt — Start Pages Frontend (Angular)

> **Package**: `@universo/start-frt`  
> **Technology**: Angular 17+ (Standalone Components)  
> **Status**: Active Development

## Overview

Angular start page module providing the initial landing experience. Implements the guest start page (for non-authenticated users) and authenticated start page (onboarding wizard), equivalent to `start-frontend` in `universo-platformo-react`.

## Package Information

| Attribute | Value |
|-----------|-------|
| Framework | Angular 17+ |
| Auth Dependency | `@universo/auth-frt` |
| UI Library | Angular Material |
| Component Style | Standalone (no NgModule required) |

## Key Features

- **StartPageComponent**: Smart router between guest and authenticated views
- **GuestStartPageComponent**: Hero landing page with features showcase
- **AuthenticatedStartPageComponent**: Multi-step onboarding wizard
- **StartFooterComponent**: Shared footer with contact/legal links
- **Reactive Auth**: Uses `AuthService` signals for state-based rendering

## Assets

The `GuestStartPageComponent` uses a background image at `/assets/background-image.jpg`. You need to provide this asset in your application's `assets` folder (via Angular CLI `assets` configuration in `angular.json`). If the file is not present, the background will fall back to the CSS gradient overlay.

## Components

### StartPageComponent

Auto-selects between guest and authenticated views based on auth state.

```html
<up-start-page />
```

### GuestStartPageComponent

Landing page for non-authenticated users:
- Full-screen hero with CTA button → navigates to `/auth`
- Feature cards grid
- Footer

```html
<up-guest-start-page />
```

### AuthenticatedStartPageComponent

Onboarding wizard for authenticated users:
- Step 1: Global Goals (Projects)
- Step 2: Personal Interests (Campaigns)
- Step 3: Platform Features (Clusters)
- Completion screen after onboarding

```html
<up-authenticated-start-page />
```

## Installation

```bash
pnpm add @universo/start-frt
```

## Usage

### Basic Routing Setup

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { StartPageComponent } from '@universo/start-frt';

export const routes: Routes = [
  { path: '', component: StartPageComponent },
];
```

### Direct Component Usage

```typescript
import { GuestStartPageComponent, AuthenticatedStartPageComponent } from '@universo/start-frt';

@Component({
  standalone: true,
  imports: [GuestStartPageComponent],
  template: `<up-guest-start-page />`
})
export class MyPageComponent {}
```

## Architecture

```
base/src/lib/
├── components/
│   ├── start-page/
│   │   └── start-page.component.ts          # Smart routing component
│   ├── guest-start-page/
│   │   └── guest-start-page.component.ts    # Landing page for guests
│   ├── authenticated-start-page/
│   │   └── authenticated-start-page.component.ts  # Onboarding wizard
│   └── start-footer/
│       └── start-footer.component.ts        # Shared footer
└── services/
    └── (future: onboarding service)
```

## Backend API

The `AuthenticatedStartPageComponent` expects these API endpoints:

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/onboarding/items` | Get onboarding status and items |
| `POST` | `/api/v1/onboarding/join` | Save selected items |

Response from `GET /api/v1/onboarding/items`:
```json
{
  "onboardingCompleted": false,
  "projects": [...],
  "campaigns": [...],
  "clusters": [...]
}
```

## License

Omsk Open License
