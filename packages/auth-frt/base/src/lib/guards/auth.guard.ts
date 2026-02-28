import { inject } from '@angular/core';
import { Router, CanActivateFn, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * authGuard - functional route guard that protects authenticated routes
 *
 * Redirects to /auth if the user is not authenticated.
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
        // Wait until loading is complete
        map((state) => {
            if (state.loading) {
                return true; // Allow navigation while loading (will re-evaluate)
            }
            if (state.isAuthenticated) {
                return true;
            }
            return router.createUrlTree(['/auth']);
        }),
        take(1)
    );
};

/**
 * guestGuard - functional route guard that protects guest-only routes
 *
 * Redirects to / if the user is already authenticated.
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
        map((state) => {
            if (state.loading) {
                return true;
            }
            if (!state.isAuthenticated) {
                return true;
            }
            return router.createUrlTree(['/']);
        }),
        take(1)
    );
};
