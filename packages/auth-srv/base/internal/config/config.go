package config

import (
	"os"
)

// Config holds all application configuration
type Config struct {
	Port          string
	SessionSecret string
	SupabaseURL   string
	SupabaseKey   string
	AllowOrigins  string
	SameSite      string
	CookieName    string
	SecureCookie  bool
	DevSameOrigin bool
}

// Load reads configuration from environment variables
func Load() *Config {
	return &Config{
		Port:          getEnv("PORT", "3101"),
		SessionSecret: getEnv("SESSION_SECRET", "change_me_in_production"),
		SupabaseURL:   getEnv("SUPABASE_URL", ""),
		SupabaseKey:   getEnv("SUPABASE_ANON_KEY", ""),
		AllowOrigins:  getEnv("ALLOW_ORIGINS", "http://localhost:4200"),
		SameSite:      getEnv("SAME_SITE", "lax"),
		CookieName:    getEnv("SESSION_COOKIE_NAME", "up.session"),
		SecureCookie:  getEnv("SECURE_COOKIE", "false") == "true",
		DevSameOrigin: getEnv("DEV_SAME_ORIGIN", "false") == "true",
	}
}

func getEnv(key, defaultVal string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return defaultVal
}
