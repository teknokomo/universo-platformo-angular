import { Component, inject, signal, output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth.service';

/**
 * LoginFormComponent - Email/password login form
 *
 * Standalone Angular 17+ component for Supabase authentication.
 *
 * @example
 * ```html
 * <up-login-form (loginSuccess)="onLoginSuccess($event)" />
 * ```
 */
@Component({
    selector: 'up-login-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
    ],
    template: `
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="up-login-form">
            <mat-form-field appearance="outline" class="up-login-form__field">
                <mat-label>Email</mat-label>
                <input
                    matInput
                    type="email"
                    formControlName="email"
                    autocomplete="email"
                    placeholder="you@example.com"
                />
                @if (form.get('email')?.invalid && form.get('email')?.touched) {
                    <mat-error>Please enter a valid email address</mat-error>
                }
            </mat-form-field>

            <mat-form-field appearance="outline" class="up-login-form__field">
                <mat-label>Password</mat-label>
                <input
                    matInput
                    type="password"
                    formControlName="password"
                    autocomplete="current-password"
                />
                @if (form.get('password')?.invalid && form.get('password')?.touched) {
                    <mat-error>Password must be at least 6 characters</mat-error>
                }
            </mat-form-field>

            @if (errorMessage()) {
                <div class="up-login-form__error" role="alert">{{ errorMessage() }}</div>
            }

            <button
                mat-raised-button
                color="primary"
                type="submit"
                [disabled]="form.invalid || isLoading()"
                class="up-login-form__submit"
            >
                @if (isLoading()) {
                    <mat-spinner diameter="20" />
                } @else {
                    Sign In
                }
            </button>
        </form>
    `,
    styles: [`
        .up-login-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            width: 100%;
        }

        .up-login-form__field {
            width: 100%;
        }

        .up-login-form__error {
            color: var(--mat-form-field-error-text-color, #f44336);
            font-size: 0.875rem;
            padding: 0.25rem 0;
        }

        .up-login-form__submit {
            width: 100%;
            padding: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
    `],
})
export class LoginFormComponent {
    private authService = inject(AuthService);
    private fb = inject(FormBuilder);

    /** Emits when login is successful */
    readonly loginSuccess = output<{ id: string; email: string }>();

    isLoading = signal(false);
    errorMessage = signal<string | null>(null);

    form = this.fb.group({
        email: ['', [Validators.required, Validators.email, Validators.maxLength(320)]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(1024)]],
    });

    onSubmit(): void {
        if (this.form.invalid) {
            return;
        }

        this.isLoading.set(true);
        this.errorMessage.set(null);

        const { email, password } = this.form.value;

        this.authService.login({ email: email!, password: password! }).subscribe({
            next: (user) => {
                this.isLoading.set(false);
                this.loginSuccess.emit(user);
            },
            error: (err: Error) => {
                this.isLoading.set(false);
                this.errorMessage.set(err.message || 'Login failed. Please try again.');
            },
        });
    }
}
