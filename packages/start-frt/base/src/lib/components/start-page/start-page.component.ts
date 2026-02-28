import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@universo/auth-frt';
import { GuestStartPageComponent } from '../guest-start-page/guest-start-page.component';
import { AuthenticatedStartPageComponent } from '../authenticated-start-page/authenticated-start-page.component';

/**
 * StartPageComponent - Conditional start page based on authentication status
 *
 * Shows:
 * - GuestStartPage for non-authenticated users (landing with features)
 * - AuthenticatedStartPage for authenticated users (onboarding wizard)
 * - Loading spinner while checking authentication status
 *
 * This is the Angular equivalent of StartPage from universo-platformo-react.
 *
 * @example
 * ```typescript
 * // In your routing module
 * {
 *   path: '',
 *   component: StartPageComponent
 * }
 * ```
 */
@Component({
    selector: 'up-start-page',
    standalone: true,
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        GuestStartPageComponent,
        AuthenticatedStartPageComponent,
    ],
    template: `
        <!-- Loading state while checking authentication -->
        @if (authState()?.loading) {
            <div class="up-start-page__loading">
                <mat-spinner diameter="48" />
            </div>
        }

        <!-- Authenticated: show onboarding wizard -->
        @if (!authState()?.loading && authState()?.isAuthenticated) {
            <up-authenticated-start-page />
        }

        <!-- Guest: show landing page -->
        @if (!authState()?.loading && !authState()?.isAuthenticated) {
            <up-guest-start-page />
        }
    `,
    styles: [`
        .up-start-page__loading {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        }
    `],
})
export class StartPageComponent {
    private authService = inject(AuthService);

    /** Reactive signal from auth state observable */
    authState = toSignal(this.authService.state$);
}
