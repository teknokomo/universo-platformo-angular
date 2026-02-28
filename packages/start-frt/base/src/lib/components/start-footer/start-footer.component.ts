import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * StartFooterComponent - Footer with contact information
 *
 * Used on both guest and authenticated start pages.
 */
@Component({
    selector: 'up-start-footer',
    standalone: true,
    imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
    template: `
        <footer class="up-start-footer">
            <div class="up-start-footer__inner">
                <div class="up-start-footer__links">
                    <a routerLink="/legal/privacy" class="up-start-footer__link">Privacy Policy</a>
                    <span class="up-start-footer__divider">·</span>
                    <a routerLink="/legal/terms" class="up-start-footer__link">Terms of Service</a>
                    <span class="up-start-footer__divider">·</span>
                    <a href="mailto:contact@universo.world" class="up-start-footer__link">Contact</a>
                </div>
                <p class="up-start-footer__copyright">
                    © {{ currentYear }} Universo Platformo. All rights reserved.
                </p>
            </div>
        </footer>
    `,
    styles: [`
        .up-start-footer {
            width: 100%;
            padding: 1.5rem 2rem;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(8px);
        }

        .up-start-footer__inner {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
        }

        .up-start-footer__links {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex-wrap: wrap;
            justify-content: center;
        }

        .up-start-footer__link {
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            font-size: 0.875rem;
            transition: color 0.2s;
        }

        .up-start-footer__link:hover {
            color: white;
        }

        .up-start-footer__divider {
            color: rgba(255, 255, 255, 0.4);
        }

        .up-start-footer__copyright {
            color: rgba(255, 255, 255, 0.5);
            font-size: 0.75rem;
            margin: 0;
        }
    `],
})
export class StartFooterComponent {
    currentYear = new Date().getFullYear();
}
