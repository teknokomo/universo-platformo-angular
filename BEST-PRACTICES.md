# Best Practices for Angular/Gin Technology Stack

**Date**: 2025-11-18  
**Constitution Version**: v1.0.3  
**Status**: ✅ VALIDATED

## Executive Summary

This document establishes Angular and Go/Gin specific best practices for the Universo Platformo Angular project. These practices ensure optimal implementation within the modular package-based monorepo architecture while leveraging the strengths of Angular (frontend) and Gin (backend) frameworks.

## Table of Contents

1. [Angular Frontend Best Practices](#angular-frontend-best-practices)
2. [Go/Gin Backend Best Practices](#gogin-backend-best-practices)
3. [Frontend-Backend Interaction Patterns](#frontend-backend-interaction-patterns)
4. [Package Structure Guidelines](#package-structure-guidelines)
5. [Shared Infrastructure Patterns](#shared-infrastructure-patterns)
6. [Development Workflow](#development-workflow)

---

## Angular Frontend Best Practices

### 1. Standalone Components (Angular 17+)

**MANDATORY**: All new components MUST be created as standalone components.

```typescript
// ✅ CORRECT: Standalone component
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent {}
```

**Rationale**: Standalone components align with Angular's modern architecture, simplify dependency management, and support the package-first approach by making components naturally modular.

### 2. Module Organization Within Packages

Each frontend package (`{feature}-frt`) MUST follow this structure:

```
packages/{feature}-frt/
├── base/
│   ├── src/
│   │   ├── lib/
│   │   │   ├── components/      # Feature components
│   │   │   ├── services/        # Feature services
│   │   │   ├── models/          # TypeScript interfaces/types
│   │   │   ├── guards/          # Route guards
│   │   │   └── interceptors/    # HTTP interceptors
│   │   ├── index.ts             # Public API (barrel file)
│   │   └── test-setup.ts        # Test configuration
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.lib.json
│   ├── tsconfig.spec.json
│   └── jest.config.ts
├── README.md
└── README-RU.md
```

**Key Principles**:
- **Public API**: Only export what's needed via `index.ts` barrel files
- **Internal implementation**: Keep implementation details in separate files
- **Clear boundaries**: Services, components, and models in separate directories

### 3. Dependency Injection with `inject()`

**PREFERRED**: Use the modern `inject()` function for dependency injection in class fields.

```typescript
// ✅ PREFERRED: Modern inject() function
import { Component, inject } from '@angular/core';
import { MyService } from './services/my.service';

@Component({
  selector: 'app-feature',
  standalone: true,
  template: `...`
})
export class FeatureComponent {
  private myService = inject(MyService);
  
  ngOnInit() {
    this.myService.doSomething();
  }
}
```

```typescript
// ✅ ACCEPTABLE: Constructor injection (for inheritance cases)
import { Component } from '@angular/core';
import { MyService } from './services/my.service';

@Component({
  selector: 'app-feature',
  standalone: true,
  template: `...`
})
export class FeatureComponent {
  constructor(private myService: MyService) {}
}
```

**Rationale**: The `inject()` function is more flexible, supports functional programming patterns, and works better with modern Angular features like signals.

### 4. Reactive State Management with Signals

**RECOMMENDED**: Use Angular Signals for reactive state management within components and services.

```typescript
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <p>Count: {{ count() }}</p>
    <p>Double: {{ double() }}</p>
    <button (click)="increment()">Increment</button>
  `
})
export class CounterComponent {
  // Signal for reactive state
  count = signal(0);
  
  // Computed signal
  double = computed(() => this.count() * 2);
  
  increment() {
    this.count.update(value => value + 1);
  }
}
```

**Rationale**: Signals provide fine-grained reactivity, better performance, and simpler mental model than RxJS for local component state.

### 5. Lazy Loading and Route Configuration

**MANDATORY**: Feature packages MUST support lazy loading.

```typescript
// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'clusters',
    loadComponent: () => import('@universo/clusters-frt').then(m => m.ClustersComponent)
  },
  {
    path: 'metaverses',
    loadChildren: () => import('@universo/metaverses-frt').then(m => m.METAVERSES_ROUTES)
  }
];
```

**Rationale**: Lazy loading reduces initial bundle size and aligns with the package-first architecture by treating each package as independently loadable.

### 6. Angular Material Usage

**MANDATORY**: Use Angular Material for all UI components.

```typescript
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  template: `
    <mat-card>
      <mat-card-content>
        <h2>Dashboard</h2>
        <button mat-raised-button color="primary">Action</button>
      </mat-card-content>
    </mat-card>
  `
})
export class DashboardComponent {}
```

**Rationale**: Angular Material provides consistent, accessible, and well-tested UI components that follow Material Design guidelines.

### 7. Internationalization with ngx-translate

**MANDATORY**: All user-facing text MUST be internationalized.

```typescript
// In service or component
import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-greeting',
  standalone: true,
  imports: [TranslateModule],
  template: `
    <h1>{{ 'GREETING.HELLO' | translate }}</h1>
    <p>{{ 'GREETING.WELCOME' | translate:{name: userName} }}</p>
  `
})
export class GreetingComponent {
  private translate = inject(TranslateService);
  userName = 'John';
  
  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
```

**Translation files structure**:
```
packages/{feature}-frt/base/src/lib/i18n/
├── en.json
└── ru.json
```

**Rationale**: ngx-translate is the standard Angular i18n library, equivalent to react-i18next in the React implementation.

### 8. Testing with Jest

**MANDATORY**: All components and services MUST have unit tests.

```typescript
// feature.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureComponent } from './feature.component';

describe('FeatureComponent', () => {
  let component: FeatureComponent;
  let fixture: ComponentFixture<FeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureComponent]  // Standalone component imported directly
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Feature');
  });
});
```

**Rationale**: Jest provides fast, parallel test execution and is the standard for modern Angular applications.

---

## Go/Gin Backend Best Practices

### 1. Package Structure for Backend Services

Each backend package (`{feature}-srv`) MUST follow this structure:

```
packages/{feature}-srv/
├── base/
│   ├── cmd/
│   │   └── server/
│   │       └── main.go          # Application entrypoint
│   ├── internal/
│   │   ├── handler/             # HTTP handlers (Gin controllers)
│   │   ├── service/             # Business logic
│   │   ├── repository/          # Data access layer
│   │   ├── model/               # Domain models
│   │   ├── middleware/          # Custom middleware
│   │   └── config/              # Configuration
│   ├── api/
│   │   └── openapi.yaml         # API specification
│   ├── go.mod
│   └── go.sum
├── README.md
└── README-RU.md
```

**Key Principles**:
- **`internal/` directory**: Prevents accidental imports from other packages (Go convention)
- **Layered architecture**: Handler → Service → Repository
- **Clear separation**: Each layer has a single responsibility

### 2. Gin Router Setup with Middleware

**MANDATORY**: All services MUST use structured router initialization with middleware.

```go
// cmd/server/main.go
package main

