# Лучшие практики для технологического стека Angular/Gin

**Дата**: 2025-11-18  
**Версия конституции**: v1.0.3  
**Статус**: ✅ ПРОВЕРЕНО

## Краткое резюме

Данный документ устанавливает лучшие практики для Angular и Go/Gin, специфичные для проекта Universo Platformo Angular. Эти практики обеспечивают оптимальную реализацию в рамках модульной архитектуры монорепозитория на основе пакетов, используя преимущества фреймворков Angular (фронтенд) и Gin (бэкенд).

## Содержание

1. [Лучшие практики Angular Frontend](#лучшие-практики-angular-frontend)
2. [Лучшие практики Go/Gin Backend](#лучшие-практики-gogin-backend)
3. [Паттерны взаимодействия Frontend-Backend](#паттерны-взаимодействия-frontend-backend)
4. [Руководство по структуре пакетов](#руководство-по-структуре-пакетов)
5. [Паттерны общей инфраструктуры](#паттерны-общей-инфраструктуры)
6. [Рабочий процесс разработки](#рабочий-процесс-разработки)

---

## Лучшие практики Angular Frontend

### 1. Standalone компоненты (Angular 17+)

**ОБЯЗАТЕЛЬНО**: Все новые компоненты ДОЛЖНЫ создаваться как standalone компоненты.

```typescript
// ✅ ПРАВИЛЬНО: Standalone компонент
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

**Обоснование**: Standalone компоненты соответствуют современной архитектуре Angular, упрощают управление зависимостями и поддерживают подход «пакет-первым», делая компоненты естественно модульными.

### 2. Организация модулей внутри пакетов

Каждый frontend пакет (`{feature}-frt`) ДОЛЖЕН следовать этой структуре:

```
packages/{feature}-frt/
├── base/
│   ├── src/
│   │   ├── lib/
│   │   │   ├── components/      # Компоненты функции
│   │   │   ├── services/        # Сервисы функции
│   │   │   ├── models/          # TypeScript интерфейсы/типы
│   │   │   ├── guards/          # Защитники маршрутов
│   │   │   └── interceptors/    # HTTP перехватчики
│   │   ├── index.ts             # Публичный API (barrel файл)
│   │   └── test-setup.ts        # Конфигурация тестов
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.lib.json
│   ├── tsconfig.spec.json
│   └── jest.config.ts
├── README.md
└── README-RU.md
```

**Ключевые принципы**:
- **Публичный API**: Экспортируйте только необходимое через barrel файлы `index.ts`
- **Внутренняя реализация**: Храните детали реализации в отдельных файлах
- **Четкие границы**: Сервисы, компоненты и модели в отдельных директориях

### 3. Внедрение зависимостей с `inject()`

**ПРЕДПОЧТИТЕЛЬНО**: Используйте современную функцию `inject()` для внедрения зависимостей в поля класса.

```typescript
// ✅ ПРЕДПОЧТИТЕЛЬНО: Современная функция inject()
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
// ✅ ДОПУСТИМО: Внедрение через конструктор (для случаев наследования)
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

**Обоснование**: Функция `inject()` более гибкая, поддерживает паттерны функционального программирования и лучше работает с современными функциями Angular, такими как signals.

### 4. Реактивное управление состоянием с Signals

**РЕКОМЕНДОВАНО**: Используйте Angular Signals для реактивного управления состоянием внутри компонентов и сервисов.

```typescript
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <p>Счетчик: {{ count() }}</p>
    <p>Удвоенное: {{ double() }}</p>
    <button (click)="increment()">Увеличить</button>
  `
})
export class CounterComponent {
  // Signal для реактивного состояния
  count = signal(0);
  
  // Вычисляемый signal
  double = computed(() => this.count() * 2);
  
  increment() {
    this.count.update(value => value + 1);
  }
}
```

**Обоснование**: Signals обеспечивают детальную реактивность, лучшую производительность и более простую ментальную модель, чем RxJS для локального состояния компонента.

### 5. Ленивая загрузка и конфигурация маршрутов

**ОБЯЗАТЕЛЬНО**: Пакеты функций ДОЛЖНЫ поддерживать ленивую загрузку.

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

**Обоснование**: Ленивая загрузка уменьшает размер начального бандла и соответствует архитектуре «пакет-первым», рассматривая каждый пакет как независимо загружаемый.

### 6. Использование Angular Material

**ОБЯЗАТЕЛЬНО**: Используйте Angular Material для всех UI компонентов.

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
        <h2>Панель управления</h2>
        <button mat-raised-button color="primary">Действие</button>
      </mat-card-content>
    </mat-card>
  `
})
export class DashboardComponent {}
```

**Обоснование**: Angular Material предоставляет согласованные, доступные и хорошо протестированные UI компоненты, следующие рекомендациям Material Design.

### 7. Интернационализация с ngx-translate

**ОБЯЗАТЕЛЬНО**: Весь пользовательский текст ДОЛЖЕН быть интернационализирован.

```typescript
// В сервисе или компоненте
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
  userName = 'Иван';
  
  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
```

**Структура файлов переводов**:
```
packages/{feature}-frt/base/src/lib/i18n/
├── en.json
└── ru.json
```

**Обоснование**: ngx-translate является стандартной библиотекой Angular i18n, эквивалентной react-i18next в реализации React.

### 8. Тестирование с Jest

**ОБЯЗАТЕЛЬНО**: Все компоненты и сервисы ДОЛЖНЫ иметь unit тесты.

```typescript
// feature.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureComponent } from './feature.component';

describe('FeatureComponent', () => {
  let component: FeatureComponent;
  let fixture: ComponentFixture<FeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureComponent]  // Standalone компонент импортируется напрямую
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('должен создаться', () => {
    expect(component).toBeTruthy();
  });

  it('должен отобразить заголовок', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Функция');
  });
});
```

**Обоснование**: Jest обеспечивает быстрое параллельное выполнение тестов и является стандартом для современных приложений Angular.

---

## Лучшие практики Go/Gin Backend

### 1. Структура пакета для Backend сервисов

Каждый backend пакет (`{feature}-srv`) ДОЛЖЕН следовать этой структуре:

```
packages/{feature}-srv/
├── base/
│   ├── cmd/
│   │   └── server/
│   │       └── main.go          # Точка входа приложения
│   ├── internal/
│   │   ├── handler/             # HTTP обработчики (Gin контроллеры)
│   │   ├── service/             # Бизнес-логика
│   │   ├── repository/          # Уровень доступа к данным
│   │   ├── model/               # Модели домена
│   │   ├── middleware/          # Пользовательские middleware
│   │   └── config/              # Конфигурация
│   ├── api/
│   │   └── openapi.yaml         # Спецификация API
│   ├── go.mod
│   └── go.sum
├── README.md
└── README-RU.md
```

**Ключевые принципы**:
- **Директория `internal/`**: Предотвращает случайный импорт из других пакетов (соглашение Go)
- **Многоуровневая архитектура**: Handler → Service → Repository
- **Четкое разделение**: Каждый уровень имеет одну ответственность

### 2. Настройка Gin Router с Middleware

**ОБЯЗАТЕЛЬНО**: Все сервисы ДОЛЖНЫ использовать структурированную инициализацию router с middleware.

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
    // Создание router с middleware по умолчанию (Logger и Recovery)
    router := gin.Default()
    
    // Настройка CORS
    router.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:4200"},
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
    }))
    
    // Применение пользовательских middleware
    router.Use(middleware.ErrorHandler())
    
    // Настройка маршрутов
    setupRoutes(router)
    
    // Запуск сервера
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
        
        // Защищенные маршруты
        protected := v1.Group("/")
        protected.Use(middleware.AuthRequired())
        {
            protected.GET("/profile", handler.GetProfile)
        }
    }
}
```

