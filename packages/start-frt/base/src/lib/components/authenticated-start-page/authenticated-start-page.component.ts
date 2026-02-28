import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StartFooterComponent } from '../start-footer/start-footer.component';

interface OnboardingItem {
    id: string;
    title: string;
    description?: string;
    selected?: boolean;
}

interface OnboardingData {
    onboardingCompleted: boolean;
    projects?: OnboardingItem[];
    campaigns?: OnboardingItem[];
    clusters?: OnboardingItem[];
}

type WizardStep = 'projects' | 'campaigns' | 'clusters' | 'complete';

/**
 * AuthenticatedStartPageComponent - Onboarding wizard for authenticated users
 *
 * Displays a multi-step wizard to help users select their interests:
 * - Projects (Global Goals)
 * - Campaigns (Personal Interests)
 * - Clusters (Platform Features)
 *
 * If onboarding is already completed, shows a completion screen.
 *
 * This is the Angular equivalent of AuthenticatedStartPage from universo-platformo-react.
 */
@Component({
    selector: 'up-authenticated-start-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatStepperModule,
        MatCheckboxModule,
        StartFooterComponent,
    ],
    template: `
        <div class="up-auth-page">
            <!-- Loading state -->
            @if (isLoading()) {
                <div class="up-auth-page__loading">
                    <mat-spinner diameter="48" />
                    <p>Loading your profile...</p>
                </div>
            }

            <!-- Completed onboarding -->
            @if (!isLoading() && isOnboardingCompleted()) {
                <main class="up-auth-page__main">
                    <div class="up-auth-page__completion">
                        <mat-icon class="up-auth-page__completion-icon">check_circle</mat-icon>
                        <h1 class="up-auth-page__completion-title">Welcome back!</h1>
                        <p class="up-auth-page__completion-subtitle">
                            Your profile is set up. Explore the platform and discover
                            what Universo Platformo has to offer.
                        </p>
                        <div class="up-auth-page__completion-actions">
                            <button
                                mat-raised-button
                                color="primary"
                                routerLink="/dashboard"
                                class="up-auth-page__action-btn"
                            >
                                <mat-icon>dashboard</mat-icon>
                                Go to Dashboard
                            </button>
                            <button
                                mat-stroked-button
                                (click)="resetOnboarding()"
                                class="up-auth-page__action-btn"
                            >
                                <mat-icon>refresh</mat-icon>
                                Update Preferences
                            </button>
                        </div>
                    </div>
                </main>
            }

            <!-- Onboarding wizard -->
            @if (!isLoading() && !isOnboardingCompleted()) {
                <main class="up-auth-page__main">
                    <div class="up-auth-page__wizard">
                        <div class="up-auth-page__wizard-header">
                            <h1 class="up-auth-page__wizard-title">Welcome to Universo Platformo</h1>
                            <p class="up-auth-page__wizard-subtitle">
                                Let's personalize your experience. Select your interests to get started.
                            </p>
                        </div>

                        <mat-stepper
                            [linear]="true"
                            [(selectedIndex)]="activeStep"
                            class="up-auth-page__stepper"
                        >
                            <!-- Step 1: Projects (Global Goals) -->
                            <mat-step label="Global Goals">
                                <div class="up-auth-page__step-content">
                                    <h2 class="up-auth-page__step-title">Choose Your Global Goals</h2>
                                    <p class="up-auth-page__step-desc">
                                        Select projects that align with your vision for the world.
                                    </p>

                                    <div class="up-auth-page__items-grid">
                                        @for (item of projects(); track item.id) {
                                            <div
                                                class="up-auth-page__item-card"
                                                [class.up-auth-page__item-card--selected]="item.selected"
                                                (click)="toggleItem('projects', item)"
                                                role="checkbox"
                                                [attr.aria-checked]="item.selected"
                                                tabindex="0"
                                                (keyup.enter)="toggleItem('projects', item)"
                                                (keyup.space)="toggleItem('projects', item)"
                                            >
                                                <mat-icon>{{ item.selected ? 'check_box' : 'check_box_outline_blank' }}</mat-icon>
                                                <span class="up-auth-page__item-title">{{ item.title }}</span>
                                                @if (item.description) {
                                                    <span class="up-auth-page__item-desc">{{ item.description }}</span>
                                                }
                                            </div>
                                        }
                                    </div>

                                    <div class="up-auth-page__step-actions">
                                        <button
                                            mat-raised-button
                                            color="primary"
                                            matStepperNext
                                        >
                                            Next <mat-icon>arrow_forward</mat-icon>
                                        </button>
                                    </div>
                                </div>
                            </mat-step>

                            <!-- Step 2: Campaigns (Personal Interests) -->
                            <mat-step label="Personal Interests">
                                <div class="up-auth-page__step-content">
                                    <h2 class="up-auth-page__step-title">Your Personal Interests</h2>
                                    <p class="up-auth-page__step-desc">
                                        Choose campaigns that match your passions and goals.
                                    </p>

                                    <div class="up-auth-page__items-grid">
                                        @for (item of campaigns(); track item.id) {
                                            <div
                                                class="up-auth-page__item-card"
                                                [class.up-auth-page__item-card--selected]="item.selected"
                                                (click)="toggleItem('campaigns', item)"
                                                role="checkbox"
                                                [attr.aria-checked]="item.selected"
                                                tabindex="0"
                                                (keyup.enter)="toggleItem('campaigns', item)"
                                                (keyup.space)="toggleItem('campaigns', item)"
                                            >
                                                <mat-icon>{{ item.selected ? 'check_box' : 'check_box_outline_blank' }}</mat-icon>
                                                <span class="up-auth-page__item-title">{{ item.title }}</span>
                                                @if (item.description) {
                                                    <span class="up-auth-page__item-desc">{{ item.description }}</span>
                                                }
                                            </div>
                                        }
                                    </div>

                                    <div class="up-auth-page__step-actions">
                                        <button mat-stroked-button matStepperPrevious>
                                            <mat-icon>arrow_back</mat-icon> Back
                                        </button>
                                        <button mat-raised-button color="primary" matStepperNext>
                                            Next <mat-icon>arrow_forward</mat-icon>
                                        </button>
                                    </div>
                                </div>
                            </mat-step>

                            <!-- Step 3: Clusters (Platform Features) -->
                            <mat-step label="Platform Features">
                                <div class="up-auth-page__step-content">
                                    <h2 class="up-auth-page__step-title">Explore Platform Features</h2>
                                    <p class="up-auth-page__step-desc">
                                        Select the clusters and features you want to use.
                                    </p>

                                    <div class="up-auth-page__items-grid">
                                        @for (item of clusters(); track item.id) {
                                            <div
                                                class="up-auth-page__item-card"
                                                [class.up-auth-page__item-card--selected]="item.selected"
                                                (click)="toggleItem('clusters', item)"
                                                role="checkbox"
                                                [attr.aria-checked]="item.selected"
                                                tabindex="0"
                                                (keyup.enter)="toggleItem('clusters', item)"
                                                (keyup.space)="toggleItem('clusters', item)"
                                            >
                                                <mat-icon>{{ item.selected ? 'check_box' : 'check_box_outline_blank' }}</mat-icon>
                                                <span class="up-auth-page__item-title">{{ item.title }}</span>
                                                @if (item.description) {
                                                    <span class="up-auth-page__item-desc">{{ item.description }}</span>
                                                }
                                            </div>
                                        }
                                    </div>

                                    <div class="up-auth-page__step-actions">
                                        <button mat-stroked-button matStepperPrevious>
                                            <mat-icon>arrow_back</mat-icon> Back
                                        </button>
                                        <button
                                            mat-raised-button
                                            color="primary"
                                            [disabled]="isSaving()"
                                            (click)="completeOnboarding()"
                                        >
                                            @if (isSaving()) {
                                                <mat-spinner diameter="20" />
                                            } @else {
                                                <mat-icon>check</mat-icon> Complete Setup
                                            }
                                        </button>
                                    </div>
                                </div>
                            </mat-step>
                        </mat-stepper>
                    </div>
                </main>
            }

            <!-- Footer -->
            <up-start-footer />
        </div>
    `,
    styles: [`
        .up-auth-page {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background: #f5f7fa;
        }

        .up-auth-page__loading {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            color: #666;
        }

        .up-auth-page__main {
            flex: 1;
            padding: 2rem;
        }

        /* Completion screen */
        .up-auth-page__completion {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
            text-align: center;
            max-width: 600px;
            margin: 0 auto;
        }

        .up-auth-page__completion-icon {
            font-size: 5rem;
            width: 5rem;
            height: 5rem;
            color: #4caf50;
            margin-bottom: 1.5rem;
        }

        .up-auth-page__completion-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin: 0 0 1rem;
            color: #1a1a2e;
        }

        .up-auth-page__completion-subtitle {
            font-size: 1.125rem;
            color: #666;
            margin: 0 0 2rem;
            line-height: 1.6;
        }

        .up-auth-page__completion-actions {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            justify-content: center;
        }

        .up-auth-page__action-btn {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        /* Wizard */
        .up-auth-page__wizard {
            max-width: 900px;
            margin: 0 auto;
            padding-top: 2rem;
        }

        .up-auth-page__wizard-header {
            text-align: center;
            margin-bottom: 2rem;
        }

        .up-auth-page__wizard-title {
            font-size: 2rem;
            font-weight: 700;
            color: #1a1a2e;
            margin: 0 0 0.5rem;
        }

        .up-auth-page__wizard-subtitle {
            font-size: 1rem;
            color: #666;
            margin: 0;
        }

        .up-auth-page__stepper {
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .up-auth-page__step-content {
            padding: 1.5rem 0;
        }

        .up-auth-page__step-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #1a1a2e;
            margin: 0 0 0.5rem;
        }

        .up-auth-page__step-desc {
            color: #666;
            margin: 0 0 1.5rem;
        }

        .up-auth-page__items-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 0.75rem;
            margin-bottom: 1.5rem;
        }

        .up-auth-page__item-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
            background: white;
        }

        .up-auth-page__item-card:hover {
            border-color: #1976d2;
            background: #e3f2fd;
        }

        .up-auth-page__item-card--selected {
            border-color: #1976d2;
            background: #e3f2fd;
        }

        .up-auth-page__item-title {
            font-weight: 500;
            font-size: 0.875rem;
            color: #1a1a2e;
        }

        .up-auth-page__item-desc {
            font-size: 0.75rem;
            color: #666;
        }

        .up-auth-page__step-actions {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            align-items: center;
            padding-top: 0.5rem;
        }
    `],
})
export class AuthenticatedStartPageComponent implements OnInit {
    private http = inject(HttpClient);