import (
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
    "your-org/universo-platformo-angular/packages/auth-srv/internal/handler"
    "your-org/universo-platformo-angular/packages/auth-srv/internal/middleware"
)

func main() {
    // Create router with default middleware (Logger and Recovery)
    router := gin.Default()
    
    // Configure CORS
    router.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:4200"},
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
    }))
    
    // Apply custom middleware
    router.Use(middleware.ErrorHandler())
    
    // Configure routes
    setupRoutes(router)
    
    // Start server
    router.Run(":8080")
}

func setupRoutes(router *gin.Engine) {
    v1 := router.Group("/api/v1")
    {
        auth := v1.Group("/auth")
        {
            auth.POST("/login", handler.Login)
            auth.POST("/register", handler.Register)
        }
        
        // Protected routes
        protected := v1.Group("/")
        protected.Use(middleware.AuthRequired())
        {
            protected.GET("/profile", handler.GetProfile)
        }
    }
}
```

**Rationale**: Structured initialization ensures consistent middleware application, clear route organization, and maintainable code.

### 3. Handler Pattern (Clean Architecture)

**MANDATORY**: Handlers MUST delegate business logic to services.

```go
// internal/handler/cluster_handler.go
package handler

import (
    "net/http"
    "github.com/gin-gonic/gin"
    "your-org/universo-platformo-angular/packages/clusters-srv/internal/service"
    "your-org/universo-platformo-angular/packages/clusters-srv/internal/model"
)