**Обоснование**: Структурированная инициализация обеспечивает согласованное применение middleware, четкую организацию маршрутов и поддерживаемый код.

### 3. Паттерн Handler (Чистая архитектура)

**ОБЯЗАТЕЛЬНО**: Handlers ДОЛЖНЫ делегировать бизнес-логику сервисам.

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
// @Summary Создать новый кластер
// @Description Создать новый кластер с предоставленными данными
// @Tags clusters
// @Accept json
// @Produce json
// @Param cluster body model.CreateClusterRequest true "Данные кластера"
// @Success 201 {object} model.Cluster
// @Failure 400 {object} model.ErrorResponse
// @Failure 500 {object} model.ErrorResponse
// @Router /api/v1/clusters [post]
func (h *ClusterHandler) CreateCluster(c *gin.Context) {
    var req model.CreateClusterRequest
    
    // Валидация и привязка запроса
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, model.ErrorResponse{
            Message: "Неверные данные запроса",
            Error:   err.Error(),
        })
        return
    }
    
    // Вызов уровня сервиса
    cluster, err := h.clusterService.Create(c.Request.Context(), &req)
    if err != nil {
        c.JSON(http.StatusInternalServerError, model.ErrorResponse{
            Message: "Не удалось создать кластер",
            Error:   err.Error(),
        })
        return
    }
    
    c.JSON(http.StatusCreated, cluster)
}
```

**Обоснование**: Разделение handlers и бизнес-логики делает код тестируемым, поддерживаемым и позволяет повторно использовать бизнес-логику в разных интерфейсах (REST, gRPC и т.д.).

### 4. Паттерн уровня Service

**ОБЯЗАТЕЛЬНО**: Бизнес-логика ДОЛЖНА находиться в уровне сервиса.

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
    // Валидация бизнес-правил
    if err := s.validateClusterName(req.Name); err != nil {
        return nil, err
    }
    
    // Создание сущности кластера
    cluster := &model.Cluster{
        Name:        req.Name,
        Description: req.Description,
        Status:      model.ClusterStatusActive,
    }
    
    // Сохранение через repository
    if err := s.clusterRepo.Create(ctx, cluster); err != nil {
        return nil, err
    }
    
    return cluster, nil
}

func (s *clusterService) validateClusterName(name string) error {
    // Логика бизнес-валидации
    if len(name) < 3 {
        return ErrClusterNameTooShort
    }
    return nil
}
```

