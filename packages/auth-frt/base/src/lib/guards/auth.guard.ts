import { inject } from '@angular/core';
import { Router, CanActivateFn, UrlTree } from '@angular/router';
import { Observable, filter, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * authGuard - functional route guard that protects authenticated routes
 *
 * Waits for the initial auth check to complete, then redirects to /auth
 * if the user is not authenticated.
 *
 * @example
 * ```typescript
 * // In your routing module
 * {
 *   path: 'dashboard',
 *   component: DashboardComponent,
 *   canActivate: [authGuard]
 * }
 * ```
 */
export const authGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.state$.pipe(
        // Wait until the initial session check is complete before deciding
        filter((state) => !state.loading),
        map((state) => state.isAuthenticated ? true : router.createUrlTree(['/auth'])),
        take(1)
    );
};

/**
 * guestGuard - functional route guard that protects guest-only routes
 *
 * Waits for the initial auth check to complete, then redirects to /
 * if the user is already authenticated.
 *
 * @example
 * ```typescript
 * // In your routing module
 * {
 *   path: 'auth',
 *   component: AuthComponent,
 *   canActivate: [guestGuard]
 * }
 * ```
 */
export const guestGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.state$.pipe(
        filter((state) => !state.loading),
        map((state) => !state.isAuthenticated ? true : router.createUrlTree(['/'])),
        take(1)
    );
};
