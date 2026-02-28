package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"universo-platformo/auth-srv/internal/middleware"
	"universo-platformo/auth-srv/internal/model"
	"universo-platformo/auth-srv/internal/service"
)

// AuthHandler handles authentication HTTP requests
type AuthHandler struct {
	supabase *service.SupabaseService
}

// NewAuthHandler creates a new AuthHandler
func NewAuthHandler(supabase *service.SupabaseService) *AuthHandler {
	return &AuthHandler{supabase: supabase}
}

// GetCSRF returns a CSRF token for the current session
// GET /api/v1/auth/csrf
func (h *AuthHandler) GetCSRF(c *gin.Context) {
	session := sessions.Default(c)

	// Return existing token or generate a new one
	existing, _ := session.Get(middleware.SessionKeyCSRF).(string)
	if existing != "" {
		c.JSON(http.StatusOK, model.CSRFResponse{CSRFToken: existing})
		return
	}

	token, err := middleware.GenerateCSRFToken()
	if err != nil {
		log.Printf("[auth] Failed to generate CSRF token: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate CSRF token"})
		return
	}

	session.Set(middleware.SessionKeyCSRF, token)
	if err := session.Save(); err != nil {
		log.Printf("[auth] Failed to save session: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save session"})
		return
	}

	log.Printf("[auth] CSRF token generated for session")
	c.JSON(http.StatusOK, model.CSRFResponse{CSRFToken: token})
}

// Login authenticates a user with email and password
// POST /api/v1/auth/login
func (h *AuthHandler) Login(c *gin.Context) {
	var req model.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	authResp, err := h.supabase.SignIn(c.Request.Context(), req.Email, req.Password)
	if err != nil {
		log.Printf("[auth] Login failed for %s: %v", req.Email, err)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	if authResp.User == nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Store tokens and user in session
	session := sessions.Default(c)
	tokens := model.SessionTokens{
		AccessToken:  authResp.AccessToken,
		RefreshToken: authResp.RefreshToken,
		ExpiresAt:    authResp.ExpiresAt,
	}
	tokensJSON, err := json.Marshal(tokens)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Server error"})
		return
	}

	userJSON, err := json.Marshal(model.AuthUser{ID: authResp.User.ID, Email: authResp.User.Email})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Server error"})
		return
	}

	session.Set(middleware.SessionKeyTokens, string(tokensJSON))
	session.Set(middleware.SessionKeyUser, string(userJSON))
	if err := session.Save(); err != nil {
		log.Printf("[auth] Failed to save session: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Server error"})
		return
	}

	log.Printf("[auth] Login success for %s", req.Email)
	c.JSON(http.StatusOK, gin.H{
		"user": model.AuthUser{ID: authResp.User.ID, Email: authResp.User.Email},
	})
}

// Register creates a new user account
// POST /api/v1/auth/register
func (h *AuthHandler) Register(c *gin.Context) {
	var req model.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	if !req.TermsAccepted || !req.PrivacyAccepted {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Terms of Service and Privacy Policy must be accepted"})
		return
	}

	authResp, err := h.supabase.SignUp(c.Request.Context(), req.Email, req.Password)
	if err != nil {
		log.Printf("[auth] Register failed for %s: %v", req.Email, err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Registration failed"})
		return
	}

	if authResp.User == nil {
		// Email confirmation required
		log.Printf("[auth] Register: email confirmation required for %s", req.Email)
		c.JSON(http.StatusOK, gin.H{"message": "Please check your email to confirm your account"})
		return
	}

	log.Printf("[auth] Register success for %s", req.Email)
	c.JSON(http.StatusCreated, gin.H{
		"user":    model.AuthUser{ID: authResp.User.ID, Email: authResp.User.Email},
		"message": "Account created successfully",
	})
}

// GetMe returns the currently authenticated user
// GET /api/v1/auth/me
func (h *AuthHandler) GetMe(c *gin.Context) {
	session := sessions.Default(c)

	userRaw, _ := session.Get(middleware.SessionKeyUser).(string)
	if userRaw == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	// Check and refresh tokens if needed
	tokensRaw, _ := session.Get(middleware.SessionKeyTokens).(string)
	if tokensRaw != "" {
		var tokens model.SessionTokens
		if err := json.Unmarshal([]byte(tokensRaw), &tokens); err == nil {
			// Refresh if less than 2 minutes to expiry
			if tokens.ExpiresAt-time.Now().Unix() < 120 && tokens.RefreshToken != "" {
				newAuth, err := h.supabase.RefreshToken(c.Request.Context(), tokens.RefreshToken)
				if err != nil {
					log.Printf("[auth] Token refresh failed: %v", err)
					// Session expired - clear and return 401
					session.Clear()
					_ = session.Save()
					c.JSON(http.StatusUnauthorized, gin.H{"error": "Session expired"})
					return
				}

				// Update session with new tokens
				newTokens := model.SessionTokens{
					AccessToken:  newAuth.AccessToken,
					RefreshToken: newAuth.RefreshToken,
					ExpiresAt:    newAuth.ExpiresAt,
				}
				newTokensJSON, _ := json.Marshal(newTokens)
				session.Set(middleware.SessionKeyTokens, string(newTokensJSON))

				if newAuth.User != nil {
					newUserJSON, _ := json.Marshal(model.AuthUser{ID: newAuth.User.ID, Email: newAuth.User.Email})
					session.Set(middleware.SessionKeyUser, string(newUserJSON))
					userRaw = string(newUserJSON)
				}
				if err := session.Save(); err != nil {
					log.Printf("[auth] Failed to save refreshed session: %v", err)
					c.JSON(http.StatusInternalServerError, gin.H{"error": "Server error"})
					return
				}
			}
		}
	}

	var user model.AuthUser
	if err := json.Unmarshal([]byte(userRaw), &user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse session"})
		return
	}

	log.Printf("[auth] /me success for %s", user.Email)
	c.JSON(http.StatusOK, user)
}

// Logout ends the user session
// POST /api/v1/auth/logout
func (h *AuthHandler) Logout(c *gin.Context) {
	session := sessions.Default(c)

	// Attempt to sign out from Supabase
	tokensRaw, _ := session.Get(middleware.SessionKeyTokens).(string)
	if tokensRaw != "" {
		var tokens model.SessionTokens
		if err := json.Unmarshal([]byte(tokensRaw), &tokens); err == nil && tokens.AccessToken != "" {
			if err := h.supabase.SignOut(c.Request.Context(), tokens.AccessToken); err != nil {
				log.Printf("[auth] Supabase signout failed (proceeding with local logout): %v", err)
			}
		}
	}

	// Clear session
	session.Clear()
	if err := session.Save(); err != nil {
		log.Printf("[auth] Failed to clear session: %v", err)
	}

	log.Printf("[auth] Logout success")
	c.JSON(http.StatusOK, gin.H{"success": true})
}
