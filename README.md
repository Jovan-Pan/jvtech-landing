# jvtech-landing

Landing page untuk JVTech — tech company berbasis di Indonesia.

## Tech Stack

- Next.js 16 (Turbopack)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Zustand (state management)
- React Three Fiber (3D graphics)
- Framer Motion (animations)

## Development

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint check
```

## Testing

```bash
npm run test          # Unit tests (Vitest)
npm run test:watch    # Unit tests (watch mode)
npm run test:coverage # Unit tests + coverage report
npm run test:e2e      # E2E tests (Playwright)
```

### Coverage Targets

| Metric     | Target |
|------------|--------|
| Lines      | ≥70%   |
| Statements | ≥70%   |
| Functions  | ≥70%   |
| Branches   | ≥30%   |

## Quality Standards

- Zero ESLint errors/warnings (strict mode)
- Unit tests passing (100%)
- Coverage thresholds enforced via vitest config
- E2E tests across Chrome, Firefox, Safari, Mobile
- Accessibility audit (WCAG 2.1 basics)
- Performance budgets (<5s load, 0 console errors)

## CI/CD

GitHub Actions pipeline runs on every push/PR:
1. Lint (ESLint strict)
2. Unit Tests + Coverage
3. E2E Tests (Playwright + Chromium)
4. Build
5. Quality Gate

## Internationalization

Supported locales: `id` (default), `en`, `zh`