    isLoading = signal(true);
    isOnboardingCompleted = signal(false);
    isSaving = signal(false);
    activeStep = 0;

    projects = signal<OnboardingItem[]>([
        { id: 'sdg-climate', title: 'Climate Action', description: 'Fight climate change', selected: false },
        { id: 'sdg-education', title: 'Quality Education', description: 'Universal access to education', selected: false },
        { id: 'sdg-health', title: 'Good Health', description: 'Promote well-being', selected: false },
        { id: 'sdg-peace', title: 'Peace & Justice', description: 'Build peaceful societies', selected: false },
        { id: 'sdg-innovation', title: 'Innovation', description: 'Industry & infrastructure', selected: false },
        { id: 'sdg-equality', title: 'Equality', description: 'Reduced inequalities', selected: false },
    ]);

    campaigns = signal<OnboardingItem[]>([
        { id: 'art', title: 'Art & Creativity', description: 'Express yourself', selected: false },
        { id: 'tech', title: 'Technology', description: 'Build the future', selected: false },
        { id: 'social', title: 'Social Impact', description: 'Make a difference', selected: false },
        { id: 'science', title: 'Science', description: 'Explore and discover', selected: false },
        { id: 'community', title: 'Community', description: 'Grow together', selected: false },
        { id: 'environment', title: 'Environment', description: 'Protect our planet', selected: false },
    ]);

