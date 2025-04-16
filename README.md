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
- `app/catalog/page.tsx`: Static render for all Recipes
- `app/recipe/[uid]/page.tsx`: Dynamically renders Recipe page based on Prismic UID.
- `app/category/[uid]/page.tsx`: Dynamically renders all Recipes with a static prefilter for category based on Prismic UID.
- `slices/*/index.tsx`: Individual Slice components.
- `slices/*/index.tsx`: Individual Slice components.
- `store/index.ts`: Prismic content stores to easy access and helpers.

### Deploy the Project

- Automatic CI/CD pipeline on Vercel.
- Demo deployment is hosted at: [https://recipestore-com.vercel.app](https://recipestore-com.vercel.app)

## References

GenAI prompts are store in `prompts` folder.

For more details, refer to:

- [Prismic’s guide for Next.js][prismic-docs]
- [Technical references for Prismic packages](https://prismic.io/docs/technologies/technical-references)