type ClusterHandler struct {
    clusterService service.ClusterService
}

func NewClusterHandler(clusterService service.ClusterService) *ClusterHandler {
    return &ClusterHandler{clusterService: clusterService}
}

// CreateCluster godoc
// @Summary Create a new cluster
// @Description Create a new cluster with the provided data
// @Tags clusters
// @Accept json
// @Produce json
// @Param cluster body model.CreateClusterRequest true "Cluster data"
// @Success 201 {object} model.Cluster
// @Failure 400 {object} model.ErrorResponse
// @Failure 500 {object} model.ErrorResponse
// @Router /api/v1/clusters [post]
func (h *ClusterHandler) CreateCluster(c *gin.Context) {
    var req model.CreateClusterRequest
    
    // Validate and bind request
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, model.ErrorResponse{
            Message: "Invalid request data",
            Error:   err.Error(),
        })
        return
    }
    
    // Call service layer
    cluster, err := h.clusterService.Create(c.Request.Context(), &req)
    if err != nil {
        c.JSON(http.StatusInternalServerError, model.ErrorResponse{
            Message: "Failed to create cluster",
            Error:   err.Error(),
        })
        return
    }
    
    c.JSON(http.StatusCreated, cluster)
}
```

**Rationale**: Separating handlers from business logic makes code testable, maintainable, and allows business logic reuse across different interfaces (REST, gRPC, etc.).

### 4. Service Layer Pattern

**MANDATORY**: Business logic MUST reside in the service layer.

```go
// internal/service/cluster_service.go
package service

import (
    "context"
    "your-org/universo-platformo-angular/packages/clusters-srv/internal/model"
    "your-org/universo-platformo-angular/packages/clusters-srv/internal/repository"
)

type ClusterService interface {
    Create(ctx context.Context, req *model.CreateClusterRequest) (*model.Cluster, error)
    GetByID(ctx context.Context, id string) (*model.Cluster, error)
    List(ctx context.Context, filter *model.ClusterFilter) ([]*model.Cluster, error)
    Update(ctx context.Context, id string, req *model.UpdateClusterRequest) (*model.Cluster, error)
    Delete(ctx context.Context, id string) error
}

type clusterService struct {
    clusterRepo repository.ClusterRepository
}

func NewClusterService(clusterRepo repository.ClusterRepository) ClusterService {
    return &clusterService{
        clusterRepo: clusterRepo,
    }
}

func (s *clusterService) Create(ctx context.Context, req *model.CreateClusterRequest) (*model.Cluster, error) {
    // Validate business rules
    if err := s.validateClusterName(req.Name); err != nil {
        return nil, err
    }
    
    // Create cluster entity
    cluster := &model.Cluster{
        Name:        req.Name,
        Description: req.Description,
        Status:      model.ClusterStatusActive,
    }
    
    // Persist via repository
    if err := s.clusterRepo.Create(ctx, cluster); err != nil {
        return nil, err
    }
    
    return cluster, nil
}

func (s *clusterService) validateClusterName(name string) error {
    // Business validation logic
    if len(name) < 3 {
        return ErrClusterNameTooShort
    }
    return nil
}
```

**Rationale**: Service layer encapsulates business logic, validates rules, and coordinates between different repositories.

### 5. Repository Pattern (Data Access)

**MANDATORY**: Data access MUST be abstracted in repositories.

```go
// internal/repository/cluster_repository.go
package repository

import (
    "context"
    "github.com/supabase-community/supabase-go"
    "your-org/universo-platformo-angular/packages/clusters-srv/internal/model"
)

type ClusterRepository interface {
    Create(ctx context.Context, cluster *model.Cluster) error
    GetByID(ctx context.Context, id string) (*model.Cluster, error)
    List(ctx context.Context, filter *model.ClusterFilter) ([]*model.Cluster, error)
    Update(ctx context.Context, cluster *model.Cluster) error
    Delete(ctx context.Context, id string) error
}

