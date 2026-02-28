package service

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"universo-platformo/auth-srv/internal/model"
)

// SupabaseService handles communication with Supabase Auth API
type SupabaseService struct {
	supabaseURL string
	supabaseKey string
	httpClient  *http.Client
}

// NewSupabaseService creates a new SupabaseService
func NewSupabaseService(supabaseURL, supabaseKey string) *SupabaseService {
	return &SupabaseService{
		supabaseURL: supabaseURL,
		supabaseKey: supabaseKey,
		httpClient:  &http.Client{Timeout: 10 * time.Second},
	}
}

// SignIn authenticates a user with email and password
func (s *SupabaseService) SignIn(ctx context.Context, email, password string) (*model.SupabaseAuthResponse, error) {
	payload := map[string]string{
		"email":    email,
		"password": password,
	}
	body, err := json.Marshal(payload)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request: %w", err)
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, s.supabaseURL+"/auth/v1/token?grant_type=password", bytes.NewBuffer(body))
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}
	s.setHeaders(req)

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("request failed: %w", err)
	}
	defer resp.Body.Close()

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		var errResp model.SupabaseErrorResponse
		if jsonErr := json.Unmarshal(respBody, &errResp); jsonErr == nil && errResp.Error != "" {
			return nil, fmt.Errorf("supabase auth error: %s", errResp.Error)
		}
		return nil, fmt.Errorf("supabase returned status %d", resp.StatusCode)
	}

	var authResp model.SupabaseAuthResponse
	if err := json.Unmarshal(respBody, &authResp); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	return &authResp, nil
}

// SignUp registers a new user with email and password
func (s *SupabaseService) SignUp(ctx context.Context, email, password string) (*model.SupabaseAuthResponse, error) {
	payload := map[string]string{
		"email":    email,
		"password": password,
	}
	body, err := json.Marshal(payload)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request: %w", err)
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, s.supabaseURL+"/auth/v1/signup", bytes.NewBuffer(body))
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}
	s.setHeaders(req)

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("request failed: %w", err)
	}
	defer resp.Body.Close()

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response: %w", err)
	}

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		var errResp model.SupabaseErrorResponse
		if jsonErr := json.Unmarshal(respBody, &errResp); jsonErr == nil && errResp.Error != "" {
			return nil, fmt.Errorf("supabase signup error: %s", errResp.Error)
		}
		return nil, fmt.Errorf("supabase returned status %d", resp.StatusCode)
	}

	var authResp model.SupabaseAuthResponse
	if err := json.Unmarshal(respBody, &authResp); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	return &authResp, nil
}

// GetUser retrieves user info using an access token
func (s *SupabaseService) GetUser(ctx context.Context, accessToken string) (*model.SupabaseUser, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, s.supabaseURL+"/auth/v1/user", nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}
	s.setHeaders(req)
	req.Header.Set("Authorization", "Bearer "+accessToken)

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unauthorized: status %d", resp.StatusCode)
	}

	var user model.SupabaseUser
	if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	return &user, nil
}

// RefreshToken refreshes a Supabase session using a refresh token
func (s *SupabaseService) RefreshToken(ctx context.Context, refreshToken string) (*model.SupabaseAuthResponse, error) {
	payload := map[string]string{
		"refresh_token": refreshToken,
	}
	body, err := json.Marshal(payload)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request: %w", err)
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, s.supabaseURL+"/auth/v1/token?grant_type=refresh_token", bytes.NewBuffer(body))
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}
	s.setHeaders(req)

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("refresh failed: status %d", resp.StatusCode)
	}

	var authResp model.SupabaseAuthResponse
	if err := json.NewDecoder(resp.Body).Decode(&authResp); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	return &authResp, nil
}

// SignOut invalidates a Supabase session
func (s *SupabaseService) SignOut(ctx context.Context, accessToken string) error {
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, s.supabaseURL+"/auth/v1/logout", nil)
	if err != nil {
		return fmt.Errorf("failed to create request: %w", err)
	}
	s.setHeaders(req)
	req.Header.Set("Authorization", "Bearer "+accessToken)

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return fmt.Errorf("request failed: %w", err)
	}
	defer resp.Body.Close()

	return nil
}

// setHeaders applies common Supabase API headers
func (s *SupabaseService) setHeaders(req *http.Request) {
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("apikey", s.supabaseKey)
}