**Обоснование**: Уровень сервиса инкапсулирует бизнес-логику, валидирует правила и координирует работу между различными репозиториями.

### 5. Паттерн Repository (Доступ к данным)

**ОБЯЗАТЕЛЬНО**: Доступ к данным ДОЛЖЕН быть абстрагирован в repositories.

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

**Обоснование**: Паттерн repository абстрагирует доступ к данным, упрощая замену баз данных (Supabase → PostgreSQL → MySQL) без изменения бизнес-логики.

### 6. Middleware для сквозных задач

**ОБЯЗАТЕЛЬНО**: Используйте middleware для аутентификации, логирования, обработки ошибок.

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
        // Извлечение токена из заголовка Authorization
        authHeader := c.GetHeader("Authorization")
        if authHeader == "" {
            c.JSON(http.StatusUnauthorized, gin.H{
                "error": "Требуется заголовок Authorization",
            })
            c.Abort()
            return
        }
        
        // Извлечение Bearer токена
        parts := strings.Split(authHeader, " ")
        if len(parts) != 2 || parts[0] != "Bearer" {
            c.JSON(http.StatusUnauthorized, gin.H{
                "error": "Неверный формат authorization",
            })
            c.Abort()
            return
        }
        
        token := parts[1]
        
        // Валидация токена (используя auth сервис)
        claims, err := service.ValidateJWT(token)
        if err != nil {
            c.JSON(http.StatusUnauthorized, gin.H{
                "error": "Неверный или истекший токен",
            })
            c.Abort()
            return
        }
        
        // Сохранение информации о пользователе в контексте
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
        
        // Проверка наличия ошибок
        if len(c.Errors) > 0 {
            err := c.Errors.Last().Err
            
            // Возврат согласованного ответа об ошибке
            c.JSON(http.StatusInternalServerError, gin.H{
                "success": false,
                "message": err.Error(),
            })
        }
    }
}
```

**Обоснование**: Middleware централизует сквозные задачи, уменьшая дублирование кода и обеспечивая согласованное поведение.

### 7. Управление конфигурацией

**ОБЯЗАТЕЛЬНО**: Используйте конфигурацию на основе переменных окружения.

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
    Expiration int // часы
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

**Обоснование**: Конфигурация на основе переменных окружения делает сервисы развертываемыми в разных окружениях без изменения кода.

### 8. Тестирование с пакетом Go Testing

**ОБЯЗАТЕЛЬНО**: Все сервисы и handlers ДОЛЖНЫ иметь unit тесты.

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

// Тест
func TestClusterService_Create(t *testing.T) {
    // Arrange
    mockRepo := new(MockClusterRepository)
    service := NewClusterService(mockRepo)
    
    req := &model.CreateClusterRequest{
        Name:        "Тестовый кластер",
        Description: "Тестовое описание",
    }
    
    mockRepo.On("Create", mock.Anything, mock.AnythingOfType("*model.Cluster")).
        Return(nil)
    
    // Act
    cluster, err := service.Create(context.Background(), req)
    
    // Assert
    assert.NoError(t, err)
    assert.NotNil(t, cluster)
    assert.Equal(t, "Тестовый кластер", cluster.Name)
    mockRepo.AssertExpectations(t)
}

func TestClusterService_Create_ValidationError(t *testing.T) {
    // Arrange
    mockRepo := new(MockClusterRepository)
    service := NewClusterService(mockRepo)
    
    req := &model.CreateClusterRequest{
        Name: "ab", // Слишком короткое
    }
    
    // Act
    cluster, err := service.Create(context.Background(), req)
    
    // Assert
    assert.Error(t, err)
    assert.Nil(t, cluster)
    assert.Equal(t, ErrClusterNameTooShort, err)
}
```