    clusters = signal<OnboardingItem[]>([
        { id: 'metaverse', title: 'Metaverse', description: 'Immersive 3D worlds', selected: false },
        { id: 'creator', title: 'Creator Tools', description: 'Build & publish', selected: false },
        { id: 'collaboration', title: 'Collaboration', description: 'Work together', selected: false },
        { id: 'analytics', title: 'Analytics', description: 'Data insights', selected: false },
        { id: 'marketplace', title: 'Marketplace', description: 'Trade & exchange', selected: false },
        { id: 'learning', title: 'Learning', description: 'Grow your skills', selected: false },
    ]);

    ngOnInit(): void {
        this.checkOnboardingStatus();
    }

    private checkOnboardingStatus(): void {
        this.http
            .get<OnboardingData>('/api/v1/onboarding/items', { withCredentials: true })
            .subscribe({
                next: (data) => {
                    this.isOnboardingCompleted.set(data.onboardingCompleted);
                    this.isLoading.set(false);
                },
                error: (err) => {
                    console.error('[AuthenticatedStartPage] Failed to check onboarding status:', err);
                    // Default to showing wizard on error (intentional UX fallback)
                    this.isOnboardingCompleted.set(false);
                    this.isLoading.set(false);
                },
            });
    }

    toggleItem(signalRef: 'projects' | 'campaigns' | 'clusters', item: OnboardingItem): void {
        const signal = this[signalRef];
        const items = signal();
        const idx = items.findIndex((i) => i.id === item.id);
        if (idx !== -1) {
            const updated = [...items];
            updated[idx] = { ...updated[idx], selected: !updated[idx].selected };
            signal.set(updated);
        }
    }

    completeOnboarding(): void {
        this.isSaving.set(true);

        const selectedProjects = this.projects()
            .filter((i) => i.selected)
            .map((i) => i.id);
        const selectedCampaigns = this.campaigns()
            .filter((i) => i.selected)
            .map((i) => i.id);
        const selectedClusters = this.clusters()
            .filter((i) => i.selected)
            .map((i) => i.id);

        this.http
            .post(
                '/api/v1/onboarding/join',
                { projectIds: selectedProjects, campaignIds: selectedCampaigns, clusterIds: selectedClusters },
                { withCredentials: true }
            )
            .subscribe({
                next: () => {
                    this.isOnboardingCompleted.set(true);
                    this.isSaving.set(false);
                },
                error: (err) => {
                    console.error('[AuthenticatedStartPage] Failed to complete onboarding:', err);
                    this.isSaving.set(false);
                    // Show error but don't silently mark as completed
                    // User can retry by clicking the button again
                },
            });
    }

    resetOnboarding(): void {
        this.isOnboardingCompleted.set(false);
        this.activeStep = 0;
    }
}
