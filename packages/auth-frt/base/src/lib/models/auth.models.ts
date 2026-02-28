/**
 * AuthUser - represents an authenticated user
 */
export interface AuthUser {
    id: string;
    email: string;
}

/**
 * SessionTokens - Supabase session tokens (stored server-side)
 */
export interface SessionTokens {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
}

/**
 * LoginCredentials - login request payload
 */
export interface LoginCredentials {
    email: string;
    password: string;
}

/**
 * RegisterCredentials - registration request payload
 */
export interface RegisterCredentials {
    email: string;
    password: string;
    termsAccepted: boolean;
    privacyAccepted: boolean;
}

/**
 * AuthState - observable authentication state
 */
export interface AuthState {
    user: AuthUser | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}
