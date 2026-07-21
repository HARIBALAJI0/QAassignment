# QA Take-Home Assignment — Playwright + TypeScript

A structured Playwright suite covering UI automation on [SauceDemo](https://www.saucedemo.com) and API automation against [ReqRes](https://reqres.in), built with TypeScript and modern test practices.

---

## Highlights

- Reusable base page for common UI actions
- Shared Playwright fixtures for login and authenticated flows
- Centralized test data under test-data/
- GitHub Actions workflow for CI
- HTML + Allure reporting support

---

## Prerequisites

- Node.js 18+
- npm 9+

---

## Installation

```bash
npm install
npx playwright install chromium
```

---

## Configuration via .env

The suite now reads its URLs and credentials from environment variables. Create a .env file in the project root using the example below.

```bash
copy .env.example .env
```

Example values:

```env
SAUCEDEMO_BASE_URL=https://www.saucedemo.com
STANDARD_USER=standard_user
STANDARD_PASSWORD=secret_sauce
LOCKED_OUT_USER=locked_out_user
LOCKED_OUT_PASSWORD=secret_sauce
REQRES_BASE_URL=https://reqres.in
REQRES_API_KEY=your_key_here
```

If you do not set REQRES_API_KEY, the suite falls back to the public demo key so local execution can continue.

---

## Running the tests

| Command | What it does |
|---|---|
| `npm test` | Run the full suite |
| `npm run test:ui` | Run only UI tests |
| `npm run test:api` | Run only API tests |
| `npm run test:report` | Open the HTML report |
| `npm run test:allure` | Generate and open the Allure report |

---

## Project structure

```text
my-qa-assignment/
├── .github/workflows/playwright.yml
├── pages/
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   └── CheckoutPage.ts
├── test-data/
│   └── constants/
│       └── users.ts
├── tests/
│   ├── ui/
│   │   ├── login.spec.ts
│   │   ├── cart.spec.ts
│   │   └── checkout.spec.ts
│   └── api/
│       └── users.spec.ts
├── utils/
│   ├── api/
│   │   └── reqres.ts
│   └── helpers/
│       └── slug.ts
├── fixtures.ts
├── playwright.config.ts
├── package.json
└── README.md
```

---

## Test coverage

### UI (SauceDemo)

- Login happy path and locked-out-user validation
- Cart badge and sorting assertions
- Full checkout confirmation flow

### API (ReqRes)

- GET /api/users?page=2 validation
- POST /api/users creation flow
- Structure checks for API response payloads
