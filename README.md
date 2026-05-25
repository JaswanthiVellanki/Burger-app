# Burger App

A small burger ordering app built with Next.js and TypeScript.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Pages

- `/` — the full menu
- `/product/[slug]` — individual item with details and add to cart
- `/cart` — everything you've added, with a running total

## How the data works

The menu comes from a static API that never changes, so I fetch it with
`cache: 'force-cache'`. Next.js caches the response at build time and never
hits the network again. Every product page is also pre-rendered at build time
using `generateStaticParams`, so there's no server work happening at request time.

## Cart

Cart state lives in Zustand with the `persist` middleware, which saves everything
to localStorage. That way your cart doesn't disappear when you navigate between
pages or refresh.

## Component breakdown

The product detail page is a good example of how I split server and client code.
The page itself (image, name, price, description) is a server component — it's
fully static HTML. Only the "Add to cart" button is a client component, since it
needs to write to the cart store. Keeping the client boundary as small as possible
means less JavaScript shipped to the browser.