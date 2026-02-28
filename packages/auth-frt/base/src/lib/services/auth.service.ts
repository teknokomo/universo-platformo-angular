import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, from, throwError } from 'rxjs';
import { map, tap, catchError, switchMap, finalize } from 'rxjs/operators';
import type { AuthUser, AuthState, LoginCredentials, RegisterCredentials } from '../models/auth.models';

/**
 * AuthService - Core Angular authentication service
 *
 * Manages authentication state via the Go/Gin backend which
 * handles Supabase auth. Uses cookie-based sessions with CSRF protection.
 *
 * @example
 * ```typescript
 * // In your component
 * private authService = inject(AuthService);
 *
 * // Access auth state
 * isAuthenticated$ = this.authService.isAuthenticated$;
 * user$ = this.authService.user$;
 *
 * // Login
 * this.authService.login({ email, password }).subscribe();
 * ```
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);

    private readonly baseUrl = '/api/v1/auth';

    private stateSubject = new BehaviorSubject<AuthState>({
        user: null,
        loading: true,
        error: null,
        isAuthenticated: false,
    });

    /** Observable of the full auth state */
    readonly state$: Observable<AuthState> = this.stateSubject.asObservable();

    /** Observable of the current user (null if not authenticated) */
    readonly user$: Observable<AuthUser | null> = this.state$.pipe(map((s) => s.user));

    /** Observable of the loading state */
    readonly loading$: Observable<boolean> = this.state$.pipe(map((s) => s.loading));

    /** Observable of authentication status */
    readonly isAuthenticated$: Observable<boolean> = this.state$.pipe(
        map((s) => s.isAuthenticated)
    );

    /** Current auth state snapshot */
    get currentState(): AuthState {
        return this.stateSubject.getValue();
    }

    constructor() {
        // Check session on service initialization
        this.refreshSession().subscribe({
            error: () => {
                // Not authenticated - set loading to false
                this.patchState({ loading: false });
            },
        });
    }

    /**
     * Login with email and password
     */
    login(credentials: LoginCredentials): Observable<AuthUser> {
        this.patchState({ loading: true, error: null });

        return this.getCsrfToken().pipe(
            switchMap((csrfToken) =>
                this.http.post<{ user: AuthUser }>(
                    `${this.baseUrl}/login`,
                    credentials,
                    { headers: { 'X-CSRF-Token': csrfToken }, withCredentials: true }
                )
            ),
            map((response) => response.user),
            tap((user) => {
                this.patchState({ user, isAuthenticated: true, loading: false, error: null });
            }),
            catchError((error) => {
                const message = this.extractErrorMessage(error, 'Login failed');
                this.patchState({ loading: false, error: message });
                return throwError(() => new Error(message));
            })
        );
    }

    /**
     * Register a new user account
     */
    register(credentials: RegisterCredentials): Observable<{ message: string }> {
        this.patchState({ loading: true, error: null });

        return this.getCsrfToken().pipe(
            switchMap((csrfToken) =>
                this.http.post<{ message: string }>(
                    `${this.baseUrl}/register`,
                    credentials,
                    { headers: { 'X-CSRF-Token': csrfToken }, withCredentials: true }
                )
            ),
            tap(() => {
                this.patchState({ loading: false, error: null });
            }),
            catchError((error) => {
                const message = this.extractErrorMessage(error, 'Registration failed');
                this.patchState({ loading: false, error: message });
                return throwError(() => new Error(message));
            })
        );
    }

    /**
     * Logout the current user
     */
    logout(): Observable<void> {
        this.patchState({ loading: true });

        return this.getCsrfToken().pipe(
            switchMap((csrfToken) =>
                this.http.post<void>(
                    `${this.baseUrl}/logout`,
                    {},
                    { headers: { 'X-CSRF-Token': csrfToken }, withCredentials: true }
                )
            ),
            tap(() => {
                this.patchState({
                    user: null,
                    isAuthenticated: false,
                    loading: false,
                    error: null,
                });
            }),
            catchError((error) => {
                // Always clear local state even if backend logout fails
                this.patchState({
                    user: null,
                    isAuthenticated: false,
                    loading: false,
                    error: null,
                });
                console.error('[AuthService] Logout error:', error);
                return throwError(() => error);
            })
        );
    }

    /**
     * Refresh the current session by calling /auth/me
     */
    refreshSession(): Observable<AuthUser> {
        this.patchState({ loading: true });

        return this.http.get<AuthUser>(`${this.baseUrl}/me`, { withCredentials: true }).pipe(
            tap((user) => {
                this.patchState({ user, isAuthenticated: true, loading: false, error: null });
            }),
            catchError((error) => {
                this.patchState({
                    user: null,
                    isAuthenticated: false,
                    loading: false,
                    error: null,
                });
                return throwError(() => error);
            }),
            finalize(() => {
                if (this.currentState.loading) {
                    this.patchState({ loading: false });
                }
            })
        );
    }

    /**
     * Fetches CSRF token from the backend
     */
    getCsrfToken(): Observable<string> {
        return this.http
            .get<{ csrfToken: string }>(`${this.baseUrl}/csrf`, { withCredentials: true })
            .pipe(map((response) => response.csrfToken));
    }

    /**
     * Patches the auth state with partial updates
     */
    private patchState(partial: Partial<AuthState>): void {
        this.stateSubject.next({ ...this.stateSubject.getValue(), ...partial });
    }

    /**
     * Extracts a human-readable error message from an HTTP error
     */
    private extractErrorMessage(error: unknown, fallback: string): string {
        if (error && typeof error === 'object') {
            const httpError = error as { error?: { error?: string; message?: string } };
            return (
                httpError.error?.error ||
                httpError.error?.message ||
                fallback
            );
        }
        return fallback;
    }
}
