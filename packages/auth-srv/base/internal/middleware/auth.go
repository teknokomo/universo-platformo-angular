package middleware

import (
	"crypto/rand"
	"encoding/hex"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

const (
	// SessionKeyTokens is the session key for Supabase tokens
	SessionKeyTokens = "tokens"
	// SessionKeyUser is the session key for authenticated user
	SessionKeyUser = "user"
	// SessionKeyCSRF is the session key for CSRF token
	SessionKeyCSRF = "csrf_token"
)

// RequireAuth middleware ensures the request has a valid authenticated session
func RequireAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		user := session.Get(SessionKeyUser)
		if user == nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		c.Next()
	}
}

// CSRFMiddleware validates CSRF tokens for state-changing requests
func CSRFMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Only validate on state-changing methods
		method := c.Request.Method
		if method == http.MethodGet || method == http.MethodHead || method == http.MethodOptions {
			c.Next()
			return
		}

		// Get token from header
		headerToken := c.GetHeader("X-CSRF-Token")
		if headerToken == "" {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "CSRF token missing"})
			return
		}

		// Compare with session token
		session := sessions.Default(c)
		sessionToken, ok := session.Get(SessionKeyCSRF).(string)
		if !ok || sessionToken == "" || headerToken != sessionToken {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "Invalid CSRF token"})
			return
		}

		c.Next()
	}
}

// GenerateCSRFToken creates a new random CSRF token
func GenerateCSRFToken() (string, error) {
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return hex.EncodeToString(b), nil
}
