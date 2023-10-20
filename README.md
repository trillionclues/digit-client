# Digitic Ecommerce App

This is a simple e-commerce app built with NextJs and Typescript. The main purpose of this project was to learn and practice integrating an ecommerce api I wrote using MongoDB and Javascript. It allows users to browse products, add them to their cart and checkout with their details.

## Getting Started

To run this project you need NodeJS installed on your machine along with npm package manager. You also need to have Npm installed.

## Features

Digit Ecommerce has the following features:

- User Registration and Login with Email authentication.
- Forgot Password feature with JWT token.
- Products CRUD operations including search, filter, sort options.
- Shopping Cart functionality to add/remove products.
- Payment Gateway integration for payment processing (currently only Stripe is supported).
- Order management system where users can view their orders history.
- Admin Dashboard to manage all aspects of the app such as user management, product management, order management etc.
- Delivery Addresses management in user's profile.

## Technology(s)

Some of the major technologies and libraries used include:

- [NodeJS] - Runtime environment.
- [React/Nextjs] - For frontend dev.
- [Redux Toolkit] - State manager
- Typescript
- Zod Validator
- Tailwind Css

## Demo

View a live version of the [Digit Ecommerce](https://digit-client.vercel.app)

## Got feedback?

I am always looking to improve on my skills and appreciate receiving feedback and criticisms! So if you have anything you'd like to mention, please email trillionclues@gmail.com.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