type supabaseClusterRepository struct {
    client *supabase.Client
}

func NewSupabaseClusterRepository(client *supabase.Client) ClusterRepository {
    return &supabaseClusterRepository{client: client}
}

func (r *supabaseClusterRepository) Create(ctx context.Context, cluster *model.Cluster) error {
    var results []model.Cluster
    err := r.client.DB.From("clusters").
        Insert(cluster).
        Execute(&results)
    
    if err != nil {
        return err
    }
    
    if len(results) > 0 {
        *cluster = results[0]
    }
    
    return nil
}

func (r *supabaseClusterRepository) GetByID(ctx context.Context, id string) (*model.Cluster, error) {
    var results []model.Cluster
    err := r.client.DB.From("clusters").
        Select("*").
        Eq("id", id).
        Execute(&results)
    
    if err != nil {
        return nil, err
    }
    
    if len(results) == 0 {
        return nil, ErrClusterNotFound
    }
    
    return &results[0], nil
}
```

**Rationale**: Repository pattern abstracts data access, making it easy to switch databases (Supabase → PostgreSQL → MySQL) without changing business logic.

### 6. Middleware for Cross-Cutting Concerns

**MANDATORY**: Use middleware for authentication, logging, error handling.

```go
// internal/middleware/auth.go
package middleware

import (
    "net/http"
    "strings"
    "github.com/gin-gonic/gin"
    "your-org/universo-platformo-angular/packages/auth-srv/internal/service"
)

func AuthRequired() gin.HandlerFunc {
    return func(c *gin.Context) {
        // Extract token from Authorization header
        authHeader := c.GetHeader("Authorization")
        if authHeader == "" {
            c.JSON(http.StatusUnauthorized, gin.H{
                "error": "Authorization header required",
            })
            c.Abort()
            return
        }
        
        // Extract Bearer token
        parts := strings.Split(authHeader, " ")
        if len(parts) != 2 || parts[0] != "Bearer" {
            c.JSON(http.StatusUnauthorized, gin.H{
                "error": "Invalid authorization format",
            })
            c.Abort()
            return
        }
        
        token := parts[1]
        
        // Validate token (using auth service)
        claims, err := service.ValidateJWT(token)
        if err != nil {
            c.JSON(http.StatusUnauthorized, gin.H{
                "error": "Invalid or expired token",
            })
            c.Abort()
            return
        }
        
        // Store user info in context
        c.Set("user_id", claims.UserID)
        c.Set("user_email", claims.Email)
        
        c.Next()
    }
}
```

```go
// internal/middleware/error_handler.go
package middleware

import (
    "net/http"
    "github.com/gin-gonic/gin"
)

func ErrorHandler() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Next()
        
        // Check if any errors occurred
        if len(c.Errors) > 0 {
            err := c.Errors.Last().Err
            
            // Return consistent error response
            c.JSON(http.StatusInternalServerError, gin.H{
                "success": false,
                "message": err.Error(),
            })
        }
    }
}
```

**Rationale**: Middleware centralizes cross-cutting concerns, reducing code duplication and ensuring consistent behavior.

### 7. Configuration Management

**MANDATORY**: Use environment-based configuration.

```go
// internal/config/config.go
package config

import (
    "os"
    "strconv"
)

type Config struct {
    Server   ServerConfig
    Database DatabaseConfig
    JWT      JWTConfig
}

type ServerConfig struct {
    Port         string
    Environment  string
    AllowOrigins []string
}

type DatabaseConfig struct {
    SupabaseURL string
    SupabaseKey string
}

type JWTConfig struct {
    Secret     string
    Expiration int // hours
}