**Обоснование**: Unit тесты с mocks обеспечивают корректность бизнес-логики без зависимостей от базы данных.

---

## Паттерны взаимодействия Frontend-Backend

### 1. RESTful API коммуникация

**ОБЯЗАТЕЛЬНО**: Вся коммуникация ДОЛЖНА следовать принципам REST.

#### Frontend сервис (Angular)

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

### 2. Документация OpenAPI/Swagger

**ОБЯЗАТЕЛЬНО**: Все backend API ДОЛЖНЫ иметь документацию OpenAPI.

```yaml
# packages/clusters-srv/api/openapi.yaml
openapi: 3.0.0
info:
  title: Clusters API
  version: 1.0.0
  description: API для управления кластерами в Universo Platformo

servers:
  - url: http://localhost:8080/api/v1
    description: Сервер разработки

paths:
  /clusters:
    get:
      summary: Список всех кластеров
      tags:
        - Clusters
      responses:
        '200':
          description: Успешный ответ
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Cluster'
    
    post:
      summary: Создать новый кластер
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
          description: Кластер создан
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

**Обоснование**: Документация OpenAPI служит контрактом между фронтендом и бэкендом, позволяет автоматически генерировать клиентский код и обеспечивает интерактивное тестирование API через Swagger UI.

### 3. Обработка ошибок

**ОБЯЗАТЕЛЬНО**: Согласованная обработка ошибок в frontend и backend.

#### Ответ об ошибке Backend

```go
// internal/model/error.go
package model

type ErrorResponse struct {
    Message string            `json:"message"`
    Error   string            `json:"error,omitempty"`
    Fields  map[string]string `json:"fields,omitempty"`
}
```

#### Frontend перехватчик ошибок

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
      let errorMessage = 'Произошла ошибка';
      
      if (error.error instanceof ErrorEvent) {
        // Ошибка на стороне клиента
        errorMessage = `Ошибка: ${error.error.message}`;
      } else {
        // Ошибка на стороне сервера
        errorMessage = error.error?.message || `Код ошибки: ${error.status}`;
      }
      
      notificationService.showError(errorMessage);
      return throwError(() => error);
    })
  );
};
```

### 4. Поток аутентификации

**ОБЯЗАТЕЛЬНО**: Аутентификация на основе JWT с refresh tokens.

#### Backend реализация JWT

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

#### Frontend Auth перехватчик

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

## Руководство по структуре пакетов

### 1. Пакеты общей инфраструктуры

**ОБЯЗАТЕЛЬНО**: Общая функциональность ДОЛЖНА быть в общих пакетах с префиксом `universo-*`.

#### Пакет universo-types

```typescript
// packages/universo-types/base/src/index.ts

// Общие базовые типы
export interface BaseEntity {
  id: string;
  created_at: Date;
  updated_at: Date;
}

// Типы домена кластера
export interface Cluster extends BaseEntity {
  name: string;
  description: string;
  status: ClusterStatus;
}

export enum ClusterStatus {
  Active = 'active',
  Inactive = 'inactive'
}

// Типы API
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

#### Пакет universo-utils

```typescript
// packages/universo-utils/base/src/index.ts

// Утилиты для дат
export class DateUtils {
  static formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
    // Реализация
  }
  
  static parseDate(dateString: string): Date {
    // Реализация
  }
}

// Утилиты для строк
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

