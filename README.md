KMD Predictability Suite

A reusable Predictability Suite for multi-account, multi-device products.
This project demonstrates three cross-surface UX primitives designed to reduce wrong-account actions and increase clarity across shared and personal devices:

Identity Context Bar

Permissions Preview Layer

Activity Timeline Prototype

These patterns help users understand who they are, what they’re doing, and who can see it before mistakes happen.

Built with Next.js (App Router), React, Tailwind CSS, Zustand, and TypeScript.

Why this exists

Modern products span multiple identities (work, personal, guest), multiple devices (desktop, mobile, TV, kiosks), and shared contexts (family, teams, classrooms, clinics, retail). Users frequently:

Take actions under the wrong account

Share data more broadly than intended

Lose awareness of who can see what

Get confused switching between devices and profiles

Struggle to reason about privacy and visibility

Most of these issues are preventable with clear, system-level feedback.
This project explores how a consistent, lightweight layer can improve predictability without adding friction.

What’s included
Identity Context Bar

A persistent, cross-surface UI element that clearly communicates:

Active identity (Work, Personal, Guest, Child, etc.)

Active device context (Desktop, Mobile, TV, Shared Device)

Scenario being simulated

Whether the setup is aligned, risky, or mismatched

The bar uses color and tone to indicate confidence level:

Green: aligned with scenario intent

Amber: identity mismatch

Blue: device mismatch

Red: high-risk (identity and device both misaligned)

This demonstrates how systems-level UX can prevent wrong-account actions before they happen.

Permissions Preview Layer

A transparent preview showing what will happen before an action is taken, such as:

Who will see a shared document

What audience a post will reach

Whether content is visible to personal, work, or shared profiles

The intent is to reduce uncertainty at the decision point while keeping the UI calm, neutral, and predictable.

Activity Timeline Prototype

A simple model for explaining:

What just happened

Who performed the action

Under which identity

On which device

With what impact on visibility

This supports trust, auditability, and user understanding.

Architecture Overview

This project is intentionally lightweight and transparent.

Next.js App Router (16.x)

React 19

Tailwind CSS v4

Zustand for identity and scenario state

TypeScript with strong typing for clarity

Lucide React for iconography

Framer Motion for subtle motion

There is no backend dependency. All scenarios are simulated locally so the UX model can be evaluated in isolation.

Project Structure
src/
  app/
    page.tsx              // Home
    demo/                 // Context bar playground
    permissions/          // Permissions preview demo
    activity/             // Activity timeline demo
  components/
    context-bar/          // Identity bar system
    demo/                 // Playground elements
    layout/               // Shared shell and navigation
    ui/                   // Base UI components
  store/
    accountStore.ts       // Identity + device state
  lib/
    accounts.ts
    devices.ts
    scenerios.ts          // Scenario definitions

Getting Started

Install dependencies:

npm install


Run locally:

npm run dev


Build for production:

npm run build
npm start

Live Demo

Once deployed to Vercel, you can access the following routes:

/ — Overview

/demo — Identity Context Bar playground

/permissions — Permissions Preview Layer

/activity — Activity Timeline prototype

Design Principles

This project is guided by a few principles:

Predictability over surprise

Calm clarity over alerts

Transparency without blame

Cross-surface consistency

Trust built through visibility

Lightweight systems over heavy gates

The goal is to help users stay oriented without interrupting flow.

Where this applies

These primitives are reusable across many industries:

Productivity and collaboration platforms

Streaming and shared device experiences

Fintech and business-to-consumer financial tools

Healthcare and patient-caregiver portals

Education and parent-student-teacher platforms

Retail POS and shared terminal environments

Customer support and multi-brand tools

Government, legal, and justice systems

Anywhere identity, visibility, and device context intersect, predictability matters.

Status

This is a working prototype intended for research, learning, and design exploration. It is not a production framework, but the patterns are production-ready.

Future Ideas

Potential next steps include:

Role-based identity modeling

More granular visibility states

Expanded shared-device behaviors

Richer audit trails

User testing and heuristics refinement

License

This project is released for learning and demonstration purposes.
If you would like to collaborate or extend it, please reach out.

Author

Kenju Management & Design (KMD)