func Load() (*Config, error) {
    expiration, _ := strconv.Atoi(getEnv("JWT_EXPIRATION", "24"))
    
    return &Config{
        Server: ServerConfig{
            Port:        getEnv("SERVER_PORT", "8080"),
            Environment: getEnv("ENVIRONMENT", "development"),
            AllowOrigins: []string{
                getEnv("FRONTEND_URL", "http://localhost:4200"),
            },
        },
        Database: DatabaseConfig{
            SupabaseURL: getEnv("SUPABASE_URL", ""),
            SupabaseKey: getEnv("SUPABASE_KEY", ""),
        },
        JWT: JWTConfig{
            Secret:     getEnv("JWT_SECRET", ""),
            Expiration: expiration,
        },
    }, nil
}

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}
```

**Rationale**: Environment-based configuration makes services deployable across different environments without code changes.

### 8. Testing with Go's Testing Package

**MANDATORY**: All services and handlers MUST have unit tests.

```go
// internal/service/cluster_service_test.go
package service

import (
    "context"
    "testing"
    "github.com/stretchr/testify/assert"
    "github.com/stretchr/testify/mock"
    "your-org/universo-platformo-angular/packages/clusters-srv/internal/model"
)

// Mock repository
type MockClusterRepository struct {
    mock.Mock
}

func (m *MockClusterRepository) Create(ctx context.Context, cluster *model.Cluster) error {
    args := m.Called(ctx, cluster)
    return args.Error(0)
}

// Test
func TestClusterService_Create(t *testing.T) {
    // Arrange
    mockRepo := new(MockClusterRepository)
    service := NewClusterService(mockRepo)
    
    req := &model.CreateClusterRequest{
        Name:        "Test Cluster",
        Description: "Test Description",
    }
    
    mockRepo.On("Create", mock.Anything, mock.AnythingOfType("*model.Cluster")).
        Return(nil)
    
    // Act
    cluster, err := service.Create(context.Background(), req)
    
    // Assert
    assert.NoError(t, err)
    assert.NotNil(t, cluster)
    assert.Equal(t, "Test Cluster", cluster.Name)
    mockRepo.AssertExpectations(t)
}

