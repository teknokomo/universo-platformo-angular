package model

// LoginRequest represents the login request body
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email,max=320"`
	Password string `json:"password" binding:"required,min=6,max=1024"`
}

// RegisterRequest represents the registration request body
type RegisterRequest struct {
	Email           string `json:"email" binding:"required,email,max=320"`
	Password        string `json:"password" binding:"required,min=6,max=1024"`
	// TermsAccepted and PrivacyAccepted are validated manually in the handler
	// because gin's "required" tag rejects false (non-zero check), not a missing field check
	TermsAccepted   bool `json:"termsAccepted"`
	PrivacyAccepted bool `json:"privacyAccepted"`
}

// AuthUser represents an authenticated user
type AuthUser struct {
	ID    string `json:"id"`
	Email string `json:"email"`
}

// SessionTokens holds Supabase session tokens stored server-side
type SessionTokens struct {
	AccessToken  string `json:"access"`
	RefreshToken string `json:"refresh"`
	ExpiresAt    int64  `json:"exp"`
}

// SupabaseAuthResponse represents Supabase auth API response
type SupabaseAuthResponse struct {
	AccessToken  string               `json:"access_token"`
	RefreshToken string               `json:"refresh_token"`
	ExpiresAt    int64                `json:"expires_at"`
	User         *SupabaseUser        `json:"user"`
}

// SupabaseUser represents a Supabase user object
type SupabaseUser struct {
	ID    string `json:"id"`
	Email string `json:"email"`
}

// SupabaseErrorResponse represents Supabase error response
type SupabaseErrorResponse struct {
	Error   string `json:"error"`
	Message string `json:"message,omitempty"`
}

// CSRFResponse holds CSRF token
type CSRFResponse struct {
	CSRFToken string `json:"csrfToken"`
}
