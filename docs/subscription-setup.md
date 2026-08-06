# Subscription Setup Checklist

Goal: monetise SaintVentures with a **7-day free trial**, then **monthly** or **yearly** auto-renewing subscription. Sold through Apple App Store and Google Play Store using native in-app purchases, managed by RevenueCat.

Entitlement: `premium` — gates all stories + quizzes.

---

## Phase 0 — Accounts (start now, they take time)

- [ ] Apple Developer Program approved ($99/year)
- [ ] Google Play Console account paid ($25 one-time)
- [ ] Bundle ID created in Apple (App Store Connect → Identifiers) — matches `app.json` `ios.bundleIdentifier`
- [ ] Application ID created in Google Play Console — matches `app.json` `android.package`
- [ ] RevenueCat account created ([revenuecat.com](https://www.revenuecat.com))

---

## Phase 1 — Apple App Store Connect

- [ ] App created (Apps → Create App)
- [ ] Subscription Group created (e.g. `SaintVentures Premium`) — one group holds both plans so Monthly↔Yearly upgrades work
- [ ] Product `saintventures_monthly` created in the group
- [ ] Product `saintventures_yearly` created in the group
- [ ] Reference price set (USD) + territories chosen
- [ ] **7-day free trial** configured on Monthly (Introductory offer → Free, 7 days)
- [ ] **7-day free trial** configured on Yearly (same duration)
- [ ] Terms-of-service URL provided (App Store Connect)
- [ ] Subscription products submitted for review

### Product IDs (must match everywhere)

| Product      | App Store ID              | Google Play ID            |
| ------------ | ------------------------- | ------------------------- |
| Monthly      | `saintventures_monthly`   | `saintventures_monthly`   |
| Yearly       | `saintventures_yearly`    | `saintventures_yearly`    |

---

## Phase 2 — Google Play Console

- [ ] App created (release type set up)
- [ ] Subscription `saintventures_monthly` created (Monetize → Products → Subscriptions)
- [ ] Base Plan created for Monthly (auto-renewing, price, cadence)
- [ ] **7-day free trial** added to Monthly base plan (Offer → Free trial)
- [ ] Subscription `saintventures_yearly` created
- [ ] Base Plan created for Yearly
- [ ] **7-day free trial** added to Yearly base plan
- [ ] License testers added (Setup → License testing) with a test Google account
- [ ] App set to Free (Pricing → Free)

---

## Phase 3 — RevenueCat

- [ ] Project created → platform **Apple** added
- [ ] Platform **Google Play** added
- [ ] App Store Connect API key uploaded (Users & Access → Integrations; roles: Admin/App Manager)
- [ ] Google service account JSON uploaded (Play Console → Setup → API access; roles: Finance + Monetization)
- [ ] Products `saintventures_monthly` + `saintventures_yearly` present in RevenueCat Products tab
- [ ] Entitlement `premium` created (Entitlements tab)
- [ ] Both products attached to `premium`

---

## Phase 4 — App code (build after Phase 0)

- [ ] EAS configured (`eas.json`, native build working via `eas build`)
- [ ] `react-native-purchases` installed with Expo config plugin
- [ ] RevenueCat public SDK key in app config
- [ ] Paywall screen: "Start 7-day free trial" → `purchasePackage(pkg)`
- [ ] Feature gates check `isEntitled("premium")` (stories/quizzes)
- [ ] Restore purchases button → `restorePurchases()`
- [ ] Subscription terms shown in-app (price, term, auto-renew/cancel) — required by Apple
- [ ] Sandbox (iOS) + license (Android) tester purchase verified
- [ ] Trial → paid conversion verified end-to-end

---

## Gotchas

- Product IDs must match **exactly** across App Store, Play Console, and RevenueCat — mismatches silently break purchases.
- Always test with sandbox/license-test accounts; never a real card.
- Clearing a sandbox purchase resets the 7-day trial.
- RevenueCat free tier covers roughly $25k ARR — enough for launch.