func TestClusterService_Create_ValidationError(t *testing.T) {
    // Arrange
    mockRepo := new(MockClusterRepository)
    service := NewClusterService(mockRepo)
    
    req := &model.CreateClusterRequest{
        Name: "ab", // Too short
    }
    
    // Act
    cluster, err := service.Create(context.Background(), req)
    
    // Assert
    assert.Error(t, err)
    assert.Nil(t, cluster)
    assert.Equal(t, ErrClusterNameTooShort, err)
}
```

**Rationale**: Unit tests with mocks ensure business logic correctness without database dependencies.

---

## Frontend-Backend Interaction Patterns

### 1. RESTful API Communication

**MANDATORY**: All communication MUST follow REST principles.

#### Frontend Service (Angular)

```typescript
// packages/clusters-frt/base/src/lib/services/cluster.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cluster, CreateClusterRequest } from '../models/cluster.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClusterService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/v1/clusters`;

  getClusters(): Observable<Cluster[]> {
    return this.http.get<Cluster[]>(this.apiUrl);
  }

  getCluster(id: string): Observable<Cluster> {
    return this.http.get<Cluster>(`${this.apiUrl}/${id}`);
  }

  createCluster(request: CreateClusterRequest): Observable<Cluster> {
    return this.http.post<Cluster>(this.apiUrl, request);
  }

  updateCluster(id: string, request: Partial<CreateClusterRequest>): Observable<Cluster> {
    return this.http.put<Cluster>(`${this.apiUrl}/${id}`, request);
  }

  deleteCluster(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

### 2. OpenAPI/Swagger Documentation

**MANDATORY**: All backend APIs MUST have OpenAPI documentation.

```yaml
# packages/clusters-srv/api/openapi.yaml
openapi: 3.0.0
info:
  title: Clusters API
  version: 1.0.0
  description: API for managing clusters in Universo Platformo

servers:
  - url: http://localhost:8080/api/v1
    description: Development server

paths:
  /clusters:
    get:
      summary: List all clusters
      tags:
        - Clusters
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Cluster'
    
    post:
      summary: Create a new cluster
      tags:
        - Clusters
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateClusterRequest'
      responses:
        '201':
          description: Cluster created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Cluster'

components:
  schemas:
    Cluster:
      type: object
      properties:
        id:
          type: string
          format: uuid
        name:
          type: string
        description:
          type: string
        status:
          type: string
          enum: [active, inactive]
        created_at:
          type: string
          format: date-time
        updated_at:
          type: string
          format: date-time
    
    CreateClusterRequest:
      type: object
      required:
        - name
      properties:
        name:
          type: string
          minLength: 3
        description:
          type: string
```

**Rationale**: OpenAPI documentation serves as a contract between frontend and backend, enables auto-generation of client code, and provides interactive API testing via Swagger UI.

### 3. Error Handling

**MANDATORY**: Consistent error handling across frontend and backend.

#### Backend Error Response

```go
// internal/model/error.go
package model

type ErrorResponse struct {
    Message string            `json:"message"`
    Error   string            `json:"error,omitempty"`
    Fields  map[string]string `json:"fields,omitempty"`
}
```

#### Frontend Error Interceptor

```typescript
// packages/universo-api-client/base/src/lib/interceptors/error.interceptor.ts
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An error occurred';
      
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = error.error?.message || `Error Code: ${error.status}`;
      }
      
      notificationService.showError(errorMessage);
      return throwError(() => error);
    })
  );
};
```

### 4. Authentication Flow

**MANDATORY**: JWT-based authentication with refresh tokens.

#### Backend JWT Implementation

```go
// internal/service/auth_service.go
package service

import (
    "time"
    "github.com/golang-jwt/jwt/v5"
)

type Claims struct {
    UserID string `json:"user_id"`
    Email  string `json:"email"`
    jwt.RegisteredClaims
}

func GenerateJWT(userID, email, secret string) (string, error) {
    claims := &Claims{
        UserID: userID,
        Email:  email,
        RegisteredClaims: jwt.RegisteredClaims{
            ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
            IssuedAt:  jwt.NewNumericDate(time.Now()),
        },
    }
    
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString([]byte(secret))
}

func ValidateJWT(tokenString, secret string) (*Claims, error) {
    token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
        return []byte(secret), nil
    })
    
    if err != nil {
        return nil, err
    }
    
    if claims, ok := token.Claims.(*Claims); ok && token.Valid {
        return claims, nil
    }
    
    return nil, jwt.ErrInvalidKey
}
```

#### Frontend Auth Interceptor

```typescript
// packages/universo-api-client/base/src/lib/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
```

---

## Package Structure Guidelines

### 1. Shared Infrastructure Packages

**MANDATORY**: Common functionality MUST be in shared packages with `universo-*` prefix.

#### universo-types Package

```typescript
// packages/universo-types/base/src/index.ts

// Common base types
export interface BaseEntity {
  id: string;
  created_at: Date;
  updated_at: Date;
}

// Cluster domain types
export interface Cluster extends BaseEntity {
  name: string;
  description: string;
  status: ClusterStatus;
}

export enum ClusterStatus {
  Active = 'active',
  Inactive = 'inactive'
}

// API types
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
```

#### universo-utils Package

```typescript
// packages/universo-utils/base/src/index.ts

// Date utilities
export class DateUtils {
  static formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
    // Implementation
  }
  
  static parseDate(dateString: string): Date {
    // Implementation
  }
}

// String utilities
export class StringUtils {
  static slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}

// Validation utilities
export class ValidationUtils {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
```

#### universo-api-client Package

```typescript
// packages/universo-api-client/base/src/index.ts

export { authInterceptor } from './lib/interceptors/auth.interceptor';
export { errorInterceptor } from './lib/interceptors/error.interceptor';
export { BaseApiService } from './lib/services/base-api.service';
export { provideApiClient } from './lib/providers/api-client.provider';
```

### 2. Feature Package Structure

**MANDATORY**: Feature packages MUST separate frontend and backend.

#### Feature Frontend Package (clusters-frt)

```
packages/clusters-frt/
├── base/
│   ├── src/
│   │   ├── lib/
│   │   │   ├── components/
│   │   │   │   ├── cluster-list/
│   │   │   │   ├── cluster-detail/
│   │   │   │   └── cluster-form/
│   │   │   ├── services/
│   │   │   │   └── cluster.service.ts
│   │   │   ├── models/
│   │   │   │   └── cluster.model.ts
│   │   │   ├── guards/
│   │   │   │   └── cluster-edit.guard.ts
│   │   │   └── routes.ts
│   │   ├── index.ts
│   │   └── test-setup.ts
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

#### Feature Backend Package (clusters-srv)

```
packages/clusters-srv/
├── base/
│   ├── cmd/
│   │   └── server/
│   │       └── main.go
│   ├── internal/
│   │   ├── handler/
│   │   │   └── cluster_handler.go
│   │   ├── service/
│   │   │   ├── cluster_service.go
│   │   │   └── cluster_service_test.go
│   │   ├── repository/
│   │   │   ├── cluster_repository.go
│   │   │   └── cluster_repository_test.go
│   │   ├── model/
│   │   │   ├── cluster.go
│   │   │   └── error.go
│   │   ├── middleware/
│   │   └── config/
│   │       └── config.go
│   ├── api/
│   │   └── openapi.yaml
│   ├── go.mod
│   └── go.sum
└── README.md
```

### 3. Package README Template

**MANDATORY**: Each package MUST have bilingual README files.

```markdown
# @universo/clusters-frt

Cluster management frontend package for Universo Platformo.

## Overview

This package provides Angular components and services for managing clusters in the Universo platform.

## Features

- Cluster list view with filtering and sorting
- Cluster detail view with full information
- Cluster creation and editing forms
- Integration with clusters-srv backend API

## Installation

```bash
pnpm add @universo/clusters-frt
```

## Usage

```typescript
import { ClustersComponent } from '@universo/clusters-frt';
import { CLUSTERS_ROUTES } from '@universo/clusters-frt';

// In your routes
{
  path: 'clusters',
  loadChildren: () => import('@universo/clusters-frt').then(m => m.CLUSTERS_ROUTES)
}
```

## Dependencies

- @angular/core: ^17.0.0
- @angular/material: ^17.0.0
- @universo/types: workspace:*
- @universo/api-client: workspace:*

## Development

```bash
# Run tests
pnpm test

# Build
pnpm build

# Lint
pnpm lint
```

## API

See [API Documentation](./docs/api.md) for detailed component and service documentation.

## License

[To be specified]
```

---

## Shared Infrastructure Patterns

### 1. Component Library (universo-ng-components)

**RECOMMENDED**: Create reusable UI components.

```typescript
// packages/universo-ng-components/base/src/lib/components/data-table/data-table.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  format?: (value: any) => string;
}

