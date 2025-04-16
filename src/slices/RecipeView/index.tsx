import { FC } from "react";
import { Content, FilledContentRelationshipField } from "@prismicio/client";
import { PrismicImage, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { entities } from "@/store";

/**
 * Props for `RecipeView`.
 */
export type RecipeViewProps = SliceComponentProps<Content.RecipeViewSlice>;

/**
 * Component for "RecipeView" Slices.
 */
const RecipeView: FC<RecipeViewProps> = async ({ slice }) => {
  const store = await entities.getStore();
  const recipe = store.recipes.get((slice.primary.recipe as FilledContentRelationshipField<"recipe">).id) as Content.RecipeDocument;
  const category = store.categories.get((recipe.data.category as FilledContentRelationshipField<"category">).id) as Content.CategoryDocument;
  const author = store.authors.get((recipe.data.author as FilledContentRelationshipField<"author">).id) as Content.AuthorDocument;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="grid grid-cols-1 md:grid-cols-5 gap-8"
    >
      {/* Left Column (40%) */}
      <aside className="md:col-span-2">
        <figure className="h-auto md:h-full">
          <PrismicImage
            field={recipe.data.image}
            className="w-full h-auto md:h-full object-cover rounded-md"
          />
        </figure>
      </aside>

      {/* Right Column (60%) */}
      <main className="md:col-span-3">
        <article>
          <header>
            <h1 className="text-2xl font-bold">{recipe.data.title}</h1>
            <div className="text-gray-700">
              <PrismicRichText field={recipe.data.ingridients} />
            </div>
          </header>
          <div className="my-4">
            <h2 className="text-2xl font-semibold">Steps</h2>
            <div className="text-lg">
              <PrismicRichText field={recipe.data.steps} />
            </div>
          </div>
        </article>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">Category</h2>
          <div className="mt-2">
            <p className="text-lg font-medium">{category.data.name}</p>
            <div className="text-gray-700">
              <PrismicRichText field={category.data.description} />
            </div>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">Author</h2>
          <div className="mt-2 flex items-center space-x-4">
            <PrismicImage
              className="w-16 h-16 rounded-full"
              field={author.data.profile_image}
            />
            <div>
              <p className="text-lg font-medium">{author.data.name}</p>
              <div className="text-gray-700">
                <PrismicRichText field={author.data.bio} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
};

export default RecipeView;