// Утилиты валидации
export class ValidationUtils {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
```

#### Пакет universo-api-client

```typescript
// packages/universo-api-client/base/src/index.ts

export { authInterceptor } from './lib/interceptors/auth.interceptor';
export { errorInterceptor } from './lib/interceptors/error.interceptor';
export { BaseApiService } from './lib/services/base-api.service';
export { provideApiClient } from './lib/providers/api-client.provider';
```

### 2. Структура пакета функции

**ОБЯЗАТЕЛЬНО**: Пакеты функций ДОЛЖНЫ разделять frontend и backend.

#### Пакет Frontend функции (clusters-frt)

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

#### Пакет Backend функции (clusters-srv)

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

### 3. Шаблон README пакета

**ОБЯЗАТЕЛЬНО**: Каждый пакет ДОЛЖЕН иметь двуязычные README файлы.

```markdown
# @universo/clusters-frt

Пакет frontend управления кластерами для Universo Platformo.

## Обзор

Этот пакет предоставляет Angular компоненты и сервисы для управления кластерами на платформе Universo.

## Возможности

- Представление списка кластеров с фильтрацией и сортировкой
- Детальное представление кластера с полной информацией
- Формы создания и редактирования кластеров
- Интеграция с backend API clusters-srv

## Установка

```bash
pnpm add @universo/clusters-frt
```

## Использование

```typescript
import { ClustersComponent } from '@universo/clusters-frt';
import { CLUSTERS_ROUTES } from '@universo/clusters-frt';

// В ваших маршрутах
{
  path: 'clusters',
  loadChildren: () => import('@universo/clusters-frt').then(m => m.CLUSTERS_ROUTES)
}
```

## Зависимости

- @angular/core: ^17.0.0
- @angular/material: ^17.0.0
- @universo/types: workspace:*
- @universo/api-client: workspace:*

## Разработка

```bash
# Запустить тесты
pnpm test

# Собрать
pnpm build

# Линтинг
pnpm lint
```

## API

См. [Документацию API](./docs/api.md) для подробной документации компонентов и сервисов.

## Лицензия

[Будет указана]
```

---

## Паттерны общей инфраструктуры

### 1. Библиотека компонентов (universo-ng-components)

**РЕКОМЕНДОВАНО**: Создавайте переиспользуемые UI компоненты.

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

### 2. Утилиты форм (universo-utils)

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

### 3. Библиотека Backend Middleware

```go
// packages/universo-middleware/base/middleware.go
package middleware

import (
    "time"
    "github.com/gin-gonic/gin"
    "github.com/google/uuid"
)

// RequestID добавляет уникальный ID запроса к каждому запросу
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

// RateLimiter реализует базовое ограничение скорости
func RateLimiter(requestsPerMinute int) gin.HandlerFunc {
    // Реализация с использованием token bucket или аналогичного алгоритма
    return func(c *gin.Context) {
        // Логика ограничения скорости
        c.Next()
    }
}

// Timeout добавляет таймаут запроса
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

## Рабочий процесс разработки

### 1. Создание нового пакета функции

**Рабочий процесс**:

1. Создание структуры директорий пакета:
```bash
mkdir -p packages/{feature}-frt/base/src/lib
mkdir -p packages/{feature}-srv/base/cmd/server
mkdir -p packages/{feature}-srv/base/internal/{handler,service,repository,model}
```

2. Инициализация конфигураций пакета:
```bash
# Frontend
cd packages/{feature}-frt/base
pnpm init

# Backend
cd packages/{feature}-srv/base
go mod init github.com/your-org/universo-platformo-angular/packages/{feature}-srv
```

3. Добавление в workspace:
```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/**/base'
```

4. Создание README файлов (английский и русский)

### 2. Управление зависимостями

**Frontend зависимости**:
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

**Backend зависимости**:
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

### 3. Генерация кода и скаффолдинг

**РЕКОМЕНДОВАНО**: Используйте Angular CLI и пользовательские схематики для согласованности.

```bash
# Генерация нового компонента
ng generate component cluster-list --project=clusters-frt

# Генерация нового сервиса
ng generate service cluster --project=clusters-frt

# Генерация нового guard
ng generate guard cluster-edit --project=clusters-frt
```

### 4. Команды сборки и тестирования

**ОБЯЗАТЕЛЬНО**: Используйте согласованные команды сборки во всех пакетах.

```bash
# Сборка всех пакетов
pnpm build

# Сборка конкретного frontend пакета
pnpm --filter @universo/clusters-frt build

# Сборка конкретного backend пакета
cd packages/clusters-srv/base && go build -o bin/server ./cmd/server

# Тестирование всех пакетов
pnpm test

# Тестирование конкретного frontend пакета
pnpm --filter @universo/clusters-frt test

# Тестирование конкретного backend пакета
cd packages/clusters-srv/base && go test ./...

# Линтинг
pnpm lint
```

---

## Заключение

Эти лучшие практики устанавливают прочную основу для разработки проекта Universo Platformo Angular. Они обеспечивают:

1. ✅ **Модульная архитектура**: Каждая функция развертывается независимо
2. ✅ **Оптимизация технологического стека**: Использование преимуществ Angular и Gin
3. ✅ **Качество кода**: Согласованные паттерны и тестируемость
4. ✅ **Поддерживаемость**: Четкое разделение обязанностей
5. ✅ **Масштабируемость**: Пакеты могут развиваться независимо
6. ✅ **Готовность к будущему**: Готовность к извлечению в отдельные репозитории

Все реализации ДОЛЖНЫ следовать этим практикам для поддержания целостности проекта и обеспечения долгосрочного успеха.

---

**Версия документа**: 1.0  
**Последнее обновление**: 2025-11-18  
**Версия конституции**: v1.0.3