@Component({
  selector: 'universo-data-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<T> {
  @Input() data: T[] = [];
  @Input() columns: TableColumn<T>[] = [];
  @Input() totalItems = 0;
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 25, 50];
  
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() sortChange = new EventEmitter<Sort>();
  @Output() rowClick = new EventEmitter<T>();
  
  get displayedColumns(): string[] {
    return this.columns.map(col => String(col.key));
  }
  
  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }
  
  onSortChange(event: Sort) {
    this.sortChange.emit(event);
  }
  
  onRowClick(row: T) {
    this.rowClick.emit(row);
  }
  
  formatCell(column: TableColumn<T>, value: any): string {
    return column.format ? column.format(value) : String(value);
  }
}
```

### 2. Form Utilities (universo-utils)

```typescript
// packages/universo-utils/base/src/lib/forms/form-validators.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static strongPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const isLongEnough = value.length >= 8;
      
      const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial && isLongEnough;
      
      return valid ? null : { strongPassword: true };
    };
  }
  
  static matchFields(fieldName: string, matchFieldName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const field = control.get(fieldName);
      const matchField = control.get(matchFieldName);
      
      if (!field || !matchField) return null;
      
      if (field.value !== matchField.value) {
        matchField.setErrors({ ...matchField.errors, matchFields: true });
        return { matchFields: true };
      } else {
        if (matchField.hasError('matchFields')) {
          delete matchField.errors?.['matchFields'];
          matchField.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        }
        return null;
      }
    };
  }
}
```

### 3. Backend Middleware Library

```go
// packages/universo-middleware/base/middleware.go
package middleware

import (
    "time"
    "github.com/gin-gonic/gin"
    "github.com/google/uuid"
)

