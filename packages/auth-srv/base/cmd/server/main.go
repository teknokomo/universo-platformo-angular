package main

import (
	"log"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"universo-platformo/auth-srv/internal/config"
	"universo-platformo/auth-srv/internal/handler"
	"universo-platformo/auth-srv/internal/middleware"
	"universo-platformo/auth-srv/internal/service"
)

func main() {
	// Load environment variables from .env file (if present)
	if err := godotenv.Load(); err != nil {
		log.Printf("[server] No .env file found, using environment variables")
	}

	cfg := config.Load()

	if cfg.SupabaseURL == "" || cfg.SupabaseKey == "" {
		log.Fatal("[server] SUPABASE_URL and SUPABASE_ANON_KEY are required")
	}

	// Initialize Supabase service
	supabaseSvc := service.NewSupabaseService(cfg.SupabaseURL, cfg.SupabaseKey)

	// Initialize handlers
	authHandler := handler.NewAuthHandler(supabaseSvc)

	// Setup Gin router
	router := gin.Default()

	// CORS middleware
	router.Use(middleware.CORSMiddleware(cfg))

	// Session middleware (cookie-based sessions)
	store := cookie.NewStore([]byte(cfg.SessionSecret))
	store.Options(sessions.Options{
		Path:     "/",
		MaxAge:   86400 * 7, // 7 days
		HttpOnly: true,
		Secure:   false, // Set to true in production with HTTPS
		SameSite: http.SameSiteLaxMode,
	})
	router.Use(sessions.Sessions(cfg.CookieName, store))

	// CSRF middleware for state-changing routes
	csrfMiddleware := middleware.CSRFMiddleware()

	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	// Auth routes
	auth := router.Group("/api/v1/auth")
	{
		// Public endpoints (no CSRF required for GET)
		auth.GET("/csrf", authHandler.GetCSRF)

		// State-changing endpoints with CSRF protection
		auth.POST("/login", csrfMiddleware, authHandler.Login)
		auth.POST("/register", csrfMiddleware, authHandler.Register)
		auth.POST("/logout", csrfMiddleware, authHandler.Logout)

		// Protected endpoints
		auth.GET("/me", middleware.RequireAuth(), authHandler.GetMe)
	}

	port := cfg.Port
	log.Printf("[server] Auth server starting on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatalf("[server] Failed to start server: %v", err)
	}
}
