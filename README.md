# Adaptive Productivity System (APS)

Adaptive Productivity System (APS) is a frontend-only React UX prototype built for an HCI assignment. It is designed for university students who procrastinate, ignore reminders, struggle to start tasks, and get distracted easily. The product focuses on reducing friction to starting, making future consequences visible, and using lightweight motivation loops instead of traditional reminder-heavy interfaces.

## Project Overview

APS is intentionally built with mock data and simulated interactions only.

- No backend
- No APIs
- No database
- No real fetching
- React state only
- Hardcoded and demo-focused behavior

The app is structured as a multi-page product demo so it feels closer to a realistic student productivity platform than a single long prototype screen.

## Main Features

- Smart Task Breakdown with a hardcoded task sequence: `Research`, `Outline`, `Draft`, `Edit`
- Micro-start flow with a `Start Now` focus modal and fake countdown timer
- Energy-based scheduling with a visual battery and fake energy drain
- Future You Simulator with stress feedback when the user skips work
- Reverse Planner with a hardcoded four-day vertical timeline
- Focus and attention insights with static stats and a heatmap
- Context-aware nudges that rotate through hardcoded suggestions
- Minimal gamification with XP and streak tracking in local state
- Light and dark mode toggle
- Smooth UI motion using Framer Motion

## Page Structure

APS is split into six routed views:

- `Dashboard`
- `Tasks`
- `Energy`
- `Future`
- `Planner`
- `Insights`

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- GitHub Actions for CI/CD

## Requirements

Collaborators need the following installed on their device:

- Git
- Node.js `22.x` recommended
- npm `10.x` or newer

You can also check the lightweight setup list in `requirements.txt`.

## Collaborator Setup

### 1. Install Git

Install Git from the official website:

- https://git-scm.com/downloads

After installation, confirm it works:

```bash
git --version
```

### 2. Install Node.js and npm

Install Node.js from the official website:

- https://nodejs.org/

Recommended:

- Node.js `22.x`
- npm `10.x` or newer

After installation, confirm both are available:

```bash
node -v
npm -v
```

### 3. Clone the repository

```bash
git clone <your-repository-url>
cd HCIAssignment3
```

### 4. Install frontend dependencies

All project packages are managed with `npm`, not Python `pip`.

```bash
cd react-frontend
npm install
```

This installs the project dependencies already defined in `package.json`, including:

- `react`
- `react-dom`
- `react-router-dom`
- `framer-motion`
- `vite`
- `tailwindcss`
- TypeScript and ESLint tooling

### 5. Run the app locally

```bash
cd react-frontend
npm run dev
```

Then open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Run Locally

From the frontend directory:

```bash
cd react-frontend
npm install
npm run dev
```

## Quality Checks

The frontend includes local verification commands:

```bash
cd react-frontend
npm run lint
npm run typecheck
npm run build
```

## Troubleshooting

If a collaborator gets setup issues:

- Run `node -v` and confirm Node.js is installed
- Run `npm -v` and confirm npm is installed
- Make sure commands are run inside `react-frontend`
- If packages are missing, run `npm install` again
- If GitHub Pages deployment is used, make sure repository Pages source is set to `GitHub Actions`

## CI/CD

The repository includes a GitHub Actions workflow at `.github/workflows/frontend-ci-cd.yml`.

It currently:

- Installs dependencies with `npm ci`
- Runs ESLint
- Runs TypeScript type-checking
- Builds the production frontend
- Uploads the static build artifact
- Deploys to GitHub Pages on pushes to `main`

For deployment, make sure GitHub Pages is configured to use `GitHub Actions` as the source.

## Important Prototype Note

This project is a UX/product demo, not a production productivity platform. The interactions are intentionally simulated so the assignment can focus on experience design, flow, and visual communication rather than backend implementation.

## License

This project is licensed under the MIT License. See `LICENSE` for details.
