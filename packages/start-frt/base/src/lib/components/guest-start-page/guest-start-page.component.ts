import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StartFooterComponent } from '../start-footer/start-footer.component';

/**
 * GuestStartPageComponent - Landing page for non-authenticated users
 *
 * Displays:
 * - Hero section with title and "Get Started" button (centered)
 * - Testimonials/feature cards section
 * - Footer with contact information
 *
 * This is the Angular equivalent of GuestStartPage from universo-platformo-react.
 */
@Component({
    selector: 'up-guest-start-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        StartFooterComponent,
    ],
    template: `
        <div class="up-guest-page">
            <!-- Background gradient overlay -->
            <div class="up-guest-page__bg-overlay"></div>

            <!-- Hero section - centered vertically -->
            <main class="up-guest-page__hero">
                <div class="up-guest-page__hero-content">
                    <h1 class="up-guest-page__title">
                        Universo Platformo
                    </h1>
                    <p class="up-guest-page__subtitle">
                        A universal platform for creating immersive experiences,
                        connecting communities, and building the metaverse.
                    </p>
                    <div class="up-guest-page__actions">
                        <button
                            mat-raised-button
                            color="primary"
                            class="up-guest-page__cta-btn"
                            (click)="onGetStarted()"
                        >
                            <mat-icon>rocket_launch</mat-icon>
                            Get Started Now
                        </button>
                        <button
                            mat-stroked-button
                            class="up-guest-page__learn-btn"
                            (click)="onLearnMore()"
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </main>

            <!-- Testimonials/Features section -->
            <section class="up-guest-page__features">
                <div class="up-guest-page__features-grid">
                    @for (feature of features; track feature.title) {
                        <div class="up-guest-page__feature-card">
                            <mat-icon class="up-guest-page__feature-icon">{{ feature.icon }}</mat-icon>
                            <h3 class="up-guest-page__feature-title">{{ feature.title }}</h3>
                            <p class="up-guest-page__feature-desc">{{ feature.description }}</p>
                        </div>
                    }
                </div>
            </section>

            <!-- Footer -->
            <up-start-footer />
        </div>
    `,
    styles: [`
        .up-guest-page {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background-image: url('/assets/background-image.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            position: relative;
        }

        .up-guest-page__bg-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 20%), transparent),
                        linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7));
            pointer-events: none;
            z-index: 0;
        }

        .up-guest-page__hero {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 6rem 2rem 4rem;
            position: relative;
            z-index: 1;
        }

        .up-guest-page__hero-content {
            text-align: center;
            max-width: 700px;
        }

        .up-guest-page__title {
            font-size: clamp(2.5rem, 6vw, 4.5rem);
            font-weight: 800;
            color: white;
            margin: 0 0 1.5rem;
            line-height: 1.1;
            text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
        }

        .up-guest-page__subtitle {
            font-size: clamp(1rem, 2vw, 1.25rem);
            color: rgba(255, 255, 255, 0.85);
            margin: 0 0 2.5rem;
            line-height: 1.6;
        }

        .up-guest-page__actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        .up-guest-page__cta-btn {
            padding: 0.75rem 2rem;
            font-size: 1.1rem;
            border-radius: 50px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .up-guest-page__learn-btn {
            padding: 0.75rem 2rem;
            font-size: 1.1rem;
            border-radius: 50px;
            color: white;
            border-color: rgba(255, 255, 255, 0.6);
        }

        .up-guest-page__features {
            flex-shrink: 0;
            padding: 2rem;
            position: relative;
            z-index: 1;
        }

        .up-guest-page__features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .up-guest-page__feature-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 12px;
            padding: 1.5rem;
            text-align: center;
            color: white;
            transition: transform 0.2s, background 0.2s;
        }

        .up-guest-page__feature-card:hover {
            transform: translateY(-4px);
            background: rgba(255, 255, 255, 0.15);
        }

        .up-guest-page__feature-icon {
            font-size: 2.5rem;
            width: 2.5rem;
            height: 2.5rem;
            margin-bottom: 1rem;
            color: #90caf9;
        }

        .up-guest-page__feature-title {
            font-size: 1rem;
            font-weight: 600;
            margin: 0 0 0.5rem;
        }

        .up-guest-page__feature-desc {
            font-size: 0.875rem;
            color: rgba(255, 255, 255, 0.75);
            margin: 0;
            line-height: 1.5;
        }
    `],
})
export class GuestStartPageComponent {
    private router = inject(Router);

    features = [
        {
            icon: 'public',
            title: 'Global Goals',
            description: 'Join projects that make a difference on a global scale.',
        },
        {
            icon: 'interests',
            title: 'Personal Interests',
            description: 'Connect with campaigns aligned to your passions.',
        },
        {
            icon: 'hub',
            title: 'Platform Features',
            description: 'Discover powerful clusters for immersive experiences.',
        },
        {
            icon: 'diversity_3',
            title: 'Community',
            description: 'Build and grow with like-minded creators worldwide.',
        },
    ];

    onGetStarted(): void {
        this.router.navigate(['/auth']);
    }

    onLearnMore(): void {
        // Scroll to features section or navigate to info page
        const featuresEl = document.querySelector('.up-guest-page__features');
        featuresEl?.scrollIntoView({ behavior: 'smooth' });
    }
}
