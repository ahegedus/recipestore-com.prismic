# RecipeStore Prismic Integration

Deployed URL: [https://recipestore-com.vercel.app](https://recipestore-com.vercel.app)

## 🚀 Quick Start

This guide provides an overview of the RecipeStore integration with Prismic, a headless CMS.

## How to Use This Project

To manage the content in the headless CMS:

1. Visit the [Prismic Dashboard](https://prismic.io/dashboard).
2. Open the repository associated with **RecipeStore** at [Prismic Main Space Builder](https://recipestore-com.prismic.io/builder/working).
3. Use the Prismic UI to edit or create content.

### Previewing Locally

To run this project in your local development environment:

1. Install dependencies:
    ```sh
    npm install
    ```
2. Start the development server:
    ```sh
    npm run dev
    ```
3. Access the local preview at [http://localhost:3000](http://localhost:3000).

### Testing

To run the test in this project in your local development environment

1. Install dependencies:
    ```sh
    npm install
    ```
2. Start the development server:
    ```sh
    npm test
    ```

## Architectural Notes

Key files and their purposes:

- **`prismicio.ts`**: Configures `@prismicio/client` and API utilities.
- **`app/layout.tsx`**: Sets up the global layout, including Prismic providers and the navigation bar.
- **`app/page.tsx`**: Fetches and renders the homepage content from the "home" document.
- **`app/catalog/page.tsx`**: Renders a static page listing all recipes.
- **`app/recipe/[uid]/page.tsx`**: Dynamically renders individual recipe pages based on their Prismic UID.
- **`app/category/[uid]/page.tsx`**: Dynamically renders recipes filtered by category using the Prismic UID.
- **`slices/*/index.tsx`**: Contains individual Slice components for modular content.
- **`store/index.ts`**: Provides Prismic content stores and helper utilities for easier access.

## Deployment

- The project is deployed using an automatic CI/CD pipeline on Vercel.
- The live demo is available at: [https://recipestore-com.vercel.app](https://recipestore-com.vercel.app).

## References

- **Prompts**: GenAI prompts are stored in the `prompts` folder.
- **Documentation**:
  - [Prismic’s Guide for Next.js](https://prismic.io/docs/technologies/nextjs)
  - [Technical References for Prismic Packages](https://prismic.io/docs/technologies/technical-references)

