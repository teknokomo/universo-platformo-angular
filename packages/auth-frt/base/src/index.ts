/**
 * Universo Platformo | Auth Frontend Package
 *
 * Angular authentication module for Supabase auth via Go/Gin backend.
 * Provides auth service, guards, and reusable UI components.
 */

// Models
export type { AuthUser, AuthState, LoginCredentials, RegisterCredentials, SessionTokens } from './lib/models/auth.models';

// Services
export { AuthService } from './lib/services/auth.service';

// Guards
export { authGuard, guestGuard } from './lib/guards/auth.guard';

// Components
export { LoginFormComponent } from './lib/components/login-form/login-form.component';
export { RegisterFormComponent } from './lib/components/login-form/register-form.component';
export { AuthViewComponent } from './lib/components/auth-view/auth-view.component';
export type { AuthViewMode } from './lib/components/auth-view/auth-view.component';
