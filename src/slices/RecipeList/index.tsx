import { FC } from "react";
import { Content, FilledContentRelationshipField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { RecipeTileSliceDefaultPrimaryRecipesItem } from "../../../prismicio-types";

import { entities } from "../../store";
import RecipeGrid from "@/components/RecipeGrid";

/**
 * Props for `RecipeTile`.
 */
export type RecipeTileProps = SliceComponentProps<Content.RecipeTileSlice>;

/**
 * Component for "RecipeTile" Slices.
 */
const RecipeTile: FC<RecipeTileProps> = async ({ slice }) => {
  const categoryFilterUid = slice.primary.category_filter ? (slice.primary.category_filter as FilledContentRelationshipField<"category">).id : undefined;
  const store = await entities.getStore(categoryFilterUid);
  const recipes = slice.primary.recipes as RecipeTileSliceDefaultPrimaryRecipesItem[];
  console.log("Store:", store, "Recipes:", recipes, "Category Filter:", categoryFilterUid);
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <RecipeGrid recipes={recipes} store={store} />
    </section>
  );
};

export default RecipeTile;
