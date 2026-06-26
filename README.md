# QA Take-Home Assignment — Playwright + TypeScript

A focused test suite covering UI automation on [SauceDemo](https://www.saucedemo.com) and API automation against [ReqRes](https://reqres.in), built with Playwright and TypeScript.

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

## Setup — ReqRes API key (required)

ReqRes now requires an API key on every request. Get a free key at **https://reqres.in/signup**, then set it before running API tests:

```bash
# Windows
set REQRES_API_KEY=your_key_here

# Mac / Linux
export REQRES_API_KEY=your_key_here
```

The API tests throw a clear error if the variable is missing.

---

## Running the tests

| Command | What it does |
|---|---|
| `npm test` | Run the entire suite (UI + API) |
| `npm run test:ui` | Run only the UI tests |
| `npm run test:api` | Run only the API tests |
| `npm run test:report` | Open the HTML report after a run |

---

## Project structure

```
my-qa-assignment/
├── tests/
│   ├── ui/
│   │   ├── login.spec.ts       # Login: standard user, locked-out user
│   │   ├── cart.spec.ts        # Cart badge, price sort
│   │   └── checkout.spec.ts    # Full checkout flow
│   └── api/
│       └── users.spec.ts       # GET /api/users, POST /api/users, bonus chain
├── pages/
│   ├── LoginPage.ts            # POM — saucedemo login
│   ├── ProductsPage.ts         # POM — product listing & cart
│   └── CheckoutPage.ts         # POM — cart → checkout → confirmation
├── playwright.config.ts
├── package.json
└── README.md
```

---

## What each part covers

### Part 1 — UI (SauceDemo)

| File | Scenarios |
|---|---|
| `login.spec.ts` | `standard_user` lands on Products page; `locked_out_user` sees error and stays on login |
| `cart.spec.ts` | Adding two products updates the cart badge to 2; Price (low to high) sort puts cheapest item first |
| `checkout.spec.ts` | Full flow — add 2 items → cart → checkout info → finish → "Thank you for your order!" |

All UI tests use `data-test` attributes via `getByTestId()` and Playwright semantic locators. Each test is independent and can run in any order.

### Part 2 — API (ReqRes)

| Test | Assertion |
|---|---|
| `GET /api/users?page=2` | Status 200, `data` is a non-empty array, each user has `id`, `email`, `first_name`, `last_name` |
| `POST /api/users` | Status 201, response echoes `name` and `job`, contains `id` and a valid `createdAt` ISO timestamp |
| Bonus chain | Demonstrates the create-then-verify pattern; comments show what a real follow-up GET would look like |

API tests use Playwright's `request` fixture — no browser involved.

---

## Design decisions & trade-offs

- **Page Object Model** used for all UI tests. Each page class encapsulates only its own locators and actions, keeping specs readable and DRY.
- **`data-test` attributes** preferred throughout (SauceDemo exposes them). CSS class selectors are only used where a `data-test` equivalent doesn't exist (e.g. `.shopping_cart_badge`, `.inventory_item_price`).
- **One behaviour per test** — each `test()` block asserts exactly one outcome, making failures easy to diagnose.
- **Parallel execution** is enabled by default via `fullyParallel: true`. Because every test sets up its own session (login via `beforeEach`), there is no shared state.
- **Chromium only** — cross-browser wasn't required by the brief; adding Firefox/WebKit is a one-line change in `playwright.config.ts`.

## What I'd add with more time

- A `fixtures.ts` file to abstract the login `beforeEach` as a reusable fixture, reducing boilerplate further.
- A `.env` / config file for credentials and base URLs instead of inline strings.
- CI via GitHub Actions (`npx playwright test` on push).
- `problem_user` tests to document known visual/functional defects on SauceDemo.
- Negative API tests — invalid payloads, missing fields, unexpected status codes.
