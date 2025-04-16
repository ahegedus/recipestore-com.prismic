import { FC } from "react";
import { Content, FilledContentRelationshipField } from "@prismicio/client";
import { PrismicImage, SliceComponentProps } from "@prismicio/react";
import { RecipeTileSliceDefaultPrimaryRecipesItem } from "../../../prismicio-types";

import { entities } from "../../store";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `RecipeTile`.
 */
export type RecipeTileProps = SliceComponentProps<Content.RecipeTileSlice>;

/**
 * Component for "RecipeTile" Slices.
 */
const RecipeTile: FC<RecipeTileProps> = async ({ slice }) => {
  const store = await entities.getStore()
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slice.primary.recipes.map((item: RecipeTileSliceDefaultPrimaryRecipesItem, i) => {
          const recipe = store.recipes.get((item.recipe as FilledContentRelationshipField<"recipe">).id) as Content.RecipeDocument;
          const category = store.categories.get((recipe.data.category as FilledContentRelationshipField<"category">).id) as Content.CategoryDocument;
          const author = store.authors.get((recipe.data.author as FilledContentRelationshipField<"author">).id) as Content.AuthorDocument;
          return (
            <PrismicNextLink field={recipe.data.receipe_page} key={i + recipe.id} className="border p-4 rounded">
              <PrismicImage field={recipe.data.image} className="w-full h-auto mb-2" />
              <h2 className="text-xl font-bold">{recipe.data.title}</h2>
              <p>{category?.data.name}</p>
              <p>{author?.data.name}</p>
            </PrismicNextLink>
          );
        })}
      </div>
    </section>
  );
};

export default RecipeTile;
