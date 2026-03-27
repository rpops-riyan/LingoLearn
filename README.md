# LingoLearn

Mint-green Electron language learning app with:

- multi-language UI switching
- student and teacher account flows
- personal account flow
- Stripe Checkout subscriptions
- Stripe webhook-based premium unlocks
- Electron Forge packaging

## What is already built

- Stripe-hosted checkout flow from the Electron app
- Stripe customer portal link for billing changes
- webhook-based subscription recognition in the backend
- packaged desktop builds for macOS
- Windows build config and GitHub Actions workflow for a separate `.exe` build

## Local development

1. Copy `.env.example` to `.env`.
2. Run `npm run stripe:seed` after adding `STRIPE_SECRET_KEY` to `.env` to create:
   - personal: `£3.99 / month`
   - student: `£3.99 / month`
   - teacher: `£2.99 / month` with quantity used as student seats
3. Put the Stripe webhook secret and created price IDs into `.env`.
4. Install dependencies with `npm install`.
5. Start the backend and desktop app together with `npm run dev`.

## Live backend for the packaged app

The packaged desktop app should point at a live backend, not `localhost`.

1. Deploy `backend/server.js` to a public URL.
2. Put that public URL in [app-config.json](/Users/riyan/Documents/LingoLearn/app-config.json) as `backendBaseUrl`.
3. Rebuild the desktop app with `npm run make:mac` or `npm run make:win`.

Example:

```json
{
  "backendBaseUrl": "https://your-live-backend.example.com"
}
```

## Stripe notes

- The Electron app opens hosted Stripe Checkout in the user's default browser.
- Premium access is unlocked only after the backend confirms a valid Stripe subscription state.
- The packaged app no longer needs `localhost` if `app-config.json` points at your deployed backend.

## Webhook testing

Use the Stripe CLI in another terminal:

```bash
stripe listen --forward-to localhost:4242/api/stripe/webhook
```

Copy the generated webhook signing secret into `.env` as `STRIPE_WEBHOOK_SECRET`.

## Packaging with Electron Forge

Run:

```bash
npm run make:mac
```

Forge writes build artifacts to `out/`.

### macOS

On macOS, Forge creates `.zip` and `.dmg` artifacts from this Mac.

If you want a smoother install for other people, add Apple signing values before building:

- `APPLE_SIGN_IDENTITY`
- `APPLE_ID`
- `APPLE_APP_SPECIFIC_PASSWORD`
- `APPLE_TEAM_ID`

The Forge config now includes hardened runtime and notarization hooks through [forge.config.js](/Users/riyan/Documents/LingoLearn/forge.config.js).

### Windows

Build the Windows installer on Windows or in GitHub Actions:

```bash
npm run make:win
```

From this Mac, you can still create a separate Windows app bundle as a zip:

```bash
npm run make:win:zip
```

The repo now includes [desktop-build.yml](/Users/riyan/Documents/LingoLearn/.github/workflows/desktop-build.yml), which builds:

- macOS artifacts on `macos-latest`
- Windows artifacts on `windows-latest`

## Sharing the app

- Direct download from your website
- GitHub Releases
- TestFlight is not used for Electron apps

Unsigned macOS and Windows apps are harder for people to open. For public distribution, add code signing and notarization later.
