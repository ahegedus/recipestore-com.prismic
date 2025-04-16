# recipestore-com-prismic Integration

Deployed URL: <https://recipestore-com.vercel.app>

## 🚀 Quick Start

Here you find the description of the pa

## How to Use This Project

To manage the headless CMS content content:

1. Go to [prismic.io/dashboard](https://prismic.io/dashboard).
2. Open the repository associated with **recipestore-com** at [Prismic Main Space Builder}(https://recipestore-com.prismic.io/builder/working)
3. Start editing or creating content using the Prismic UI.

### Preview Page

If you want to run this project on your local development environment, just execute the following commands
```sh
npm install
npm run dev
```

Then the local preview page is already set up for `http://localhost:3000`

### Architectural notes

Key files to edit:

- `prismicio.ts`: Configures `@prismicio/client` and API utilities.
- `app/layout.tsx`: Global layout setup, including Prismic providers, basic navigation bar
- `app/page.tsx`: The homepage component; fetches and renders the "home" document.
- `app/[uid]/page.tsx`: Dynamically renders pages based on Prismic UID.
- `slices/*/index.tsx`: Individual Slice components. Modify these to change Slice styling and structure.

Files you should avoid editing unless necessary:

- `app/api/exit-preview/route.ts`: Handles exiting preview mode.
- `app/api/preview/route.ts`: Starts a preview session.
- `app/slice-simulator/page.tsx`: Simulates Slice components in development.
- `slices/`: Stores all Slice components managed by Slice Machine.

See these guides for more info:

- [Fetch Data in Next.js](https://prismic.io/docs/technologies/fetch-data-nextjs)
- [Template Content in Next.js](https://prismic.io/docs/technologies/template-content-nextjs)

### Deploy the Project

To deploy **recipestore-com-prismic**, follow Prismic’s guide: [Deploy your Next.js App](https://prismic.io/docs/technologies/deploy-nextjs).  
Production deployment is hosted at: [https://recipestore-com-com.vercel.app](https://recipestore-com-com.vercel.app)

### Edit Content Models with Slice Machine

This project uses **Slice Machine** for managing Custom Types and Slices. Slice Machine keeps models locally and syncs them with your Prismic repo.

Learn more: [Model Content in Next.js](https://prismic.io/docs/technologies/model-content-nextjs)

> If you update your Custom Types, be sure to adjust your route logic accordingly. See [Define Paths in Next.js](https://prismic.io/docs/technologies/define-paths-nextjs) for guidance.

## Documentation

For more details, refer to:

- [Prismic’s guide for Next.js][prismic-docs]
- [Technical references for Prismic packages](https://prismic.io/docs/technologies/technical-references)
