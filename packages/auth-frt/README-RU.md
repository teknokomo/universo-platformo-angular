# auth-frt — Фронтенд аутентификации (Angular)

> **Пакет**: `@universo/auth-frt`  
> **Технология**: Angular 17+ (Standalone Components)  
> **Статус**: Активная разработка

## Обзор

Angular-модуль фронтенда аутентификации с реактивным управлением состоянием через Go/Gin бэкенд с Supabase. Аналог `auth-frontend` из `universo-platformo-react`.

## Ключевые возможности

- **AuthService**: Реактивное состояние с `isAuthenticated$`, `user$`, `loading$`
- **Guards**: `authGuard` и `guestGuard` для защиты маршрутов
- **LoginFormComponent**: Форма входа с валидацией (Material Design)
- **RegisterFormComponent**: Форма регистрации с подтверждением пароля
- **AuthViewComponent**: Полный UI с вкладками вход/регистрация
- **Сессии на cookie**: Безопасная работа с CSRF-защитой

## Использование

```typescript
import { AuthService, authGuard } from '@universo/auth-frt';

// В компоненте
private authService = inject(AuthService);
isLoggedIn$ = this.authService.isAuthenticated$;

// В маршрутах
{ path: 'dashboard', canActivate: [authGuard] }
```

## Лицензия

Омская открытая лицензия
