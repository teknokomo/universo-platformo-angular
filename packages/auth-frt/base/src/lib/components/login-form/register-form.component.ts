import { Component, inject, signal, output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth.service';

/**
 * RegisterFormComponent - Email/password registration form
 *
 * Standalone Angular 17+ component for Supabase user registration.
 *
 * @example
 * ```html
 * <up-register-form (registerSuccess)="onRegisterSuccess()" />
 * ```
 */
@Component({
    selector: 'up-register-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
    ],
    template: `
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="up-register-form">
            <mat-form-field appearance="outline" class="up-register-form__field">
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

            <mat-form-field appearance="outline" class="up-register-form__field">
                <mat-label>Password</mat-label>
                <input
                    matInput
                    type="password"
                    formControlName="password"
                    autocomplete="new-password"
                />
                @if (form.get('password')?.invalid && form.get('password')?.touched) {
                    <mat-error>Password must be at least 6 characters</mat-error>
                }
            </mat-form-field>

            <mat-form-field appearance="outline" class="up-register-form__field">
                <mat-label>Confirm Password</mat-label>
                <input
                    matInput
                    type="password"
                    formControlName="confirmPassword"
                    autocomplete="new-password"
                />
                @if (form.get('confirmPassword')?.invalid && form.get('confirmPassword')?.touched) {
                    <mat-error>Passwords do not match</mat-error>
                }
            </mat-form-field>

            <div class="up-register-form__checkboxes">
                <mat-checkbox formControlName="termsAccepted" color="primary">
                    I accept the Terms of Service
                </mat-checkbox>
                <mat-checkbox formControlName="privacyAccepted" color="primary">
                    I accept the Privacy Policy
                </mat-checkbox>
            </div>

            @if (errorMessage()) {
                <div class="up-register-form__error" role="alert">{{ errorMessage() }}</div>
            }

            @if (successMessage()) {
                <div class="up-register-form__success" role="status">{{ successMessage() }}</div>
            }

            <button
                mat-raised-button
                color="primary"
                type="submit"
                [disabled]="form.invalid || isLoading()"
                class="up-register-form__submit"
            >
                @if (isLoading()) {
                    <mat-spinner diameter="20" />
                } @else {
                    Create Account
                }
            </button>
        </form>
    `,
    styles: [`
        .up-register-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            width: 100%;
        }

        .up-register-form__field {
            width: 100%;
        }

        .up-register-form__checkboxes {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .up-register-form__error {
            color: var(--mat-form-field-error-text-color, #f44336);
            font-size: 0.875rem;
            padding: 0.25rem 0;
        }

        .up-register-form__success {
            color: #4caf50;
            font-size: 0.875rem;
            padding: 0.25rem 0;
        }

        .up-register-form__submit {
            width: 100%;
            padding: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
    `],
})
export class RegisterFormComponent {
    private authService = inject(AuthService);
    private fb = inject(FormBuilder);

    /** Emits when registration is successful */
    readonly registerSuccess = output<void>();

    isLoading = signal(false);
    errorMessage = signal<string | null>(null);
    successMessage = signal<string | null>(null);

    form = this.fb.group(
        {
            email: ['', [Validators.required, Validators.email, Validators.maxLength(320)]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(1024)]],
            confirmPassword: ['', [Validators.required]],
            termsAccepted: [false, [Validators.requiredTrue]],
            privacyAccepted: [false, [Validators.requiredTrue]],
        },
        { validators: this.passwordMatchValidator }
    );

    private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
        const password = group.get('password')?.value;
        const confirm = group.get('confirmPassword')?.value;
        const confirmControl = group.get('confirmPassword');
        if (password && confirm && password !== confirm) {
            confirmControl?.setErrors({ passwordMismatch: true });
            return { passwordMismatch: true };
        }
        // Clear passwordMismatch error when passwords match, preserving other errors
        if (confirmControl?.errors?.['passwordMismatch']) {
            const { passwordMismatch: _, ...remaining } = confirmControl.errors;
            confirmControl.setErrors(Object.keys(remaining).length ? remaining : null);
        }
        return null;
    }

    onSubmit(): void {
        if (this.form.invalid) {
            return;
        }

        this.isLoading.set(true);
        this.errorMessage.set(null);
        this.successMessage.set(null);

        const { email, password, termsAccepted, privacyAccepted } = this.form.value;

        this.authService
            .register({
                email: email!,
                password: password!,
                termsAccepted: termsAccepted!,
                privacyAccepted: privacyAccepted!,
            })
            .subscribe({
                next: (response) => {
                    this.isLoading.set(false);
                    this.successMessage.set(response.message || 'Account created successfully!');
                    this.registerSuccess.emit();
                },
                error: (err: Error) => {
                    this.isLoading.set(false);
                    this.errorMessage.set(err.message || 'Registration failed. Please try again.');
                },
            });
    }
}
