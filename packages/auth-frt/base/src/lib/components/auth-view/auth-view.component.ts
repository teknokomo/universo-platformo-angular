import { Component, Input, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { LoginFormComponent } from '../login-form/login-form.component';
import { RegisterFormComponent } from '../login-form/register-form.component';
import type { AuthUser } from '../../models/auth.models';

export type AuthViewMode = 'login' | 'register';

/**
 * AuthViewComponent - Full authentication view with login/register tabs
 *
 * Standalone Angular 17+ component that provides a complete auth UI
 * with tab-based navigation between login and registration forms.
 *
 * @example
 * ```html
 * <up-auth-view (authenticated)="onAuthenticated($event)" />
 * ```
 */
@Component({
    selector: 'up-auth-view',
    standalone: true,
    imports: [
        CommonModule,
        MatTabsModule,
        MatCardModule,
        LoginFormComponent,
        RegisterFormComponent,
    ],
    template: `
        <div class="up-auth-view">
            <mat-card class="up-auth-view__card">
                <mat-card-header class="up-auth-view__header">
                    <mat-card-title class="up-auth-view__title">
                        {{ title }}
                    </mat-card-title>
                    @if (subtitle) {
                        <mat-card-subtitle>{{ subtitle }}</mat-card-subtitle>
                    }
                </mat-card-header>

                <mat-card-content class="up-auth-view__content">
                    <mat-tab-group
                        [(selectedIndex)]="activeTabIndex"
                        animationDuration="200ms"
                        class="up-auth-view__tabs"
                    >
                        <mat-tab label="Sign In">
                            <div class="up-auth-view__tab-content">
                                <up-login-form (loginSuccess)="onLoginSuccess($event)" />
                            </div>
                        </mat-tab>

                        @if (showRegister) {
                            <mat-tab label="Create Account">
                                <div class="up-auth-view__tab-content">
                                    <up-register-form (registerSuccess)="onRegisterSuccess()" />
                                </div>
                            </mat-tab>
                        }
                    </mat-tab-group>
                </mat-card-content>
            </mat-card>
        </div>
    `,
    styles: [`
        .up-auth-view {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .up-auth-view__card {
            width: 100%;
            max-width: 440px;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .up-auth-view__header {
            padding: 2rem 2rem 1rem;
        }

        .up-auth-view__title {
            font-size: 1.75rem;
            font-weight: 700;
            margin: 0;
        }

        .up-auth-view__content {
            padding: 0 1rem 1rem;
        }

        .up-auth-view__tabs {
            width: 100%;
        }

        .up-auth-view__tab-content {
            padding: 1.5rem 0.5rem;
        }
    `],
})
export class AuthViewComponent {
    /** Page title */
    @Input() title = 'Universo Platformo';

    /** Optional subtitle */
    @Input() subtitle = '';

    /** Whether to show the registration tab */
    @Input() showRegister = true;

    /** Initial active tab (0 = login, 1 = register) */
    @Input() set initialMode(mode: AuthViewMode) {
        this.activeTabIndex = mode === 'register' ? 1 : 0;
    }

    /** Emits when user successfully authenticates */
    readonly authenticated = output<AuthUser>();

    /** Emits when registration is completed */
    readonly registered = output<void>();

    activeTabIndex = 0;

    onLoginSuccess(user: AuthUser): void {
        this.authenticated.emit(user);
    }

    onRegisterSuccess(): void {
        // Switch to login tab after successful registration
        this.activeTabIndex = 0;
        this.registered.emit();
    }
}