// RequestID adds a unique request ID to each request
func RequestID() gin.HandlerFunc {
    return func(c *gin.Context) {
        requestID := c.GetHeader("X-Request-ID")
        if requestID == "" {
            requestID = uuid.New().String()
        }
        
        c.Set("request_id", requestID)
        c.Header("X-Request-ID", requestID)
        c.Next()
    }
}

// RateLimiter implements basic rate limiting
func RateLimiter(requestsPerMinute int) gin.HandlerFunc {
    // Implementation using token bucket or similar algorithm
    return func(c *gin.Context) {
        // Rate limiting logic
        c.Next()
    }
}

// Timeout adds request timeout
func Timeout(timeout time.Duration) gin.HandlerFunc {
    return func(c *gin.Context) {
        ctx, cancel := context.WithTimeout(c.Request.Context(), timeout)
        defer cancel()
        
        c.Request = c.Request.WithContext(ctx)
        c.Next()
    }
}
```

---

## Development Workflow

### 1. Creating a New Feature Package

**Workflow**:

1. Create package directory structure:
```bash
mkdir -p packages/{feature}-frt/base/src/lib
mkdir -p packages/{feature}-srv/base/cmd/server
mkdir -p packages/{feature}-srv/base/internal/{handler,service,repository,model}
```

2. Initialize package configurations:
```bash
# Frontend
cd packages/{feature}-frt/base
pnpm init

# Backend
cd packages/{feature}-srv/base
go mod init github.com/your-org/universo-platformo-angular/packages/{feature}-srv
```

3. Add to workspace:
```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/**/base'
```

4. Create README files (English and Russian)

### 2. Dependency Management

**Frontend Dependencies**:
```json
// packages/{feature}-frt/base/package.json
{
  "name": "@universo/{feature}-frt",
  "version": "0.1.0",
  "dependencies": {
    "@angular/core": "^17.0.0",
    "@angular/material": "^17.0.0",
    "@universo/types": "workspace:*",
    "@universo/api-client": "workspace:*"
  },
  "devDependencies": {
    "@angular/cli": "^17.0.0",
    "jest": "^29.0.0"
  }
}
```

**Backend Dependencies**:
```go
// packages/{feature}-srv/base/go.mod
module github.com/your-org/universo-platformo-angular/packages/{feature}-srv

go 1.21

require (
    github.com/gin-gonic/gin v1.9.1
    github.com/supabase-community/supabase-go v0.0.1
    github.com/golang-jwt/jwt/v5 v5.0.0
)
```

### 3. Code Generation and Scaffolding

**RECOMMENDED**: Use Angular CLI and custom schematics for consistency.

```bash
# Generate new component
ng generate component cluster-list --project=clusters-frt

# Generate new service
ng generate service cluster --project=clusters-frt

# Generate new guard
ng generate guard cluster-edit --project=clusters-frt
```

### 4. Build and Test Commands

**MANDATORY**: Use consistent build commands across packages.

```bash
# Build all packages
pnpm build

# Build specific frontend package
pnpm --filter @universo/clusters-frt build

# Build specific backend package
cd packages/clusters-srv/base && go build -o bin/server ./cmd/server

# Test all packages
pnpm test

# Test specific frontend package
pnpm --filter @universo/clusters-frt test

# Test specific backend package
cd packages/clusters-srv/base && go test ./...

# Lint
pnpm lint
```

---

## Conclusion

These best practices establish a solid foundation for developing the Universo Platformo Angular project. They ensure:

1. ✅ **Modular Architecture**: Every feature is independently deployable
2. ✅ **Technology Stack Optimization**: Leveraging Angular and Gin strengths
3. ✅ **Code Quality**: Consistent patterns and testability
4. ✅ **Maintainability**: Clear separation of concerns
5. ✅ **Scalability**: Packages can evolve independently
6. ✅ **Future-Proof**: Ready for extraction to separate repositories

All implementations MUST follow these practices to maintain project integrity and enable long-term success.

---

**Document Version**: 1.0  
**Last Updated**: 2025-11-18  
**Constitution Version**: v1.0.3
