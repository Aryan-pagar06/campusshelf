# CampusShelf UI/UX Rules & Design System Guidelines

This document establishes the non-negotiable UI/UX standards, design constraints, and visual guidelines for the entire CampusShelf platform.

---

## 1. Project Overview & Design Goal

- **Project**: CampusShelf is a university academic resource marketplace and exchange platform.
- **Design Goal**: Clean, minimalist, modern, premium, academic, practical, and easy to use.

---

## 2. Visual Style

- **Overall Interface**: Light / clean white background palette.
- **Text & Contrast**: Dark charcoal text (`#1f2937` / `#111827`) ensuring strong readability and high contrast.
- **Primary Accent**: One restrained, premium primary accent — deep academic blue (e.g., `#1e40af` / `#1d4ed8`).
- **Borders**: Subtle, light gray borders (`#e5e7eb` / `#f3f4f6`).
- **Shadows**: Very subtle, soft shadows (`shadow-sm` or slight ambient elevation only).
- **Corner Radius**: Moderate, clean corner rounding (`rounded-md` or `rounded-lg`). Avoid hyper-rounded pills or oversized radii.
- **Whitespace**: Generous, purposeful whitespace allowing content to breathe.
- **Typography**: Clean, modern sans-serif typography with distinct visual hierarchy (size, weight, line-height).
- **Responsiveness**: Fully responsive layout adapting gracefully from mobile viewports to desktop displays.
- **Accessibility**: Strict compliance with WCAG standards for contrast ratios, tap target sizing, focus states, and spacing.

---

## 3. Explicit Prohibitions (What to Avoid)

To maintain a focused, academic, and premium look, strictly **AVOID**:
- Excessive cards and nested card containers
- Excessive rounded containers or bubble layouts
- Glassmorphism, backdrop blur effects, or translucent gimmicks
- Heavy gradients or neon color schemes
- Excessive or arbitrary color palettes
- Giant, distracting hero sections
- Excessive badges, tags, and status pills
- Decorative illustrations or stock graphics unless genuinely useful
- Fake statistics, vanity metrics, or misleading analytics
- Unnecessary icons that clutter text
- Dense, overwhelming dashboards
- Multiple competing primary buttons on a single screen
- Over-designed, multi-step convoluted forms
- Excessive borders and repetitive container nesting
- Unnecessary, distracting animations or transitions

---

## 4. Layout & Interaction Principles

- **Whitespace over Boxes**: Prefer generous margins, whitespace, and subtle section dividers over enclosing everything in box containers.
- **Single Primary Action**: Exactly one clear primary action per screen or view. Secondary actions must be visibly subdued.
- **Compact Navigation**: Navigation must remain streamlined, compact, and unobtrusive.
- **Readable Forms**: Forms must be straightforward, vertically organized, with clear labels, helpful placeholders, and explicit error states.
- **Deliberate Card Usage**: Use cards only when they genuinely improve semantic information grouping (e.g., resource listings in a catalog grid).
- **Component Consistency**: Maintain uniform spacing, typography scale, button styles, input fields, and resource card anatomy across every page.

---

## 5. Navigation Structure

Standard header navigation order:
```
[CampusShelf Logo & Name]  |  Browse  |  List Resource  |  Wishlist  |  Requests  |  Notifications  |  Profile
```

---

## 6. User Types

1. **Student**
2. **Faculty**
3. **Administrator**

---

## 7. Locked Product Scope (Version 1)

CampusShelf V1 supports only the following features:
- Authentication (Email OTP, University verification)
- Resource browsing, search, and filtering
- Resource listing (Sell, Buy, Rent, Exchange, Free Resource)
- Resource details with image views
- Wishlist management
- Resource requests (Send request)
- Request management by owner (Accept / Reject)
- Transaction completion marking
- Reviews and ratings following completed transactions
- In-app notification alerts
- AI-generated resource information and summaries (Google Gemini API)
- WhatsApp Click-to-Chat communication for direct transaction coordination
- Admin moderation and administrative dashboard analytics

### Strictly Forbidden in V1:
- Online payment gateway (UPI, Stripe, Razorpay, card processing)
- In-app messaging or chat rooms (transactions are coordinated via WhatsApp Click-to-Chat)
- Cryptocurrency or tokens
- Social feed, posts, or comment walls
- Unapproved recommendation engines or algorithmic feeds
- Multi-university branching
- Mobile apps (native iOS/Android)
- Any feature outside the approved SRS and scope

---

## 8. Technology Stack (Locked)

- **Frontend**: React + Vite + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Node.js + Express.js
- **ORM**: Prisma ORM
- **Database**: PostgreSQL (Neon)

---

## 9. Architectural Integrity

- The project's **SRS**, **UML diagrams**, and **DFDs** are the single source of truth.
- Do not invent features, workflows, or states not present in the approved scope.
- In Phase 2, strictly focus on UI/UX, components, and design alignment. Do not touch backend logic, database models, authentication code, or API routes.
