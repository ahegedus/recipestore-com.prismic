# recipestore-com-prismic Integration

Deployed URL: <https://recipestore-com.vercel.app>

&nbsp;

## 🚀 Quick Start

To get started with the **recipestore-com-prismic** project:

1. Visit <https://prismic.io/dashboard>.
2. Create a new Prismic repository by selecting **Next.js**.
3. Choose the **Minimal starter** template.
4. Fill out your repository details and follow the setup instructions provided by Prismic.

Once your repository is ready, run the following command to start the local development server on port `3001`:

```sh
npm run dev
```

Make sure your `package.json` or development config points to `localhost:3001`.

## How to Use This Project

To manage your content:

1. Go to [prismic.io/dashboard](https://prismic.io/dashboard).
2. Open the repository associated with **recipestore-com** at [Prismic Main Space Builder}(https://recipestore-com.prismic.io/builder/working)
3. Start editing or creating content using the Prismic UI.

### Create a Page

To create a new page:

1. Click the green pencil icon in the Prismic dashboard.
2. Choose **Page**.
3. Add and rearrange Slices to build your page visually.

Each page will have a unique URL, but it won’t show in the navigation by default. Add it to the menu manually if needed.

### Preview Content

Local previewing is already set up for `http://localhost:3001`.  
To enable previews in production or staging, refer to [Preview Drafts in Next.js](https://prismic.io/docs/technologies/preview-content-nextjs).

### Customize the Website

This project integrates with Prismic using the following packages:

- `@prismicio/client` — fetches content from Prismic.
- `@prismicio/react` — renders Prismic content in React components.
- `@prismicio/next` — configures Prismic for use in Next.js apps.

These are preconfigured. Check the source code to understand how they are used.

### Edit the Code

Key files to edit:

- `prismicio.ts`: Configures `@prismicio/client` and API utilities.
- `app/layout.tsx`: Global layout setup, including Prismic providers.
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
