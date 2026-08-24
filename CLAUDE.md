# Robert Ross Recording

Static portfolio site. React 19 + TypeScript, built by Vite 6, styled with
CSS Modules, deployed to GitHub Pages. No backend, no data fetching, no CMS.

Full spec: `IMPLEMENTATION_PLAN.md`. Read only the sections your task names —
it is long and the sections are independent.

## Hard requirements

- Never hardcode a colour. Import from `src/theme.ts`.
- Never hardcode a name, email, Instagram handle or URL. Import from
  `src/data/site.ts`.
- Content comes from `src/data/*.ts`, imported at build time.
- Images resolve via `image(folder, slug)` and may return `undefined`. That is
  a normal state: render the diagonal-stripe placeholder, never a broken
  `<img>`. The site must look intentional with zero image files present.
- Filtering uses `matchesFilter()` from `src/data/taxonomy.ts`. Do not
  reimplement it — the semantics are AND across groups, not OR.
- Mobile-first CSS. Breakpoints 768px and 1200px.
- Every hover behaviour needs a touch equivalent.
- Everything is square-cornered EXCEPT filter pills, CTA buttons and form
  fields, which are fully rounded. This contrast is deliberate — it is what
  makes the filter pills read as controls.
- Keyboard-operable with visible focus rings. Honour `prefers-reduced-motion`.

## Constraints

- New dependencies require consulting the user first. Currently approved:
  `react`, `react-dom`, `react-router-dom`, `@mui/material`,
  `@mui/icons-material`, `@emotion/react`, `@emotion/styled` (MUI icons only —
  not its component library, theming, or styling system).
- No Tailwind, styled-components, or any animation library.
- Don't write tests or READMEs unless asked.
- Don't modify files outside the ones the task named.

## Verify

```
npm run build
```

Must pass with zero TypeScript errors before a task is considered done.
